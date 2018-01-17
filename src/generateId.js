/**
 * Generate a pseudo-unique ID on each function call
 *
 * @returns {number}
 */

const generateId = (() => {
  let counter = 0;

  return () => `scrollto-${counter++}`;
})();

export default generateId;
