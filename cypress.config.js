const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    setupNodeEvents(on) {
      on('after:screenshot', (details) => {
        console.log(`Screenshot: ${details.path}`);
      });
    },
  },
  env: {
    username: 'standard_user',
    password: 'secret_sauce',
    targetProduct: 'Sauce Labs Backpack',
    targetProductId: 'sauce-labs-backpack',
  },
});
