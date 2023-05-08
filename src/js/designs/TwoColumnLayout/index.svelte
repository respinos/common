<script>

  import { onMount } from 'svelte';

  import ResultsList from '../ResultsList';
  import ResultsPagination from '../ResultsPagination';
  import ResultsToolbar from '../ResultsToolbar';

  export let enableBorder = false;

  let btnToggleFilters;
  function toggleExpandedFilters() {
    let isExpanded = ! ( btnToggleFilters.getAttribute('aria-expanded') == 'true' );
    btnToggleFilters.setAttribute('aria-expanded', isExpanded);
  }

</script>

<style lang="scss">

  $twocol-breakpoint: 54em;

  :global(body) {
    padding: 0;
  }

  .main {
    display: grid; 
    grid-template: auto auto / 1fr; 
    padding-block: .75rem var(--pb); 
    --pb: 2.5rem;

    @media (min-width: 48em) {
      --pb: 3.75rem;
    }
  }

  .twocol {
    display: flex;
    flex-wrap: wrap;
    grid-area: 2 / 1;
    gap: 3.125rem;
    align-items: start;
    margin-top: 2.625rem;
    margin-inline: max(clamp(.938rem, calc(.268rem + 3.348vw), 1.875rem), ((100% - 73.125rem) / 2));

    // Phire is 48em, but that might assume a main 
    // column that wraps more than HTDL
    @media (min-width: $twocol-breakpoint) {
      flex-wrap: nowrap;
    }
  }

  .twocol > * > *:first-child {
    margin-top: 0;
  }

  .twocol-side {
    display: grid;
    flex-grow: 1;
    gap: 1rem;

    @media (min-width: 64em) {
      flex-shrink: 0;
      flex-basis: 18.75rem;
      gap: 3rem;
    }
  }

  .twocol-main {
    display: grid;
    flex-grow: 1;
    gap: 1.875rem;

    @media (min-width: $twocol-breakpoint) {
      flex-basis: 43.75rem;
      gap: 2.625rem;
    }
  }

  .twocol-main > * {
    // max-width: 43.75rem;
    
  }
 
  #action-toggle-filters {
    &[aria-expanded="false"] .is-expanded {
      display: none;
    }

    &:is([aria-expanded="true"]) .not-expanded {
      display: none;
    }

    &[aria-expanded="false"] ~ * {
      display: none !important;
    }
    
    @media (min-width: 54em) {
      display: none;

      &[aria-expanded] ~ * {
        display: initial !important;
      }
    }
  } 
</style>

<main class="main">
  <div class="twocol" class:border={enableBorder}>
    <div class="twocol-side">
      <slot name="side">
        <!-- this HTML without the svelte properties is handled -->
        <!-- by main.js and apps.scss -->
        <button 
          id="action-toggle-filters" 
          class="btn btn-outline-primary" 
          aria-expanded="false"
          bind:this={btnToggleFilters}
          on:click={toggleExpandedFilters}>
          <span>
            <span class="not-expanded">Show</span>
            <span class="is-expanded">Hide</span>
            Search Filters
          </span>
        </button>
        <h2>This are sidebar items</h2>
        <div class="alert alert-block alert-info">
          <p>This is a filter.</p>
        </div>
      </slot>
    </div>
    <div class="twocol-main ">
      <div class="mainplain w-auto position-relative">
        <slot name="main">
          <ResultsToolbar></ResultsToolbar>
          <ResultsList></ResultsList>
          <ResultsPagination></ResultsPagination>
        </slot>
      </div>
    </div>
  </div>
</main>

