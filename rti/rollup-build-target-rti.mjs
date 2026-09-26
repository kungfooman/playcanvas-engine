import resolve from '@rollup/plugin-node-resolve';
import path from 'node:path';
import { engineLayerImportValidation } from './plugins/rollup-import-validation.mjs';
import { getBanner } from '../utils/rollup-get-banner.mjs';
import { runtimeTypeInspector } from '@runtime-type-inspector/plugin-rollup';

/** @typedef {import('rollup').RollupOptions} RollupOptions */
/** @typedef {import('rollup').OutputOptions} OutputOptions */
/** @typedef {import('rollup').ModuleFormat} ModuleFormat */
/** @typedef {import('@rollup/plugin-babel').RollupBabelInputPluginOptions} RollupBabelInputPluginOptions */
/** @typedef {import('@rollup/plugin-strip').RollupStripOptions} RollupStripOptions */

/**
 * Configure a Runtime Type Inspector target that rollup is supposed to build.
 *
 * @param {'umd'|'es'} moduleFormat - The module format (subset of ModuleFormat).
 * @param {string} input - The input file.
 * @param {string} buildDir - The build dir.
 * @returns {RollupOptions} Configuration for Runtime Type Inspector rollup target.
 */
function buildTargetRTI(moduleFormat, input = 'src/index.rti.js', buildDir = 'build') {
    const banner = getBanner(' (RUNTIME-TYPE-INSPECTOR)');

    const outputExtension = {
        umd: '.js',
        es: '.mjs'
    };

    const file = `${buildDir}/playcanvas.rti${outputExtension[moduleFormat]}`;

    /** @type {OutputOptions} */
    const outputOptions = {
        banner,
        format: moduleFormat,
        indent: '\t',
        name: 'pc',
        file
    };

    return {
        input,
        output: outputOptions,
        plugins: [
            engineLayerImportValidation(input, true),
            // NOTE (rti/ sandbox): entry file lives in ../src but RTI deps live in
            // rti/node_modules, so let the resolver look there too. Run rollup from repo root.
            resolve({ modulePaths: [path.resolve('rti/node_modules')] }),
            runtimeTypeInspector({
                ignoredFiles: [
                    'node_modules',
                    'framework/parsers/draco-worker.js', // runs in Worker context without RTI
                    'scene/gsplat/gsplat-sorter.js'
                ],
                inspectIndexedAccess: false
            })
        ]
    };
}
export { buildTargetRTI };
