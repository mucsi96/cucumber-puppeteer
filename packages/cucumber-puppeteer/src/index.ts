import { resolve } from "path";
import { Browser, launch, Page } from "puppeteer";

let browser: Browser;
let browserPage: Page;

const config = require(resolve(
  process.cwd(),
  process.env.CUCUMBER_PUPPETEER_CONFIG_PATH as string
));

export async function start() {
  browser = await launch(config.puppeteer.launch);
  browserPage = (await browser.pages())[0];
}

export async function stop() {
  const pages = await browser.pages();
  await Promise.all(pages.map(page =>page.close());
  await browser.close();
}

export const page = new Proxy(
  {},
  {
    get: function (_target, name) {
      return (browserPage as any)[name];
    },
  }
) as Page;

export * from "@cucumber/cucumber";

