<script>
// import { Collapse, Dropdown, Popover } from 'bootstrap'
</script>

<nav class="navbar navbar-expand-lg bg-white">
  <div class="container-fluid">
    <img src="../assets/HT-logo-mobile-nav.svg" alt="HathiTrust">
    <div>
    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span><i class="fa-solid fa-bars"></i></span>
      </button>
    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#" aria-controls="" aria-expanded="false" aria-label="Toggle search bar">
      <span><i class="fa-solid fa-magnifying-glass"></i></span>
    </button>
    </div>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle d-flex flex-row justify-content-between align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            About
          </a>
          <ul class="dropdown-menu border-0 shadow-none">
            <li><a class="dropdown-item px-0" href="#">Welcome to HathiTrust</a></li>
            <li><a class="dropdown-item px-0" href="#">Our Mission &amp; History</a></li>
            <li><a class="dropdown-item px-0" href="#">HathiTrust Research Center (HTRC)</a></li>
            <li><a class="dropdown-item px-0" href="#">Our Team</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle d-flex flex-row justify-content-between align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           The Collection 
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">About the Collection</a></li>
            <li><a class="dropdown-item" href="#">How to Search &amp; Access</a></li>
            <li><a class="dropdown-item" href="#">Preservation</a></li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle d-flex flex-row justify-content-between align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Member Libraries
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Member Library Overview</a></li>
            <li><a class="dropdown-item" href="#">Member List</a></li>
            <li><a class="dropdown-item" href="#">Services & Programs</a></li>
            <li><a class="dropdown-item" href="#">Resources for Librarians</a></li>
          </ul>
        </li>
         <li class="nav-item">
          <a class="nav-link active" href="#">Join</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle d-flex flex-row justify-content-between align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">News &amp; Events</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Newsletter</a></li>
            <li><a class="dropdown-item" href="#">Blog</a></li>
            <li><a class="dropdown-item" href="#">Events &amp; Webinars</a></li>
            <li><a class="dropdown-item" href="#">Press</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

<style lang="scss">
.navbar {
    --bs-navbar-color: var(--color-neutral-800);
    --bs-navbar-brand-color: var(--color-neutral-800);
    .navbar-nav {
        --bs-nav-link-font-weight: var(--headings-font-weight)
    }
 }
</style>