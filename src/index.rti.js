export * from './index.js';
import { Vec2 } from './core/math/vec2.js';
import { Vec3 } from './core/math/vec3.js';
import { Vec4 } from './core/math/vec4.js';
import { Quat } from './core/math/quat.js';
import { Mat3 } from './core/math/mat3.js';
import { Mat4 } from './core/math/mat4.js';
import { customTypes, customValidations, validateNumberInObject, TypePanel, ignoredChecks, registerTypedef } from '@runtime-type-inspector/runtime';
Object.assign(customTypes, {
    AnimSetter(value) {
        // Fix for type in ./framework/anim/evaluator/anim-target.js
        // The AnimSetter type is not sufficient, just patching in the correct type here
        if (value instanceof Function) {
            return true;
        }
        return value?.set instanceof Function && value?.set instanceof Function;
    },
    AnimBinder(value) {
        // Still using: @implements {AnimBinder}
        // RTI doesn't take notice of that so far and we started removing `@implements` aswell:
        // Testable via graphics/contact-hardening-shadows example.
        return value?.constructor?.name?.endsWith('Binder');
    },
    ComponentData(value) {
        // Used in src/framework/components/collision/trigger.js
        // Why do we neither use @implements nor `extends` for such type?
        // Testable via animation/locomotion example.
        return value?.constructor?.name?.endsWith('ComponentData');
    },
    Renderer(value) {
        // E.g. instance of `ForwardRenderer`
        return value?.constructor?.name?.endsWith('Renderer');
    }
});
// Simulated enum typedefs until engine #9613 lands (bare value-as-type JSDoc
// like `{BODYTYPE_DYNAMIC|...}`): each name resolves to its literal through
// the normal typedef path, so no annotation needs rewriting. Delete these
// once the real typedefs exist.
registerTypedef('ACTION_GAMEPAD', '"gamepad"');
registerTypedef('ACTION_KEYBOARD', '"keyboard"');
registerTypedef('ACTION_MOUSE', '"mouse"');
registerTypedef('BODYTYPE_DYNAMIC', '"dynamic"');
registerTypedef('BODYTYPE_KINEMATIC', '"kinematic"');
registerTypedef('BODYTYPE_STATIC', '"static"');
registerTypedef('DEVICETYPE_WEBGL2', '"webgl2"');
registerTypedef('DEVICETYPE_WEBGPU', '"webgpu"');
registerTypedef('JOINTTYPE_6DOF', '"6dof"');
registerTypedef('JOINTTYPE_BALL', '"ball"');
registerTypedef('JOINTTYPE_FIXED', '"fixed"');
registerTypedef('JOINTTYPE_HINGE', '"hinge"');
registerTypedef('JOINTTYPE_SLIDER', '"slider"');
registerTypedef('MOTION_FREE', '"free"');
registerTypedef('MOTION_LIMITED', '"limited"');
registerTypedef('MOTION_LOCKED', '"locked"');
registerTypedef('PIXELFORMAT_LA8', 2);
registerTypedef('PIXELFORMAT_R32F', 15);
// For quickly checking props of Vec2/Vec3/Vec4/Quat/Mat3/Mat4 without GC
const propsXY   = ['x', 'y'];
const propsXYZ  = ['x', 'y', 'z'];
const propsXYZW = ['x', 'y', 'z', 'w'];
const props9    = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const props16   = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
/**
 * `@ignoreRTI`
 * @param {any} value - The value.
 * @param {*} expect - Expected type structure.
 * @todo Split array/class.
 * @param {string} loc - String like `BoundingBox#compute`
 * @param {string} name - Name of the argument.
 * @param {boolean} critical - Only false for unions.
 * @param {console["warn"]} warn - Function to warn with.
 * @param {number} depth - The depth to detect recursion.
 * @returns {boolean} Only false if we can find some NaN issues or denormalisation issues.
 */
function validate(value, expect, loc, name, critical, warn, depth) {
    /**
     * @param {string|number} prop - Something like 'x', 'y', 'z', 'w', 0, 1, 2, 3, 4 etc.
     * @returns {boolean} Wether prop is a valid number.
     */
    const checkProp = (prop) => {
        return validateNumberInObject(value, prop);
    };
    if (value instanceof Vec2) {
        return propsXY.every(checkProp);
    }
    if (value instanceof Vec3) {
        return propsXYZ.every(checkProp);
    }
    if (value instanceof Vec4) {
        return propsXYZW.every(checkProp);
    }
    if (value instanceof Quat) {
        const length = value.length();
        // Don't want developers of denormalized Quat's when they normalize it.
        if (loc !== 'Quat#normalize' && loc !== 'Quat#mulScalar') {
            // A quaternion should have unit length, but can become denormalized due to
            // floating point precision errors (aka error creep). For instance through:
            // - Successive quaternion operations
            // - Conversion from matrices, which accumulated FP precision loss.
            // Simple solution is to renormalize the quaternion.
            if (Math.abs(1 - length) > 0.001) {
                warn('Quat is denormalized, please renormalize it before use.');
                return false;
            }
        }
        return propsXYZW.every(checkProp);
    }
    if (value instanceof Mat3) {
        return props9.every(prop => validateNumberInObject(value.data, prop));
    }
    if (value instanceof Mat4) {
        return props16.every(prop => validateNumberInObject(value.data, prop));
    }
    return true;
}
customValidations.push(validate);
// `compute`/`computeMinMax` only consume the first `numVerts * 3` entries,
// so holes in the over-allocated tail (e.g. index 1728 of 1752) never reach
// the computation — skip just these two `vertices` checks, nothing else.
// Quick repro for testing: /#/user-interface/anchors.
ignoredChecks.add('BoundingBox#compute.vertices');
ignoredChecks.add('BoundingBox#computeMinMax.vertices');
export const typePanel = new TypePanel();
if (globalThis.parent !== globalThis) {
    globalThis.parent.addEventListener('message', (e) => {
        if (e.data?.type === 'rti' && e.data.destination === 'ui') {
            typePanel.handleEvent(e);
        }
    });
}
