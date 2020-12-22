#!/usr/bin/env node
import { Cli } from "@cucumber/cucumber";
import { resolve } from "path";
import { readConfig } from "./config";

const [, , option, configPath] = process.argv;

if (option !== "--config" || !configPath) {
  console.error("Missing configuration");
  console.log("Usage: cucumber-puppeteer --config cucumber-puppeteer.conf.js");
}

process.env.CUCUMBER_PUPPETEER_CONFIG_PATH = configPath;
const { cucumber } = readConfig(configPath);

const cli = new Cli({
  argv: [
    "node",
    `${require.resolve("@cucumber/cucumber")}/bin/cucumber-js`,
    ...cucumber.features,
    "--require",
    require.resolve("./cucumberConfig"),
    ...cucumber.stepDefinitions.reduce(
      (acc, stepDefinition: string) => [...acc, "--require", stepDefinition],
      [] as string[]
    ),
    "--publish-quiet",
    "--format",
    "progress",
    "--format",
    `html:${resolve(cucumber.reports, "cucumber_report.html")}`,
  ],
  cwd: process.cwd(),
  stdout: process.stdout,
});

cli.run().catch((err) => console.error(err));
