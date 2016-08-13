/**
 * Counter for generating a unique identifier
 */
let counter = 0;

/**
 * Generate a unique ID
 *
 * @return {String}
 * @api public
 */
export default function uid() {
    return (Date.now().toString(36) + (counter++).toString(36));
}
