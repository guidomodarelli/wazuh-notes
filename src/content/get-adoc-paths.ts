import { glob } from 'glob';
import path from 'path';

export async function getAdocPaths() {
  const adocRelativeFaqPaths = await glob('src/content/faqs/*.adoc');
  const adocFaqFileNames = adocRelativeFaqPaths.map((relativeFaqPath) =>
    path.basename(relativeFaqPath, '.adoc'),
  );
  return adocFaqFileNames;
}
