import React from "react";
import { render } from "react-testing-library";
import { ScrollToContext } from "../ScrollTo";
import ScrollArea from "../ScrollArea";

jest.mock("../utilities/generateId", () => () => "mock-id");

const BaseScrollArea = props => {
  const { addScrollArea, removeScrollArea, ...rest } = props;

  return (
    <ScrollToContext.Provider value={{ addScrollArea, removeScrollArea }}>
      <ScrollArea {...rest} />
    </ScrollToContext.Provider>
  );
};

describe("Test Scroll Area.", () => {
  it("should call addScrollArea when mounting.", () => {
    const addScrollArea = jest.fn();
    render(
      <BaseScrollArea addScrollArea={addScrollArea} removeScrollArea={() => {}}>
        <h1>Test</h1>
      </BaseScrollArea>
    );

    expect(addScrollArea).toHaveBeenCalledTimes(1);
    expect(addScrollArea.mock.calls[0]).toMatchSnapshot();
  });

  it("should call removeScrollArea when unmounting.", () => {
    const removeScrollArea = jest.fn();
    const { unmount } = render(
      <BaseScrollArea
        addScrollArea={() => {}}
        removeScrollArea={removeScrollArea}
      >
        <h1>Test</h1>
      </BaseScrollArea>
    );

    unmount();

    expect(removeScrollArea).toHaveBeenCalledTimes(1);
    expect(removeScrollArea.mock.calls[0]).toMatchSnapshot();
  });

  it("should render correctly.", () => {
    const { container } = render(
      <BaseScrollArea
        className="foo"
        addScrollArea={() => {}}
        removeScrollArea={() => {}}
      >
        <h1>Test</h1>
      </BaseScrollArea>
    );

    expect(container).toMatchSnapshot();
  });

  // Used to make coverage 100%
  it("should render default context.", () => {
    const fns = {
      addScrollArea: jest.fn(),
      removeScrollArea: jest.fn()
    };

    const { container, debug } = render(
      <ScrollToContext.Provider value={fns}>
        <ScrollArea style={{ padding: 20 }}>test</ScrollArea>
      </ScrollToContext.Provider>
    );
  });
});
