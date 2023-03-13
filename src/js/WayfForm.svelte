<svelte:options accessors={true}/>
<svelte:body on:keyup={handleKeydown} />
<script>
	import { onMount } from 'svelte';
  import FilterableSelection from "./components/FilterableSelection.svelte";

  let HT = window.HT || {};
  let sdrinst;
  let modalBody;
  let maxHeight = 15;
  let widget; let widgetBody;

  let guid;

  export let isOpen = false;

  function handleClick() {
    let target = window.location.href;
    if ( target.indexOf("babel.hathitrust") < 0 ) {
        // not a babel app, need to route through ping/pong
        target = HT.get_pong_target(target);
    }
    let selected = HT.login_status.idp_list.find(item => item.sdrinst == sdrinst);
    if ( selected ) {
      HT.prefs.set({ sdrinst : sdrinst });
      let login_href = selected.idp_url.replace('___TARGET___', encodeURIComponent(target));
      setTimeout(() => {
        // window.location.href = login_href;
        console.log(login_href);
      })
    }
  }

  function handleKeydown(event) {
    if ( ! isOpen ) { return ; }
    if ( event.key == 'Escape' ) {
      isOpen = false;
    }
  }

  onMount(() => {
    // let p = modalBody.querySelector('p');
    // widget.resize(modalBody.clientHeight - p.clientHeight - 32, widgetBody);
    guid = (new Date).getTime();
    document.body.classList.add('modal-open');
  })


</script>

<style>

  .modal {
    --bs-modal-width: 34rem;
    --bs-modal-padding-width: 1.875rem;
    --bs-modal-header-padding: 1rem var(--bs-modal-padding-width) 0;
    --bs-modal-footer-padding: 1rem var(--bs-modal-padding-width) 0;
    --bs-modal-padding: 1rem 1.875rem;
    --bs-modal-header-border-width: 0;
  }

  .modal-content {
    height: 90vh;
    max-height: 45rem;
  }

  .modal-title {
    font-size: 1.75rem;
  }

  .modal-header {
    flex-wrap: wrap;
  }

  .modal-title {
    flex-basis: 100%;
    order: 2;
  }

  .btn-close {
    color: black;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    order: 1;
    width: auto;
    height: auto;
    margin-left: auto;
    background: none;
    box-shadow: none;
  }

  .btn-close i.fa-solid {
    color: var(--color-primary-500) !important;
  }

  .modal-body {
    overflow: hidden !important;
    display: grid;
    grid-template-rows: min-content 1fr;
  }

  .modal-grid {
    display: grid;
    grid-template-rows: min-content 1fr;
    min-height: 0;
    height: 100%;
    overflow: hidden;
  }

  .px-modal {
    padding-left: var(--bs-modal-padding-width) !important;
    padding-right: var(--bs-modal-padding-width) !important;
  }

</style>

{#if isOpen}
<div class="modal fade show" tabindex="-1" id="login-form" aria-labelledby="login-form-label" aria-modal="true" role="dialog" style="display: block;">
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 id="login-form-label" class="modal-title">Partner Institution Login</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" on:click={() => { isOpen = false }}>Close <i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
      </div>
      <div class="modal-body" bind:this={modalBody}>
        <p class="mb-0">
          Log in with your partner institution account to access
          then largest number of volumes and features.
        </p>
        <div class="mt-3 modal-grid" bind:this={widgetBody}>
          {#if HT.login_status}
            <FilterableSelection 
              --filterable-list-height="15rem"
              items={HT.login_status.idp_list.map(
                item => ({ 
                  option: item.name.replace(/&amp;/g, '&'), 
                  key: item.sdrinst, 
                  value: item.sdrinst 
                })
              )} 
              label="Partner Institution"
              placeholder="Type something"
              icon="fa-solid fa-building-columns"
              bind:value={sdrinst}
              bind:container={modalBody}
              bind:utils={widget}>
            </FilterableSelection>
          {:else}
            <pre>WAITING</pre>
          {/if}
        </div>
      </div>
      <div class="modal-footer p-0">
        <div class="m-0 w-100">
          <div class="p-3 px-modal mb-2 d-flex gap-5 justify-content-between">
            <p class="fs-7 m-0">
              By logging into HathiTrust, you agree to follow our
              <a href="https://www.hathitrust.org/acceptable-use">Acceptable Use Policy</a>.
            </p>
            <button type="submit" class="btn btn-primary align-self-center" on:click={handleClick}>Continue</button>
          </div>

          <div>
            <p class="p-3 px-modal mb-0 border-top bg-light">
              <a href="https://www.hathitrust.org/help_digital_library#LoginNotListed" class="text-dark fw-bold">Why isn't my institution listed?</a>
            </p>
            <p class="p-3 px-modal mb-0 border-top bg-light rounded-bottom">
              <strong>Not with a partner institution?</strong>
              <br />
              <a href="{HT.service_domain}/cgi/wayf" class="text-dark">See options to log in as a guest</a>
            </p>
          </div>
        </div>
      </div>      
    </div>
  </div>
</div>
<div class="modal-backdrop fade show"></div>
{/if}