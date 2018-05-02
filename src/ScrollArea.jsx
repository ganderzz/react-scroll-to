import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import generateId from "./utilities/generateId";

class ScrollArea extends Component {
  componentDidMount() {
    this.node = createRef();
    this.id = (this.node.curret && this.node.current.id) || generateId();

    this.context.addScrollArea(this.node, this.id);
  }

  componentWillUnmount() {
    this.context.removeScrollArea(this.node.current, this.id);
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <div {...props} ref={this.node}>
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
