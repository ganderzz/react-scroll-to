import React, { Component } from "react";
import { ScrollToContext } from "./ScrollTo";
import generateId from "./utilities/generateId";

export function createRefPoly() {
  function ref(instanceOrNode) {
    ref.current = instanceOrNode || null;
  }

  ref.current = null;

  return ref;
}

export class ScrollArea extends Component {
  // Using React.createRef so we can easily unit test this
  node = React.createRef ? React.createRef() : createRefPoly();
  id = this.props.id || generateId();

  componentDidMount() {
    this.props.addScrollArea(this.id, this.node.current);
  }

  componentWillUnmount() {
    this.props.removeScrollArea(this.id);
  }

  render() {
    const { children, removeScrollArea, addScrollArea, ...props } = this.props;

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
        removeScrollArea={removeScrollArea}
        addScrollArea={addScrollArea}
      />
    )}
  </ScrollToContext.Consumer>
);
