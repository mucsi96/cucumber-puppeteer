#!/usr/bin/env node
import { Cli } from "@cucumber/cucumber";
import minimist from "minimist";
import { resolve } from "path";
import { readConfig } from "./config";

const { config, update, u } = minimist(process.argv.slice(2));

if (!config) {
  console.error("Missing configuration");
  console.log("Usage: cucumber-puppeteer --config cucumber-puppeteer.conf.js");
}

if (update || u) {
  process.env.SNAPSHOT_UPDATE = "true";
}

process.env.CUCUMBER_PUPPETEER_CONFIG_PATH = config;
const { cucumber } = readConfig(config);

const cli = new Cli({
  argv: [
    "node",
    `${require.resolve("@cucumber/cucumber")}/bin/cucumber-js`,
    ...cucumber.features,
    "--require",
    require.resolve("./cucumberConfig"),
    ...(cucumber.setupFiles || []).reduce(
      (acc, setupFile: string) => [...acc, "--require", setupFile],
      [] as string[]
    ),
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
