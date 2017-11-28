import React, { Component } from "react";
import PropTypes from "prop-types";

class ScrollArea extends Component {
  componentDidMount() {
    this.context.addScrollArea(this.node);
  }

  componentWillUnmount() {
    this.context.removeScrollArea(this.node);
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <div {...props} ref={node => this.node = node}>
        {children}
      </div>
    );
  }
}

ScrollArea.contextTypes = {
  addScrollArea: PropTypes.func.isRequired,
  removeScrollArea: PropTypes.func.isRequired
};

export default ScrollArea;
