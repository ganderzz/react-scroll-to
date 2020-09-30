import * as React from "react";
import { IScrollOptions } from "./IScrollOptions";
import { scrollNode } from "./Logic";
import { useScrollArea } from "./UseScrollArea";

type ScrollToResponse<T> = {
  ref: React.RefObject<React.ComponentClass<T>>;
  scroll: (overrideOptions?: IScrollOptions | null) => void;
};

export function useScrollTo<T extends React.ElementType<unknown>>(
  options: IScrollOptions = {}
): ScrollToResponse<T> {
  const node = React.useRef<React.ComponentClass<T>>(null);
  const { scrollAreas } = useScrollArea();

  const scroll = React.useCallback(
    (overrideOptions: IScrollOptions | null = null): void => {
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
    [node, options, scrollAreas]
  );

  return { ref: node, scroll };
}
