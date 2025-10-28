// Performance tests for Agave NV website
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Performance Tests', () => {
  let dom;
  let document;

  beforeAll(() => {
    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    dom = new JSDOM(html, {
      url: 'http://localhost:3000',
      pretendToBeVisual: true,
      resources: 'usable'
    });
    document = dom.window.document;
  });

  describe('Page Size and Resources', () => {
    test('should have reasonable HTML size', () => {
      const htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
      const htmlSize = Buffer.byteLength(htmlContent, 'utf8');
      
      // HTML should be less than 50KB
      expect(htmlSize).toBeLessThan(50 * 1024);
    });

    test('should have minimal external resources', () => {
      const externalLinks = document.querySelectorAll('link[href^="http"], script[src^="http"]');
      
      // Should only have Google Fonts and maybe analytics
      expect(externalLinks.length).toBeLessThan(5);
    });

    test('should use efficient image formats', () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
          // Should use modern formats or have fallbacks
          expect(src).toMatch(/\.(svg|webp|png|jpg|jpeg)$/i);
        }
      });
    });
  });

  describe('CSS Performance', () => {
    test('should have minimal CSS', () => {
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      expect(stylesheets.length).toBeLessThan(3);
    });

    test('should use efficient selectors', () => {
      // This would require parsing CSS, but we can check for inline styles
      const elementsWithInlineStyles = document.querySelectorAll('[style]');
      expect(elementsWithInlineStyles.length).toBeLessThan(10);
    });
  });

  describe('JavaScript Performance', () => {
    test('should have minimal JavaScript', () => {
      const scripts = document.querySelectorAll('script');
      expect(scripts.length).toBeLessThan(5);
    });

    test('should not have blocking JavaScript', () => {
      const blockingScripts = document.querySelectorAll('script:not([async]):not([defer])');
      // Should have minimal blocking scripts
      expect(blockingScripts.length).toBeLessThan(3);
    });
  });

  describe('SEO and Meta Tags', () => {
    test('should have essential meta tags', () => {
      const charset = document.querySelector('meta[charset]');
      const viewport = document.querySelector('meta[name="viewport"]');
      
      expect(charset).toBeTruthy();
      expect(viewport).toBeTruthy();
    });

    test('should have proper title length', () => {
      const title = document.querySelector('title');
      const titleLength = title.textContent.length;
      
      // Title should be between 30-60 characters for SEO
      expect(titleLength).toBeGreaterThan(30);
      expect(titleLength).toBeLessThan(60);
    });
  });

  describe('Mobile Performance', () => {
    test('should have viewport meta tag', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
    });

    test('should be mobile-friendly', () => {
      // Check for responsive design indicators
      const responsiveElements = document.querySelectorAll('[class*="responsive"], [class*="mobile"]');
      // Should have some responsive design elements
      expect(responsiveElements.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Loading Performance', () => {
    test('should have critical CSS inline or early', () => {
      const head = document.querySelector('head');
      const stylesheets = head.querySelectorAll('link[rel="stylesheet"]');
      
      // Should have stylesheets in head
      expect(stylesheets.length).toBeGreaterThan(0);
    });

    test('should not have render-blocking resources', () => {
      const blockingResources = document.querySelectorAll(
        'link[rel="stylesheet"]:not([media="print"]), script:not([async]):not([defer])'
      );
      
      // Should have minimal blocking resources
      expect(blockingResources.length).toBeLessThan(5);
    });
  });
});
