import { glob } from 'glob';
import path from 'path';
import type { COLLECTION } from "./constants";

export async function extractAdocFilenamesFromCollection(collection: COLLECTION) {
  const adocFilePaths = await glob(`src/content/${collection}/*.adoc`);

  return adocFilePaths.map((adocFilePath) => path.basename(adocFilePath, '.adoc'));
}
