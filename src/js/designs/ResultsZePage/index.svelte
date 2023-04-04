<script>
  import ResultsList from '../ResultsList';
  import ResultsPagination from '../ResultsPagination';
  import ResultsToolbar from '../ResultsToolbar';

</script>

<style lang="scss">

</style>

<div class="container-fluid">
  <div class="row">
    <div class="col-md-3 col-lg-2 bg-light"></div>
    <div class="col position-relative">
      <ResultsToolbar></ResultsToolbar>
      <ResultsList></ResultsList>
      <ResultsPagination></ResultsPagination>
    </div>
  </div>
</div>