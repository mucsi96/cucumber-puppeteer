import { Given, Then } from "@cucumber/cucumber";
import expect from "expect";
import { page } from "./page";

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
