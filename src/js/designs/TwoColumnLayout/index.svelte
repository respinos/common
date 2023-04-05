<script>
  import ResultsZePage from '../ResultsZePage';

  export let enableBorder = false;
</script>

<style lang="scss">

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

    @media (min-width: 48em) {
      flex-wrap: nowrap;
    }
  }

  .twocol > * > *:first-child {
    margin-top: 0;
  }

  .twocol-side {
    display: grid;
    flex-grow: 1;
    gap: 1.875rem;

    @media (min-width: 48em) {
      flex-shrink: 0;
      flex-basis: 18.75rem;
      gap: 3rem;
    }
  }

  .twocol-main {
    display: grid;
    flex-grow: 1;
    gap: 1.875rem;

    @media (min-width: 48em) {
      flex-basis: 43.75rem;
      gap: 2.625rem;
    }
  }

  .twocol-main > * {
    max-width: 43.75rem;
    
  }
 
</style>

<main class="main">
  <div class="twocol" class:border={enableBorder}>
    <div class="twocol-side bg-primary">
      <div>
        <slot name="side">.twocol-side</slot>
      </div>
    </div>
    <div class="twocol-main ">
      <div class="mainplain w-auto">
        <slot name="main"><ResultsZePage /></slot>
      </div>
    </div>
  </div>
</main>

