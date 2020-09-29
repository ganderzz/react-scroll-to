import * as React from "react";
import { IScrollOptions } from "./IScrollOptions";
import { scrollNode } from "./logic";
import { useScrollTo } from "./UseScrollTo";

interface IProps {
  children?: (props: {
    scroll: (props?: IScrollOptions) => void;
  }) => JSX.Element;
}

/**
 * Component that uses render props to inject
 * a function that allows the consumer to scroll to a
 * position in the window or ScrollArea component
 */
export function ScrollTo({ children }: IProps) {
  const { scroll } = useScrollTo();

  if (!children) {
    return null;
  }

  return children({ scroll });
}
