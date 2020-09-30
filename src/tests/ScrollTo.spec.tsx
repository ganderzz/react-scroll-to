import * as React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { ScrollTo } from "../ScrollTo";
import { ScrollArea } from "../ScrollArea";

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
        {({ scroll }) => (
          <button onClick={() => scroll({ x: 100, y: 200 })}>test</button>
        )}
      </ScrollTo>
    );

    fireEvent.click(container.querySelector("button") as any);

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect((window.scrollTo as any).mock.calls[0]).toEqual([
      {
        left: 100,
        top: 200,
        behavior: "auto",
      },
    ]);
  });

  it("Should call window.scrollTo with default x,y when no arguments are provided.", () => {
    const { getByRole } = render(
      <ScrollTo>
        {({ scroll }) => (
          <button role="button" onClick={() => scroll()}>
            test
          </button>
        )}
      </ScrollTo>
    );

    fireEvent.click(getByRole("button"));

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect((window.scrollTo as any).mock.calls[0]).toEqual([
      {
        left: undefined,
        top: undefined,
        behavior: "auto",
      },
    ]);
  });

  it("Should update scroll position of ScrollArea's if present, rather than window", () => {
    const mockNode = {
      scrollLeft: 0,
      scrollTop: 0,
    };

    const { getByRole } = render(
      <ScrollTo>
        {({ scroll }) => (
          <>
            <button
              role="button"
              onClick={() => scroll({ tag: "id", x: 100, y: 200 })}
            >
              test
            </button>

            <ScrollArea id="id">test</ScrollArea>
          </>
        )}
      </ScrollTo>
    );

    fireEvent.click(getByRole("button"));

    expect(mockNode).toMatchSnapshot();
  });

  it("Should scroll by ID", () => {
    const mockNode = {
      scrollLeft: 0,
      scrollTop: 0,
      id: "foo",
    };

    const { getByRole } = render(
      <ScrollTo>
        {({ scroll }) => (
          <>
            <button
              role="button"
              onClick={() => scroll({ tag: "foo", x: 100, y: 200 })}
            >
              test
            </button>

            <ScrollArea id="foo">test</ScrollArea>
          </>
        )}
      </ScrollTo>
    );

    fireEvent.click(getByRole("button"));

    expect(mockNode).toMatchSnapshot();
  });

  it("Should not break if scrolling by an unknown ID", () => {
    const mockNode = {
      scrollLeft: 0,
      scrollTop: 0,
      id: "foo",
    };
    const { getByRole } = render(
      <ScrollTo>
        {({ scroll }) => (
          <>
            <button
              onClick={() => scroll({ tag: "UnKnOWN-id", x: 100, y: 200 })}
            >
              test
            </button>

            <ScrollArea id="foo">test</ScrollArea>
          </>
        )}
      </ScrollTo>
    );

    fireEvent.click(getByRole("button"));

    expect(mockNode).toMatchSnapshot();
  });

  it("Should use smooth scrolling when enabled", () => {
    const { getByText } = render(
      <ScrollTo>
        {({ scroll }) => (
          <button
            type="button"
            onClick={() => scroll({ x: 100, y: 200, smooth: true })}
          >
            myBtn
          </button>
        )}
      </ScrollTo>
    );

    const buttonEl = getByText("myBtn");
    fireEvent.click(buttonEl as any);

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect((window.scrollTo as any).mock.calls[0]).toEqual([
      {
        left: 100,
        top: 200,
        behavior: "smooth",
      },
    ]);
  });

  it("Should scroll by ref when a DOM node is provided", () => {
    const refDOM = React.createRef<HTMLDivElement>();
    const { getByText } = render(
      <ScrollTo>
        {({ scroll }) => (
          <>
            <button
              type="button"
              onClick={() => scroll({ ref: refDOM, x: 100, y: 200 })}
            >
              myBtn
            </button>

            <div ref={refDOM}>test</div>
          </>
        )}
      </ScrollTo>
    );

    const buttonEl = getByText("myBtn");
    fireEvent.click(buttonEl as any);

    expect(refDOM.current).toMatchSnapshot();
  });

  it("Should scroll by ref when a React node is provided", () => {
    const refDOM = {} as React.RefObject<HTMLDivElement>;
    const MyElement = ({ children, ...props }) => (
      <div {...props}>{children}</div>
    );

    const { getByText } = render(
      <ScrollTo>
        {({ scroll }) => (
          <>
            <MyElement onClick={() => scroll({ ref: refDOM, x: 100, y: 200 })}>
              myBtn
            </MyElement>

            <div ref={() => {}}>test</div>
          </>
        )}
      </ScrollTo>
    );

    const buttonEl = getByText("myBtn");
    fireEvent.click(buttonEl as any);

    expect(refDOM.current).toMatchSnapshot();
  });
});
