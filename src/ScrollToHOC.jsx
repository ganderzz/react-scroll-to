import React from "react";
import getDisplayName from "react-display-name";
import scrollWindow from "./scrollWindow";

/**
 * Higher Order Component version of the ScrollTo.
 * Injects a prop named scroll that is a function that
 * takes an (x, y) coordinate to scroll to. [ie. props.scroll(0, 500)]
 */
function ScrollToHOC(Component) {
  const WrappedComponent = props => (
    <Component {...props} scroll={scrollWindow} />
  );
  WrappedComponent.displayName = `WithScrollToHOC(${getDisplayName(
    Component
  )})`;

  return WrappedComponent;
}

export default ScrollToHOC;
