export function relative(input) {
  if (!input || typeof input !== "number") {
    console.warn(
      `Invalid input (${input}) given to relative(). Is this a number?`
    );
  }

  return function(element, isHorizontal) {
    if (!element || !isHorizontal) {
      return input;
    }

    // Handle getting the scroll position of document/window
    let position = isHorizontal ? element.scrollY : element.scrollX;

    if (position == undefined || position == null) {
      // Handle getting the scroll position, which has scrollTop/Left
      position = isHorizontal ? element.scrollTop : element.scrollLeft;
    }

    return position + input;
  };
}
