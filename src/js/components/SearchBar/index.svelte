<!-- svelte-ignore a11y-invalid-attribute -->
<script>
</script>

<div class="search-form-wrapper">
  <form>
    <div id="searchbar-form" class="input-group d-flex">
      <div class="search-input">
        <input
          type="text"
          class="form-control"
          aria-label="Text input with dropdown button"
          placeholder="Search using keywords"
        />
        <span class="input-group-text" id="search-icon"
          ><i class="fa-solid fa-magnifying-glass fa-fw" /></span
        >
      </div>
      <select class="form-select" aria-label="Default select example">
        <option value="Collection" selected>Collection</option>
        <option value="Website">Website</option>
      </select>
      <select class="form-select" aria-label="Default select example">
        <option value="Everything" selected>Everything</option>
        <option value="All Bibliographic Fields"
          >All Bibliographic Fields</option
        >
        <option value="Title">Title</option>
        <option value="Author">Author</option>
        <option value="Subject">Subject</option>
        <option value="ISBN/ISSN">ISBN/ISSN</option>
        <option value="Publisher">Publisher</option>
        <option value="Series Title">Series Title</option>
      </select>
      <button
        class="btn btn-primary btn-outline-secondary"
        type="button"
        id="button-addon2">Search</button
      >
    </div>
  </form>
  <div class="search-details d-flex">
    <span class="search-help"
      ><i class="fa-solid fa-circle-info fa-fw" />You're searching for items you
      can access.</span
    >
    <div class="search-links">
      <a href="#"
        ><i class="fa-regular fa-circle-question fa-fw" />Search Help</a
      >
      <a href="#"
        ><i class="fa-solid fa-toolbox fa-fw" />Advanced Collection Search</a
      >
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
    input,
    &.input-group .input-group-text {
      padding: 0.625em 0.75em;
    }
    &.input-group > .form-select {
      border: 0.5px solid var(--color-neutral-500);
      padding: 0.625em 0.75em;
    }
    input {
      width: 100%;
      border: none;
      box-shadow: none;
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
    .search-input {
      display: flex;
      border: 0.5px solid var(--color-neutral-500);
      border-radius: 0.375em;
    }
    &.input-group .input-group-text {
      font-size: 1rem;
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
      border: none;
      background-color: var(--color-neutral-50);
      i {
        font-size: 14px;
      }
    }
    &.input-group > .form-select {
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
      input {
        width: 1%;
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
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
      }
    }
  }
</style>
