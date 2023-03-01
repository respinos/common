## So far

Working towards replacing https://github.com/hathitrust/common

- [x] include bootstrap as a dependency
- [-] include Mulish
  - [ ] as local dependency
- [x] collect color properties from Phire Design
- [-] collect typography properties
  - [x] headings
  - [ ] paragraphs
- [-] forms (in progress)

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