/**
 * Generate a pseudo-unique ID on each function call
 *
 * @returns {number}
 */

export const generateId = (() => {
  let counter = 0;

  return () => `scrollto-${counter++}`;
})();
