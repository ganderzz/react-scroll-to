import React from "react";
import { storiesOf } from "@storybook/react";

import { ScrollTo, ScrollArea, ScrollToHOC } from "../src";

storiesOf("ScrollTo", module)
  .add("default", () => (
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
            <button style={{ padding: 20 }} onClick={() => scrollTo(0, 500)}>
              Scroll Down!
            </button>

            <button
              style={{ padding: 20, position: "absolute", left: 0, bottom: 0 }}
              onClick={() => scrollTo(0, 0)}
            >
              Scroll Up!
            </button>
          </React.Fragment>
        )}
      </ScrollTo>
    </div>
  ))
  .add("with ScrollArea", () => (
    <div>
      <ScrollTo>
        {({ scrollTo }) => (
          <React.Fragment>
            <button style={{ padding: 5 }} onClick={() => scrollTo(0, 1000)}>
              Scroll area down
            </button>

            <ScrollArea
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
                  style={{ padding: 5, margin: 5 }}
                  onClick={() => scrollTo(0, 0)}
                >
                  Scroll area up
                </button>
              </span>
            </ScrollArea>

            <div
              style={{ height: "50vh", overflow: "auto", background: "#888" }}
            >
              <span style={{ color: "#FFF", fontSize: "2rem" }}>
                I don't move.
              </span>
              <div style={{ height: "200vh" }} />
            </div>
          </React.Fragment>
        )}
      </ScrollTo>
    </div>
  ))
  .add("higher order component", () => {
    const YButton = ScrollToHOC(props => (
      <button onClick={() => props.scrollTo(0, props.y || 0)} style={props.style}>
        {props.children}
      </button>
    ));

    return (
        <div style={{ height: "2000px", position: "relative" }}>
            <YButton y={2000}>
                bottom
            </YButton>

            <YButton y={0} style={{ position: "absolute", bottom: 0, left: 0 }}>
                top
            </YButton>
        </div>
    );
  });
