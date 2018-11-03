import React from "react";
import { ScrollStory } from "./";
import { ScrollTo, ScrollArea } from "../src";

ScrollStory.add("With ScrollArea", () => (
  <div style={{ padding: 20 }}>
    <ScrollTo>
      {({ scrollTo }) => (
        <React.Fragment>
          <button
            type="button"
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
              padding: 20,
              position: "relative"
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
                style={{ marginLeft: 5 }}
                onClick={() =>
                  scrollTo({ id: "my-scroll-area", x: 0, y: 0, smooth: true })
                }
              >
                Scroll area up
              </button>
            </span>
          </ScrollArea>

          <div
            style={{
              height: "50vh",
              padding: 20,
              overflow: "auto",
              background: "#888"
            }}
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
