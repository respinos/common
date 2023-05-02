<script>
  import { onMount } from 'svelte';
  import FilterableSelection from '../FilterableSelection.svelte';
  import SearchHelpModal from '../SearchHelpModal';

  export let formatData = [];
  export let languageData = [];

  export let useAnyAll = true;

  const fieldOptions = [
    { value: 'ocr', label: 'Everything' },
    { value: 'ocronly', label: 'Only Full-Text' },
    { value: 'all', label: 'All Bibliographic Fields' },
    { value: 'title', label: 'Title' },
    { value: 'author', label: 'Author' },
    { value: 'subject', label: 'Subject' },
    { value: 'isn', label: 'ISBN/ISSN' },
    { value: 'publisher', label: 'Publisher' },
    { value: 'series', 'label': 'Series' },
    // { field: 'year', label: 'Year of Publication' },
  ];

  let booleanOptions = [
    { value: 'AND', label: 'And' },
    { value: 'OR', label: 'Or' }
  ];

  const yopOptions = [
    { value: 'before', label: 'Before' },
    { value: 'after', label: 'After' },
    { value: 'between', label: 'Between' },
    { value: 'in', label: 'Only during' },
  ]

  const anyallOptions = [
    { value: 'all', label: 'all of these words' },
    { value: 'any', label: 'any of these words' },
    { value: 'phrase', label: 'this exact phrase' },
  ];

  let yop = 'after';
  let pubYear = {};
  let lang = [];
  let format = [];
  let modal;
  // let types = new Array(4); types.fill('ocr');
  let types = ['ocr', 'all', 'title', 'author'];
  let lookFors = new Array(4); lookFors.fill('');
  let bools = new Array(4); bools.fill('AND');
  let anyalls = new Array(4); anyalls.fill('all');
  let isFullView = true;

  let errors = { 
    lookFors: false,
    yop: false,
  };

  function validatePubYear(value) {
    if ( ! value.match(/^\d+$/) ) {
      errors.yop = true;
    }
  }

  function submitForm(event) {
    // which are we targeting?
    errors.lookFors = false; errors.yop = false; errors = errors;
    event.preventDefault();

    console.log("AHOY AHOY", lookFors, types, bools);
    let target = 'catalog';
    let url;
    for(let i = 0; i < types.length; i++) {
      if ((types[i] == 'ocr' || types[i] == 'ocronly') && lookFors[i]) {
        target = 'ls';
        break;
      }
    }
    if (target == 'catalog') {
      url = new URL(`https://${HT.catalog_domain}/Search/Home`);
      let searchParams = new URLSearchParams();
      if (isFullView) {
        searchParams.set('setft', 'true');
        searchParams.set('ft', 'ft');
      }

      let hasSearchTerms = false;
      lookFors.forEach((value, idx) => {
        if ( value ) {
          if ( anyalls[idx] == 'any' ) {
            value = value.replace(' ', ' OR ');
          } else if ( anyalls[idx] == 'phrase' && value[0] != '"' ) {
            value = `"${value}"`;
          }
          searchParams.set('lookfor[]', value);
          hasSearchTerms = true;
        }
      })
      types.forEach((value, idx) => {
        if ( value && lookFors[idx] ) {
          searchParams.set(
            `type[]`, 
            value
          );
        }
      })

      if (!hasSearchTerms) {
        errors.lookFors = true;
      }

      console.log("AHOY PUB YEARS", pubYear);
      if (Object.values(pubYear).find((value) => value != '')) {
        // possibly have pub year
        if (yop == 'before' && pubYear.end) {
          searchParams.set('yop', yop);
          searchParams.set('fqrange-end-publishDateTrie-1', pubYear.end);
          validatePubYear(pubYear.end);
        } else if ( yop == 'after' && pubYear.start ) {
          searchParams.set('yop', yop);
          searchParams.set('fqrange-start-publishDateTrie-1', pubYear.start);
          validatePubYear(pubYear.start);
        } else if ( yop == 'between' ) {
          if ( ! ( pubYear.start && pubYear.end ) ) {
            yop = pubYear.start ? 'after' : 'before';
          }
          searchParams.set('yop', yop);
          if ( pubYear.start ) {
            searchParams.set('fqrange-start-publishDateTrie-1', pubYear.start);
            validatePubYear(pubYear.start);
          }
          if ( pubYear.end ) {
            searchParams.set('fqrange-end-publishDateTrie-1', pubYear.end);
            validatePubYear(pubYear.end);
          }
        } else if ( yop == 'in' && pubYear.exact ) {
          searchParams.set('yop', yop);
          searchParams.set('fqor-publishDateTrie', pubYear.exact);
          validatePubYear(pubYear.exact);
        }
      }

      bools.forEach((value, idx) => {
        if ( value && lookFors[idx] ) {
          searchParams.set(
            `bool-${idx + 1}`, 
            value
          );
        }
      })

      lang.forEach((value) => {
        searchParams.append('fqor-language[]', value);
      })
      format.forEach((value) => {
        searchParams.append('fqor-format[]', value);
      })

      url.search = searchParams.toString();
      
    } else {
      url = new URL(`https://${HT.service_domain}/cgi/ls`);
      let searchParams = new URLSearchParams();
      if (isFullView) {
        searchParams.set('lmt', 'ft');
      }
      searchParams.set('a', 'srchls');
      searchParams.set('adv', 1);
      searchParams.set('skin', 'firebird');
      
      let hasSearchTerms = false;
      lookFors.forEach((value, idx) => {
        if ( value ) {
          searchParams.set(`q${idx + 1}`, value);
          hasSearchTerms = true;
        }
      })
      types.forEach((value, idx) => {
        if ( value && lookFors[idx] ) {
          searchParams.set(
            `field${idx + 1}`, 
            value == 'everything' ? 'ocr' : value
          );
        }
      })
      anyalls.forEach((value, idx) => {
        if ( value && lookFors[idx] ) {
          searchParams.set(
            `anyall${idx + 1}`, 
            value
          );
        }
      })
      bools.forEach((value, idx) => {
        if ( value && lookFors[idx] ) {
          searchParams.set(
            `op${idx + 1}`, 
            value
          );
        }
      })

      if (!hasSearchTerms) {
        errors.lookFors = true;
      }

      console.log("AHOY PUB YEARS", pubYear);
      if (Object.values(pubYear).find((value) => value != '')) {
        // possibly have pub year
        if (yop == 'before' && pubYear.end) {
          searchParams.set('yop', yop);
          searchParams.set('pdate_end', pubYear.end);
          validatePubYear(pubYear.end);
        } else if ( yop == 'after' && pubYear.start ) {
          searchParams.set('yop', yop);
          searchParams.set('pdate_start', pubYear.start);
          validatePubYear(pubYear.start);
        } else if ( yop == 'between' ) {
          if ( ! ( pubYear.start && pubYear.end ) ) {
            yop = pubYear.start ? 'after' : 'before';
          }
          searchParams.set('yop', yop);
          if ( pubYear.start ) {
            searchParams.set('pdate_start', pubYear.start);
            validatePubYear(pubYear.start);
          }
          if ( pubYear.end ) {
            searchParams.set('pdate_end', pubYear.end);
            validatePubYear(pubYear.end);
          }
        } else if ( yop == 'in' && pubYear.exact ) {
          searchParams.set('yop', yop);
          searchParams.set('pdate', pubYear.exact);
          validatePubYear(pubYear.exact);
        }
      }

      lang.forEach((value) => {
        searchParams.append('facet_lang', `language008_full:${value}`);
      })
      format.forEach((value) => {
        searchParams.append('facet_format', `format:${value}`);
      })

      url.search = searchParams.toString();
    }

    console.log(url.toString());
    if (window.xyzzy) { return; }
    location.assign(url.toString());
  }

  onMount(() => {
    let params = new URLSearchParams(location.search.replace(/;/g, '&'));
    if (params.get('lookfor[]')) {
      // seed catalog search
      params.getAll('lookfor[]').forEach((value, idx) => {
        lookFors[idx] = value;
      });
      params.getAll('type[]').forEach((value, idx) => {
        types[idx] = value;
      });
    } else if (params.get('q1')) {
      // full-text search
      lookFors[0] = params.get('q1'); 
      types[0] = params.get('field1') || 'ocr';
      anyalls[0] = params.get('anyall1') || 'all';
      lookFors[1] = params.get('q2'); 
      types[1] = params.get('field2') || 'all';
      anyalls[1] = params.get('anyall2') || 'all';
      bools[1] = params.get('op2') || 'and';
      lookFors[2] = params.get('q3'); 
      types[2] = params.get('field3') || 'title';
      anyalls[2] = params.get('anyall3') || 'all';
      bools[2] = params.get('op3') || 'and';
      lookFors[3] = params.get('q4'); 
      types[3] = params.get('field4') || 'author';
      anyalls[3] = params.get('anyall4') || 'all';
      bools[4] = params.get('op3') || 'and';

      if (params.get('facet_lang')) {
        params.getAll('facet_lang').forEach((value) => {
          lang.push(value.replace('language008_full:', ''));
        })
        lang = lang;
      }
      if (params.get('facet_format')) {
        params.getAll('facet_format').forEach((value) => {
          format.push(value.replace('format:', ''));
        })
        format = format;
      }
      console.log("AHOY ON MOUNT", lang, format);
    }
  });
  
</script>

<div class="twocol">
  <div class="twocol-side" id="sidebar">
    <h1>Advanced Search</h1>
    <div class="search-details d-flex">
      <span class="search-help"
        ><i class="fa-solid fa-circle-info fa-fw" />
      Search for items you can access.
    </div>
    <div class="d-flex">
      <a
        href="#"
        on:click|preventDefault={() => {
          modal.show();
        }}
        ><i class="fa-regular fa-circle-question fa-fw" /><span
          >Search Help</span
        ></a
      >
    </div>
  </div>
  <div class="twocol-main">
    <div class="mainplain w-auto position-relative">
      <form on:submit={submitForm}>
        <h2 class="mb-3">Search by field</h2>
        {#if errors.lookFors}
        <div class="alert alert-block alert-warning d-flex gap-3 align-items-center">
          <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
          A search term is required to submit an advanced search.
        </div>
        {/if}
        {#each lookFors as value, idx}
          {#if idx > 0}
          <fieldset class="mb-3">
            <legend class="visually-hidden">Boolean operator for field {idx - 1} and field {idx}</legend>
            <div class="d-flex gap-3 align-items-center justify-content-start">
              {#each booleanOptions as option, bidx}
                <div class="form-check">
                  <input name="boolean-{idx}" id="boolean-{bidx}" type="radio" class="form-check-input" value={option.value} checked={(option.value == bools[idx])} />
                  <label class="form-check-label text-uppercase" for="boolean-{bidx}">{option.value}</label>
                </div>
              {/each}
            </div>
          </fieldset>
          {/if}
        <fieldset class="search-clause mb-3 border border-dark rounded">
          <div class="d-flex">
            <legend class="visually-hidden">Search Field {idx + 1}</legend>
            <div class="select-container border border-0 flex-grow-1">
              <select class="form-select rounded-0 rounded-start" aria-label="Selected field {idx + 1}" bind:value={types[idx]}>
                {#each fieldOptions as option}
                <option value={option.value} >{option.label}</option>
                {/each}
              </select>
            </div>
            <div class="select-container border border-0 flex-grow-1">
              <select class="form-select rounded-0" aria-label="Selected match {idx + 1}" bind:value={anyalls[idx]}>
                {#each anyallOptions as option}
                <option value={option.value} >{option.label}</option>
                {/each}
              </select>
            </div>
            <div class="search-input flex-grow-1">
              <input
                type="text"
                class="form-control shadow-none"
                aria-label="Search Term {idx + 1}"
                placeholder="Search term {idx + 1}"
                bind:value={lookFors[idx]}
              />
            </div>
          </div>
        </fieldset>
        {/each}

        <div class="d-flex mb-3 justify-content-end">
          <button class="btn btn-primary btn-lg" type="submit">
            <span>Advanced Search</span>
            <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
          </button>
        </div>

        <h2 class="mb-3">Additional Search Options</h2>
        <fieldset class="mb-4">
          <legend class="fs-4 fw-bold">View Options</legend>
          <div class="form-check">
            <input id="view-options" type="checkbox" class="form-check-input" value="ft" bind:checked={isFullView} />
            <label class="form-check-label" for="view-options">Full View Only</label>
          </div>
        </fieldset>

        <fieldset class="mb-4">
          <legend class="fs-4 fw-bold">Publication Year</legend>
          {#if errors.yop}
          <div class="alert alert-block alert-warning d-flex gap-3 align-items-center">
            <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
            Publication Year must be between 0-9999.
          </div>
          {/if}
          <div class="d-flex gap-3 mb-1">
            {#each yopOptions as option, yidx}
            <div class="form-check">
              <input name="yop" id="yop-{yidx}" type="radio" class="form-check-input" value={option.value} checked={yop == option.value} bind:group={yop} />
              <label class="form-check-label" for="yop-{yidx}">{option.label}</label>
            </div>
            {/each}
          </div>
          <div class="d-flex gap-3">
            {#if yop == 'before'}
            <div>
              <label for="yop-before" class="form-label fs-7">End Year</label>
              <input type="text" class="form-control" id="yop-before" placeholder="yyyy" bind:value={pubYear.end} />
            </div>
            {:else if yop == 'after'}
            <div>
              <label for="yop-after" class="form-label fs-7">Start Year</label>
              <input type="text" class="form-control" id="yop-after" placeholder="yyyy" bind:value={pubYear.start}/>
            </div>
            {:else if yop == 'between'}
            <div>
              <label for="yop-after" class="form-label fs-7">Start Year</label>
              <input type="text" class="form-control" id="yop-after" placeholder="yyyy" bind:value={pubYear.start} />
            </div>
            <div>
              <label for="yop-before" class="form-label fs-7">End Year</label>
              <input type="text" class="form-control" id="yop-before" placeholder="yyyy" bind:value={pubYear.end} />
            </div>
            {:else}
            <div>
              <label for="yop-in" class="form-label fs-7">Year</label>
              <input type="text" class="form-control" id="yop-in" placeholder="yyyy" bind:value={pubYear.exact} />
            </div>
            {/if}
          </div>
        </fieldset>

        <fieldset class="mb-4">
          <legend class="fs-4 fw-bold">Language</legend>
          
          <div>
            <FilterableSelection
              --filterable-list-height="15rem"
              items={languageData.map((item) => ({
                      option: item,
                      key: item,
                      value: item,
                    }))}
              label="Language"
              placeholder="Filter by language"
              multiple={true}
              bind:value={lang}
            />
          </div>
        </fieldset>

        <fieldset class="mb-4">
          <legend class="fs-4 fw-bold">Format</legend>

          <p>
            Select one or more options to narrow your results to items that match all of your format selections.
          </p>

          <div>
            <FilterableSelection
              --filterable-list-height="15rem"
              items={formatData.map((item) => ({
                      option: item,
                      key: item,
                      value: item,
                    }))}
              label="Format"
              placeholder="Filter by format"
              multiple={true}
              bind:value={format}
            />
          </div>
        </fieldset>

        <div class="d-flex gap-3 mb-3 justify-content-end">
          <button class="btn btn-secondary" type="reset">
            <span>Reset Form</span>
            <i class="fa-solid fa-arrows-rotate" aria-hidden="true"></i>
          </button>
          <button class="btn btn-primary btn-lg" type="submit">
            <span>Advanced Search</span>
            <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
          </button>
        </div>

      </form>
    </div>
  </div>
</div>
<SearchHelpModal bind:this={modal} />

<style lang="scss">
    .search-input {
      display: flex;
      // border: 0.5px solid var(--color-neutral-500);
      // border-radius: 0.375em;
    }
    .search-clause {
      input[type="text"] {
        width: 100%;
        border: none;
        box-shadow: none;
        border-top-right-radius: 0.375rem !important;
        border-bottom-right-radius: 0.375rem !important;
        padding: 0.625em 0.75em;
      }
      .form-select {
        border: none;
        border-right: 0.5px solid var(--color-neutral-500);
        padding: 0.625em 0.75em;
        width: 100%;
        border-radius: 0.375rem;
        margin-left: 0;
      }  
    }
</style>