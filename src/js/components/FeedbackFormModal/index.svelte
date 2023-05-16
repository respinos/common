<script>
  import { onMount } from 'svelte';
  import Modal from '../Modal';
  import FeedbackFormBasic from '../FeedbackFormBasic';
  import FeedbackFormCatalog from '../FeedbackFormCatalog';
  import FeedbackFormContent from '../FeedbackFormContent';
  let modal;
  export let form = 'basic';
  export let isOpen = false;

  export const show = function () {
    modal.show();
  };

  export const hide = function () {
    modal.hide();
  };
  onMount(() => {
    if (isOpen && modal) {
      modal.show();
    }
  });

  $: if (modal && isOpen) {
    show();
  }
  $: if (modal && !isOpen) {
    hide();
  }
</script>

<div>
  {#if form == 'catalog'}
    <Modal bind:this={modal} scrollable>
      <svelte:fragment slot="modal-title"
        >Catalog Quality Correction</svelte:fragment
      >
      <svelte:fragment slot="modal-body">
        <FeedbackFormCatalog />
      </svelte:fragment>
      <svelte:fragment slot="modal-footer" />
    </Modal>
  {:else if form == 'content'}
    <Modal bind:this={modal} scrollable>
      <svelte:fragment slot="modal-title"
        >Content Quality Correction</svelte:fragment
      >
      <svelte:fragment slot="modal-body">
        <FeedbackFormContent />
      </svelte:fragment>
      <svelte:fragment slot="modal-footer" />
    </Modal>
  {:else}
    <Modal bind:this={modal} scrollable>
      <svelte:fragment slot="modal-title">Questions?</svelte:fragment>
      <svelte:fragment slot="modal-body">
        <FeedbackFormBasic />
      </svelte:fragment>
      <svelte:fragment slot="modal-footer" />
    </Modal>
  {/if}
</div>
