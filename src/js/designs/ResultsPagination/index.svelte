<script>
  export let minPages = 1;
  export let maxPages = 35;
  export let value = 1;
  export let stickyBottom = true;

  let numPerPage = 50;

  $: hasPreviousItem = value > 1;
  $: hasNextItem = value < maxPages;
</script>

<style lang="scss">
  .sticky-bottom {
    position: sticky;
    padding: 1rem;
    padding-bottom: 1rem;
    bottom: 0;
    background-color: #fff;
    box-shadow: 0px -0.5rem 0.5rem -0.5rem rgba(0,0,0,0.1);
  }
</style>

<nav aria-label="Result navigation" class:sticky-bottom={stickyBottom} class="d-flex flex-column align-items-start justify-content-between flex-sm-row align-items-sm-center gap-3">
  <div>
    <ul class="list-unstyled d-flex gap-2 m-0">
      <li>
        <a aria-hidden={!hasPreviousItem} disabled={!hasPreviousItem} class:disabled={!hasPreviousItem} class="btn btn-outline-secondary d-inline-flex align-items-center gap-1" href="#"><i aria-hidden="true" class="fa-solid fa-chevron-left"></i><span>Previous</span></a>
      </li>
      <li>
        <a aria-hidden={!hasNextItem} disabled={!hasNextItem} class:disabled={!hasNextItem} class="btn btn-outline-secondary d-inline-flex align-items-center gap-1" href="#"><span>Next</span><i aria-hidden="true" class="fa-solid fa-chevron-right"></i></a>
      </li>
    </ul>
  </div>
  <div class="d-flex gap-2 w-sm-50 align-items-center justify-content-end">
    <label for="results-pagination" class="form-label text-nowrap fw-normal m-0">Go to page:</label>
    <input type="number" class="form-control w-auto" id="results-pagination" min={minPages} max={maxPages} value={value} />
    <span>of {maxPages}</span>
    <button type="button" class="btn btn-secondary">Go</button>
  </div>
</nav>