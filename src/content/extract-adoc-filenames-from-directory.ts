import { glob } from 'glob';
import path from 'path';

export async function extractAdocFilenamesFromDirectory(dirpath: string) {
  const adocFilePathsInDirectory = await glob(`src/content/${dirpath}/*.adoc`);

  return adocFilePathsInDirectory.map((adocFilePath) => path.basename(adocFilePath, '.adoc'));
}
