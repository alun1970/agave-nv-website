// End-to-end tests for Agave NV website
import { test, expect } from '@playwright/test';

test.describe('Agave NV Website E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle('Agave New Ventures - Coming Soon');
    await expect(page.locator('h1')).toContainText('AGAVE NEW VENTURES');
  });

  test('should display all key elements', async ({ page }) => {
    // Check main heading
    await expect(page.locator('.company-name')).toBeVisible();
    await expect(page.locator('.company-name')).toHaveText('AGAVE NEW VENTURES');
    
    // Check tagline
    await expect(page.locator('.tagline')).toBeVisible();
    await expect(page.locator('.tagline')).toHaveText('AI ENGINEERING FOR BUSINESS');
    
    // Check coming soon message
    await expect(page.locator('.coming-soon')).toBeVisible();
    await expect(page.locator('.coming-soon')).toHaveText('Coming Soon');
    
    // Check description
    await expect(page.locator('.description')).toBeVisible();
    await expect(page.locator('.description')).toContainText('Revolutionary AI solutions');
  });

  test('should have working contact links', async ({ page }) => {
    // Check email link
    const emailLink = page.locator('a[href^="mailto:"]');
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', 'mailto:info@agave-nv.com');
    
    // Check phone link
    const phoneLink = page.locator('a[href^="tel:"]');
    await expect(phoneLink).toBeVisible();
    await expect(phoneLink).toHaveAttribute('href', 'tel:+447751494649');
  });

  test('should display logo with animation', async ({ page }) => {
    const logo = page.locator('.logo');
    await expect(logo).toBeVisible();
    
    // Check if it's an SVG
    await expect(logo).toHaveAttribute('viewBox', '0 0 465 465');
    
    // Check for animated group
    const animatedGroup = page.locator('.animated-logo');
    await expect(animatedGroup).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that main elements are still visible
    await expect(page.locator('.company-name')).toBeVisible();
    await expect(page.locator('.tagline')).toBeVisible();
    await expect(page.locator('.coming-soon')).toBeVisible();
    
    // Check that logo is visible
    await expect(page.locator('.logo')).toBeVisible();
  });

  test('should have proper color scheme', async ({ page }) => {
    // Check that the page has the correct background color
    const body = page.locator('body');
    await expect(body).toHaveCSS('background-color', 'rgb(1, 50, 29)'); // #01321d
    
    // Check that company name has the correct color
    const companyName = page.locator('.company-name');
    await expect(companyName).toHaveCSS('color', 'rgb(53, 200, 92)'); // #35c85c
  });

  test('should have smooth animations', async ({ page }) => {
    const logo = page.locator('.logo');
    await expect(logo).toBeVisible();
    
    // Wait a bit to see if animation is working
    await page.waitForTimeout(2000);
    
    // The logo should still be visible after animation
    await expect(logo).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
    // Check viewport meta tag
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', 'width=device-width, initial-scale=1.0');
    
    // Check charset
    const charset = page.locator('meta[charset]');
    await expect(charset).toHaveAttribute('charset', 'UTF-8');
  });

  test('should load external resources', async ({ page }) => {
    // Check that Google Fonts are loaded
    const response = await page.request.get('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
    expect(response.status()).toBe(200);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    // Check that h1, h2, h3 are in correct order
    const h1 = page.locator('h1');
    const h2 = page.locator('h2');
    const h3 = page.locator('h3');
    
    await expect(h1).toBeVisible();
    await expect(h2).toBeVisible();
    await expect(h3).toBeVisible();
    
    // Check that h1 comes before h2, h2 before h3
    const h1Position = await h1.boundingBox();
    const h2Position = await h2.boundingBox();
    const h3Position = await h3.boundingBox();
    
    expect(h1Position.y).toBeLessThan(h2Position.y);
    expect(h2Position.y).toBeLessThan(h3Position.y);
  });

  test('should have accessible contact information', async ({ page }) => {
    const contactInfo = page.locator('.contact-info');
    await expect(contactInfo).toBeVisible();
    
    // Check that contact info contains both email and phone
    await expect(contactInfo).toContainText('info@agave-nv.com');
    await expect(contactInfo).toContainText('+44(0) 7751 494649');
  });
});
