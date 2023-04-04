<script>
  import Navbar from '../Navbar/';
  import SearchBar from '../SearchBar';

  export let search_state = 'default';
  // let searchFormDisplayed = search_state == 'default';
  let searchFormDisplayed = true;

  function displaySearchForm() {
    if (search_state == 'default') {
      return true;
    } else if (search_state == 'toggle') {
      return searchFormDisplayed;
    }
    return false;
  }
  // function toggleSearch() {
  //   searchFormDisplayed = !searchFormDisplayed;
  // }

  let searchOpenToggle = true;
</script>

<div>
  <Navbar bind:searchOpen={searchOpenToggle} />
  {#if searchOpenToggle}
    <SearchBar />
  {/if}
</div>
