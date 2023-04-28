<script>
  import Modal from '../Modal';

  let modal;

  export let c = '__NEW__';
  export let cn = '';
  export let desc = '';
  export let contributorName = '';
  export let shared = 0;
  export let userIsAnonymous = true;

  export let submitAction = function() {};

  export function show() {
    modal.show();
  }

  export function hide() {
    modal.hide();
  }

  function saveChanges(event) {
    let params = new URLSearchParams();
    if ( c != '__NEW__' ) {
      params.set('c', c);
    }
    params.set('cn', cn.trim());
    params.set('desc', desc.trim());
    params.set('contributor_name', contributorName.trim());
    params.set('shrd', shared);

    submitAction(params);
    modal.hide();
  }

</script>

<Modal bind:this={modal} scrollable={true}>
  <svelte:fragment slot="modal-title">{c == '__NEW__' ? 'New' : 'Edit'} Collection</svelte:fragment
  >
  <svelte:fragment slot="modal-body">
    <form>
      <div class="mb-3">
        <label for="cn" class="form-label">Collection Name</label>
        <input type="text" class="form-control" id="cn" name="cn" aria-describedby="cn-help" maxlength="100" bind:value={cn}>
        <div id="cn-help" class="form-text">Collection names can be 100 characters long ({100 - cn.length} characters remaining).</div>
      </div>
      <div class="mb-3">
        <label for="desc" class="form-label">Description</label>
        <textarea class="form-control" id="desc" name="desc" aria-describedby="desc-help" rows="3" maxlength="255" bind:value={desc}></textarea>
        <div id="desc-help" class="form-text">Descriptions can be 255 characters long ({255 - desc.length} characters remaining).</div>
      </div>
      <div class="mb-3">
        <label for="contributor_name" class="form-label">Contributor Name</label>
        <input type="text" class="form-control" id="contributor_name" name="contributor_name" aria-describedby="contributor_name-help" maxlength="255" bind:value={contributorName}>
        <div id="contributor_name-help" class="form-text">
          <strong>Optional.</strong> Set a public contributor name ({255 - contributorName.length} characters remaining).
        </div>
      </div>
      <div class="mb-0">
        <p class="mb-1">Is this collection visible to others?</p>
        <div class="d-flex">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="shared" id="shared-0" value="0" checked={shared == 0}>
            <label class="form-check-label" for="shared-0">
              <i class="fa-solid fa-lock" aria-hidden="true"></i>
              Private
            </label>
          </div>
          {#if !userIsAnonymous}
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="shared" id="shared-1" checked={shared == 1}>
            <label class="form-check-label" for="shared-1">
              Public
            </label>
          </div>
          {/if}
        </div>
      </div>
    </form>
  </svelte:fragment>
  <svelte:fragment slot="modal-footer">
    {#if userIsAnonymous}
      <div class="alert alert-block alert-danger mx-3">
        <p class="mb-0"><strong>This collection will be temporary.</strong> Log in to create 
          permanent and public collections.</p>
      </div>
    {/if}
    <button class="btn btn-secondary" type="button" on:click={() => modal.hide()}>Close</button>
    <button class="btn btn-primary" type="button" on:click={saveChanges}>Save Changes</button>
  </svelte:fragment>
</Modal>

<style>

</style>