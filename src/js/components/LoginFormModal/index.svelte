<svelte:options accessors={true}/>
<!-- <svelte:body on:keyup={handleKeydown} /> -->
<script>
	import { onMount } from 'svelte';
  import Modal from '../Modal';
  import FilterableSelection from "../FilterableSelection.svelte";

  let HT = window.HT || {};
  let sdrinst;
  let modal;

  export let isOpen = false;
  export let onSubmit = function(href) {
    setTimeout(() => {
      window.location.assign(login_href);
      console.log(login_href);
    })
  }

  export const show = function() {
    modal.show();
  }

  export const hide = function() {
    modal.hide();
  }

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
      onSubmit(login_href);
      // setTimeout(() => {
      //   // window.location.assign(login_href);
      //   onSubmit(login_href);
      //   console.log(login_href);
      // })
    }
  }

  onMount(() => {
    if ( isOpen && modal ) {
      modal.show();
    }
  })

  $: if ( modal && isOpen ) { show() }
  $: if ( modal && ! isOpen ) { hide() }

</script>

<style>

  :global(.modal) {
    --bs-modal-width: 34rem;
    --bs-modal-padding-width: 1.875rem;
    --bs-modal-header-padding: 1rem var(--bs-modal-padding-width) 0;
    --bs-modal-footer-padding: 1rem var(--bs-modal-padding-width) 0;
    --bs-modal-padding: 1rem 1.875rem;
    --bs-modal-header-border-width: 0;
  }

  :global(.modal-content) {
    height: 90vh;
    max-height: 45rem !important;
  }

  :global(.modal-body) {
    overflow: hidden !important;
    display: grid;
    grid-template-rows: min-content 1fr;
  }

  :global(.modal-footer) {
    padding-top: 0;
    padding-bottom: 0;
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

<Modal bind:this={modal}>
  <svelte:fragment slot="modal-title">Partner Institution Login</svelte:fragment>
  <svelte:fragment slot="modal-body">
    <p class="mb-0">
      Log in with your partner institution account to access
      then largest number of volumes and features.
    </p>
    <div class="mt-3 modal-grid">
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
          bind:value={sdrinst}>
        </FilterableSelection>
      {:else}
        <pre>WAITING</pre>
      {/if}
    </div>    
  </svelte:fragment>
  <svelte:fragment slot="modal-footer">
    <div class="m-0 w-100">
      <div class="p-3 px-modal mb-2 d-flex gap-5 justify-content-between">
        <p class="fs-7 m-0">
          By logging into HathiTrust, you agree to follow our
          <a href="https://www.hathitrust.org/acceptable-use">Acceptable Use Policy</a>.
        </p>
        <button type="submit" name="submit" class="btn btn-primary align-self-center" on:click={handleClick}>Continue</button>
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
  </svelte:fragment>
</Modal>