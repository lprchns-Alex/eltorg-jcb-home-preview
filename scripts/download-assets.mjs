import { mkdir, writeFile } from 'node:fs/promises';
const root = new URL('../assets/', import.meta.url);
await mkdir(root, { recursive: true });
const assets = {
  'starter.jpg': 'populyarnye-tovary/017.jpg',
  'alternator.jpg': 'populyarnye-tovary/009.jpg',
  'valve.jpg': 'populyarnye-tovary/016.jpg',
  'tensioner.jpg': 'populyarnye-tovary/007.jpg',
  'bucket.jpg': 'populyarnye-tovary/010.jpg',
  'gear.jpg': 'populyarnye-tovary/022.jpg',
  'switch.jpg': 'populyarnye-tovary/001-2.jpg',
  'belt.jpg': 'populyarnye-tovary/014.jpg',
  'warehouse.jpg': 'photo/001.jpg',
  'warehouse-2.jpg': 'photo/002.jpg',
};
for (const [name, path] of Object.entries(assets)) {
  const response = await fetch(`https://spb.zapchasti-jcb.ru/content/img/${path}`);
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  await writeFile(new URL(name, root), Buffer.from(await response.arrayBuffer()));
  console.log(`Downloaded ${name}`);
}
const css = await (await fetch('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;650;700;750;800&display=swap', { headers: { 'User-Agent': 'Mozilla/5.0' } })).text();
let localCss = css;
const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map(match => match[1]))];
for (const [index, url] of urls.entries()) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Font: ${response.status}`);
  const name = `manrope-${index}.woff2`;
  await writeFile(new URL(name, root), Buffer.from(await response.arrayBuffer()));
  localCss = localCss.replaceAll(url, name);
}
await writeFile(new URL('fonts.css', root), localCss);
console.log('Local fonts ready');
