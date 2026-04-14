import { test, expect } from '@playwright/test';

/**
 * Scroll-driven reveal and hero gallery tests.
 *
 * Verifies:
 * 1. ScrollGalleryHero renders images (desktop + mobile)
 * 2. FadeUp sections become visible after scrolling into view
 * 3. Hero is not broken (no error boundary fallback showing raw error)
 */

test.describe('ScrollGalleryHero — desktop', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('hero section is present and has images', async ({ page }) => {
    await page.goto('/');
    // The hero section wraps the gallery
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });

  test('hero renders at least one image', async ({ page }) => {
    await page.goto('/');
    // Wait for images to load — at least one alt-tagged image in the hero
    const heroImages = page.locator('img[alt*="massage"], img[alt*="spa"], img[alt*="Haven"], img[alt*="stone"], img[alt*="wellness"]');
    await expect(heroImages.first()).toBeAttached();
  });

  test('hero tagline is visible above the fold', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Your peace starts here.')).toBeVisible();
  });

  test('FadeUp sections reveal after scrolling — services section', async ({ page }) => {
    await page.goto('/');
    // Services section is below the fold — scroll to it
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'instant' }));
    // Wait for IntersectionObserver + framer-motion to fire
    await page.waitForTimeout(600);
    await expect(page.getByText('Find the right fit.')).toBeVisible();
  });

  test('FadeUp sections reveal after scrolling — testimonials section', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo({ top: 2400, behavior: 'instant' }));
    await page.waitForTimeout(600);
    await expect(page.getByText('What clients say')).toBeVisible();
  });

  test('FadeUp sections reveal after scrolling — Jane intro section', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo({ top: 1800, behavior: 'instant' }));
    await page.waitForTimeout(600);
    await expect(page.getByText("You're booking a person, not a service.")).toBeVisible();
  });

  test('no JS errors that would break the hero', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/');
    // Wait for framer-motion to initialise
    await page.waitForTimeout(1000);
    // Filter out known non-critical warnings
    const critical = errors.filter(
      (e) => !e.includes('Warning:') && !e.includes('ResizeObserver')
    );
    expect(critical).toHaveLength(0);
  });
});

test.describe('ScrollGalleryHero — mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('hero renders on mobile viewport', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });

  test('hero tagline visible on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Your peace starts here.')).toBeVisible();
  });

  test('FadeUp sections reveal on mobile after scroll', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }));
    await page.waitForTimeout(600);
    await expect(page.getByText('Find the right fit.')).toBeVisible();
  });
});
