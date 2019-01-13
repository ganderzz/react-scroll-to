import { RefObject, Component, ReactNode } from "react";

export interface IScrollProps {
  id: string;
  ref: RefObject<any>;
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
        node: RefObject<any> | Component | HTMLElement | HTMLDocument | Window,
        isHorizontal: boolean
      ) => number;
    }
  ) => ReactNode;
}

/**
 * ScrollTo component is a render prop that provides scrolling functionality.
 *
 * @param  {Props} props
 */
declare function ScrollTo(props: Props): JSX.Element;
export default ScrollTo;
