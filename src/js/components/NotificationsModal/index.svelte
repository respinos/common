<script>
	import { onMount } from 'svelte';
  import Modal from '../Modal';

  export let HT = window.HT || {};
  let modal;

  export let isOpen = false;


  function userIsAuthed() {
    if ( ! HT.login_status ) { return false; }
    return HT.login_status.logged_in;
  }

  function userHasNotifications() {
    return userIsAuthed() && (HT.login_status.notificationData.length > 0);
  }

  export const show = function() {
    if ( ! userHasNotifications() ) { return ; }
    modal.show();
  }

  export const hide = function() {
    modal.hide();
  }

  onMount(() => {
    if ( isOpen && modal && userIsAuthed() ) {
      modal.show();
    }
  })

  $: if ( modal && isOpen && userIsAuthed() ) { show() }
  $: if ( modal && ! isOpen ) { hide() }

</script>

<style>

</style>

<Modal bind:this={modal}>
  <svelte:fragment slot="modal-title">Your notifications</svelte:fragment>
  <svelte:fragment slot="modal-body">
    <ul class="list-group list-group-flush">
      {#each HT.login_status.notificationData as datum, i}
        <li class="list-group-item p-3">
          <h2 class="fs-6">{datum.title}</h2>
          {#if datum.message.indexOf('<p>') > -1}
            {@html datum.message}
            <p><a href="{datum.read_more_link}" target="_blank">{datum.read_more_label}</a></p>
          {:else}
            <p>
              {datum.message}
              <a href="{datum.read_more_link}" target="_blank">{datum.read_more_label}</a>
            </p>
          {/if}          
        </li>
      {/each}
    </ul>
  </svelte:fragment>
</Modal>