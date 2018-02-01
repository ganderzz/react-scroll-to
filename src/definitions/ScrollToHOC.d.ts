import * as React from "react";

interface IProps {
    /**
     * Scroll to a position in the window.
     * 
     * @param {number} x The x position to scroll to
     * @param {number} y The Y position to scroll to
     */
    scroll: (x: number, y: number) => void;
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