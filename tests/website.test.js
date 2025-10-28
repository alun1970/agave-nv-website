// Unit tests for Agave NV website
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Agave NV Website', () => {
  let dom;
  let document;

  beforeAll(() => {
    // Load the HTML file
    const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
    dom = new JSDOM(html, {
      url: 'http://localhost:3000',
      pretendToBeVisual: true,
      resources: 'usable'
    });
    document = dom.window.document;
  });

  describe('HTML Structure', () => {
    test('should have correct title', () => {
      const title = document.querySelector('title');
      expect(title.textContent).toBe('Agave New Ventures - Coming Soon');
    });

    test('should have company name', () => {
      const companyName = document.querySelector('.company-name');
      expect(companyName.textContent).toBe('AGAVE NEW VENTURES');
    });

    test('should have tagline', () => {
      const tagline = document.querySelector('.tagline');
      expect(tagline.textContent).toBe('AI ENGINEERING FOR BUSINESS');
    });

    test('should have coming soon message', () => {
      const comingSoon = document.querySelector('.coming-soon');
      expect(comingSoon.textContent).toBe('Coming Soon');
    });

    test('should have contact email', () => {
      const emailLink = document.querySelector('a[href^="mailto:"]');
      expect(emailLink.href).toBe('mailto:info@agave-nv.com');
      expect(emailLink.textContent).toContain('info@agave-nv.com');
    });

    test('should have phone number', () => {
      const phoneLink = document.querySelector('a[href^="tel:"]');
      expect(phoneLink.href).toBe('tel:+447751494649');
      expect(phoneLink.textContent).toBe('+44(0) 7751 494649');
    });
  });

  describe('Logo and Branding', () => {
    test('should have logo SVG', () => {
      const logo = document.querySelector('.logo');
      expect(logo).toBeTruthy();
      expect(logo.tagName).toBe('svg');
    });

    test('should have animated logo group', () => {
      const animatedLogo = document.querySelector('.animated-logo');
      expect(animatedLogo).toBeTruthy();
    });

    test('should have correct viewBox for logo', () => {
      const logo = document.querySelector('.logo');
      expect(logo.getAttribute('viewBox')).toBe('0 0 465 465');
    });
  });

  describe('CSS and Styling', () => {
    test('should have stylesheet linked', () => {
      const stylesheet = document.querySelector('link[rel="stylesheet"]');
      expect(stylesheet).toBeTruthy();
      expect(stylesheet.href).toContain('styles.css');
    });

    test('should have Google Fonts linked', () => {
      const googleFonts = document.querySelector('link[href*="fonts.googleapis.com"]');
      expect(googleFonts).toBeTruthy();
    });
  });

  describe('Responsive Design', () => {
    test('should have viewport meta tag', () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      expect(viewport).toBeTruthy();
      expect(viewport.getAttribute('content')).toContain('width=device-width');
    });
  });

  describe('Accessibility', () => {
    test('should have proper heading hierarchy', () => {
      const h1 = document.querySelector('h1');
      const h2 = document.querySelector('h2');
      const h3 = document.querySelector('h3');
      
      expect(h1).toBeTruthy();
      expect(h2).toBeTruthy();
      expect(h3).toBeTruthy();
    });

    test('should have alt text for images (if any)', () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        expect(img.hasAttribute('alt')).toBe(true);
      });
    });

    test('should have proper link text', () => {
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        expect(link.textContent.trim().length).toBeGreaterThan(0);
      });
    });
  });

  describe('Content Quality', () => {
    test('should have meaningful content', () => {
      const body = document.querySelector('body');
      expect(body.textContent.trim().length).toBeGreaterThan(100);
    });

    test('should have proper description', () => {
      const description = document.querySelector('.description');
      expect(description.textContent).toContain('Revolutionary AI solutions');
    });

    test('should have contact information section', () => {
      const contactInfo = document.querySelector('.contact-info');
      expect(contactInfo).toBeTruthy();
    });
  });
});
