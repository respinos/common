<script>
  export let minPages = 1;
  export let maxPages = 35;
  export let currentPage = 1;
  export let totalResults = 225314;
  export let target = 'catalog';

  export let numPerPage = 20;
  const perPageOptions = [ 20, 50, 100 ];
  const sortOptions = [ 
    'Relevance', 
    'Date (newest first)',
    'Date (oldest first)',
    'Author',
    'Title'
   ];

   const format = function(number) {
    return number.toLocaleString('en-US');
   }

</script>

<style lang="scss">

</style>


<div class="bg-light rounded-2 p-2 d-flex flex-sm-row flex-column gap-3 justify-content-between align-items-start align-items-sm-start" role="toolbar" aria-label="Search toolbar" aria-describedby="results-summary">
  <span id="results-summary">
    {format(currentPage)} to {format(maxPages)} of {format(totalResults)} results
  </span>
  <div class="d-flex flex-column align-items-start gap-3 xxflex-wrap justify-content-end">
    {#if target == 'catalog'}
    <div class="row flex-nowrap" style="--bs-gutter-x: 0.5rem">
      <div class="col-auto">
        <label class="col-form-label fw-normal" for="sort">Sort by</label>
      </div>
      <div class="col-auto">
        <select class="form-select" id="sort" name="sort" size="1">
          {#each sortOptions as sortOption}
            <option>{sortOption}</option>
          {/each}
        </select>
      </div>
    </div>
    {/if}
    <div class="row flex-nowrap" style="--bs-gutter-x: 0.5rem">
      <div class="col-auto">
        <label class="col-form-label fw-normal" for="sort">Items per page</label>
      </div>
      <div class="col-auto">
        <select class="form-select" id="sort" name="sort" size="1">
          {#each perPageOptions as pageOption}
            <option>{pageOption}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
</div>
