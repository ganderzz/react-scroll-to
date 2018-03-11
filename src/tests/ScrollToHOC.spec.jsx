import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import ScrollToHOC from "../ScrollToHOC";

beforeEach(() => {
  window.scroll = jest.fn();
});

describe("Test HOC.", () => {
  it("Should render the functional children.", () => {
    const TestComponent = () => <div>test</div>;
    TestComponent.displayName = "test";
    const WrappedComponent = ScrollToHOC(TestComponent);
    const wrapper = mount(<WrappedComponent />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("Should call window.scroll.", () => {
    const TestComponent = props => (
      <button onClick={() => props.scroll(100, 200)}>test</button>
    );
    TestComponent.displayName = "test";
    const WrappedComponent = ScrollToHOC(TestComponent);
    const wrapper = mount(<WrappedComponent />);

    const buttonEl = wrapper.find("button");
    buttonEl.simulate("click");

    expect(window.scroll).toHaveBeenCalledTimes(1);
    expect(window.scroll.mock.calls[0]).toEqual([100, 200]);
  });
});
