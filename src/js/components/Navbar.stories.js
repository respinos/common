import Navbar from "./Navbar.svelte";

export default {
  title: "Navbar",
  component: Navbar,
};

export const Default = {};
export const Mobile = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
};
