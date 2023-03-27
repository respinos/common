<script>
  export let htid = 'hvd.32044019639822';
  export let access = 'full-view';
  export let catalogId = '009720544';
  export let title = 'The History of the battle of Agincourt, and of the expedition of Henry the Fifth into France; to which is added, The roll of the men at arms, in the English army By Nicholas Harris Nicolas, esq';
  export let publicationDate = 1827;
  export let author = 'Nicolas, Nicholas Harris, Sir, 1799-1848.';

  let coverUrl = `https://babel.hathitrust.org/cgi/imgsrv/cover?id=${htid}`;
  let blankImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=`;
</script>

<style lang="scss">

  article:nth-child(even) {
    background: var(--color-neutral-100);
  }

  .d-gap-3 {
    gap: 1rem;
  }

  .cover {
    width: 6rem;
    text-align: right;
    flex-shrink: 0;
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
    border-radius: 4px;
    color: white;
  }
</style>

<article class="record d-flex d-gap-3 p-3">
  <div class="cover" data-hdl="{htid}">
    {#if htid == 'MULTIPLE'}
    <img loading="lazy" class="bookCover border p-1 flex-grow-0 flex-shrink-0" aria-hidden="true" alt="" height="90" width="60" src={blankImage}>
    {:else}
    <img loading="lazy" class="bookCover border p-1 flex-grow-0 flex-shrink-0" aria-hidden="true" alt="" src={coverUrl}>
    {/if}
  </div>
  <div>
    <div class="container">
      <h3 class="record-title">{title}</h3>
      <dl>
        <div class="grid">
          <dt class="g-col-2">Published</dt>
          <dd class="g-col-10">{publicationDate}</dd>
        </div>
        <div class="grid">
          <dt class="g-col-2">Author</dt>
          <dd class="g-col-10">{author}</dd>
        </div>
      </dl>
    </div>
    <div class="container border-top">
      <ul class="list-inline d-flex">
        <li class="m-3 ms-0">
          <a class="d-inline-flex align-items-center gx-1" href="http://catalog.hathitrust.org/Record/{catalogId}" data-clicktype="catalog"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> <span>Catalog Record</span></a>
        </li>
        <li class="m-3">
          {#if htid == 'MULTIPLE'}
          <span>(view record to see multiple volumes)</span>
          {:else if access == 'limited-search-only'}
          <a class="d-inline-flex align-items-center gx-2" href="https://babel.hathitrust.org/cgi/pt?id={htid}" data-clicktype="pt"><i aria-hidden="true" class="fa-solid fa-lock"></i> <span>Limited (search-only)</span></a>
          {:else if access == 'limited-access-permitted'}
          <a data-access-role="superuser" class="d-inline-flex align-items-center gx-2" href="https://babel.hathitrust.org/cgi/pt?id={htid}" data-clicktype="pt"><i aria-hidden="true" class="fa-solid fa-unlock"></i> <span>Limited (access permitted)</span></a>
          {:else}
          <a class="d-inline-flex align-items-center gx-2" href="https://babel.hathitrust.org/cgi/pt?id={htid}" data-clicktype="pt"><i aria-hidden="true" class="fa-regular fa-file-lines"></i> <span>Full View</span></a>
          {/if}
        </li>
      </ul>
    </div>
  </div>
  <div class="record-action form-check" style="order: -1">
    <input class="form-check-input" type="checkbox" id="select-{htid}" name="extern_item_id" value={htid} aria-label="Add item to a collection" />
  </div>
</article>