import * as React from "react";
import { ScrollStory } from ".";
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
      {({ scroll }) => (
        <React.Fragment>
          <button
            type="button"
            onClick={() => scroll({ y: 500, smooth: true })}
          >
            Scroll Down!
          </button>

          <button
            type="button"
            style={{ position: "absolute", left: 20, bottom: 20 }}
            onClick={() => scroll({ y: 0, smooth: true })}
          >
            Scroll Up!
          </button>
        </React.Fragment>
      )}
    </ScrollTo>
  </div>
));
