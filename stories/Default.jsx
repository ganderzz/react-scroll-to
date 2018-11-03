import React from "react";
import { ScrollStory } from "./";
import { ScrollTo } from "../src";

ScrollStory.add("Default", () => (
  <div
    style={{
      height: "150vh",
      position: "relative",
      padding: 20,
      backgroundImage: "linear-gradient(#FFF, #111)"
    }}
  >
    <ScrollTo>
      {({ scrollTo }) => (
        <React.Fragment>
          <button type="button" onClick={() => scrollTo({ y: 500 })}>
            Scroll Down!
          </button>

          <button
            type="button"
            style={{ position: "absolute", left: 20, bottom: 20 }}
            onClick={() => scrollTo({ y: 0, smooth: true })}
          >
            Scroll Up!
          </button>
        </React.Fragment>
      )}
    </ScrollTo>
  </div>
));
