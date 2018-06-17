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

    this.scrollArea = {};

    this.getContext = {
      addScrollArea: (id, ref) => {
        this.scrollArea[id] = ref;
      },
      removeScrollArea: id => {
        delete this.scrollArea[id];
      }
    };
  }

  handleScroll = (props = {}) => {
    const scrollAreaKeys = Object.keys(this.scrollArea);
    const id = props.id || null;
    const x = props.x || 0;
    const y = props.y || 0;

    if (id) {
      this._handleScrollById(id, x, y);
    } else if (scrollAreaKeys.length === 0) {
      scrollWindow(x, y);
    } else {
      scrollAreaKeys.forEach(key => {
        const node = this.scrollArea[key];

        node.scrollLeft = x;
        node.scrollTop = y;
      });
    }
  };

  _handleScrollById = (id, x, y) => {
    const node = this.scrollArea[id];
    if (node) {
      node.scrollLeft = x;
      node.scrollTop = y;
    } else {
      console.warn(`Could not find a ScrollArea with id: ${id}.`);
    }
  };

  render() {
    return (
      <ScrollToContext.Provider value={this.getContext}>
        {this.props.children &&
          this.props.children({
            scrollTo: this.handleScroll
          })}
      </ScrollToContext.Provider>
    );
  }
}

ScrollTo.defaultProps = {
  children: () => {}
};

ScrollTo.propTypes = {
  children: PropTypes.func.isRequired
};

export default ScrollTo;
