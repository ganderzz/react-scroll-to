import { configure } from "@storybook/react";

function loadStories() {
  require("../stories/Default.jsx");
  require("../stories/HigherOrderComponent.jsx");
  require("../stories/ScrollByRef.jsx");
  require("../stories/WithScrollArea.jsx");
}

configure(loadStories, module);
