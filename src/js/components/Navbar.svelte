<!-- svelte-ignore a11y-invalid-attribute -->
<script>
  // import { Collapse, Dropdown, Popover } from 'bootstrap'
  import menuData from "../../assets/menuData.json";
</script>

<nav class="navbar navbar-expand-lg bg-white">
  <div class="container-fluid">
    <div class="py-3 ps-3">
      <img src="../assets/HT-logo-mobile-nav.svg" alt="HathiTrust" class="" />
    </div>
    <div class="py-3 pe-3 d-flex gap-4">
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span><i class="fa-solid fa-bars fa-fw" /></span>
      </button>
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#"
        aria-controls=""
        aria-expanded="false"
        aria-label="Toggle search bar"
      >
        <span><i class="fa-solid fa-magnifying-glass fa-fw" /></span>
      </button>
    </div>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle d-flex flex-row justify-content-between align-items-center p-3"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            About
          </a>
          <div>
            <ul class="dropdown-menu border-0 shadow-none pt-2">
              <div class="d-flex flex-column gap-4 pt-2">
                {#each menuData.about as linkText}
                  <li class="ps-3">
                    <a class="dropdown-item px-0" href="#">{linkText}</a>
                  </li>
                {/each}
              </div>
            </ul>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle d-flex flex-row justify-content-between align-items-center p-3"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            The Collection
          </a>
          <ul class="dropdown-menu border-0 shadow-none pt-2">
            <div class="d-flex flex-column gap-4 pt-2">
              {#each menuData.collection as linkText}
                <li class="ps-3">
                  <a class="dropdown-item px-0" href="#">{linkText}</a>
                </li>
              {/each}
            </div>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle d-flex flex-row justify-content-between align-items-center p-3"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Member Libraries
          </a>
          <ul class="dropdown-menu border-0 shadow-none pt-2">
            <div class="d-flex flex-column gap-4 pt-2">
              {#each menuData.memberLibraries as linkText}
                <li class="ps-3">
                  <a class="dropdown-item px-0" href="#">{linkText}</a>
                </li>
              {/each}
            </div>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link p-3" href="#">Join</a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle d-flex flex-row justify-content-between align-items-center p-3"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false">News &amp; Events</a
          >
          <ul class="dropdown-menu border-0 shadow-none pt-2">
            <div class="d-flex flex-column gap-4 pt-2">
              {#each menuData.newsEvents as linkText}
                <li class="ps-3">
                  <a class="dropdown-item px-0" href="#">{linkText}</a>
                </li>
              {/each}
            </div>
          </ul>
        </li>
        <li class="nav-item">
          <a
            class="nav-link p-3 text-uppercase d-flex flex-row justify-content-between align-items-center"
            href="#"
            >Get Help <i class="fa-solid fa-square-arrow-up-right fa-fw" /></a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link p-3 text-uppercase d-flex flex-row justify-content-between align-items-center"
            href="#">Log In <i class="fa-solid fa-user fa-fw" /></a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>

<style lang="scss">
  .container-fluid {
    padding: 0;
  }
  .navbar {
    --bs-navbar-padding-y: 0;
    --bs-navbar-color: var(--color-neutral-800);
    --bs-navbar-brand-color: var(--color-neutral-800);
    --bs-nav-link-color: var(--color-neutral-900);
    --bs-nav-link-hover-color: var(--color-primary-500);
  }
  .navbar-toggler {
    padding: 0;
  }
  .navbar-nav {
    font-size: var(--ht-text-sm);
    --bs-nav-link-font-weight: var(--headings-font-weight);
    .nav-item:nth-of-type(6),
    .nav-item:nth-of-type(7) {
      background: var(--color-neutral-50);
      border-top: 1px solid var(--color-neutral-200);
      i {
        color: var(--color-primary-500);
      }
    }
    .nav-item:nth-of-type(7) {
      border-bottom: 1px solid var(--color-neutral-200);
      border-radius: 0 0 8px 8px;
    }
    .nav-link {
      &:hover,
      &:focus {
        color: var(--color-primary-500);
      }
    }
  }
  .dropdown-toggle::after {
    font-size: 1.1rem;
  }
  .dropdown-menu {
    --bs-dropdown-padding-y: 1rem;
    --bs-dropdown-font-size: var(--ht-text-sm);
    --bs-dropdown-color: var(--color-neutral-800);
    --bs-dropdown-bg: var(--color-neutral-50);
    --bs-dropdown-border-radius: 0;
    --bs-dropdown-item-padding-y: 0;
    --bs-dropdown-link-color: var(--color-netural-800);
    --bs-dropdown-link-hover-color: var(--color-netural-800);
    --bs-dropdown-link-hover-bg: var(--color-netural-50);
    a {
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
