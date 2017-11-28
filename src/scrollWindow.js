/**
 * Scrolls the window to
 * the provided x, y coordinates.
 *
 * Defaults to (0,0) if none are given.
 *
 * @param {number} x
 * @param {number} y
 *
 * @returns {void}
 */
function scrollWindow(x = 0, y = 0) {
  window.scroll(x, y);
}

export default scrollWindow;
