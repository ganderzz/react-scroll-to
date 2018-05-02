import React from "react";
import getDisplayName from "./utilities/getDisplayName";
import ScrollTo from "./ScrollTo";

/**
 * Higher Order Component version of the ScrollTo.
 * Injects a prop named scroll that is a function that
 * takes an (x, y) coordinate to scroll to. [ie. props.scrollTo(0, 500)]
 */
function ScrollToHOC(Component) {
  const WrappedComponent = props => (
    <ScrollTo>
      {({ scrollTo, scrollById }) => (
        <Component {...props} scrollTo={scrollTo} scrollById={scrollById} />
      )}
    </ScrollTo>
  );
  WrappedComponent.displayName = `WithScrollToHOC(${getDisplayName(
    Component
  )})`;

  return WrappedComponent;
}

export default ScrollToHOC;
