<script>
	import { onMount } from 'svelte';
	import { afterUpdate } from 'svelte';

  export let items;
  export let placeholder;
  export let label;
  export let icon;
  export let multiple = false;
  export let value = '';
  export let filterText = '';

  let fieldset1; let fieldset2; let list;

  export const utils = {
    resize(height, container) {
      let h = container.clientHeight;
      while ( h > height ) {
        list.style.height = `${list.clientHeight - 10}px`;
        h = container.clientHeight;
      }
    }
  }

  // export let itemKey;
  // export let itemValue;
  // export let itemLabel;

  let guid;

  function filterData(value) {
    if ( value.trim() == '' ) { return items; }
    let re = new RegExp(value, "i");
    return items.filter((item) => {
      return re.exec(item.option)
    })
  }

  function updateValue(event, forced){
    if ( forced ) {
      event.target.checked = forced;
    }
    if (multiple) {
      let target = event.target.value;
      if (value.indexOf(target) > -1) {
        let idx = value.indexOf(target);
        value.splice(idx,1);
      } else {
        value.push(target);
      }
      value = value;
    } else {
      value = event.target.value;
    }
  }

  $: possibleItems = filterData(filterText);
  $: isSelected = (check, value) => value.indexOf(check) > -1;

  onMount(() => {
    guid = `${(new Date).getTime()}-${Math.random() * 1000}`;
  })

</script>

<style>

  .filterable-list {
    max-height: var(--filterable-list-height, 22rem);
    overflow: scroll;
    min-height: 0;
    grid-row: 2/3;
  }

  label {
    width: 100%;
  }

  input:checked + label {
    background: var(--color-primary-500, '#000') !important;
    color: white !important;
  }

  li:nth-child(odd) input + label {
    background: var(--color-primary-50);
  }

  .fieldset-filter {
    grid-row: 1/2;
  }

  .fieldset-select {
    grid-row: 2/3;
    display: grid;
    grid-template-rows: min-content minmax(0, 1fr);
    min-height: 0;
  }

  .fieldset-select legend {
    grid-row: 1/2;
  }

</style>

  <fieldset class="fieldset-filter mb-3" class:input-group={icon} bind:this={fieldset1}>
    <legend class="fs-7">Filter by {label}</legend>
    {#if icon}
    <span class="input-group-text ms-0"><i class={icon} aria-hidden="true"></i></span>
    {/if}
    <input 
      type="text" 
      class="form-control" 
      placeholder={placeholder}
      aria-label="Filter options"
      aria-describedby="filter-help-{guid}"
      bind:value={filterText}
      >
    <p id="filter-help-{guid}" class="visually-hidden">
      Below this edit box is a list of items that allow you to filter down your options. As you type in this edit box, the list of items is updated to reflect only those that match the query typed in this box.
    </p>
  </fieldset>

  <fieldset class="fieldset-select" bind:this={fieldset2}>
    <legend class="fs-7">Select a {label}</legend>
    <ul class="px-0 position-relative border border-dark rounded filterable-list" bind:this={list}>
      {#each possibleItems as item, index (item.key)}
        <li class="form-check mt-0 mb-0 px-0">
          {#if multiple}
            <input class="form-check-input visually-hidden" type="checkbox" name="item-{guid}" id="item{index}-{guid}" value={item.value} on:click={updateValue} checked={isSelected(item.value, value)}>
          {:else}
            <input class="form-check-input visually-hidden" type="radio" name="item-{guid}" id="item{index}-{guid}" value={item.value} on:click={updateValue} on:focus={(event) => updateValue(event, true)}>
          {/if}
          <label class="form-check-label p-2 px-3" for="item{index}-{guid}">{item.option}</label>
        </li>
      {/each}
    </ul>
  </fieldset>
