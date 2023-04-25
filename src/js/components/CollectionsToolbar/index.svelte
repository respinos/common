<script>
  import { onMount } from 'svelte';

  import Modal from '../Modal';

  export let editable = false;
  export let userIsAnonymous = true;
  export let collid = null;
  
  let userCollections = [];
  let div;

  let externItemIdOptions;
  let allItemsSelected = false;

  let modal;

  let c = '__NEW__';
  let cn = '';
  let desc = '';
  let contributorName = '';
  let shared = 0;

  let action = 'addc';
  let status = { result: null };

  function selectAllItems() {
    allItemsSelected = !allItemsSelected;
    externItemIdOptions.forEach((el) => {
      el.checked = allItemsSelected;
    })
  }

  function fetchSelection() {
    let selected = [];
    externItemIdOptions.forEach((el) => {
      if (el.checked) { selected.push(el); }
    })
    return selected;
  }

  function clearSelection() {
    externItemIdOptions.forEach((el) => {
      if (el.checked) { el.checked = false; }
    })
  }

  function checkSelection() {
    if(fetchSelection().length) {
      return true;
    }
    status.class = 'alert-danger';
    status.message = 'One or more items must be selected.';
    status = status;
    return false;
  }

  function openModal() {
    cn = desc = contributorName = '';
    shared = 0;
    modal.show();
  }

  function addItems(event) {
    if (!checkSelection()) { return ; }
    action = 'addits';
    alert(c);
    if (c == '__NEW__') {
      action = 'additsnc';
      openModal();
      return;
    }
    let params = new URLSearchParams();
    params.set('c2', c);
    params.set('page', 'ajax');
    submitAction(params);
  }

  function moveItems() {
    if (!checkSelection()) { return ; }
    action = 'movit';
    if (c == '__NEW__') {
      openModal();
      return;
    }
    let params = new URLSearchParams();
    params.set('c', collid);
    params.set('c2', c);
    submitAction(params);
  }

  function removeItems() {
    if (!checkSelection()) { return ; }
    action = 'movit';
    let params = new URLSearchParams();
    params.set('c', collid);
    submitAction(params);
  }

  function saveChanges(event) {
    let params = new URLSearchParams();
    params.set('cn', cn.trim());
    params.set('desc', desc.trim());
    params.set('contributor_name', contributorName.trim());
    params.set('shrd', shared);

    submitAction(params);
    modal.hide();
  }

  async function submitAction(params) {

    const non_ajax = { movit : true, delit : true, movitnc : true, editc : true, addc: true };

    status.class = null; status = status;
    params.set('a', action);
    if (! non_ajax[action]) {
      params.set('page', 'ajax');
    }

    fetchSelection().forEach((el) => {
      params.append('id', el.value);
    })

    params.set('skin', 'firebird');

    let url = new URL(`${location.protocol}//${HT.service_domain}/cgi/mb?${params.toString()}`);

    if (params.get('page') == 'ajax') {
      let response = await fetch(url, {
        method: 'GET',
      })
      if (response.ok) {
        parseResponse(await response.text());
        userCollections.push({
          value: status.coll_id,
          label: status.coll_name
        })
        userCollections = userCollections;
        clearSelection();
      }
    } else {
      location.href = url;
    }
  }

  function parseResponse(line) {
    var kv;
    var tmp = line.trim().split("|");
    let message = [];
    for(var i = 0; i < tmp.length; i++) {
        kv = tmp[i].split("=");
        status[kv[0]] = kv[1];
    }
    if (status.result == 'ADD_ITEM_FAILURE') {
      status.class = 'alert-danger';
      message.push('Sorry; there was a problem adding these items to your collection.');
    } else if (status.result == 'ADD_ITEM_SUCCESS') {
      status.class = 'alert-success';
      let collection_link = `<a href="mb?a=listis;c=${status.coll_id};skin=firebird">${status.coll_name}</a>`;
      if (status.NumFailed > 0) {
        message.push(`${numFailed} item${numFailed > 1 ? 's' : ''} could not be added to your collection`);
      }
      if (status.NumAddedToCollection > 0) {
        message.push(`${status.NumAddedToCollection} item${status.NumAddedToCollection > 1 ? 's' : ''} ${status.NumAddedToCollection > 1 ? 'were' : 'was'} added to ${collection_link}.`);
      }
      if (status.NumAlreadyInCollection > 0) {
        message.push(`${status.NumAlreadyInCollection} item${status.NumAlreadyInCollection > 1 ? 's' : ''} ${status.NumAlreadyInCollection > 1 ? 'were' : 'was'} already in ${collection_link}.`)
      }      
    }
    status.message = message.join(' ');
    status = status;
  }

  function pluralize(string, value) {
    return `${string}${value == 1 ? '' : 's'}`;
  }

  onMount(() => {
    let parentEl = div.parentElement;
    parentEl.querySelectorAll('[data-use="collections"] option').forEach((optionEl) => {
      console.log(optionEl);
      userCollections.push({
        value: optionEl.value,
        label: optionEl.innerText
      })
    })
    userCollections = userCollections;

    externItemIdOptions = document.querySelectorAll('input[name="extern_item_id"]');
    externItemIdOptions.forEach(el => {
      el.addEventListener('click', (event) => {
        if (!el.checked && allItemsSelected) {
          allItemsSelected = false;
        }
      })
    })
  })

</script>

<div bind:this={div} class="bg-secondary rounded-2 p-3 d-flex flex-sm-row flex-column gap-3 justify-content-between align-items-start align-items-sm-center mt-1" role="toolbar" aria-label="Collections toolbar">
  <button class="btn btn-outline-light d-flex align-items-center gap-2 flex-nowrap" on:click={selectAllItems}>
    {#if allItemsSelected}
    <i class="fa-solid fa-square-check" aria-hidden="true" ></i>
    {:else}
    <i class="fa-regular fa-square" aria-hidden="true" ></i>
    {/if}
    <span class="text-nowrap">Select all items</span>
  </button>
  <div class="d-flex align-items-center justiy-content-end gap-2">
    <select class="form-select" aria-label="Add to collection" size="1" id="collections-chooser" bind:value={c}>
      <option value="__NEW__">New collection…</option>
      {#each userCollections as collection}
        <option value={collection.value}>{collection.label}</option>
      {/each}
    </select>
    <div class="btn-group">
      <button id="addits" type="button" class="btn btn-outline-light" on:click={addItems}>Add</button>
      {#if editable}
      <button type="button" class="btn btn-outline-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
        <span class="visually-hidden">Toggle Dropdown</span>
      </button>
      <ul class="dropdown-menu">
        <li>
          <button class="dropdown-item" type="button" on:click={moveItems}>Move</button>
        </li>
        <li>
          <button class="dropdown-item" type="button" on:clic={removeItems}>Remove</button>
        </li>
      </ul>
      {/if}
    </div>        
  </div>
</div>
{#if status.class}
<div class="alert mt-1 {status.class} d-flex align-items-center gap-3">
  {#if status.class == 'alert-danger'}
    <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
  {:else}
    <i class="fa-regular fa-circle-check" aria-hidden="true"></i>
  {/if}
  <span>{@html status.message}</span>
</div>
{/if}

<Modal bind:this={modal} scrollable={true}>
  <svelte:fragment slot="modal-title">Edit Collection</svelte:fragment
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
        <div id="cn-help" class="form-text">Descriptions can be 255 characters long ({255 - desc.length} characters remaining).</div>
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