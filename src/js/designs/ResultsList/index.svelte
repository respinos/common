<script>
  import ResultsItem from '../ResultsItem';

  let items = [
    {
      htid: 'uiuo.ark:/13960/t9086v22h',
      catalogId: '008717991',
      title: 'Agincourt : a romance by G.P.R. James v.3',
      author: 'James, G. P. R. 1801?-1860.',
      publicationDate: 1844,
      access: 'full-view',
    },
    {
      htid: 'uc1.32106020880685',
      catalogId: '008466494',
      title: 'Contributions from the Dominion Observatory, Ottawa, Ontario v.6:6',
      author: null,
      publicationDate: 1979,
      access: 'limited-search-only',
    },
    {
      htid: 'hvd.32044019639822',
      catalogId: '009720544',
      title: 'The History of the battle of Agincourt, and of the expedition of Henry the Fifth into France; to which is added, The roll of the men at arms, in the English army By Nicholas Harris Nicolas, esq',
      author: 'Nicolas, Nicholas Harris, Sir, 1799-1848.',
      publicationDate: 1827,
      access: 'full-view',
    },
    {
      htid: 'uc1.32106020748999',
      catalogId: '008334259',
      title: 'Publications of the Dominion Observatory, Ottawa v.19:7',
      author: 'Dominion Observatory (Canada)',
      publicationDate: 1970,
      access: 'limited-search-only',
    },
    {
      htid: 'uiuo.ark:/13960/t7pn9p41f',
      catalogId: '008717991',
      title: 'Agincourt : a romance by G.P.R. James v.2',
      author: 'James, G. P. R. 1801?-1860.',
      publicationDate: 1844,
      access: 'full-view',
    },
  ]
</script>

<div class="container">
  {#each items as item}
    <ResultsItem {...item}></ResultsItem>
  {/each}
</div>