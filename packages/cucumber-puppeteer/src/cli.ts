#!/usr/bin/env node
import { Cli } from "@cucumber/cucumber";
import { resolve } from "path";

const config = require.resolve("./config");
const features = resolve(process.cwd(), "features/**/*.feature");
const stepDefinitions = resolve(process.cwd(), "step-definitions/**/*.ts");
const cli = new Cli({
  argv: [
    "node",
    `${require.resolve("@cucumber/cucumber")}/bin/cucumber-js`,
    features,
    "--require",
    config,
    "--require",
    stepDefinitions,
    "--publish-quiet",
  ],
  cwd: process.cwd(),
  stdout: process.stdout,
});

cli.run().catch((err) => console.error(err));
