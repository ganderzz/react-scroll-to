import React from "react";
import { render, cleanup, fireEvent } from "react-testing-library";
import { shallow } from "enzyme";
import ScrollTo from "../ScrollTo";

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
        {({ scrollTo }) => (
          <button onClick={() => scrollTo({ x: 100, y: 200 })}>test</button>
        )}
      </ScrollTo>
    );

    fireEvent.click(container.querySelector("button"));

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo.mock.calls[0]).toEqual([
      {
        left: 100,
        top: 200,
        behavior: "auto"
      }
    ]);
  });

  it("Should call window.scrollTo with default x,y when no arguments are provided.", () => {
    const { container } = render(
      <ScrollTo>
        {({ scrollTo }) => <button onClick={() => scrollTo()}>test</button>}
      </ScrollTo>
    );

    fireEvent.click(container.querySelector("button"));

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo.mock.calls[0]).toEqual([
      {
        left: undefined,
        top: undefined,
        behavior: "auto"
      }
    ]);
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
        {({ scrollTo }) => (
          <button onClick={() => scrollTo({ x: 100, y: 200 })}>test</button>
        )}
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
        {({ scrollTo }) => (
          <button onClick={() => scrollTo({ id: "foo", x: 100, y: 200 })}>
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

  it("Should not break if scrolling by an unknown ID", () => {
    const mockNode = {
      scrollLeft: 0,
      scrollTop: 0,
      id: "foo"
    };
    const wrapper = shallow(
      <ScrollTo>
        {({ scrollTo }) => (
          <button
            onClick={() => scrollTo({ id: "unknown-id", x: 100, y: 200 })}
          >
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
