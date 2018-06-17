import * as React from "react";
import { IScrollProps } from "./ScrollTo";

interface IProps {
    /**
     * Scroll to a position in the window.
     * 
     * @param {IScrollProps} props
     */
    scroll: (props: Partial<IScrollProps>) => void;
}

/**
 * Higher order component that bind scroll functionality to a component's props.
 * 
 * @param {React.ReactElement<IProps> | React.StatelessComponent<IProps>} component 
 * 
 * @returns {React.ReactElement<any>}
 */
declare function ScrollToHOC(component: React.ReactElement<IProps> | React.StatelessComponent<IProps>): (props: {}) => React.ReactElement<any>;
export default ScrollToHOC;