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
    <svelte:fragment slot="modal-body">
      <h2 class="h3">Primary Catalog Search</h2>
      <ul>
        <li>
          Phrase Searching: Use quotes to search an exact phrase: e.g., "occult
          fiction"
        </li>
        <li>
          Wildcards: Use * or ? to search for alternate forms of a word. Use *
          to stand for several characters, and ? for a single character: e.g.,
          optim* will find optimal, optimize or optimum; wom?n will find woman
          and women. If you would simply like to browse without entering a
          search term you can enter * by itself.
        </li>
        <li>
          Boolean Searching: Use AND and OR (capitalized) between words to
          combine them with Boolean logic: e.g., (heart OR cardiac) AND surgery
          will find works about heart surgery or cardiac surgery
        </li>
      </ul>
      <h2 class="h3">Full-text Search</h2>
      <ul>
        <li>
          Phrase Searching: Use quotes to search an exact phrase: e.g., "occult
          fiction"
        </li>
        <li>
          Multiple Term Searching: When your search terms are not quoted
          phrases, avoid common words (such as: 'a', 'and', 'of', 'the', etc.)
          to speed up your search.
        </li>
        <li>
          Boolean Searching: Use AND and OR (capitalized) between words to
          combine them with Boolean logic: e.g., heart OR cardiac will find
          works containing the word heart or the word cardiac; heart AND cardiac
          will find works containing both words. Use a minus (-) to remove words
          from the result e.g., heart -cardiac will find works containing the
          word heart that do not include the word cardiac.
        </li>
        <li>
          As in the catalog, if you would like to browse without entering a
          search term you can enter * by itself.
        </li>
      </ul>
    </svelte:fragment>
  </Modal>
</div>
