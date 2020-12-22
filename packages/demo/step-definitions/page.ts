import { Browser, launch, Page } from "puppeteer";

let browser: Browser;
let browserPage: Page;

export async function start() {
  browser = await launch({
    headless: false,
    args: ["--disable-gpu", "--no-sandbox"],
  });
  browserPage = (await browser.pages())[0];
}

export async function stop() {
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
