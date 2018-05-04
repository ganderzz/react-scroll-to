import React, { Component, createContext } from "react";
import PropTypes from "prop-types";
import scrollWindow from "./utilities/scrollWindow";

export const ScrollToContext = createContext("scrollToContext");

/**
 * Component that uses render props to inject
 * a function that allows the consumer to scroll to a
 * position in the window or ScrollArea component
 */
class ScrollTo extends Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollById = this.handleScrollById.bind(this);

    this.scrollArea = {};

    this.getContext = {
      addScrollArea: (id, ref) => {
        this.scrollArea = {
          ...this.scrollArea,
          [id]: ref
        };
      },
      removeScrollArea: id => {
        if (!id) {
          return;
        }

        const {
          [id]: {},
          ...rest
        } = this.scrollArea;

        this.scrollArea = rest;
      }
    };
  }

  handleScroll(x, y) {
    const scrollAreaKeys = Object.keys(this.scrollArea);

    if (scrollAreaKeys.length === 0) {
      scrollWindow(x, y);
    } else {
      scrollAreaKeys.forEach(key => {
        this.scrollArea[key].scrollLeft = x;
        this.scrollArea[key].scrollTop = y;
      });
    }
  }

  handleScrollById(id, x, y) {
    const node = this.scrollArea[id];
    if (node) {
      node.scrollLeft = x;
      node.scrollTop = y;
    }
  }

  render() {
    return (
      <ScrollToContext.Provider value={this.getContext}>
        {this.props.children &&
          this.props.children({
            scrollTo: this.handleScroll,
            scrollById: this.handleScrollById
          })}
      </ScrollToContext.Provider>
    );
  }
}

ScrollTo.childContextTypes = {
  addScrollArea: PropTypes.func.isRequired,
  removeScrollArea: PropTypes.func.isRequired
};

ScrollTo.defaultProps = {
  children: () => {}
};

ScrollTo.propTypes = {
  children: PropTypes.func.isRequired
};

export default ScrollTo;
