import { themes } from "@storybook/theming";

// or global addParameters
export const parameters = {
  docs: {
    theme: themes.dark,
  },
  layout: "padded",
  actions: { argTypesRegex: "^on[A-Z].*" },
};
