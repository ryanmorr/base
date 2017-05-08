/**
 * Export common variables
 */
export const doc = window.document;
export const documentElement = doc.documentElement;
export const head = doc.head;
export const body = doc.body;

/**
 * Get the document title
 *
 * @return {String}
 * @api public
 */
export function getDocumentTitle() {
    return doc.title;
}

/**
 * Set the document title
 *
 * @param {String} title
 * @api public
 */
export function setDocumentTitle(title) {
    doc.title = title;
}

/**
 * Get the viewport height
 *
 * @return {Number}
 * @api public
 */
export function getViewportHeight() {
    return Math.min(
        window.innerHeight,
        documentElement.clientHeight
    );
}

/**
 * Get the viewport width
 *
 * @return {Number}
 * @api public
 */
export function getViewportWidth() {
    return Math.min(
        window.innerWidth,
        documentElement.clientWidth
    );
}

/**
 * Get the document height
 *
 * @return {Number}
 * @api public
 */
export function getDocumentHeight() {
    return Math.max(
        body.scrollHeight,
        body.offsetHeight,
        documentElement.scrollHeight,
        documentElement.offsetHeight,
        documentElement.clientHeight
    );
}

/**
 * Get the document width
 *
 * @return {Number}
 * @api public
 */
export function getDocumentWidth() {
    return Math.max(
        body.scrollWidth,
        body.offsetWidth,
        documentElement.scrollWidth,
        documentElement.offsetWidth,
        documentElement.clientWidth
    );
}

/**
 * Get the amount the document
 * has scrolled from the left
 *
 * @return {Number}
 * @api public
 */
export function getDocumentScrollLeft() {
    return Math.max(
        window.pageXOffset,
        documentElement.scrollLeft
    );
}

/**
 * Get the amount the document
 * has scrolled from the top
 *
 * @return {Number}
 * @api public
 */
export function getDocumentScrollTop() {
    return Math.max(
        window.pageYOffset,
        documentElement.scrollTop
    );
}

/**
 * Set the document scroll
 *
 * @param {Number} x
 * @param {Number} y
 * @api public
 */
export function setDocumentScroll(x, y) {
    window.scrollTo(x, y);
}

/**
 * Check if a node exists within the DOM
 *
 * @param {Node} node
 * @return {Boolean}
 * @api public
 */
export function isInDocument(node) {
    return documentElement.contains(node);
}
