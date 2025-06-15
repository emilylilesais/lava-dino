import path from "node:path";
import { cp, mkdir, unlink, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { watch } from "chokidar";

const rootDirPath = fileURLToPath(new URL("..", import.meta.url));
const vaultDirPath = path.resolve(rootDirPath, "..", "vault");

const sourceAssetsDirPath = path.resolve(vaultDirPath, "assets");
const targetAssetsDirPath = path.resolve(rootDirPath, "static", "assets");

void main();

async function main() {
  // Ensure the Obsidian vault assets matches the Docusaurus assets:
  await rm(targetAssetsDirPath, { recursive: true, force: true });
  await cp(sourceAssetsDirPath, targetAssetsDirPath, { recursive: true });

  const watcher = watch(sourceAssetsDirPath, {
    ignoreInitial: true,
  }).on("all", handleAssetChange);
}

async function handleAssetChange(event, filePath) {
  // await cp(sourceAssetsDirPath, targetAssetsDirPath, { recursive: true, force: true, errorOnExist: false });
  const relativeSourceFilePath = path.relative(sourceAssetsDirPath, filePath);
  const targetFilePath = path.resolve(targetAssetsDirPath, relativeSourceFilePath);

  switch (event) {
    case "unlink":
      await unlink(targetFilePath);
      break;

    case "add":
      // Ensure a subdirectory exists before attempting copy:
      await mkdir(path.dirname(targetFilePath), { recursive: true, errorOnExist: false });
      await cp(filePath, targetFilePath);
      break;

    case "change":
      await cp(filePath, targetFilePath, { force: true, errorOnExist: false });
      break;
  }

  console.log(event, filePath, targetFilePath);
}
