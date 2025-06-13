import { resolve } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const rootDirPath = fileURLToPath(new URL("..", import.meta.url));

void patchLocalSearchPlugin();

/**
 * Patches the `cheerio` import in the `@cmfcmf/docusaurus-search-local` plugin
 * to fix broken build.
 * See https://github.com/cmfcmf/docusaurus-search-local/issues/234#issuecomment-2566379469.
 * @returns {Promise<void>}
 */
async function patchLocalSearchPlugin() {
  console.log("Patching local search plugin");

  const parseFilePath = resolve(
    rootDirPath,
    "node_modules",
    "@cmfcmf",
    "docusaurus-search-local",
    "lib",
    "server",
    "parse.js",
  );
  const contents = await readFile(parseFilePath, "utf8");

  const patchedContents = contents
    .replaceAll(
      `const cheerio_1 = tslib_1.__importDefault(require("cheerio"));`,
      `const cheerio = require("cheerio");`,
    )
    .replaceAll(`cheerio_1.default.load(html);`, `cheerio.load(html)`);
  await writeFile(parseFilePath, patchedContents);

  console.log("Patch complete");
}
