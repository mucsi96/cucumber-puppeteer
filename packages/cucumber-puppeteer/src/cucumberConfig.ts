import {
  AfterAll,
  AfterStep,
  BeforeAll,
  BeforeStep,
  IWorldOptions,
  setDefaultTimeout,
  Status,
} from "@cucumber/cucumber";
import { messages } from "@cucumber/messages";
import { readFileSync } from "fs";
import { resolve } from "path";
import { register } from "ts-node";
import { page, start, stop } from ".";
import { readConfig } from "./config";

register();

let currentPickle: messages.IPickle;

const config = readConfig(process.env.CUCUMBER_PUPPETEER_CONFIG_PATH as string);

setDefaultTimeout(60000);

function getScreenshotName() {
  const date = new Date();
  const datestamp = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .replace(/[:\-Z]/g, "")
    .replace(/[T.]/g, "-");
  return resolve(config.cucumber.screenshots, `${datestamp}.png`);
}

BeforeAll(async () => {
  await start();
});

AfterAll(async () => {
  await stop();
});

BeforeStep(({ pickle }) => {
  currentPickle = pickle;
});

AfterStep(async function (this: IWorldOptions, { result }) {
  if (result.status === Status.FAILED) {
    const path = getScreenshotName();
    await page.screenshot({
      path,
    });
    await this.attach(readFileSync(path), "image/png");
  }
});

export function getTestContext(): {
  fileName: string;
  testName: string;
} {
  return {
    fileName: currentPickle.uri!,
    testName: currentPickle.name!,
  };
}
