import * as React from "react";

export interface IScrollProps {
  id: string;
  ref: React.RefObject<any>;
  x: number;
  y: number;
  smooth: boolean;
}

interface Props {
  children: (
    args: {
      scrollTo: (props: Partial<IScrollProps>) => void;
      relative: (
        value: number
      ) => (
        node:
          | React.RefObject<any>
          | React.Component
          | HTMLElement
          | HTMLDocument
          | Window,
        isHorizontal: boolean
      ) => number;
    }
  ) => React.ReactNode;
}

/**
 * ScrollTo component is a render prop that provides scrolling functionality.
 *
 * @param  {Props} props
 */
declare function ScrollTo(props: Props): React.ReactNode;
export default ScrollTo;
