import { glob } from 'glob';
import path from 'path';

export async function getAdocPaths(dirpath: string) {
  const adocRelativeFaqPaths = await glob(`src/content/${dirpath}/*.adoc`);
  const adocFaqFileNames = adocRelativeFaqPaths.map((relativeFaqPath) =>
    path.basename(relativeFaqPath, '.adoc'),
  );
  return adocFaqFileNames;
}
