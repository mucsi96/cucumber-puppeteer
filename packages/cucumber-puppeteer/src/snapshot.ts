import { Config } from "@jest/types";
import expect from "expect";
import {
  buildSnapshotResolver,
  SnapshotState,
  toMatchSnapshot as jestMatchSnapshot,
} from "jest-snapshot";
import prettier from "prettier";
import { getTestContext } from "./cucumberConfig";

export function toMatchSnapshot(received: unknown, name: string) {
  const snapshotResolver = buildSnapshotResolver({
    rootDir: "test",
  } as Config.ProjectConfig);

  const { fileName, testName } = getTestContext();
  const snapshotFile = snapshotResolver.resolveSnapshotPath(fileName);

  const snapshotState = new SnapshotState(snapshotFile, {
    updateSnapshot: process.env.SNAPSHOT_UPDATE ? "all" : "new",
    getPrettier: () => prettier,
    getBabelTraverse: () => null as any,
  });

  const result = jestMatchSnapshot.call(
    {
      snapshotState,
      currentTestName: testName,
    } as any,
    received,
    name || ""
  );

  snapshotState.save();

  return result;
}

expect.extend({
  toMatchSnapshot,
});
