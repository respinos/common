<script>
	import { onMount } from 'svelte';
  export let fragment;
  export let slots = {};

  let el;
  let fittings = {};

  onMount(() => {
    console.log("-- echo mount", el, slots);
    console.log(slots['default'].innerHTML);
    el.innerHTML = slots['default'].innerHTML;

    if ( slots['byline'] ) {
      fittings['byline'].innerHTML = slots['byline'].innerHTML;
      console.log(slots['byline'].innerHTML);
    } else {
      fittings['byline'].remove();
    }
    // el.append(fragment);
  })

</script>

<script context="module">
  const slug = 'hathi-echo';
  export {slug};

  console.log("AHOY INSIDE ECHO");
</script>

<blockquote bind:this={el} class="border border-info border-5">NOP</blockquote>
<svelte:element this="slot" name="byline" bind:this={fittings['byline']} />