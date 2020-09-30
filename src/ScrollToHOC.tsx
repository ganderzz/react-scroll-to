import * as React from "react";
import { ScrollTo } from "./ScrollTo";

function getDisplayName(Component) {
  const { displayName, name } = Component;

  if (displayName || name) {
    return displayName || name;
  }
  if (typeof Component === "string" && Component.length > 0) {
    return Component;
  }

  return "ScrollTo/Unknown";
}

/**
 * Higher Order Component version of the ScrollTo.
 * Injects a prop named scroll that is a function that
 * takes an (x, y) coordinate to scroll to. [ie. props.scrollTo(0, 500)]
 */
function ScrollToHOC(Component) {
  const WrappedComponent = (props) => (
    <ScrollTo>
      {(scrollProps) => <Component {...props} {...scrollProps} />}
    </ScrollTo>
  );

  WrappedComponent.displayName = `WithScrollToHOC(${getDisplayName(
    Component
  )})`;

  return WrappedComponent;
}

export { ScrollToHOC };
