import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Copies the built RTI bundle to the layout the Vite examples expect:
//   <root>/build/playcanvas.rti.mjs -> <root>/build/ENGINE_PATH/index.js
// so `ENGINE_PATH=../build/ENGINE_PATH/index.js <examples command>` just works.
// Cwd-independent: anchored on this file's location.

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'build', 'playcanvas.rti.mjs');
const dest = path.join(root, 'build', 'ENGINE_PATH', 'index.js');

if (!fs.existsSync(src)) {
    console.error(`RTI bundle missing: ${src}\nRun 'npm run build --prefix rti' from the repo root first.`);
    process.exit(1);
}

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
console.log(`staged ${path.relative(root, dest)}`);
