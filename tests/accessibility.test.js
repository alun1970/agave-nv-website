// Accessibility tests for Agave NV website
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Accessibility Tests', () => {
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

  describe('Heading Structure', () => {
    test('should have proper heading hierarchy', () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));
      
      // Should have h1, h2, h3 in that order
      expect(headingLevels).toContain(1);
      expect(headingLevels).toContain(2);
      expect(headingLevels).toContain(3);
      
      // Check that h1 comes before h2, h2 before h3
      const h1Index = headingLevels.indexOf(1);
      const h2Index = headingLevels.indexOf(2);
      const h3Index = headingLevels.indexOf(3);
      
      expect(h1Index).toBeLessThan(h2Index);
      expect(h2Index).toBeLessThan(h3Index);
    });

    test('should have only one h1', () => {
      const h1Elements = document.querySelectorAll('h1');
      expect(h1Elements.length).toBe(1);
    });
  });

  describe('Images and Media', () => {
    test('should have alt text for all images', () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        expect(img.hasAttribute('alt')).toBe(true);
        expect(img.getAttribute('alt').trim().length).toBeGreaterThan(0);
      });
    });

    test('should have descriptive alt text', () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const altText = img.getAttribute('alt');
        expect(altText).not.toMatch(/^(image|picture|photo|img)$/i);
      });
    });
  });

  describe('Links and Navigation', () => {
    test('should have descriptive link text', () => {
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        const linkText = link.textContent.trim();
        expect(linkText.length).toBeGreaterThan(0);
        expect(linkText).not.toMatch(/^(click here|read more|link)$/i);
      });
    });

    test('should have proper link attributes', () => {
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        if (link.hasAttribute('href')) {
          const href = link.getAttribute('href');
          expect(href).toBeTruthy();
          expect(href.trim().length).toBeGreaterThan(0);
        }
      });
    });
  });

  describe('Form Elements', () => {
    test('should have proper form labels', () => {
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        if (input.type !== 'hidden') {
          const id = input.getAttribute('id');
          if (id) {
            const label = document.querySelector(`label[for="${id}"]`);
            expect(label).toBeTruthy();
          }
        }
      });
    });
  });

  describe('Color and Contrast', () => {
    test('should not rely solely on color for information', () => {
      // Check that important information is not conveyed only through color
      const colorOnlyElements = document.querySelectorAll('[style*="color"]');
      colorOnlyElements.forEach(element => {
        const text = element.textContent.trim();
        if (text.length > 0) {
          // Should have other visual indicators besides color
          const hasBold = element.style.fontWeight === 'bold' || 
                         element.tagName === 'B' || 
                         element.tagName === 'STRONG';
          const hasUnderline = element.style.textDecoration?.includes('underline');
          const hasBackground = element.style.backgroundColor;
          
          // At least one other visual indicator should be present
          expect(hasBold || hasUnderline || hasBackground).toBe(true);
        }
      });
    });
  });

  describe('Keyboard Navigation', () => {
    test('should have focusable elements', () => {
      const focusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      expect(focusableElements.length).toBeGreaterThan(0);
    });

    test('should have proper tab order', () => {
      const focusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      
      const tabIndexes = Array.from(focusableElements).map(el => {
        const tabIndex = el.getAttribute('tabindex');
        return tabIndex ? parseInt(tabIndex) : 0;
      });
      
      // Should not have duplicate tabindex values (except 0)
      const nonZeroIndexes = tabIndexes.filter(index => index > 0);
      const uniqueNonZeroIndexes = [...new Set(nonZeroIndexes)];
      expect(nonZeroIndexes.length).toBe(uniqueNonZeroIndexes.length);
    });
  });

  describe('Semantic HTML', () => {
    test('should use semantic HTML elements', () => {
      const semanticElements = document.querySelectorAll(
        'header, nav, main, section, article, aside, footer, h1, h2, h3, h4, h5, h6'
      );
      expect(semanticElements.length).toBeGreaterThan(0);
    });

    test('should have proper document structure', () => {
      const html = document.querySelector('html');
      const head = document.querySelector('head');
      const body = document.querySelector('body');
      
      expect(html).toBeTruthy();
      expect(head).toBeTruthy();
      expect(body).toBeTruthy();
    });
  });

  describe('Language and Content', () => {
    test('should have language attribute', () => {
      const html = document.querySelector('html');
      expect(html.hasAttribute('lang')).toBe(true);
      expect(html.getAttribute('lang')).toBe('en');
    });

    test('should have meaningful content', () => {
      const body = document.querySelector('body');
      const textContent = body.textContent.trim();
      expect(textContent.length).toBeGreaterThan(100);
    });
  });
});
