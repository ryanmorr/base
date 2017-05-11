/**
 * Import dependencies
 */
import { hasOwnProperty } from './index';

/**
 * Common variables
 */
const isEnumerable = {}.propertyIsEnumerable;

/**
 * Copy properties from one or more objects
 * to a target object
 *
 * @param {Object} target
 * @param {...Object} props
 * @return {Object}
 * @api public
 */
export default function mixin(target, ...props) {
    if (Object.assign) {
        return Object.assign(target, ...props);
    }
    for (let i = 0, len = props.length, obj, key; i < len; i++) {
        obj = props[i];
        for (key in obj) {
            if (hasOwnProperty(obj, key)) {
                target[key] = obj[key];
            }
        }
        if (Object.getOwnPropertySymbols) {
            const symbols = Object.getOwnPropertySymbols(obj);
            for (let n = 0, nLen = symbols.length, symbol; n < nLen; n++) {
                symbol = symbols[n];
                if (isEnumerable.call(obj, symbol)) {
                    target[symbol] = obj[symbol];
                }
            }
        }
    }
    return target;
}
