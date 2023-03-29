<script>
</script>

<div>
  <form>
    <div class="search-form input-group mb-3 d-flex">
      <input
        type="text"
        class="form-control"
        aria-label="Text input with dropdown button"
        placeholder="Search using keywords"
      />

      <button
        class="btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">Collection</button
      >
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href="#">Separated link</a></li>
      </ul>
      <button
        class="btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">All Fields</button
      >
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href="#">Separated link</a></li>
      </ul>
      <button class="btn btn-outline-secondary" type="button" id="button-addon2"
        >Search</button
      >
    </div>
  </form>
</div>

<style lang="scss">
  .search-form {
    display: flex;
    flex-direction: column;
    input {
      width: 100%;
      border-top-right-radius: 0.375rem !important;
      border-bottom-right-radius: 0.375rem !important;
    }
  }
  @media (min-width: 1200px) {
    .search-form {
      flex-direction: row;
      input {
        width: 1%;
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
      }
    }
  }
</style>
