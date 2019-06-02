import * as React from "react";
import { ScrollToContext } from "./ScrollTo";
import { generateId } from "./utilities/generateId";

export function createRefPoly(): React.RefObject<HTMLDivElement> {
  function ref(instanceOrNode) {
    ref.current = instanceOrNode || null;
  }

  ref.current = null;

  return ref;
}

interface IProps {
  id: string;
  addScrollArea(id: string, node: unknown);
  removeScrollArea(id: string);
}

export class ScrollArea extends React.Component<IProps> {
  // Using React.createRef so we can easily unit test this
  node = React.createRef ? React.createRef<HTMLDivElement>() : createRefPoly();
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
