import React from "react";
import getDisplayName from "./utilities/getDisplayName";
import ScrollTo from "./ScrollTo";

/**
 * Higher Order Component version of the ScrollTo.
 * Injects a prop named scroll that is a function that
 * takes an (x, y) coordinate to scroll to. [ie. props.scroll(0, 500)]
 */
function ScrollToHOC(Component) {
  const WrappedComponent = props => (
    <ScrollTo>
      {(scroll, scrollById) => (
        <Component {...props} scroll={scroll} scrollById={scrollById} />
      )}
    </ScrollTo>
  );
  WrappedComponent.displayName = `WithScrollToHOC(${getDisplayName(
    Component
  )})`;

  return WrappedComponent;
}

export default ScrollToHOC;
