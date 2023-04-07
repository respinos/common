<script>
  import { onMount } from 'svelte';
  import Modal from '../Modal';
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
  <Modal bind:this={modal}>
    <svelte:fragment slot="modal-title">HathiTrust Search Help</svelte:fragment>
    <svelte:fragment slot="modal-body"
      >Here are some search tips!</svelte:fragment
    >
  </Modal>
</div>
