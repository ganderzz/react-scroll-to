import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import { ScrollTo, ScrollToHOC } from "./";

beforeEach(() => {
  window.scroll = jest.fn();
});

describe("Test ScrollTo Component.", () => {
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
});
