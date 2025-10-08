// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Arahkan ke folder yang baru dibuat
  fullyParallel: true,
  reporter: [
  ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    // Menetapkan Base URL agar di skrip nanti kita cukup panggil '/gabung'
    baseURL: 'https://www.cermati.com',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'desktop chrome',
      use: { ...devices['desktop chrome'] },
    },
  ],
});