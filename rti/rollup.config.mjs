import { buildTargetRTI } from './rollup-build-target-rti.mjs';

// Isolated RTI build sandbox (from PR #5817, Rollup era).
// MUST run from the repo root so the default input/output paths below resolve:
//   npm run build --prefix rti
// which produces build/playcanvas.rti.mjs (es) and build/playcanvas.rti.js (umd),
// exactly like `target=rti` did before the esbuild migration.
//
// Only the .mjs bundle is needed for the Vite examples:
//   cd examples && ENGINE_PATH=../build/playcanvas.rti.mjs npm run dev

const onlyEs = process.env.RTI_FORMAT === 'es';

export default onlyEs ? [buildTargetRTI('es')] : [buildTargetRTI('es'), buildTargetRTI('umd')];
