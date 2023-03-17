// Import our custom CSS
import "../scss/styles.scss";
import { setupHTEnv } from "./lib/utils";

// Import all of Bootstrap's JS
// these are made available globally
import * as bootstrap from "bootstrap";

import Quote from "./components/Quote.svelte";
import LoginForm from "./components/LoginForm.svelte";

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

const buildProps = (el) => {
  let propProperty = `data-prop-`;
  let props = {};
  for (const attr of el.attributes) {
    if (attr.name.startsWith(propProperty)) {
      let value = attr.value;
      try {
        value = JSON.parse(value);
      } catch (error) {}

      props[toCamel(attr.name.replace(propProperty, ""))] = value;
    }
  }
  return props;
};

const apps = {};
apps["hathi-quote"] = Quote;
apps["hathi-login-form"] = LoginForm;

// configure the HT global
setupHTEnv();

// // APPROACH: look for wrapper elements, e.g. <div data-hathi-use="website-header">
// document.querySelectorAll('[data-hathi-use]').forEach((el) => {
//   let slug = el.dataset.hathiUse;
//   let props = {};
//   let component = new apps[slug]({
//     target: el,
//     props: props,
//   })
// })

// APPROACH: look for custom elements and instantiate
// the svelte component inside that element
Object.keys(apps).forEach((slug) => {
  document.querySelectorAll(slug).forEach((el) => {
    let props = buildProps(el);
    el.component = new apps[slug]({
      target: el,
      props: props,
    });
  });
});

// look for buttons that trigger the appearance of
// svelte components
document.querySelectorAll("[data-hathi-trigger]").forEach((el) => {
  let slug = el.dataset.hathiTrigger;
  let props = buildProps(el);
  el.component = new apps[slug]({
    target: document.body,
    props: props,
  });

  el.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    el.component.isOpen = true;
  });
});

export default apps;
