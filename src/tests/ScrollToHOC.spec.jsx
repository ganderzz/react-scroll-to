import React from "react";
import { render, Simulate } from "react-testing-library";
import ScrollToHOC from "../ScrollToHOC";

beforeEach(() => {
  window.scroll = jest.fn();
});

describe("Test HOC.", () => {
  it("Should render the functional children.", () => {
    const TestComponent = () => <div>test</div>;
    TestComponent.displayName = "test";

    const WrappedComponent = ScrollToHOC(TestComponent);
    const wrapper = render(<WrappedComponent />);

    expect(wrapper).toMatchSnapshot();
  });

  it("Should call window.scroll.", () => {
    const TestComponent = props => (
      <button onClick={() => props.scrollTo(100, 200)}>test</button>
    );
    TestComponent.displayName = "test";

    const WrappedComponent = ScrollToHOC(TestComponent);
    const wrapper = render(<WrappedComponent />);

    Simulate.click(wrapper.getByText("test"));

    expect(window.scroll).toHaveBeenCalledTimes(1);
    expect(window.scroll.mock.calls[0]).toEqual([100, 200]);
  });

  it("Should call scrollById.", () => {
    const WrappedComponent = ScrollToHOC(props => {
      return (
        <div>
          <div id="foo" />
          <button onClick={() => props.scrollById("foo", 100, 200)}>
            test
          </button>
        </div>
      );
    });

    const wrapper = render(<WrappedComponent />);

    Simulate.click(wrapper.getByText("test"));

    expect(wrapper).toMatchSnapshot();
  });
});
