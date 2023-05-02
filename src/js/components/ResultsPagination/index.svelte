<script>
  export let minPages = 1;
  export let maxPages = 35;
  export let value = 1;
  export let stickyBottom = true;
  export let param = 'page';
  export let nextHref;
  export let prevHref;

  $: hasPreviousItem = value > 1;
  $: hasNextItem = value < maxPages;

  function onSubmit(event) {
    event.preventDefault();
    if ( location === undefined ) { return; }
    let url = new URL(location.href.replace(/;/g, '&'));
    url.searchParams.set(param, value);
    location.href = url.toString();
  }
</script>

<nav aria-label="Result navigation" class:sticky-bottom={stickyBottom} class="d-flex flex-column align-items-start justify-content-between flex-sm-row align-items-sm-center gap-3">
  <div>
    <ul class="list-unstyled d-flex gap-2 m-0">
      <li>
        <a 
          aria-hidden={!hasPreviousItem} 
          aria-disabled={!hasPreviousItem}
          role={!hasPreviousItem ? 'link' : undefined}
          disabled={!hasPreviousItem} 
          class:disabled={!hasPreviousItem} 
          href={hasPreviousItem ? prevHref : undefined}
          class="btn btn-outline-secondary d-inline-flex align-items-center gap-1 text-decoration-none"><i aria-hidden="true" class="fa-solid fa-chevron-left"></i><span>Previous</span></a>
      </li>
      <li>
        <a 
          aria-hidden={!hasNextItem} 
          aria-disabled={!hasNextItem}
          role={!hasNextItem ? 'link' : undefined}
          disabled={!hasNextItem} 
          class:disabled={!hasNextItem} 
          href={hasNextItem ? nextHref : undefined}
          class="btn btn-outline-secondary d-inline-flex align-items-center gap-1 text-decoration-none"><span>Next</span><i aria-hidden="true" class="fa-solid fa-chevron-right"></i></a>
      </li>
    </ul>
  </div>
  <form on:submit={onSubmit}>
    <div class="d-flex gap-2 w-xxsm-50 align-items-center justify-content-end">
      <label for="results-pagination" class="form-label text-nowrap fw-normal m-0">Go to page:</label>
      <input type="number" class="form-control" id="results-pagination" min={minPages} max={maxPages} bind:value />
      <span class="text-nowrap">of {maxPages}</span>
      <button type="submit" class="btn btn-secondary">Go</button>
    </div>
  </form>
</nav>

<style>
  .sticky-bottom {
    position: sticky;
    padding: 1rem;
    padding-bottom: 1rem;
    bottom: 0;
    background-color: #fff;
    /* box-shadow: 0px -0.5rem 0.5rem -0.5rem rgba(0,0,0,0.1); */
    box-shadow: 4px 8px 25px  rgba(0, 0, 0, 0.55);
    margin-left: -0.5rem;
    margin-right: -0.5rem;
  }
</style>