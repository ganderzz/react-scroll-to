import React from "react";
import { ScrollStory } from "./";
import { ScrollToHOC } from "../src";

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
    <div
      style={{
        height: "2000px",
        padding: 20,
        position: "relative",
        backgroundImage: "linear-gradient(#FFF, #111)"
      }}
    >
      <YButton y={2000}>Scroll Down</YButton>

      <YButton y={0} style={{ position: "absolute", bottom: 20, left: 20 }}>
        Scroll Up
      </YButton>
    </div>
  );
});
