import * as React from "react";

type Nodelike = React.ReactNode | Window | Body;

type ScrollAreaResponse = {
  scrollAreas: Record<string, Nodelike>;
  addScrollArea: (tag: string, node: Nodelike) => void;
  removeScrollArea: (tag: string) => void;
};

export function useScrollArea(): ScrollAreaResponse {
  const scrollAreas = React.useRef<Record<string, Nodelike>>({});

  const addScrollArea = React.useCallback(
    (tag: string, node: Nodelike): void => {
      if (__DEV__) {
        if (tag in scrollAreas) {
          console.warn(
            `Found tag (${String(tag)}) already in the scrollAreas object.`
          );
        }
      }

      scrollAreas.current[tag] = node;
    },
    []
  );

  const removeScrollArea = React.useCallback((tag: string) => {
    delete scrollAreas.current[tag];
  }, []);

  return { scrollAreas: scrollAreas.current, addScrollArea, removeScrollArea };
}
