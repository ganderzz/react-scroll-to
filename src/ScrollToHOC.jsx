import React from "react";
import getDisplayName from "react-display-name";
import handleScroll from "./handleScroll";

/**
 * Higher Order Component version of the ScrollTo.
 * Injects a prop named scroll that is a function that
 * takes an (x, y) coordinate to scroll to. [ie. props.scroll(0, 500)]
 */
function ScrollToHOC(Component) {
  const WrappedComponent = props => (
    <Component {...props} scroll={handleScroll} />
  );
  WrappedComponent.displayName = `WithScrollToHOC(${getDisplayName(
    Component
  )})`;

  return WrappedComponent;
}

export default ScrollToHOC;
