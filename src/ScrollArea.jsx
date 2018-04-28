import React, { Component } from "react";
import PropTypes from "prop-types";
import generateId from "./utilities/generateId";

class ScrollArea extends Component {
  componentDidMount() {
    this.id = this.node.id || generateId();

    this.context.addScrollArea(this.node, this.id);
  }

  componentWillUnmount() {
    this.context.removeScrollArea(this.node, this.id);
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <div {...props} ref={node => (this.node = node)}>
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
