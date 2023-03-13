import "../../scss/styles.scss";
import * as bootstrap from "bootstrap";
import Navbar from "./Navbar.svelte";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/svelte/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components/Navbar",
  component: Navbar,
};

export const Default = () => ({
  Component: Navbar,
});
