import { readFileSync } from "fs";
import { resolve } from "path";
import { LaunchOptions } from "puppeteer";
import { create } from "ts-node";

export type Configuration = {
  cucumber: {
    features: string[];
    stepDefinitions: string[];
  };
  puppeteer: {
    launch: LaunchOptions;
  };
};

export function readConfig(configPath: string): Configuration {
  const fullConfigPath = resolve(process.cwd(), configPath);
  const jsConfig = create({
    project: resolve(process.cwd(), "tsconfig.json"),
  }).compile(readFileSync(fullConfigPath, "utf8"), fullConfigPath);

  return eval(jsConfig);
}
