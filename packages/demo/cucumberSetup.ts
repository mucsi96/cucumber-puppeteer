import { After } from "cucumber-puppeteer";

After(() => {
  console.log("After");
});
