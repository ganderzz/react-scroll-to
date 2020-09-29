import * as React from "react";
import { useScrollArea } from "./UseScrollArea";

interface IProps {
  tag?: string;
}

export function ScrollArea({
  tag,
  children,
  ...rest
}: IProps & React.PropsWithoutRef<JSX.IntrinsicElements["div"]>) {
  const refDOM = React.useRef<HTMLDivElement>(null);
  const staticTag = React.useRef<string>(
    tag ?? Math.random().toString(36).substr(2, 5)
  );
  const { addScrollArea, removeScrollArea } = useScrollArea();

  React.useEffect(() => {
    if (!tag) {
      if (__DEV__) {
        console.warn(
          `Missing tag on ScrollArea and will be using an auto-generated id. This is not guarenteed to be unique, and can cause bugs!`
        );
      }
    }

    addScrollArea(staticTag.current, refDOM);

    () => {
      removeScrollArea(staticTag.current);
    };
  }, []);

  return (
    <div {...rest} ref={refDOM}>
      {children}
    </div>
  );
}
