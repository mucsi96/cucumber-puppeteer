import { Configuration } from "cucumber-puppeteer";

export default {
  cucumber: {
    features: ["features/**/*.feature"],
    stepDefinitions: ["step-definitions/**/*.ts"],
    screenshots: "screenshots",
    reports: "reports",
  },
  puppeteer: {
    launch: {
      headless: false,
      args: ["--disable-gpu", "--no-sandbox"],
    },
  },
} as Configuration;
