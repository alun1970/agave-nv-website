// Jest setup file for testing
import { JSDOM } from 'jsdom';

// Create a mock DOM environment
const dom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Test</title>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>
`, {
  url: 'http://localhost:3000',
  pretendToBeVisual: true,
  resources: 'usable'
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
