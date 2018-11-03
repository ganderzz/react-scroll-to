import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import ScrollToHOC from "../ScrollToHOC";

afterAll(cleanup);

beforeEach(() => {
  window.scrollTo = jest.fn();
});

describe("Test HOC.", () => {
  it("Should render the functional children.", () => {
    const TestComponent = () => <div>test</div>;
    TestComponent.displayName = "test";

    const WrappedComponent = ScrollToHOC(TestComponent);
    const { container } = render(<WrappedComponent />);

    expect(container).toMatchSnapshot();
  });

  it("Should call window.scroll.", () => {
    const TestComponent = props => (
      <button onClick={() => props.scrollTo({ x: 100, y: 200 })}>mybtn</button>
    );
    TestComponent.displayName = "test";

    const WrappedComponent = ScrollToHOC(TestComponent);
    const { getByText } = render(<WrappedComponent />);

    fireEvent.click(getByText("mybtn"));

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo.mock.calls[0]).toEqual([
      {
        left: 100,
        top: 200,
        behavior: "auto"
      }
    ]);
  });

  it("Should call scrollById.", () => {
    const WrappedComponent = ScrollToHOC(props => {
      return (
        <div>
          <div id="foo" />
          <button onClick={() => props.scrollTo({ id: "foo", x: 100, y: 200 })}>
            test
          </button>
        </div>
      );
    });

    const { getByText, container } = render(<WrappedComponent />);

    fireEvent.click(getByText("test"));

    expect(container).toMatchSnapshot();
  });
});
