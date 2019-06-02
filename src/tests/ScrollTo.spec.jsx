import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ScrollTo from "../ScrollTo";
import ScrollArea from "../ScrollArea";

afterEach(cleanup);

beforeEach(() => {
  window.scrollTo = jest.fn();
});

describe("Test render prop.", () => {
  it("Should render the functional children.", () => {
    const { container } = render(<ScrollTo>{() => <div>test</div>}</ScrollTo>);

    expect(container).toMatchSnapshot();
  });

  it("Should render nothing on undefined.", () => {
    const { container } = render(<ScrollTo>{undefined}</ScrollTo>);

    expect(container).toMatchSnapshot();
  });

  it("Should call window.scrollTo.", () => {
    const { container } = render(
      <ScrollTo>
        {({ scrollTo }) => (
          <button onClick={() => scrollTo({ x: 100, y: 200 })}>test</button>
        )}
      </ScrollTo>
    );

    fireEvent.click(container.querySelector("button"));

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo.mock.calls[0]).toEqual([
      {
        left: 100,
        top: 200,
        behavior: "auto"
      }
    ]);
  });

  it("Should call window.scrollTo with default x,y when no arguments are provided.", () => {
    const { container } = render(
      <ScrollTo>
        {({ scrollTo }) => <button onClick={() => scrollTo()}>test</button>}
      </ScrollTo>
    );

    fireEvent.click(container.querySelector("button"));

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo.mock.calls[0]).toEqual([
      {
        left: undefined,
        top: undefined,
        behavior: "auto"
      }
    ]);
  });

  it("Should remove scroll area.", () => {
    let element = new ScrollTo();
    element.addScrollArea("id", "foo");

    element.removeScrollArea("id");

    expect(element.scrollArea).toEqual({});
  });

  it("Should update scroll position of ScrollArea's if present, rather than window", () => {
    const mockNode = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const { container } = render(
      <ScrollTo>
        {({ scrollTo }) => (
          <React.Fragment>
            <button onClick={() => scrollTo({ id: "id", x: 100, y: 200 })}>
              test
            </button>

            <ScrollArea id="id">test</ScrollArea>
          </React.Fragment>
        )}
      </ScrollTo>
    );

    const buttonEl = container.querySelector("button");
    fireEvent.click(buttonEl);

    expect(mockNode).toMatchSnapshot();
  });

  it("Should scroll by ID", () => {
    const mockNode = {
      scrollLeft: 0,
      scrollTop: 0,
      id: "foo"
    };
    const { container } = render(
      <ScrollTo>
        {({ scrollTo }) => (
          <React.Fragment>
            <button onClick={() => scrollTo({ id: "foo", x: 100, y: 200 })}>
              test
            </button>

            <ScrollArea id="foo">test</ScrollArea>
          </React.Fragment>
        )}
      </ScrollTo>
    );

    const buttonEl = container.querySelector("button");
    fireEvent.click(buttonEl);

    expect(mockNode).toMatchSnapshot();
  });

  it("Should not break if scrolling by an unknown ID", () => {
    const mockNode = {
      scrollLeft: 0,
      scrollTop: 0,
      id: "foo"
    };
    const { container } = render(
      <ScrollTo>
        {({ scrollTo }) => (
          <React.Fragment>
            <button
              onClick={() => scrollTo({ id: "UnKnOWN-id", x: 100, y: 200 })}
            >
              test
            </button>

            <ScrollArea id="foo">test</ScrollArea>
          </React.Fragment>
        )}
      </ScrollTo>
    );

    const buttonEl = container.querySelector("button");
    fireEvent.click(buttonEl);

    expect(mockNode).toMatchSnapshot();
  });

  it("Should use smooth scrolling when enabled", () => {
    const { getByText } = render(
      <ScrollTo>
        {({ scrollTo }) => (
          <button
            type="button"
            onClick={() => scrollTo({ x: 100, y: 200, smooth: true })}
          >
            myBtn
          </button>
        )}
      </ScrollTo>
    );

    const buttonEl = getByText("myBtn");
    fireEvent.click(buttonEl);

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo.mock.calls[0]).toEqual([
      {
        left: 100,
        top: 200,
        behavior: "smooth"
      }
    ]);
  });

  it("Should scroll by ref when a DOM node is provided", () => {
    const refDOM = React.createRef ? React.createRef() : createReactContext();
    const { getByText } = render(
      <ScrollTo>
        {({ scrollTo }) => (
          <>
            <button
              type="button"
              onClick={() => scrollTo({ ref: refDOM, x: 100, y: 200 })}
            >
              myBtn
            </button>

            <div ref={refDOM}>test</div>
          </>
        )}
      </ScrollTo>
    );

    const buttonEl = getByText("myBtn");
    fireEvent.click(buttonEl);

    expect(refDOM.current).toMatchSnapshot();
  });

  it("Should scroll by ref when a React node is provided", () => {
    const refDOM = {};
    const MyElement = ({ children, ...props }) => (
      <div {...props}>{children}</div>
    );

    const { getByText } = render(
      <ScrollTo>
        {({ scrollTo }) => (
          <>
            <MyElement
              onClick={() => scrollTo({ ref: refDOM, x: 100, y: 200 })}
            >
              myBtn
            </MyElement>

            <div ref={() => {}}>test</div>
          </>
        )}
      </ScrollTo>
    );

    const buttonEl = getByText("myBtn");
    fireEvent.click(buttonEl);

    expect(refDOM.current).toMatchSnapshot();
  });

  it("Should handle invalid ref", () => {
    const refDOM = {};
    const { getByText } = render(
      <ScrollTo>
        {({ scrollTo }) => (
          <>
            <button
              type="button"
              onClick={() => scrollTo({ ref: refDOM, x: 100, y: 200 })}
            >
              myBtn
            </button>

            <div ref={() => {}}>test</div>
          </>
        )}
      </ScrollTo>
    );

    const buttonEl = getByText("myBtn");
    fireEvent.click(buttonEl);

    expect(window.scrollTo).toHaveBeenCalledTimes(0);
    expect(window.scrollTo.mock.calls[0]).toEqual(undefined);
  });

  it("Should handle using the relative() function", () => {
    const refDOM = React.createRef();
    const { getByText } = render(
      <ScrollTo>
        {({ scrollTo, relative }) => (
          <>
            <button
              type="button"
              onClick={() => {
                scrollTo({ ref: refDOM, y: 500 });
                scrollTo({ ref: refDOM, y: relative(-50) });
              }}
            >
              myBtn
            </button>
            <div ref={refDOM} />
          </>
        )}
      </ScrollTo>
    );

    const buttonEl = getByText("myBtn");
    fireEvent.click(buttonEl);

    expect(refDOM.current.scrollTop).toBe(450);
  });
});
