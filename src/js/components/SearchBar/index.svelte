<!-- svelte-ignore a11y-invalid-attribute -->
<script>
  import SearchHelpModal from '../SearchHelpModal';
  export let index = 'library';
  // export let bootstrapToggleShow;

  let modal;
  let modalOpen;

  //search form bindings
  let _select, _searchtype, _root, fieldValue, _input;
  fieldValue = 'Everything';

  //updates UI when 'Collection' or 'Website' is selected in search options
  let _updateSelect = function (event) {
    _root.dataset.index = event.target.value;
    index = event.target.value;
  };

  // function toggleSearchModal() {
  //   modalOpen = !modalOpen;
  // }

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
      submitData.set('skin', 'firebird');
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
  <SearchHelpModal bind:this={modal} />
  <div class="search-form-wrapper" bind:this={_root}>
    <form on:submit|preventDefault={_submitSearch}>
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
        <div class="select-container" id="search-where">
          <select
            class="form-select select-caret"
            aria-label="Default select example"
            bind:this={_select}
            on:change={_updateSelect}
          >
            <option value="library" selected>Collection</option>
            <option value="website">Website</option>
          </select>
        </div>
        {#if index == 'library'}
          <div class="select-container" id="search-what">
            <select
              class="form-select select-caret"
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
          </div>
        {/if}
        <button
          class="btn btn-primary btn-outline-secondary"
          type="button"
          id="button-addon2"
          on:click={_submitSearch}
          >Search
        </button>
        <!-- <button
          class="btn btn-primary btn-outline-secondary"
          type="button"
          id="button-addon2">Search</button
        > -->
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
        <a
          href="#"
          on:click|preventDefault={() => {
            modal.show();
          }}
          ><i class="fa-regular fa-circle-question fa-fw" /><span
            >Search Help</span
          ></a
        >
        <a href={`//${CATALOG_DOMAIN}/Search/Advanced`}
          ><i class="fa-solid fa-toolbox fa-fw" /><span
            >Advanced Collection Search</span
          ></a
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
      font-weight: var(--btn-font-weight);
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
        span:hover {
          text-decoration: underline;
        }
      }
      i {
        font-size: 14px;
        color: var(--color-primary-500);
      }
    }
  }
  .select-container {
    width: 100%;
  }
  select.select-caret {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath d='M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z'/%3E%3C/svg%3E");
    -moz-appearance: none;
    -webkit-appearance: none;
    -webkit-border-radius: 0px;
    border-radius: 0px;
    border: none;
    appearance: none;
    outline-width: 0;
  }
  // medium (and up) screen size styles
  @media (min-width: 768px) {
    #searchbar-form {
      flex-direction: row;
      border: 1px solid var(--color-neutral-500);
      border-radius: 0.5em;
      box-shadow: none;
      &.input-group {
        gap: 0;
      }
      .search-input {
        flex-grow: 2;
        border: none;
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
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
        padding: 1em;
      }

      #search-where.select-container {
        width: 125px;
      }
      #search-what.select-container {
        width: 215px;
      }
      .form-select {
        border-radius: 0;
        padding: 1em;
        border: none;
        box-shadow: none;
        border-width: 0px 1px;
        border-style: solid;
        border-color: var(--color-neutral-100);
      }
      button {
        margin-left: -1px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        padding: 1em;
        border: none;
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
