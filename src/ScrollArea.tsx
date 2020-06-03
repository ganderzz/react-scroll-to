import * as React from "react";
import { ScrollToContext } from "./ScrollTo";

interface IProps {
  id: string;
  addScrollArea(id: string | symbol, node: unknown);
  removeScrollArea(id: string | symbol);
}

export class ScrollArea extends React.Component<
  IProps & React.PropsWithoutRef<JSX.IntrinsicElements["div"]>
> {
  node = React.createRef<HTMLDivElement>();
  id = this.props.id || Symbol();

  public componentDidMount() {
    this.props.addScrollArea(this.id, this.node.current);
  }

  public componentWillUnmount() {
    this.props.removeScrollArea(this.id);
  }

  public render() {
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
