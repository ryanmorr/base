/**
 * Import dependencies
 */
import { doc } from '../dom';

/**
 * Common variables
 */
const listeners = [];
let ready = /complete|loaded|interactive/.test(doc.readyState);

/**
 * Check if the DOM is already loaded
 */
if (!ready) {
    doc.addEventListener('DOMContentLoaded', function onReady() {
        ready = true;
        doc.removeEventListener('DOMContentLoaded', onReady);
        let listener;
        while ((listener = listeners.shift())) {
            listener();
        }
    });
}

/**
 * Return a promise that fullfills when
 * the DOM is ready, or resolve immediately
 * if it is already loaded
 *
 * @param {Function} fn (optional)
 * @api public
 */
export default function onDOMReady(fn = null) {
    const promise = new Promise((resolve) => {
        if (ready) {
            resolve();
            return;
        }
        listeners.push(resolve);
    });
    if (fn) {
        promise.then(fn);
    }
    return promise;
}
