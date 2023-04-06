<!-- svelte-ignore a11y-invalid-attribute -->
<script>
  export let index = 'library';
  export let bootstrapToggleShow;

  //search form bindings
  let _select, _searchtype, _root, fieldValue, _input;
  fieldValue = 'Everything';

  //updates UI when 'Collection' or 'Website' is selected in search options
  let _updateSelect = function (event) {
    _root.dataset.index = event.target.value;
    index = event.target.value;
  };

  //updates search hint message when use selects search type
  function _updateSearchType() {
    let value = _searchtype.value;
    _root.dataset.field = value;
    let menuItem = _searchtype.options[_searchtype.selectedIndex];
    // window._s1 = _searchtype;
    console.log('-- updateSearchType', value, _searchtype, menuItem);
    fieldValue = menuItem.text;
  }

  let SERVICE_DOMAIN = 'babel.hathitrust.org';
  let CATALOG_DOMAIN = 'catalog.hathitrust.org';
  if (window.HT && window.HT.service_domain) {
    SERVICE_DOMAIN = window.HT.service_domain;
    CATALOG_DOMAIN = window.HT.catalog_domain;
  }

  let _submitSearch = function (event) {
    let search_url;
    if (index == 'library' && _searchtype.value == 'everything') {
      let submitData = new URLSearchParams();
      submitData.set('q1', _input.value);
      submitData.set('field1', 'ocr');
      submitData.set('a', 'srchls');
      submitData.set('ft', 'ft');
      submitData.set('lmt', 'ft');
      search_url = `//${SERVICE_DOMAIN}/cgi/ls?${submitData.toString()}`;
    } else if (index == 'library') {
      let submitData = new URLSearchParams();
      submitData.set('lookfor', _input.value);
      submitData.set('searchtype', _searchtype.value);
      submitData.set('ft', 'ft');
      submitData.set('setft', 'true');
      search_url = `//${CATALOG_DOMAIN}/Search/Home?${submitData.toString()}`;
    } else {
      // website search
      let searchTerms = _input.value.toLowerCase();
      search_url = `https://www.hathitrust.org/search/node/${searchTerms}`;
    }
    if (search_url) {
      location.href = search_url;
    }
  };
</script>

<div>
  <div class="search-form-wrapper" bind:this={_root}>
    <form>
      <div id="searchbar-form" class="input-group d-flex">
        <div class="search-input">
          <input
            type="text"
            class="form-control"
            aria-label="Text input with dropdown button"
            placeholder="Search using keywords"
            bind:this={_input}
          />
          <span class="input-group-text" id="search-icon"
            ><i class="fa-solid fa-magnifying-glass fa-fw" /></span
          >
        </div>
        <select
          class="form-select"
          aria-label="Default select example"
          bind:this={_select}
          on:change={_updateSelect}
        >
          <option value="library" selected>Collection</option>
          <option value="website">Website</option>
        </select>
        {#if index == 'library'}
          <select
            class="form-select"
            aria-label="Default select example"
            bind:this={_searchtype}
            on:change={_updateSearchType}
          >
            <option value="everything" selected>Everything</option>
            <option value="all">All Bibliographic Fields</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="subject">Subject</option>
            <option value="isbn">ISBN/ISSN</option>
            <option value="publisher">Publisher</option>
            <option value="seriestitle">Series Title</option>
          </select>
        {/if}
        <button
          class="btn btn-primary btn-outline-secondary"
          type="button"
          id="button-addon2"
          on:click={_submitSearch}>Search</button
        >
      </div>
    </form>
    <div class="search-details d-flex">
      <span class="search-help"
        ><i class="fa-solid fa-circle-info fa-fw" />
        {#if index == 'library'}
          You're searching in {fieldValue} for items you can access.
        {/if}
        {#if index == 'website'}
          You're searching the information website.
        {/if}
      </span>
      <div class="search-links">
        <a href="#"
          ><i class="fa-regular fa-circle-question fa-fw" />Search Help</a
        >
        <a href={`//${CATALOG_DOMAIN}/Search/Advanced`}
          ><i class="fa-solid fa-toolbox fa-fw" />Advanced Collection Search</a
        >
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .search-form-wrapper {
    padding: 1rem;
    background: #fff;
  }
  #searchbar-form {
    display: flex;
    flex-direction: column;
    &.input-group {
      gap: 0.5rem;
    }
    .search-input {
      display: flex;
      border: 0.5px solid var(--color-neutral-500);
      border-radius: 0.375em;
    }
    input {
      width: 100%;
      border: none;
      box-shadow: none;
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
      padding: 0.625em 0.75em;
    }
    .input-group-text {
      font-size: 1rem;
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
      border: none;
      background-color: var(--color-neutral-50);
      padding: 0.625em 0.75em;
      i {
        font-size: 14px;
      }
    }
    .form-select {
      border: 0.5px solid var(--color-neutral-500);
      padding: 0.625em 0.75em;
      width: 100%;
      border-radius: 0.375rem;
      margin-left: 0;
    }
    button {
      border-radius: 0.375rem;
      margin-left: 0;
      text-transform: uppercase;
      font-weight: var(--form-label-font-weight);
      letter-spacing: -0.01em;
      padding: 0.5em 0.75em;
    }
  }
  .search-details {
    padding-top: 1rem;
    flex-direction: column;
    gap: 1.375em;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.01em;
    .search-help {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5em;
      font-style: italic;
      i {
        font-size: 14px;
        color: var(--color-primary-500);
      }
    }
    .search-links {
      display: flex;
      align-items: center;
      gap: 1.25em;
      a {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.75em;
        text-decoration: none;
        color: var(--color-neutral-800);
      }
      i {
        font-size: 14px;
        color: var(--color-primary-500);
      }
    }
  }
  @media (min-width: 768px) {
    #searchbar-form {
      flex-direction: row;
      &.input-group {
        gap: 0;
      }
      .search-input {
        flex-grow: 2;
        @media (min-width: 992px) {
          flex-grow: 3;
        }
        .input-group-text {
          order: -1;
          border-top-left-radius: 0.375em !important;
          border-bottom-left-radius: 0.375em !important;
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
          padding: 1em 0 1em 1em;
        }
      }
      input {
        // width: 1%;
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        padding: 1em;
      }
      &.input-group
        > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(
          .valid-feedback
        ):not(.invalid-tooltip):not(.invalid-feedback) {
        margin-left: -1px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      &.input-group:not(.has-validation)
        > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(
          .form-floating
        ) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &.input-group > .form-select {
        width: 1%;
        padding: 1em;
      }
      button {
        padding: 1em;
      }
    }
    .search-details {
      flex-direction: row;
      justify-content: space-between;
      align-items: start;
      padding-top: 0.75em;
      .search-links {
        gap: 1.5em;
      }
    }
  }
</style>
