/**
 * Common variables
 */
let frame;
const batch = [];

/**
 * Use `requestAnimationFrame` to
 * batch DOM updates to boost
 * performance
 *
 * @param {Function} fn
 * @api private
 */
export default function write(fn) {
    if (frame) {
        cancelAnimationFrame(frame);
    }
    batch.push(fn);
    frame = requestAnimationFrame(() => {
        frame = null;
        let render;
        while ((render = batch.shift())) {
            render();
        }
    });
}
