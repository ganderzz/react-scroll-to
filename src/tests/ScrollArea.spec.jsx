import React from "react";
import { render } from "react-testing-library";
import { ScrollToContext } from "../ScrollTo";
import ScrollArea, { ScrollArea as BaseScrollArea } from "../ScrollArea";

jest.mock("../utilities/generateId", () => () => "mock-id");

describe("Test Scroll Area.", () => {
  it("should call addScrollArea when mounting.", () => {
    const addScrollArea = jest.fn();
    const wrapper = render(
      <BaseScrollArea addScrollArea={addScrollArea} removeScrollArea={() => {}}>
        <h1>Test</h1>
      </BaseScrollArea>
    );

    expect(addScrollArea).toHaveBeenCalledTimes(1);
    expect(addScrollArea.mock.calls[0]).toMatchSnapshot();
  });

  it("should call removeScrollArea when unmounting.", () => {
    const removeScrollArea = jest.fn();
    const wrapper = render(
      <BaseScrollArea addScrollArea={() => {}} removeScrollArea={removeScrollArea}>
        <h1>Test</h1>
      </BaseScrollArea>
    );
    wrapper.unmount();

    expect(removeScrollArea).toHaveBeenCalledTimes(1);
    expect(removeScrollArea.mock.calls[0]).toMatchSnapshot();
  });

  it("should render correctly.", () => {
    const wrapper = render(
      <BaseScrollArea
        className="foo"
        addScrollArea={() => {}}
        removeScrollArea={() => {}}
      >
        <h1>Test</h1>
      </BaseScrollArea>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should render default context.", () => {
    const fns = {
      addScrollArea: () => {},
      removeScrollArea: () => {}
    }

    const wrapper = render(
      <ScrollToContext.Provider value={fns}>
        <ScrollArea style={{ padding: 20 }}>
          test
        </ScrollArea>
      </ScrollToContext.Provider>
    );
  })
});
