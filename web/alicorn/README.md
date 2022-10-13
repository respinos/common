## Overview

`common` is available on each www/babel/catalog server; all applications rely on these styles and javascripts for their base functionality.

HathiTrust currently supports browsers that can complete the `https` connection, which means more than the "evergreen" set. We attempt to test against current and recent versions of the usual (Chrome, Safari, Firefox, Edge) and IE11. Ocassionally we'll review IE11 usage in the analytics, and weep that it's still present.

## Build Environment

Currently using **node LTS (v16)**.

Bundling is organized by a `gulpfile.js` with tasks for building

* `scripts`: builds the short main `utils.201910.js` script
* `scripts-bundle`: the common functionality split out to satisfy Lighthouse reports
* `sass`: builds the `main.201910.css` stylesheet
* various `watch` tasks to use during development

Currently to release an update, the build products are committed to the repository (`alicorn/js` and `alicorn/css`).

## Styles

Stylesheets are written in SCSS, and currently are processed through `node-sass` and `autoprefixer`.

```
src/scss
├── main.scss
├── components
│  ├── _advanced_search_form.scss
│  ├── _alerts.scss
│  ├── _drupal.scss
│  ├── _form.scss
│  ├── _layout.scss
│  ├── _login.scss
│  ├── _modal.scss
│  ├── _nav.scss
│  ├── _notifications.scss
│  ├── _reset.scss
│  ├── _responsive.scss
│  ├── _search.scss
│  ├── _sidebar.scss
│  ├── _skiplinks.scss
│  ├── _tooltips.scss
└──└── _variables.scss
node_modules/bootstrap/scss
├── _button-group.scss
├── _dropdown.scss
├── _functions.scss
├── _utilities.scss
└── _variables.scss
vendor/selectwoo/dist/css
└── selectWoo.scss
../unicorn/vendor/icomoon
├── style.scss
└── variables.scss
```

The `common` stylesheets use a [custom icon font](https://babel.hathitrust.org/common/unicorn/vendor/icomoon/demo.html) that had been shared between `unicorn` and `alicorn` and lives in `unicorn/vendor/icomoon`.

There was a desire with `alicorn` to minimize framework dependencies, only pulling in external utilities when necessary: Bootstrap dropdowns and the `selectWoo` styles we use for a combo-box on the login forms.

The core layout organizes organizes the page into `header + main + footer` regions and uses CSS Grid. In most applications, `main` uses CSS Flexbox to handle specific page layout.

The styles use `data` attributes to handle application state.

(The exception is `pt`: all the exceptions are `pt`.)

## Javascript

The `common` javascript leans toward vanilla javascript, but still leverages **jQuery** because the one thing vanilla javascript cannot do neatly is replacing jQuery event delegation.

```
src/js
└── main.js
├── components
│   ├── advanced_search_form.js
│   ├── bootbox.js
│   ├── collection_tools.js
│   ├── feedback.js
│   ├── google_analytics.js
│   ├── ht_search_form.js
│   ├── login.js
│   ├── menus.js
│   ├── notifications.js
│   ├── search.js
│   ├── staging.js
└── └── tooltips.js
node_modules/@popperjs/core/dist/umd
└── popper.min.js
node_modules/bootstrap/js/dist
├── dom
│   ├── event-handler.js
│   ├── data.js
│   ├── manipulator.js
│   └── selector-engine.js
├── base-component.js
└── dropdown.js
vendor
├── jquery.cookie.js
├── purl.js
├── social_links.js
└── vendor/selectwoo/dist/js/select2.full.js
```

The scripts in `common` should more or less be obvious (as opposed to `pt`), but some unpacking follows.

`main.js` is responsible for quickly setting up the application environment:

* configuring some core polyfills
* setting up the global `HT` variable
* parsing `HT.prefs` out of the user's cookies
* configuring `HT.service_domain`, `HT.catalog_domain`, and `HT.www_domain` to be able to direct users around the properties
* handling WAYF-less authentication when the `singon=swle:` parameter is detected
* configuring the `HT.update_status` handler, which is used to announce page changes to screen readers
* configuring a simple transition to make it obvious to when a request is being loaded
* setting up the JSONP invocation of `ping`, which drive notifications and login status

`login.js` handles the authentication state for the applications --- users actually authenticate only to `babel.hathitrust.org`, and `ping` reflects that status to `www` and `catalog`: 

* `login.js` _used_ to invoke the `ping` request, which is reflected in the code
* if the user has not authenticated, the `ping` data is used to configure the login panel
* if user has authenticated, we detect whether the user has any allowed roles beyond "member" and configure the role action (via `status.r`)

`feedback.js` sets up the feedback collector modal; this is scheduled to change soon.

`collection_tools.js` supports the Collection Builder (`mb`) widgets used around the applications.

`advanced_search_form.js` supports both Catalog (`catalog`) and Full-Text (`ls`) advanced search forms, and is modeled on https://search.lib.umich.edu/catalog/advanced.

`google_analytics.js` handles our efforts to log requests to Universal Analytics. Also subject to change soon.