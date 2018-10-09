import * as React from "react";

export interface IScrollProps {
  id: string;
  x: number;
  y: number;
  smooth: boolean;
}

interface Props {
  children: (
    args: {
      scrollTo: (props: Partial<IScrollProps>) => void;
    }
  ) => React.ReactElement<any>;
}

/**
 * ScrollTo component is a render prop that provides scrolling functionality.
 *
 * @param  {Props} props
 */
declare function ScrollTo(props: Props): React.ReactElement<any>;
export default ScrollTo;
