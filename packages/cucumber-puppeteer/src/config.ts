import { AfterAll, BeforeAll, setDefaultTimeout } from "@cucumber/cucumber";
import { register } from "ts-node";
import { start, stop } from ".";

register();

setDefaultTimeout(60000);

BeforeAll(async () => {
  await start();
});

AfterAll(async () => {
  await stop();
});
