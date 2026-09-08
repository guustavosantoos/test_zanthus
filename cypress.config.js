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
      runMode: 1,      // retry 1x no modo CI/headless
      openMode: 0,     // sem retry no modo interativo
    },
    setupNodeEvents(on, config) {
      // Registra evento para capturar screenshots em falhas
      on('after:screenshot', (details) => {
        console.log(`[Screenshot] Capturada: ${details.path}`);
      });
    },
  },
  env: {
    // Credenciais padrão do SauceDemo
    username: 'standard_user',
    password: 'secret_sauce',
    // Produto alvo dos testes
    targetProduct: 'Sauce Labs Backpack',
    targetProductId: 'sauce-labs-backpack',
  },
});
