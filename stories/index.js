import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { ScrollTo, ScrollArea } from "../src";

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
                <button style={{ padding: 5, margin: 5 }} onClick={() => scrollTo(0, 0)}>
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
  ));
