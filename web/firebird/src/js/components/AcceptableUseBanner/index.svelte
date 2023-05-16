<script>

  let HT = window.HT || {};
  export let cookieJar = HT.cookieJar;
  let xtracking = JSON.parse(cookieJar.getItem('HT.x') || '{}');

  const key = 'aup-notice';
  let isVisible = xtracking[key] != true;

  function confirm() {
    let expires = new Date();
    expires.setDate(expires.getDate() + 90);
    xtracking[key] = true;
    cookieJar.setItem('HT.x', JSON.stringify(xtracking), expires, '/', HT.cookies_domain, true);
    isVisible = false;
  }

</script>

{#if isVisible}
<div 
  class="aup-banner alert alert-dark alert-block d-flex gap-4 align-items-center justify-content-center p-4 shadow-lg">
    <div class="fs-3">
      <p class="mb-0">
        By logging into HathiTrust, you agree to follow our 
        <a class="alert-link" href="https://www.hathitrust.org/acceptable-use">Acceptable Use Policy.</a>
      </p>
      <!-- <p class="mb-0 mt-3">
        This website stores data such as cookies to enable essential site functionality, 
        as well as marketing, personalization, and analytics. By remaining on this website 
        you indicate your consent. For more more information, 
        see our <a class="alert-link" href="https://www.hathitrust.org/privacy">Privacy Notice.</a>
      </p> -->
    </div>
    <button type="button" class="btn btn-dark btn-lg" on:click={confirm}>OK</button>
</div>
{/if}

<style>
  .aup-banner {
    position: fixed;
    bottom: 0.5rem;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    gap: 2rem !important;
  }
</style>