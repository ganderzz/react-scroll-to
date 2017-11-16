import React, { Component } from "react";

/**
 * Component that uses render props to inject
 * a function that allows the consumer to scroll to a 
 * position in the window.
 */
export class ScrollTo extends Component {
    constructor(props) {
        super(props);

        this.handleScrollTo = this.handleScrollTo.bind(this);
    }

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
    handleScrollTo(x = 0, y = 0) {
        window.scroll(x, y);
    }

    render() {
        return this.props.children(
            (x, y) => () => this.handleScrollTo(x, y)
        );
    }
}
