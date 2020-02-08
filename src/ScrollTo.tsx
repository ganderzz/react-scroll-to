import * as React from "react";
import ReactDOM from "react-dom";

interface IContextProps {
  addScrollArea(id: string, node: unknown);
  removeScrollArea(id: string);
}

/* istanbul ignore next */
export const ScrollToContext = React.createContext<IContextProps>({
  addScrollArea: (id, node) => {},
  removeScrollArea: id => {}
});

interface IScrollOptions {
  id?: string;
  ref?: React.RefObject<unknown>;
  x?: number;
  y?: number;
  smooth?: boolean;
}

interface IProps {
  children?: (props: {
    scroll: (props?: IScrollOptions) => void;
  }) => React.ReactNode;
}

/**
 * Component that uses render props to inject
 * a function that allows the consumer to scroll to a
 * position in the window or ScrollArea component
 */
class ScrollTo extends React.Component<IProps> {
  scrollArea: { [key: string]: React.ReactNode } = {};
  getContext: IContextProps;

  constructor(props) {
    super(props);

    this.scrollArea = {};

    this.getContext = {
      addScrollArea: this.addScrollArea,
      removeScrollArea: this.removeScrollArea
    };
  }

  /* istanbul ignore next */
  addScrollArea = (id, ref) => {
    this.scrollArea[id] = ref;
  };

  /* istanbul ignore next */
  removeScrollArea = id => {
    delete this.scrollArea[id];
  };

  handleScroll = (props: IScrollOptions = {}) => {
    const scrollAreaKeys = Object.keys(this.scrollArea);
    const { id, ref, ...rest } = props;

    if (ref) {
      const refNode = ref.current ? ref.current : ref;

      // Scroll by ref
      this._scrollNode(refNode, rest);
    } else if (id) {
      // Scroll by id
      const node = this.scrollArea[id];

      this._scrollNode(node, rest);
    } /* istanbul ignore next */ else if (scrollAreaKeys.length > 0) {
      // Scroll by all scroll areas
      /* istanbul ignore next */
      scrollAreaKeys.forEach(key => {
        const node = this.scrollArea[key];

        this._scrollNode(node, rest);
      });
    } else if (window) {
      // Scroll by window
      this._scrollNode(window, rest);
    }
  };

  _scrollNode = (node, options) => {
    if (!node) {
      return;
    }

    const top = options.y;
    const left = options.x;

    /* istanbul ignore next */
    if (React.isValidElement(node)) {
      /* istanbul ignore next */
      const rNode = ReactDOM.findDOMNode(node as any);

      /* istanbul ignore next */
      if (rNode) {
        node = rNode;
      }
    }

    if (node.scrollTo) {
      node.scrollTo({
        top,
        left,
        behavior: options.smooth ? "smooth" : "auto"
      });
    } else {
      node.scrollLeft = left;
      node.scrollTop = top;
    }
  };

  render() {
    return (
      <ScrollToContext.Provider value={this.getContext}>
        {this.props.children &&
          this.props.children({
            scroll: this.handleScroll
          })}
      </ScrollToContext.Provider>
    );
  }
}

export default ScrollTo;
