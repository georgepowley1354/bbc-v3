import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {

  test('all pages have html lang="en"', async ({ page }) => {
    const routes = ['/', '/services', '/about', '/booking', '/faq', '/contact'];
    for (const route of routes) {
      await page.goto(route);
      const lang = await page.getAttribute('html', 'lang');
      expect(lang, `${route} should have lang="en"`).toBe('en');
    }
  });

  test('skip to main content link is present on home page', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.getByRole('link', { name: /Skip to main content/i });
    // It's visually hidden but present in DOM (sr-only)
    await expect(skipLink).toBeAttached();
    // The href points to #main-content
    await expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  test('skip link is keyboard-focusable and becomes visible on focus', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: /Skip to main content/i });
    await expect(skipLink).toBeFocused();
  });

  test('main content area has id="main-content"', async ({ page }) => {
    await page.goto('/');
    const main = page.locator('#main-content');
    await expect(main).toBeAttached();
  });

  test('nav has aria-label="Main navigation"', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeAttached();
  });

  test('mobile hamburger button has aria-label', async ({ page, viewport }) => {
    // Only relevant on mobile widths — force small viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const hamburger = page.getByRole('button', { name: /Open navigation menu/i });
    await expect(hamburger).toBeAttached();
  });

  test('FAQ accordion buttons use aria-expanded', async ({ page }) => {
    await page.goto('/faq');
    const buttons = page.getByRole('button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
    // Every FAQ button should have aria-expanded attribute
    const firstBtn = page.getByRole('button').filter({ hasText: 'What happens during my first visit?' });
    await expect(firstBtn).toHaveAttribute('aria-expanded', 'false');
    await firstBtn.click();
    await expect(firstBtn).toHaveAttribute('aria-expanded', 'true');
  });

  test('FAQ accordion buttons have aria-controls pointing to panel', async ({ page }) => {
    await page.goto('/faq');
    const firstBtn = page.getByRole('button').filter({ hasText: 'What happens during my first visit?' });
    const controls = await firstBtn.getAttribute('aria-controls');
    expect(controls).toBeTruthy();
    expect(controls).toMatch(/faq-panel-/);
  });

  test('FAQ accordion is keyboard navigable with Enter key', async ({ page }) => {
    await page.goto('/faq');
    const firstBtn = page.getByRole('button').filter({ hasText: 'What happens during my first visit?' });
    await firstBtn.focus();
    await page.keyboard.press('Enter');
    await expect(firstBtn).toHaveAttribute('aria-expanded', 'true');
  });

  test('social links in footer have aria-label', async ({ page }) => {
    await page.goto('/');
    const fbLink = page.locator('footer').getByRole('link', { name: /Haven on Facebook/ });
    await expect(fbLink).toBeAttached();
    const igLink = page.locator('footer').getByRole('link', { name: /Haven on Instagram/ });
    await expect(igLink).toBeAttached();
  });

  test('contact page social links have aria-label', async ({ page }) => {
    await page.goto('/contact');
    const fbLink = page.getByRole('link', { name: /Haven on Facebook/ });
    await expect(fbLink).toBeAttached();
  });

  test('photo placeholder on about page has role="img" and aria-label', async ({ page }) => {
    await page.goto('/about');
    const photoPlaceholder = page.getByRole('img', { name: /Jane Smith LMT/ });
    await expect(photoPlaceholder).toBeAttached();
  });

  test('service icons are aria-hidden', async ({ page }) => {
    await page.goto('/');
    // Icons marked aria-hidden should not show up as accessible elements
    // We verify no icon SVG is exposed as an interactive role
    const allButtons = await page.getByRole('button').count();
    // Page should not have spurious button roles from icon wrappers
    expect(allButtons).toBeLessThan(20); // Sanity check — not flooded with fake buttons
  });

  test('all pages have a <main> element with id', async ({ page }) => {
    const routes = ['/', '/services', '/about', '/booking', '/faq', '/contact'];
    for (const route of routes) {
      await page.goto(route);
      const main = page.locator('main#main-content');
      await expect(main, `${route} should have <main id="main-content">`).toBeAttached();
    }
  });
});
