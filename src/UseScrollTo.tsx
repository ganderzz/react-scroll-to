import * as React from "react";
import { IScrollOptions } from "./IScrollOptions";
import { scrollNode } from "./logic";
import { useScrollArea } from "./UseScrollArea";

export function useScrollTo<T extends React.ElementType<unknown>>(
  options: IScrollOptions = {}
) {
  const node = React.useRef<React.ComponentClass<T>>(null);
  const { scrollAreas } = useScrollArea();

  const scroll = React.useCallback(
    (overrideOptions: IScrollOptions | null = null) => {
      const opts = overrideOptions
        ? { ...options, ...overrideOptions }
        : options;

      const scrollAreaKeys = Object.keys(scrollAreas);
      const { tag, ...rest } = opts;

      if (node.current) {
        // Scroll by ref
        scrollNode(node, rest);
      } else if (tag) {
        // Scroll by id
        scrollNode(scrollAreas[tag], rest);
      } /* istanbul ignore next */ else if (scrollAreaKeys.length > 0) {
        // Scroll by all scroll areas
        /* istanbul ignore next */
        scrollAreaKeys.forEach((key) => {
          scrollNode(scrollAreas[key], rest);
        });
      } else if (window) {
        // Scroll by window
        scrollNode(window, rest);
      }
    },
    [node, options]
  );

  return { ref: node, scroll };
}
