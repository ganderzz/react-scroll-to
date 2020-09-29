import * as React from "react";
import * as ReactDOM from "react-dom";
import { IScrollOptions } from "./IScrollOptions";

export function scrollNode(node: any = window, options: IScrollOptions) {
  if (!node) {
    if (__DEV__) {
      console.warn("Could not find a node to scroll in ScrollTo.");
    }

    return;
  }

  let scrollNode = node;

  const top = options.y;
  const left = options.x;

  /* istanbul ignore next */
  if (React.isValidElement(node)) {
    /* istanbul ignore next */
    const rNode = ReactDOM.findDOMNode(node as any) as Element;

    /* istanbul ignore next */
    if (rNode) {
      scrollNode = rNode;
    }
  }

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
