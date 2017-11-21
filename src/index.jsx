import React from "react";

/**
 * Scrolls the window to
 * the provided x, y coordinates.
 * 
 * Defaults to (0,0) if none are given.
 * 
 * @param {number} x 
 * @param {number} y
 * 
 * @returns {void}
 */
function handleScroll(x = 0, y = 0) {
    window.scroll(x, y);
}

/**
 * Component that uses render props to inject
 * a function that allows the consumer to scroll to a 
 * position in the window.
 */
export function ScrollTo(props) {
    return props.children(handleScroll);
}

/**
 * Higher Order Component version of the ScrollTo.
 * Injects a prop named scroll that is a function that
 * takes an (x, y) coordinate to scroll to. [ie. props.scroll(0, 500)]
 */
export function ScrollToHOC(Component) {
    return (props) => (
        <Component {...props} scroll={handleScroll} />
    )
}
