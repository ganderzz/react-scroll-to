import { StatelessComponent, ReactElement, ReactNode } from "react";
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
 * @param {ReactElement<IProps> | StatelessComponent<IProps>} component
 *
 * @returns {ReactNode}
 */
declare function ScrollToHOC(
  component: ReactElement<IProps> | StatelessComponent<IProps>
): (props: {}) => ReactNode;
export default ScrollToHOC;
