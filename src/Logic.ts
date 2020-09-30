import { IScrollOptions } from "./IScrollOptions";

export function scrollNode(node: any = window, options: IScrollOptions): void {
  if (!node) {
    if (__DEV__) {
      console.warn("Could not find a node to scroll in ScrollTo.");
    }

    return;
  }

  const scrollNode = node;

  const top = options.y;
  const left = options.x;

  if (__DEV__) {
    if (
      typeof scrollNode === "string" ||
      typeof scrollNode === "number" ||
      typeof scrollNode === "boolean"
    ) {
      console.warn("Invalid type of node given to scrollTo.");
      return;
    }
  }

  if (!scrollNode.scrollTo) {
    if (scrollNode.scrollLeft) {
      scrollNode.scrollLeft = left;
    }

    if (scrollNode.scrollTop) {
      scrollNode.scrollTop = top;
    }

    return;
  }

  // Converts to browser specific props.
  const scrollProps = {
    top,
    left,
    behavior: options.smooth ? "smooth" : "auto",
  };

  if (options.relative) {
    scrollNode.scrollBy(scrollProps);
  } else {
    scrollNode.scrollTo(scrollProps);
  }
}
