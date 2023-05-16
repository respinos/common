<script>
  export let role = 'default';
  export let example = '<!-- add example -->';
  export let overflowed = false;
  export let alert = null;

  let examples = (example instanceof Array) ? example : [example];

</script>

<style>
  .overflowed {
    height: 60vh;
    overflow: auto;
  }

  .accordion + .accordion {
    margin-top: 2rem;
  }
</style>

{#if alert}
<div class="alert alert-block alert-info">
  {alert}
</div>
{/if}
<div class="container" class:overflowed={overflowed}>
  {#each examples as example, index}
    <div class="accordion" id="accordion{index + 1}" data-role={role}>
      {@html example}
    </div>
  {/each}
</div>
