import React from "react";
import { render, Simulate } from "react-testing-library";
import { shallow } from "enzyme";
import ScrollTo from "../ScrollTo";

beforeEach(() => {
  window.scroll = jest.fn();
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

  it("Should call window.scroll.", () => {
    const { container } = render(
      <ScrollTo>
        {({ scrollTo }) => <button onClick={() => scrollTo(100, 200)}>test</button>}
      </ScrollTo>
    );

    Simulate.click(container.querySelector("button"));

    expect(window.scroll).toHaveBeenCalledTimes(1);
    expect(window.scroll.mock.calls[0]).toEqual([100, 200]);
  });

  it("Should call window.scroll with default x,y when no arguments are provided.", () => {
    const { container } = render(
      <ScrollTo>
        {({ scrollTo }) => <button onClick={() => scrollTo()}>test</button>}
      </ScrollTo>
    );

    Simulate.click(container.querySelector("button"));

    expect(window.scroll).toHaveBeenCalledTimes(1);
    expect(window.scroll.mock.calls[0]).toEqual([0, 0]);
  });

  it("Should remove scroll area.", () => {
    const wrapper = shallow(<ScrollTo>{() => <div>Test</div>}</ScrollTo>);
    const childContext = wrapper.instance().getContext;
    childContext.addScrollArea("id", "foo");

    childContext.removeScrollArea("id");

    expect(wrapper.instance().scrollArea).toEqual({});
  });

  it("Should update scroll position of ScrollArea's if present, rather than window", () => {
    const mockNode = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const wrapper = shallow(
      <ScrollTo>
        {({ scrollTo }) => <button onClick={() => scrollTo(100, 200)}>test</button>}
      </ScrollTo>
    );
    const childContext = wrapper.instance().getContext;
    childContext.addScrollArea("id", mockNode);

    const buttonEl = wrapper.find("button");
    buttonEl.simulate("click");

    expect(mockNode).toMatchSnapshot();
  });

  it("Should scroll by ID", () => {
    const mockNode = {
      scrollLeft: 0,
      scrollTop: 0,
      id: "foo"
    };
    const wrapper = shallow(
      <ScrollTo>
        {({ scrollById }) => (
          <button onClick={() => scrollById("foo", 100, 200)}>test</button>
        )}
      </ScrollTo>
    );
    const childContext = wrapper.instance().getContext;
    childContext.addScrollArea("foo", mockNode);

    const buttonEl = wrapper.find("button");
    buttonEl.simulate("click");

    expect(mockNode).toMatchSnapshot();
  });

  it("Should not break if scrolling by an unknown ID", () => {
    const mockNode = {
      scrollLeft: 0,
      scrollTop: 0,
      id: "foo"
    };
    const wrapper = shallow(
      <ScrollTo>
        {({ scrollById }) => (
          <button onClick={() => scrollById("unknown-id", 100, 200)}>
            test
          </button>
        )}
      </ScrollTo>
    );
    const childContext = wrapper.instance().getContext;
    childContext.addScrollArea("foo", mockNode);

    const buttonEl = wrapper.find("button");
    buttonEl.simulate("click");

    expect(mockNode).toMatchSnapshot();
  });
});
