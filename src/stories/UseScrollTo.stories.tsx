import * as React from "react";
import { useScrollTo } from "../UseScrollTo";

export default {
  title: "useScrollTo",
};

export function UseScrollToBasic() {
  const { scroll } = useScrollTo();
  const ref = React.useRef(null);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "150vh",
        overflowY: "auto",
        position: "absolute",
      }}
    >
      <button onClick={() => scroll({ y: 9999, smooth: true })}>
        Scroll Down
      </button>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 20,
          right: 20,
          color: "#FFF",
        }}
        ref={ref}
      >
        <h1>Hey there, how's it going? 👋</h1>
        <p>Welcome to the bottom</p>
      </div>
    </div>
  );
}
