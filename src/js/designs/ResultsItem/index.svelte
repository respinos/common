<script>
  export let htid = 'hvd.32044019639822';
  export let access = 'full-view';
  export let catalogId = '009720544';
  export let title = 'The History of the battle of Agincourt, and of the expedition of Henry the Fifth into France; to which is added, The roll of the men at arms, in the English army By Nicholas Harris Nicolas, esq';
  export let publicationDate = 1827;
  export let author = 'Nicolas, Nicholas Harris, Sir, 1799-1848.';
  export let supportsSelection = true;

  let coverUrl = `https://babel.hathitrust.org/cgi/imgsrv/cover?id=${htid}&width=250`;
  let blankImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`;
</script>

<style lang="scss">

  .metadata .grid {
    --bs-gap: 0rem;
  }

  .cover {
    width: 6rem;
    text-align: right;
    flex-shrink: 0;

    img {
      max-width: 100%;
    }
  }

  a.d-inline-flex {
    gap: var(--bs-gutter-x);
    text-decoration: none;
    padding: 0.25rem;

    & > * {
      text-decoration: underline;
    }
  }

  a i[aria-hidden] {
    text-decoration: none;
  }

  a[data-access-role] {
    background: #924a0b;
    // border-radius: 4px;
    color: white;

    &:hover {
      background: white;
      color:  #924a0b;
    }
  }

  .list-group a {
    white-space: nowrap;

    &:has(+ span) {
      border-top-right-radius: var(--bs-list-group-border-radius) !important;
      border-bottom-right-radius: var(--bs-list-group-border-radius) !important;
    }
  }

</style>

<article class="record d-flex gap-3 p-3 border-bottom mb-3 mt-3">
  <div class="cover d-none d-md-block" data-hdl="{htid}">
    <img loading="lazy" class="bookCover border p-1 flex-grow-0 flex-shrink-0" aria-hidden="true" alt="" src={coverUrl}>
  </div>
  <div class="flex-grow-1 d-flex flex-column justify-content-between">
    <div class="container-fluid p-1">
      <h3 class="record-title">{title}</h3>
      <dl class="metadata">
        <div class="grid">
          <dt class="g-col-lg-4 g-col-12">Published</dt>
          <dd class="g-col-lg-8 g-col-12">{publicationDate}</dd>
        </div>
        {#if author}
        <div class="grid">
          <dt class="g-col-lg-4 g-col-12">Author</dt>
          <dd class="g-col-lg-8 g-col-12">{author}</dd>
        </div>
        {/if}
      </dl>
    </div>
    <div>
      {#if access == 'multiple-items'}
        <p class="fs-7 text-secondary mb-1">
          Use the Catalog Record to view multiple volumes
        </p>
      {/if}
      <div class="list-group list-group-horizontal-sm align-items-center">
        <a class="list-group-item list-group-item-action w-sm-50" href="http://catalog.hathitrust.org/Record/{catalogId}"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> <span>Catalog Record</span></a>
        {#if access == 'multiple-items'}
        <!-- <span class="list-group-item w-sm-50 border-0 bg-transparent fs-7">Use the Catalog Record to view multiple volumes</span> -->
        {:else if access == 'limited-search-only'}
        <a class="list-group-item list-group-item-action w-sm-50" href="https://babel.hathitrust.org/cgi/pt?id={htid}"><i aria-hidden="true" class="fa-solid fa-lock"></i> <span>Limited (search-only)</span></a>
        {:else if access == 'limited-access-permitted'}
        <a data-access-role="superuser" class="list-group-item list-group-item-action w-sm-50" href="https://babel.hathitrust.org/cgi/pt?id={htid}"><i aria-hidden="true" class="fa-solid fa-unlock"></i> <span>Limited (access permitted)</span></a>
        {:else}
        <a class="list-group-item list-group-item-action list-group-item-dark active w-sm-50" href="https://babel.hathitrust.org/cgi/pt?id={htid}"><i class="fa-regular fa-file-lines" aria-hidden="true"></i> <span>Full View</span></a>
        {/if}
      </div>
    </div>
    </div>
  {#if supportsSelection}
  <div class="record-action form-check" style="order: -1">
    <input class="form-check-input" type="checkbox" id="select-{htid}" name="extern_item_id" value={htid} aria-label="Add item to a collection" />
  </div>
  {/if}
</article>