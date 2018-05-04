import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import { ScrollToContext } from "../ScrollTo";
import { ScrollArea } from "../ScrollArea";
jest.mock("../utilities/generateId", () => () => "mock-id");

describe("Test Scroll Area.", () => {
  it("should call addScrollArea when mounting.", () => {
    const addScrollArea = jest.fn();
    const wrapper = mount(
      <ScrollArea addScrollArea={addScrollArea} removeScrollArea={() => {}}>
        <h1>Test</h1>
      </ScrollArea>
    );

    expect(addScrollArea).toHaveBeenCalledTimes(1);
    expect(addScrollArea.mock.calls[0]).toMatchSnapshot();
  });

  it("should call removeScrollArea when unmounting.", () => {
    const removeScrollArea = jest.fn();
    const wrapper = mount(
      <ScrollArea addScrollArea={() => {}} removeScrollArea={removeScrollArea}>
        <h1>Test</h1>
      </ScrollArea>
    );
    wrapper.unmount();

    expect(removeScrollArea).toHaveBeenCalledTimes(1);
    expect(removeScrollArea.mock.calls[0]).toMatchSnapshot();
  });

  it("should render correctly.", () => {
    const wrapper = mount(
      <ScrollArea
        className="foo"
        addScrollArea={() => {}}
        removeScrollArea={() => {}}
      >
        <h1>Test</h1>
      </ScrollArea>
    );

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
