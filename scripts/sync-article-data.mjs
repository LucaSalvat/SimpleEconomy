import { readFile, writeFile } from 'node:fs/promises';

async function readJson(path) {
  const contents = await readFile(path, 'utf8');
  return JSON.parse(contents);
}

async function main() {
  const index = await readJson('data/articles/index.json');
  const categories = await readJson('data/categories.json');

  const entries = index.articles || [];
  const articles = await Promise.all(
    entries.map(async (entry) => {
      const fileName = entry.file || `${entry.id}.json`;
      return readJson(`data/articles/${fileName}`);
    }),
  );

  const output = {
    articles,
    categories: categories.categories || [],
  };

  await writeFile('data/articles.json', `${JSON.stringify(output, null, 2)}\n`);
  console.log(`Synced data/articles.json with ${articles.length} article records.`);
}

main().catch((error) => {
  console.error('Failed to sync article metadata:', error);
  process.exit(1);
});
