<script>
	import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let isOpen = false;
  export let id = `id${(new Date).getTime()}`;
  export let onClose = function() {};

  let modalBody;

  let dialog;

  export const show = function() {
    dialog.showModal();
  }

  export const hide = function() {
    dialog.close();
    isOpen = false;
    onClose();
    console.log("-- dialog is closed");
  }

  onMount(() => {
    if ( isOpen ) {
      openModal();
    }
  })

  $: if ( dialog && isOpen ) { openModal(); }

</script>

<style>

  :global(html:has(dialog[open])) {
    overflow: hidden;
  }

  dialog {
    display: grid;
    position: fixed;
    margin: auto;
    padding: 0;
    inset: 0;
    border: none;
    background: transparent;
    z-index: var(--layer-important);
    max-inline-size: min(90vw, var(--size-content-3));
    max-block-size: min(80vh, 100%);
    max-block-size: min(80dvb, 100%);    
    max-height: none;
    transition: opacity .25s var(--ease-3);
  }

  dialog:not([open]) {
    pointer-events: none;
    opacity: 0;
  }

  dialog::backdrop {
    transition: backdrop-filter .25s ease;
    backdrop-filter: blur(2px);
  }

  dialog {
    animation: var(--animation-scale-down) forwards;
    animation-timing-function: var(--ease-squish-3);
  }

  dialog[open] {
    animation: var(--animation-slide-in-down) forwards;
    animation-duration: 0.25s;
  }  

  .modal {
    position: static;
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

</style>

<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/open-props" />
</svelte:head>

<dialog bind:this={dialog}>
  <div class="modal show" aria-labelledby="{id}-label" style="display: block;">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="{id}-label" class="modal-title"><slot name="modal-title"></slot></h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" on:click={() => { hide() }}>Close <i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
        </div>
        <div class="modal-body">
          <slot name="modal-body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="modal-footer">
            <button type="reset" autofocus class="btn btn-secondary" on:click={() => { hide()}}>Close</button>
            <button type="button" class="btn btn-primary">
              <slot name="modal-action">OK</slot>
            </button>
          </slot>
        </div>      
      </div>
    </div>
  </div>  
</dialog>
