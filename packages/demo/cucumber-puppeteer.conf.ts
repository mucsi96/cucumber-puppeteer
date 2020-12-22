import { Configuration } from "cucumber-puppeteer";

export default {
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
} as Configuration;
