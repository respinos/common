<script>
  import { slide } from 'svelte/transition';
  import { sineIn, sineOut } from 'svelte/easing';

  import Navbar from '../Navbar/';
  import SearchBar from '../SearchBar';

  export let searchState = 'default';
  // let searchFormDisplayed = search_state == 'default';
  // let searchFormDisplayed = true;

  function displaySearchForm() {
    if (searchState == 'default') {
      return true;
    } else if (searchState == 'toggle') {
      return searchFormDisplayed;
    }
    return false;
  }
  // function toggleSearch() {
  //   searchFormDisplayed = !searchFormDisplayed;
  // }

  $: searchFormDisplayed = ( searchState != 'none' );
  $: console.log("AHOY search_state", searchState, searchFormDisplayed);

  let searchOpenToggle;
</script>

<div>
  <Navbar bind:searchOpen={searchOpenToggle} {searchState}/>
  {#if searchOpenToggle}
    <div
      out:slide={{ easing: sineOut, duration: 150 }}
      in:slide={{ easing: sineIn, duration: 150 }}
      class="collapse"
      class:show={searchOpenToggle}
      id="siteSearchDropdown"
    >
      {#if searchFormDisplayed}
      <SearchBar />
      {/if}
    </div>
  {/if}
</div>
