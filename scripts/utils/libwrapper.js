import MODULE_ID from './module.js'

/**
 * @param {string} target
 * @param {libWrapper.RegisterFunction} fn
 * @param {'WRAPPER' | 'MIXED' | 'OVERRIDE'} [type]
 */
export function registerWrapper(target, fn, type = 'WRAPPER') {
    libWrapper.register(MODULE_ID, target, fn, type)
}
