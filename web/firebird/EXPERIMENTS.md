## Mimicking Component Slots

Svelte supports `<slot>` in components, but only within its own
components. The client API which we use to instantiate Svelte
components on demand does **not** support filling in `<slot>`.

Do we need this functionality? Probably not. If we did, during
component instantiation we would have to collect the `innerHTML` 
of the custom element:

```js
// collect the current innerHTML in a `<div>` elements
props['slots'] = {};
props['slots']['default'] = document.createElement('div');

// check for named slots
let slots = el.querySelectorAll('[slot]');
for(let i = 0; i < slots.length; i++) {
  let slot = slots[i];
  let name = slot.getAttribute('slot');
  props['slots'][name] = document.createElement('div');
  while(slot.childNodes.length > 0) {
    let child = slot.childNodes[0];
    props['slots'][name].append(child);
  }
  let parent = slot.parentElement;
  parent.removeChild(slot);
}

while (el.childNodes.length > 0) {
  let child = el.childNodes[0];
  props['slots']['default'].append(child);
}

Object.keys(props['slots']).forEach((key) => {
  console.log(el.getAttribute('id'), key, "->", props['slots'][key].innerHTML);
})
```

and then in the HTML:

```html
<hathi-echo>
  <dl>
    <dt>Title</dt>
    <dd>S is for Space</dd>
    <dt>Author</dt>
    <dd>Ray Bradbury</dd>
    <dt>Publication Year</dt>
    <dd>1957</dd>
  </dl>
</hathi-echo>
<hathi-echo>
  <p>
    When the going gets weird, the weird turn pro.
  </p>
  <cite slot="byline"><em>&mdash; Anonymous</em></cite>
</hathi-echo>
```