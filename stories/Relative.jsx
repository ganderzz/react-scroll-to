import React from "react";
import { ScrollStory } from "./";
import { ScrollTo } from "../src";

ScrollStory.add("Relative Scroll", () => (
  <div
    style={{
      height: 4000,
      position: "relative",
      padding: 20,
      backgroundImage: "linear-gradient(#FFF, #111)"
    }}
  >
    <ScrollTo>
      {({ scrollTo, relative }) => (
        <React.Fragment>
          <button
            type="button"
            onClick={() => scrollTo({ y: 99999, smooth: true })}
          >
            Scroll Down!
          </button>

          <button
            type="button"
            style={{ position: "absolute", left: 20, top: "50%" }}
            onClick={() => scrollTo({ y: 0, smooth: true })}
          >
            Scroll Up!
          </button>

          <button
            type="button"
            style={{ position: "absolute", left: 20, bottom: 20 }}
            onClick={() => scrollTo({ y: relative(-1900), smooth: true })}
          >
            Scroll Up 50%!
          </button>
        </React.Fragment>
      )}
    </ScrollTo>
  </div>
));
