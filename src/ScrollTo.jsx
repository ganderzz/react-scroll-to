import { Component } from "react";
import PropTypes from "prop-types";
import scrollWindow from "./scrollWindow";

/**
 * Component that uses render props to inject
 * a function that allows the consumer to scroll to a
 * position in the window or ScrollArea component
 */
class ScrollTo extends Component {
  constructor(props) {
    super(props);

    this.scrollArea = [];
    this.handleScroll = this.handleScroll.bind(this);
  }

  getChildContext() {
    return {
      addScrollArea: ref => {
        this.scrollArea = this.scrollArea.concat(ref);
      },
      removeScrollArea: ref => {
        this.scrollArea = this.scrollArea.filter(container => {
          return container !== ref;
        });
      }
    };
  }

  handleScroll(x, y) {
    if (this.scrollArea.length === 0) {
      scrollWindow(x, y);
    } else {
      this.scrollArea.forEach(container => {
        container.scrollLeft = x;
        container.scrollTop = y;
      });
    }
  }

  scrollById(id, x, y) {
    var node = document.getElementById(id);
    console.log("HI");
    console.log(document);
    console.log(node);
    node.scroll(x, y);
  }

  render() {
    return (
      this.props.children &&
      this.props.children(this.handleScroll, this.scrollById)
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
