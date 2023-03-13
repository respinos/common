// Import our custom CSS
import '../scss/styles.scss'
import { setupHTEnv } from './lib/utils';

// Import all of Bootstrap's JS
// these are made available globally
import * as bootstrap from 'bootstrap'

import Button from './Button.svelte';
import LoginForm from './WayfForm.svelte'

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

const apps = {};
apps['hathi-button'] = Button;
apps['hathi-login-form'] = LoginForm;

setupHTEnv();

document.querySelectorAll('[data-hathi-use]').forEach((el) => {
  let slug = el.dataset.hathiUse;
  let props = {};
  let component = new apps[slug]({
    target: el,
    props: props,
  })
})

Object.keys(apps).forEach((slug) => {
  document.querySelectorAll(slug).forEach((el) => {
    let props = {};
    el.component = new apps[slug]({
      target: el,
      props: props,
    })
  })
})

document.querySelectorAll('[data-hathi-trigger]').forEach((el) => {
  let slug = el.dataset.hathiTrigger;
  let props = {};
  let slugProperty = `data-${slug}-`;
  for(const attr of el.attributes) {
    if (attr.name.startsWith(slugProperty)) {
      let value = attr.value;
      try {
        value = JSON.parse(value);
      } catch(error) {}

      props[toCamel(attr.name.replace(slugProperty, ''))] = value;
    }
  }

  el.component = new apps[slug]({
    target: document.body,
    props: props
  });

  el.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    el.component.isOpen = true;
    window.component = el.component;
  })
})

export default apps;