const { defineConfig } = require('@playwright/test');
const dotenv = require('dotenv');
const path = require('path');

// Read from .env file based on TEST_ENV or default to .env
// Example: TEST_ENV=staging npx playwright test
const testEnv = process.env.TEST_ENV || 'test';
if (testEnv === 'staging') {
  dotenv.config({ path: path.resolve(__dirname, '.env.staging') });
} else if (testEnv === 'production') {
  dotenv.config({ path: path.resolve(__dirname, '.env.production') });
} else {
  // Default for local development/testing
  dotenv.config({ path: path.resolve(__dirname, '.env.test') });
}

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Only start webServer if we are testing locally (not staging/prod remote urls)
// Assuming staging/prod urls are external and running
const isLocal = BASE_URL.includes('localhost') || BASE_URL.includes('127.0.0.1');

module.exports = defineConfig({
  testDir: './e2e/tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  // Conditionally configure webServer
  webServer: isLocal ? {
    command: 'npm start',
    port: PORT,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  } : undefined,
});
