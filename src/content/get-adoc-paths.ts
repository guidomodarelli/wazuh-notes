import { glob } from 'glob';
import path from 'path';

export async function extractAdocFilenamesFromDirectory(dirpath: string) {
  const adocRelativeFaqPaths = await glob(`src/content/${dirpath}/*.adoc`);

  return adocRelativeFaqPaths.map((relativeFaqPath) => path.basename(relativeFaqPath, '.adoc'));
}
