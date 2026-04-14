import { test, expect } from '@playwright/test';

// Force mobile viewport for all tests in this file
test.use({ viewport: { width: 375, height: 812 } });

const allPages = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'Booking', path: '/booking' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

// ── No horizontal scroll ──────────────────────────────────────────────────────

for (const { name, path } of allPages) {
  test(`${name} page — no horizontal scroll on mobile`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('domcontentloaded');

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBe(false);
  });
}

// ── Sticky Book Now visible ───────────────────────────────────────────────────

for (const { name, path } of allPages) {
  test(`${name} page — StickyBookNow button is visible on mobile`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('domcontentloaded');
    // StickyBookNow is rendered globally via layout.tsx
    const stickyBtn = page.getByRole('link', { name: /Book Now/i }).last();
    await expect(stickyBtn).toBeVisible();
  });
}

// ── Hamburger nav ─────────────────────────────────────────────────────────────

for (const { name, path } of allPages) {
  test(`${name} page — hamburger menu button is visible on mobile`, async ({ page }) => {
    await page.goto(path);
    const hamburger = page.getByRole('button', { name: /Open navigation menu/i });
    await expect(hamburger).toBeVisible();
  });
}

// ── Hamburger opens and closes ────────────────────────────────────────────────

test('mobile nav opens on hamburger click', async ({ page }) => {
  await page.goto('/');
  const hamburger = page.getByRole('button', { name: /Open navigation menu/i });
  await hamburger.click();
  // Mobile overlay dialog should be present
  const mobileMenu = page.getByRole('dialog', { name: /Navigation menu/i });
  await expect(mobileMenu).toBeVisible();
  // Nav links visible inside the dialog
  await expect(mobileMenu.getByRole('link', { name: 'Services' })).toBeVisible();
  await expect(mobileMenu.getByRole('link', { name: 'About' })).toBeVisible();
  await expect(mobileMenu.getByRole('link', { name: 'FAQ' })).toBeVisible();
  await expect(mobileMenu.getByRole('link', { name: 'Contact' })).toBeVisible();
});

test('mobile nav closes on X button click', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Open navigation menu/i }).click();
  const mobileMenu = page.getByRole('dialog', { name: /Navigation menu/i });
  await expect(mobileMenu).toBeVisible();

  await page.getByRole('button', { name: /Close menu/i }).click();
  await expect(mobileMenu).not.toBeVisible();
});

test('mobile nav Book Now button goes to /booking', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Open navigation menu/i }).click();
  const mobileMenu = page.getByRole('dialog', { name: /Navigation menu/i });
  const bookNow = mobileMenu.getByRole('link', { name: /Book Now/i });
  await expect(bookNow).toBeVisible();
  await expect(bookNow).toHaveAttribute('href', '/booking');
});

// ── Touch target sizes ────────────────────────────────────────────────────────

test('mobile FAQ accordion buttons have adequate tap target height', async ({ page }) => {
  await page.goto('/faq');
  const firstBtn = page.getByRole('button').filter({ hasText: 'What happens during my first visit?' });
  const box = await firstBtn.boundingBox();
  expect(box).not.toBeNull();
  // CLAUDE.md: minimum tap target 44px
  expect(box!.height).toBeGreaterThanOrEqual(44);
});

// ── Mobile-specific page checks ───────────────────────────────────────────────

test('FAQ accordion works on mobile', async ({ page }) => {
  await page.goto('/faq');
  const firstBtn = page.getByRole('button').filter({ hasText: 'What happens during my first visit?' });
  await expect(firstBtn).toHaveAttribute('aria-expanded', 'false');
  await firstBtn.click();
  await expect(firstBtn).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText(/fill out a short health history form/)).toBeVisible();
});

test('Contact form fields are usable on mobile', async ({ page }) => {
  await page.goto('/contact');
  const nameField = page.getByLabel('Name');
  await expect(nameField).toBeVisible();
  await nameField.fill('Test User');
  await expect(nameField).toHaveValue('Test User');
});

test('Home page tagline is readable on mobile', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Your peace starts here.')).toBeVisible();
});
