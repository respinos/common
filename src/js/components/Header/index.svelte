<script>
  import { slide } from 'svelte/transition';
  import { sineIn, sineOut } from 'svelte/easing';

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
    <div
      out:slide={{ easing: sineOut, duration: 150 }}
      in:slide={{ easing: sineIn, duration: 150 }}
      class="collapse"
      class:show={searchOpenToggle}
      id="siteSearchDropdown"
    >
      <SearchBar bootstrapToggleShow={searchOpenToggle} />
    </div>
  {/if}
  <h2>{searchOpenToggle}</h2>
</div>
