#!/usr/bin/env node
import { Cli } from "@cucumber/cucumber";
import { resolve } from "path";

const [, , option, configPath] = process.argv;

if (option !== "--config" || !configPath) {
  console.error("Missing configuration");
  console.log("Usage: cucumber-puppeteer --config cucumber-puppeteer.conf.js");
}

process.env.CUCUMBER_PUPPETEER_CONFIG_PATH = configPath;
const { cucumber } = require(resolve(process.cwd(), configPath));
const cli = new Cli({
  argv: [
    "node",
    `${require.resolve("@cucumber/cucumber")}/bin/cucumber-js`,
    ...cucumber.features,
    "--require",
    require.resolve("./cucumberConfig"),
    ...cucumber.stepDefinitions.flatMap((stepDefinition: string) => [
      "--require",
      stepDefinition,
    ]),
    "--publish-quiet",
  ],
  cwd: process.cwd(),
  stdout: process.stdout,
});

cli.run().catch((err) => console.error(err));
