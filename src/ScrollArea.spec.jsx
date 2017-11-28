import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import ScrollArea from "./ScrollArea";

describe("Test Scroll Area.", () => {
  it("should call addScrollArea when mounting.", () => {
    const addScrollArea = jest.fn();
    const wrapper = mount(
      <ScrollArea>
        <h1>Test</h1>
      </ScrollArea>,
      {
        context: { addScrollArea, removeScrollArea: () => {} }
      }
    );

    expect(addScrollArea).toHaveBeenCalledTimes(1);
    expect(addScrollArea.mock.calls[0]).toMatchSnapshot();
  });

  it("should call removeScrollArea when unmounting.", () => {
    const removeScrollArea = jest.fn();
    const wrapper = mount(
      <ScrollArea>
        <h1>Test</h1>
      </ScrollArea>,
      {
        context: { addScrollArea: () => {}, removeScrollArea }
      }
    );
    wrapper.unmount();

    expect(removeScrollArea).toHaveBeenCalledTimes(1);
    expect(removeScrollArea.mock.calls[0]).toMatchSnapshot();
  });

  it("should render correctly.", () => {
    const wrapper = shallow(
      <ScrollArea className="foo">
        <h1>Test</h1>
      </ScrollArea>,
      { context: { addScrollArea: () => {}, removeScrollArea: () => {} } }
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
