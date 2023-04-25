<script>
  export let firstRecordNumber = 1;
  export let lastRecordNumber = 35;
  export let totalRecords = 225314;
  export let currentSortOption = null;
  export let target = 'catalog';

  const config = {};
  config['catalog'] = {
    label: 'results',
    sortParam: 'sort',
    pageParam: 'page',
    sortOptions: [
      {value: false, label: 'Relevance'},
      {value: 'year', label: 'Date (newest first)'},
      {value: 'yearup', label: 'Date (oldest first)'},
      {value: 'author', label: 'Author'},
      {value: 'title', label: 'Title'},
    ]
  };
  config['ls'] = {
    label: 'results',
    sortOptions: false
  };  
  config['mb.listis'] = {
    label: 'items',
    sortParam: 'sort',
    pageParam: 'pn',
    sortOptions: [
      {value: 'title_a', label: 'Title A-Z'},
      {value: 'title_d', label: 'Title Z-A'},
      {value: 'author_a', label: 'Author A-Z'},
      {value: 'author_d', label: 'Author Z-A'},
      {value: 'date_d', label: 'Date (newest first)'},
      {value: 'date_a', label: 'Date (oldest first)'},
    ]
  };
  config['mb.listsrch'] = {
    ...config['mb.listis'],
    label: 'results'
  };

  $: label = config[target].label;
  $: sortOptions = config[target].sortOptions;

  const format = function(number) {
    return number.toLocaleString('en-US');
  }

  const onSubmit = function(event) {
    if ( location === undefined ) { return; }
    let url = new URL(location.href.replace(/;/g, '&'));
    url.searchParams.delete(config[target].pageParam);
    url.searchParams.set(config[target].sortParam, currentSortOption);
    location.href = url.toString();
  }

</script>

<div class="bg-light rounded-2 p-2 p-3 d-flex flex-sm-row flex-column gap-3 justify-content-between align-items-start align-items-sm-center" role="toolbar" aria-label="Search toolbar" aria-describedby="results-summary">
  <span id="results-summary">
    {format(firstRecordNumber)} to {format(lastRecordNumber)} of {format(totalRecords)} {label}
  </span>
  <div class="d-flex flex-column align-items-start gap-3 xxflex-wrap justify-content-end">
    {#if sortOptions !== false}
    <div class="row flex-nowrap" style="--bs-gutter-x: 0.5rem">
      <div class="col-auto">
        <label class="col-form-label fw-normal" for="sort">Sort by</label>
      </div>
      <div class="col-auto">
        <select class="form-select" id="sort" name="sort" size="1" bind:value={currentSortOption} on:change={onSubmit}>
          {#each sortOptions as sortOption}
            <option value={sortOption.value} selected={sortOption.value == currentSortOption}>{sortOption.label}</option>
          {/each}
        </select>
      </div>
    </div>
    {/if}
    <!-- <div class="row flex-nowrap" style="--bs-gutter-x: 0.5rem">
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
    </div> -->
  </div>
</div>


<style>

</style>