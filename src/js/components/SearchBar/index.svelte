<!-- svelte-ignore a11y-invalid-attribute -->
<script>
</script>

<div>
  <form>
    <div id="searchbar-form" class="input-group mb-3 d-flex">
      <input
        type="text"
        class="form-control"
        aria-label="Text input with dropdown button"
        placeholder="Search using keywords"
      />
      <select class="form-select" aria-label="Default select example">
        <option selected>Collection</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <select class="form-select" aria-label="Default select example">
        <option selected>All Fields</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <button
        class="btn btn-primary btn-outline-secondary"
        type="button"
        id="button-addon2">Search</button
      >
    </div>
  </form>
  <div class="search-links">
    <span
      ><i class="fa-solid fa-circle-info" />You're searching for items you can
      access.</span
    >
    <div>
      <a href="#"><i class="fa-regular fa-circle-question" />Search Help</a>
      <a href="#"><i class="fa-solid fa-toolbox" />Advanced Collection Search</a
      >
    </div>
  </div>
</div>

<style lang="scss">
  form {
    padding: 1rem;
  }
  #searchbar-form {
    display: flex;
    flex-direction: column;
    &.input-group {
      gap: 0.5rem;
    }
    input {
      width: 100%;
      border-top-right-radius: 0.375rem !important;
      border-bottom-right-radius: 0.375rem !important;
    }
    &.input-group > .form-select {
      width: 100%;
      border-radius: 0.375rem;
      margin-left: 0;
    }
    button {
      border-radius: 0.375rem;
      margin-left: 0;
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
