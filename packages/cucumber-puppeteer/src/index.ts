import { resolve } from "path";
import { Browser, launch, Page } from "puppeteer";

const context: { browser?: Browser; page?: Page } = {};

const config = require(resolve(
  process.cwd(),
  process.env.CUCUMBER_PUPPETEER_CONFIG_PATH as string
));

export async function start() {
  context.browser = await launch(config.puppeteer.launch);
  const pages = await context.browser.pages();
  context.page = pages[0];
}

export async function stop() {
  const pages = (await context.browser?.pages()) ?? [];
  await Promise.all(pages.map((page) => page.close()));
  await context.browser?.close();
}

export const page = new Proxy(
  {},
  {
    get: function (_target, name) {
      return (context.page as any)[name];
    },
  }
) as Page;

export const browser = new Proxy(
  {},
  {
    get: function (_target, name) {
      return (context.browser as any)[name];
    },
  }
) as Browser;

export * from "@cucumber/cucumber";
