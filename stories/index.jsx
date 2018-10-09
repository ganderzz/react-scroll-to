import React from "react";
import { storiesOf } from "@storybook/react";

import { ScrollTo, ScrollArea, ScrollToHOC } from "../src";

const ScrollStory = storiesOf("ScrollTo", module);

ScrollStory.add("Default", () => (
  <div
    style={{
      height: "150vh",
      position: "relative",
      backgroundImage: "linear-gradient(#FFF, #333)"
    }}
  >
    <ScrollTo>
      {({ scrollTo }) => (
        <React.Fragment>
          <button
            type="button"
            style={{ padding: 20 }}
            onClick={() => scrollTo({ y: 500 })}
          >
            Scroll Down!
          </button>

          <button
            type="button"
            style={{ padding: 20, position: "absolute", left: 0, bottom: 0 }}
            onClick={() => scrollTo({ y: 0, smooth: true })}
          >
            Scroll Up!
          </button>
        </React.Fragment>
      )}
    </ScrollTo>
  </div>
));

ScrollStory.add("With ScrollArea", () => (
  <div>
    <ScrollTo>
      {({ scrollTo }) => (
        <React.Fragment>
          <button
            type="button"
            style={{ padding: 5 }}
            onClick={() => scrollTo({ x: 0, y: 1000, smooth: true })}
          >
            Scroll area down
          </button>

          <ScrollArea
            id="my-scroll-area"
            style={{
              height: "50vh",
              overflow: "auto",
              background: "#222",
              position: "relative",
              padding: 10
            }}
          >
            <span style={{ color: "#FFF", fontSize: "2rem" }}>
              ^ Click the button
            </span>
            <div style={{ height: "1000px" }} />
            <span style={{ color: "#FFF", fontSize: "2rem" }}>
              HELLO!
              <button
                type="button"
                style={{ padding: 5, margin: 5 }}
                onClick={() =>
                  scrollTo({ id: "my-scroll-area", x: 0, y: 0, smooth: true })
                }
              >
                Scroll area up
              </button>
            </span>
          </ScrollArea>

          <div style={{ height: "50vh", overflow: "auto", background: "#888" }}>
            <span style={{ color: "#FFF", fontSize: "2rem" }}>
              I don't move.
            </span>
            <div style={{ height: "200vh" }} />
          </div>
        </React.Fragment>
      )}
    </ScrollTo>
  </div>
));

ScrollStory.add("Higher Order Component", () => {
  const YButton = ScrollToHOC(props => (
    <button
      type="button"
      onClick={() => props.scrollTo({ x: 0, y: props.y || 0 })}
      style={props.style}
    >
      {props.children}
    </button>
  ));

  return (
    <div style={{ height: "2000px", position: "relative" }}>
      <YButton y={2000}>bottom</YButton>

      <YButton y={0} style={{ position: "absolute", bottom: 0, left: 0 }}>
        top
      </YButton>
    </div>
  );
});

const refDOM = React.createRef();

ScrollStory.add("Scroll by Ref", () => {
  return (
    <div style={{ overflow: "auto" }}>
      <ScrollTo>
        {({ scrollTo }) => (
          <React.Fragment>
            <button
              type="button"
              style={{ padding: 20 }}
              onClick={() => scrollTo({ ref: refDOM, y: 500 })}
            >
              Scroll Ref Down
            </button>
          </React.Fragment>
        )}
      </ScrollTo>

      <div
        ref={refDOM}
        style={{
          marginTop: 20,
          background: "#F1F1F1",
          height: 1000,
          maxHeight: 100,
          overflow: "auto",
          position: "relative"
        }}
      >
        <div style={{ height: 1000 }}>My Content with Ref</div>
      </div>
    </div>
  );
});
