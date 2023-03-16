/** @type { import('@storybook/svelte').Preview } */
import "../src/scss/styles.scss";
import * as bootstrap from "bootstrap";

const preview = {
  parameters: {
    backgrounds: {
      default: "clear",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
