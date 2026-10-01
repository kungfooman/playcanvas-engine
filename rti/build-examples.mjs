import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Production examples build against the staged RTI bundle.
// Cwd-independent: anchored on this file's location.
// Equivalent of the old `examples` `build:rti` script, now owned here:
//   stage (build + copy playcanvas.rti.mjs) then `npm run build` in examples/
//   with ENGINE_PATH pointing at the staged bundle.

const rtiDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(rtiDir, '..');
const examplesDir = path.join(root, 'examples');

const result = spawnSync('npm', ['run', 'build'], {
    cwd: examplesDir,
    env: {
        ...process.env,
        ENGINE_PATH: '../build/ENGINE_PATH/index.js'
    },
    stdio: 'inherit',
    shell: process.platform === 'win32'
});

process.exit(result.status ?? 1);
