const http = require('http')
const { spawn } = require('child_process')
const { chromium } = require('playwright')

const port = 3527
const baseUrl = `http://127.0.0.1:${port}`

function waitForServer(url, timeout = 60000) {
  const start = Date.now()

  return new Promise((resolve, reject) => {
    const check = () => {
      const request = http.get(url, (response) => {
        response.resume()
        resolve()
      })

      request.on('error', () => {
        if (Date.now() - start > timeout) {
          reject(new Error(`Timed out waiting for ${url}`))
        } else {
          setTimeout(check, 1000)
        }
      })
    }

    check()
  })
}

async function run() {
  const server = spawn(
    'npm.cmd',
    ['run', 'dev', '--', '--hostname', '127.0.0.1', '--port', `${port}`],
    {
      cwd: __dirname,
      stdio: 'inherit',
      shell: true,
    }
  )

  try {
    await waitForServer(baseUrl)
    console.log(`Verdant server ready at ${baseUrl}`)

    const browser = await chromium.launch()
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })

    await page.goto(baseUrl, { waitUntil: 'networkidle' })
    await page.locator('h1 >> text=We build').waitFor()
    console.log('Homepage verified')

    await page.goto(`${baseUrl}/portfolio/adirondack-terrace`, { waitUntil: 'networkidle' })
    await page.locator('text=Reveal the transformation').waitFor()
    console.log('Case study verified')

    await page.goto(`${baseUrl}/contact`, { waitUntil: 'networkidle' })
    await page.locator('h1 >> text=premium inquiry').waitFor()
    console.log('Contact page verified')

    await page.goto(`${baseUrl}/definitely-missing`, { waitUntil: 'networkidle' })
    await page.locator('text=Return Home').waitFor()
    console.log('Not-found page verified')

    await browser.close()
    console.log('Verdant smoke test passed.')
  } finally {
    server.kill()
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
