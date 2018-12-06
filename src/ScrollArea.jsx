import React, { Component, createRef } from "react";
import { ScrollToContext } from "./ScrollTo";
import generateId from "./utilities/generateId";
import createReactContext from "create-react-context";

export default class ScrollArea extends Component {
  static contextType = ScrollToContext;

  constructor(props) {
    super(props);

    this.node = createRef ? createRef() : createReactContext();
    this.id = this.props.id || generateId();
  }

  componentDidMount() {
    this.context.addScrollArea(this.id, this.node.current);
  }

  componentWillUnmount() {
    this.context.removeScrollArea(this.id);
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
