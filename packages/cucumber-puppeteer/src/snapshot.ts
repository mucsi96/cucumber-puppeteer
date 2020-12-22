import expect from "expect";
import {
  buildSnapshotResolver,
  SnapshotState,
  toMatchSnapshot as jestMatchSnapshot,
} from "jest-snapshot";
import { SnapshotStateOptions } from "jest-snapshot/build/State";
import { resolve } from "path";

export function toMatchSnapshot(received: unknown, name: string) {
  const snapshotResolver = buildSnapshotResolver({
    rootDir: "features",
  } as any);

  const snapshotFile = snapshotResolver.resolveSnapshotPath(
    resolve(process.cwd(), "features/duckduckgo-search.feature")
  );

  const snapshotState = new SnapshotState(snapshotFile, {
    updateSnapshot: process.env.SNAPSHOT_UPDATE ? "all" : "new",
  } as SnapshotStateOptions);

  const matcher = jestMatchSnapshot.bind({
    snapshotState,
    currentTestName: "Searching DuckDuckGo",
  } as any);

  const result = matcher(received, name || "");

  snapshotState.save();

  return result;
}

expect.extend({
  toMatchSnapshot,
});
