module.exports = {
  cucumber: {
    features: ["features/**/*.feature"],
    stepDefinitions: ["step-definitions/**/*.ts"],
  },
  puppeteer: {
    launch: {
      headless: false,
      args: ["--disable-gpu", "--no-sandbox"],
    },
  },
};
