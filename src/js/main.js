// Import our custom CSS
import '../scss/styles.scss';
import { setupHTEnv } from './lib/utils';

// Import all of Bootstrap's JS
// these are made available globally
import * as bootstrap from 'bootstrap';

import Quote from './components/Quote.svelte';
import LoginFormModal from './components/LoginFormModal';
import Header from './components/Header';
import ResultsPagination from './components/ResultsPagination';
import ResultsToolbar from './components/ResultsToolbar';
import CollectionsToolbar from './components/CollectionsToolbar';
import Footer from './components/Footer';
import AdvancedSearchForm from './components/AdvancedSearchForm';
import AcceptableUseBanner from './components/AcceptableUseBanner';

const toCamel = (s) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
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

      props[toCamel(attr.name.replace(propProperty, ''))] = value;
    }
  }
  return props;
};

const apps = {};
apps['hathi-quote'] = Quote;
apps['hathi-login-form-modal'] = LoginFormModal;
apps['hathi-website-header'] = Header;
apps['hathi-results-pagination'] = ResultsPagination;
apps['hathi-results-toolbar'] = ResultsToolbar;
apps['hathi-collections-toolbar'] = CollectionsToolbar;
apps['hathi-website-footer'] = Footer;
apps['hathi-advanced-search-form'] = AdvancedSearchForm;
apps['hathi-acceptable-use-banner'] = AcceptableUseBanner;

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

HT.postPingCallback = function () {
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
  setTimeout(() => {
    document.body.dataset.initialized = true;
  });
};

let script = document.createElement('script');
script.async = true;
script.src = `//${
  HT.service_domain
}/cgi/ping?callback=HT.postPingCallback&_${new Date().getTime()}`;
document.head.appendChild(script);

// look for buttons that trigger the appearance of
// svelte components

document.querySelectorAll('[data-hathi-trigger]').forEach((el) => {
  let slug = el.dataset.hathiTrigger;
  let props = buildProps(el);
  el.component = new apps[slug]({
    target: document.body,
    props: props,
    intro: true,
  });

  el.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    el.component.show();
  });
});

let btnToggleFilters = document.querySelector('#action-toggle-filters');
if ( btnToggleFilters ) {
  btnToggleFilters.addEventListener('click', (event) => {
    let isExpanded = ! ( btnToggleFilters.getAttribute('aria-expanded') == 'true' );
    btnToggleFilters.setAttribute('aria-expanded', isExpanded );
  })
}

export default apps;
