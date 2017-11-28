import React from "react";
import PropTypes from "prop-types";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import ScrollTo from "./ScrollTo";

beforeEach(() => {
  window.scroll = jest.fn();
});

describe("Test render prop.", () => {
  it("Should render the functional children.", () => {
    const wrapper = shallow(<ScrollTo>{scroll => <div>test</div>}</ScrollTo>);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("Should render nothing nothing on undefined.", () => {
    const wrapper = shallow(<ScrollTo>{undefined}</ScrollTo>);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("Should call window.scroll.", () => {
    const wrapper = shallow(
      <ScrollTo>
        {scroll => <button onClick={() => scroll(100, 200)}>test</button>}
      </ScrollTo>
    );

    const buttonEl = wrapper.find("button");
    buttonEl.simulate("click");

    expect(window.scroll).toHaveBeenCalledTimes(1);
    expect(window.scroll.mock.calls[0]).toEqual([100, 200]);
  });

  it("Should call window.scroll with default x,y when no arguments are provided.", () => {
    const wrapper = shallow(
      <ScrollTo>
        {scroll => <button onClick={() => scroll()}>test</button>}
      </ScrollTo>
    );

    const buttonEl = wrapper.find("button");
    buttonEl.simulate("click");

    expect(window.scroll).toHaveBeenCalledTimes(1);
    expect(window.scroll.mock.calls[0]).toEqual([0, 0]);
  });

  it("Should pass correct context to children.", () => {
    const wrapper = shallow(
      <ScrollTo>
      {scroll => <div>Test</div>}
      </ScrollTo>
    );

    expect(wrapper.instance().getChildContext()).toMatchSnapshot();
  });

  it("Should add scroll area.", () => {
    const wrapper = shallow(
      <ScrollTo>
        {scroll => <div>Test</div>}
      </ScrollTo>
    );

    const childContext = wrapper.instance().getChildContext()
    childContext.addScrollArea("foo");

    expect(wrapper.instance().scrollArea).toMatchSnapshot("foo");
  });

  it("Should remove scroll area.", () => {
    const wrapper = shallow(
      <ScrollTo>
        {scroll => <div>Test</div>}
      </ScrollTo>
    );
    const childContext = wrapper.instance().getChildContext()
    childContext.addScrollArea("foo");

    childContext.removeScrollArea("foo");

    expect(wrapper.instance().scrollArea).toEqual([]);
  });

  it("Should update scroll position of ScrollArea's if present, rather than window", () => {
    const mockNode = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const wrapper = shallow(
      <ScrollTo>
        {scroll => <button onClick={() => scroll(100, 200)}>test</button>}
      </ScrollTo>
    );
    const childContext = wrapper.instance().getChildContext()
    childContext.addScrollArea(mockNode);

    const buttonEl = wrapper.find("button");
    buttonEl.simulate("click");

    expect(mockNode).toMatchSnapshot();
  });
});
