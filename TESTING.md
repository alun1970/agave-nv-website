# Testing Guide for Agave NV Website

This document outlines the comprehensive testing framework for the Agave New Ventures coming soon website.

## 🧪 Testing Framework Overview

Our testing framework includes multiple layers of quality assurance:

- **Unit Tests** - Test individual components and functions
- **End-to-End Tests** - Test user interactions and workflows
- **Accessibility Tests** - Ensure WCAG compliance
- **Performance Tests** - Check loading speed and efficiency
- **Visual Regression Tests** - Catch unintended visual changes
- **Linting & Formatting** - Maintain code quality and consistency

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm run test:all
```

### Run Specific Test Suites
```bash
# Unit tests only
npm run test

# End-to-end tests only
npm run test:e2e

# Accessibility tests only
npm run accessibility

# Performance tests only
npm run lighthouse

# Code quality checks
npm run lint
npm run format:check
```

## 📋 Test Categories

### 1. Unit Tests (`tests/website.test.js`)
Tests individual components and functionality:
- HTML structure validation
- Content verification
- Logo and branding checks
- CSS and styling validation
- Responsive design elements
- Accessibility basics

### 2. End-to-End Tests (`tests/e2e/website.spec.js`)
Tests complete user workflows:
- Page loading and navigation
- Element visibility and interactions
- Responsive behavior across devices
- Color scheme validation
- Animation functionality
- External resource loading

### 3. Accessibility Tests (`tests/accessibility.test.js`)
Ensures WCAG 2.1 AA compliance:
- Heading hierarchy
- Image alt text
- Link descriptions
- Keyboard navigation
- Color contrast
- Semantic HTML structure

### 4. Performance Tests (`tests/performance.test.js`)
Validates performance metrics:
- Page size optimization
- Resource efficiency
- Mobile performance
- SEO optimization
- Loading performance

## 🔧 Configuration Files

### Jest Configuration (`package.json`)
```json
{
  "jest": {
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": ["<rootDir>/tests/setup.js"],
    "testMatch": ["**/tests/**/*.test.js"],
    "collectCoverageFrom": [
      "**/*.js",
      "**/*.html",
      "!**/node_modules/**",
      "!**/tests/**"
    ]
  }
}
```

### Playwright Configuration (`playwright.config.js`)
- Tests across multiple browsers (Chrome, Firefox, Safari)
- Mobile device testing
- Screenshot capture on failures
- Trace collection for debugging

### ESLint Configuration (`.eslintrc.js`)
- Code quality rules
- Prettier integration
- Custom rules for HTML files

## 🎯 Test Coverage

Our tests cover:

### ✅ Functionality
- [x] Page loads correctly
- [x] All elements are visible
- [x] Links work properly
- [x] Animations function
- [x] Responsive design works

### ✅ Content
- [x] Company name displays
- [x] Tagline is correct
- [x] Contact information is accurate
- [x] Logo renders properly
- [x] Color scheme is correct

### ✅ Accessibility
- [x] Proper heading structure
- [x] Alt text for images
- [x] Keyboard navigation
- [x] Screen reader compatibility
- [x] Color contrast compliance

### ✅ Performance
- [x] Fast loading times
- [x] Optimized resources
- [x] Mobile performance
- [x] SEO optimization

## 🚦 CI/CD Integration

Tests run automatically on:
- **Push to main branch** - Full test suite + deployment
- **Pull requests** - Full test suite (no deployment)
- **Scheduled runs** - Performance and accessibility audits

### GitHub Actions Workflow
1. **QA Tests** - Linting, formatting, unit tests
2. **E2E Tests** - Cross-browser testing
3. **Accessibility Tests** - WCAG compliance
4. **Deployment** - Only if all tests pass

## 📊 Test Reports

### Coverage Reports
- Generated in `coverage/` directory
- HTML report available at `coverage/lcov-report/index.html`
- Uploaded to Codecov for tracking

### E2E Test Reports
- Playwright HTML report
- Screenshots on failure
- Video recordings for debugging

### Performance Reports
- Lighthouse audit results
- Performance metrics tracking
- Accessibility scores

## 🐛 Debugging Tests

### Unit Test Debugging
```bash
# Run with verbose output
npm run test -- --verbose

# Run specific test file
npm run test -- tests/website.test.js

# Run with watch mode
npm run test:watch
```

### E2E Test Debugging
```bash
# Run with UI mode
npm run test:e2e:ui

# Run specific test
npx playwright test tests/e2e/website.spec.js

# Debug mode
npx playwright test --debug
```

### Accessibility Debugging
```bash
# Run accessibility tests locally
npm run accessibility

# Check specific page
axe-cli http://localhost:3000 --tags wcag2a,wcag2aa
```

## 📈 Continuous Improvement

### Adding New Tests
1. Create test file in appropriate directory
2. Follow naming convention: `*.test.js` or `*.spec.js`
3. Add to appropriate npm script
4. Update CI/CD workflow if needed

### Test Maintenance
- Review and update tests monthly
- Add tests for new features
- Remove obsolete tests
- Update test data as needed

## 🎯 Quality Gates

Deployment is blocked if:
- ❌ Any unit test fails
- ❌ Any E2E test fails
- ❌ Accessibility score < 90%
- ❌ Performance score < 80%
- ❌ Linting errors exist
- ❌ Code coverage < 80%

## 📞 Support

For testing questions or issues:
- Check this documentation
- Review test output logs
- Contact: info@agave-nv.com

---

**Last Updated:** October 2024  
**Test Framework Version:** Jest 29.7.0, Playwright 1.40.0
