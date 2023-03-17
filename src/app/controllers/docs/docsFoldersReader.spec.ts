import fs from "fs";

import { doscFoldersReader, doscFoldersNamesReader } from "./docsFoldersReader";

test("foldersNamesReader", () => {
  const allDocs = doscFoldersNamesReader("docs");

  console.log(allDocs);

  expect(Array.isArray(allDocs)).toBe(true);
});

test("foldersReader", () => {
  const allDocs = doscFoldersReader("docs");
  expect(Array.isArray(allDocs)).toBe(true);
});

export {};
