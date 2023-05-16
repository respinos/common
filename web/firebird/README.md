## So far

Working towards replacing https://github.com/hathitrust/common

- [x] include bootstrap as a dependency
- [-] include Mulish
  - [ ] as local dependency
- [x] collect color properties from Phire Design
- [-] collect typography properties
  - [x] headings
  - [ ] paragraphs
- [x] forms (in progress)

## Using

To run:

```
npm install
npm run start
```

Icons currently are included via a `<script>` call, due to [this issue](https://github.com/FortAwesome/Font-Awesome/issues/19535).

```
<script src="https://kit.fontawesome.com/1c6c3b2b35.js" crossorigin="anonymous"></script>
```

## On `setupHTEnv`

`lib/utils.js` starts pointing some `common` functionality to this new 
environment. The *how* is subject to change as this project evolves.

* `HT.prefs.set` and `HT.prefs.get`
* configuring the various domains:
  * `HT.service_domain`
  * `HT.catalog_domain`
  * `HT.www_domain`
  * `HT.cookies_domain`


## On accessing `ping`

The `navbar_login_example.html` has a NOP handler for invoking the `ping` utility:

```html
  <script>
    function ping_handler(status) {};
  </script>
  <script src="https://babel.hathitrust.org/cgi/ping"></script>
```

`ping` returns a JSONP response, invoking `ping_handler()` and the `LoginForm` component checks for the presence of `HT.login_status` to build its institution list.
