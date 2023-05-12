<script>
  import { onMount } from 'svelte';
  import Modal from '../Modal';
  import FeedbackFormBasic from '../FeedbackFormBasic';
  let modal;
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
  <Modal bind:this={modal} scrollable>
    <svelte:fragment slot="modal-title">Questions?</svelte:fragment>
    <svelte:fragment slot="modal-body">
      <FeedbackFormBasic />
    </svelte:fragment>
  </Modal>
</div>
