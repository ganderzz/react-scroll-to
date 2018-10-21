import * as React from "react";
import { IScrollProps } from "./ScrollTo";

interface IProps {
  /**
   * Scroll to a position in the window.
   *
   * @param {IScrollProps} props
   */
  scrollTo: (props: Partial<IScrollProps>) => void;
}

/**
 * Higher order component that bind scroll functionality to a component's props.
 *
 * @param {React.ReactElement<IProps> | React.StatelessComponent<IProps>} component
 *
 * @returns {React.ReactNode}
 */
declare function ScrollToHOC(
  component: React.ReactElement<IProps> | React.StatelessComponent<IProps>
): (props: {}) => React.ReactNode;
export default ScrollToHOC;
