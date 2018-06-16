import React, { Component, createRef } from "react";
import { ScrollToContext } from "./ScrollTo";
import generateId from "./utilities/generateId";

export class ScrollArea extends Component {
  constructor(props) {
    super(props);

    this.node = createRef();
    this.id = this.props.id || generateId();
  }

  componentDidMount() {
    this.props.addScrollArea(this.id, this.node.current);
  }

  componentWillUnmount() {
    this.props.removeScrollArea(this.id);
  }

  render() {
    const { children, addScrollArea, removeScrollArea, ...props } = this.props;

    return (
      <div {...props} ref={this.node}>
        {children}
      </div>
    );
  }
}

export default props => (
  <ScrollToContext.Consumer>
    {({ addScrollArea, removeScrollArea }) => (
      <ScrollArea
        {...props}
        addScrollArea={addScrollArea}
        removeScrollArea={removeScrollArea}
      />
    )}
  </ScrollToContext.Consumer>
);
