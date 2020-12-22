import { Given, page, Then } from "cucumber-puppeteer";
import expect from "expect";

Given("I open DuckDuckGo search page", async () => {
  await page.goto("https://duckduckgo.com/");
});

Then("the title is {string}", async (title: string) => {
  expect(await page.title()).toEqual(title);
});

Then("the DuckDuckGo search form exists", async () => {
  const searchForm = await page.$("#search_form_homepage");
  expect(searchForm?.boundingBox()).toBeDefined();
});
