// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

import App from "./App.svelte";
// import "bootstrap/dist/css/bootstrap.min.css";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
