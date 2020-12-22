import { AfterAll, BeforeAll, setDefaultTimeout } from "@cucumber/cucumber";
import { start, stop } from "./step-definitions/page";

setDefaultTimeout(60000);

BeforeAll(async () => {
  await start();
});

AfterAll(async () => {
  await stop();
});
