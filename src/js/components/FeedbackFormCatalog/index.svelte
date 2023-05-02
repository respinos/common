<script>
  import { slide } from 'svelte/transition';
  let problems = ['None'];
  let access = 'None';
  let userURL = location.href;
  let userAgent = navigator.userAgent;
  let formName = 'catalog-correction';

  //takes long string output of document.cookie and splits it into a usable javascript object
  let cookies = document.cookie
    .split(';')
    .map((cookie) => cookie.split('='))
    .reduce(
      (accumulator, [key, value]) => ({
        ...accumulator,
        [key.trim()]: decodeURIComponent(value),
      }),
      {}
    );

  //if user isn't logged in, HTstatus cookie won't exist
  let userAuthStatus = cookies.HTstatus || 'not logged in';

  export let postResponseStatusCode;

  // when true, spinner on submit button animates
  export let loading = false;
  // when true, hides the element (in this case, the form)
  export let hidden = false;
  // when true, shows the success/failure alert message
  export let submitted = false;

  const postForm = async (data) => {
    console.log(data);
    return fetch(
      // 'https://feedback-testing.macc.kubernetes.hathitrust.org/api',
      'http://localhost:5006/api',
      {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    ).then((response) => {
      // did something go wrong with the fetch?
      // if yes, the function stops here
      if (!response.ok) {
        postResponseStatusCode = response.status;
        throw new Error(`status: ${response.status}`);
      }

      // otherwise, return jira response promise
      postResponseStatusCode = response.status;
      return response.json();
    });
  };

  // handles front-end reaction to form submission
  const onSubmit = (event) => {
    // set the submit button spinner spinning
    loading = true;

    //set form data
    let data = new FormData(event.target);
    // i could *not* figure out why checkbox values were being ovewritten by each other, so this is my probably too-complex solution
    data.append('problems', problems.join(', '));
    // serialize form data
    data = JSON.stringify(Object.fromEntries(data));
    const form = document.querySelector('.needs-validation');

    // check for required fields
    if (!form.checkValidity()) {
      event.stopPropagation();
      loading = false;
      form.classList.add('was-validated');
    } else {
      // do the post fetch function, passing in the seralized data
      postForm(data)
        // if no error, hide form and log new issue ID
        .then((jiraResponseData) => {
          loading = false;
          submitted = true;
          hidden = true;

          console.log(
            `request created in service desk ${jiraResponseData.serviceDeskId}: ${jiraResponseData.issueKey}`
          );
          console.log('status code', postResponseStatusCode);
        })

        // if something went wrong, stop the submit button spinner, show appropriate error message to user, log error message
        .catch((error) => {
          loading = false;
          submitted = true;
          console.log(`There was an error posting the form, ${error}`);
        });
    }
  };

  const startOver = () => {
    //unhide the form, hide the submission message, reset the form
    hidden = !hidden;
    submitted = !submitted;
    document.querySelector('form').reset();
  };
</script>

<main>
  <form
    on:submit|preventDefault={onSubmit}
    class:hidden
    class="needs-validation mb-3"
    name="feedback"
    novalidate
  >
    <div class="mb-3">
      <label for="name" class="form-label"
        >Name <span class="required">(required)</span></label
      >
      <input type="name" class="form-control" id="name" name="name" required />
      <div class="invalid-feedback">Please provide your name.</div>
      <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
    </div>
    <div class="mb-3">
      <label for="email" class="form-label"
        >Email address <span class="required">(required)</span></label
      >
      <input
        type="email"
        class="form-control"
        id="email"
        name="email"
        required
      />
      <div class="invalid-feedback">Please provide an email address.</div>
    </div>
    <div class="mb-3">
      <label for="summary" class="form-label"
        >Short summary <span class="required">(required)</span></label
      >
      <input
        type="text"
        class="form-control"
        id="summary"
        name="summary"
        required
      />
      <div class="invalid-feedback">
        Please provide a title or subject line to summarize your feedback.
      </div>
    </div>
    <div class="mb-3">
      <label for="recordURL" class="form-label"
        >URL of catalog record <span class="required">(required)</span></label
      >
      <input type="text" class="form-control" id="recordURL" name="recordURL" />
      <div class="invalid-feedback">
        Please provide the URL of the record from the catalog where you found
        the issue.
      </div>
    </div>
    <div class="mb-3">
      <label for="itemURL" class="form-label"
        >URL of specific item within record related to issue <span
          class="required">(optional)</span
        ></label
      >
      <input type="text" class="form-control" id="itemURL" name="itemURL" />
    </div>
    <div class="mb-3">
      <label for="itemTitle" class="form-label"
        >Title of the book <span class="required">(optional)</span></label
      >
      <input type="text" class="form-control" id="itemTitle" name="itemTitle" />
    </div>
    <fieldset class="mb-3">
      <legend class="mb-3 fs-6">
        What specific problems are you noticing with the catalog record?
        <span class="required">(required)</span>
      </legend>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="problems"
          value="Book doesn't match description"
          bind:group={problems}
        />
        <label class="form-check-label" for="flexCheckDefault">
          The book doesn't match the description in its catalog record
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="problems"
          value="Typo in metadata"
          bind:group={problems}
        />
        <label class="form-check-label" for="flexCheckDefault">
          There is a typo in the metadata
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="problems"
          value="Other"
          bind:group={problems}
        />
        <label class="form-check-label" for="flexCheckDefault">
          Other (describe in description box)
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="problems"
          value="None"
          bind:group={problems}
          checked
        />
        <label class="form-check-label" for="flexCheckChecked">
          No problems
        </label>
      </div>
    </fieldset>
    <fieldset class="mb-3">
      <legend class="mb-3 fs-6">
        Is there a problem with access rights for this item? <span
          class="required">(required)</span
        >
      </legend>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="access"
          id="public-domain"
          value="Item in public domain, but I don't have access to it"
          bind:group={access}
        />
        <label class="form-check-label" for="public-domain">
          This item is in the public domain, but I don't have access to it.
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="access"
          value="Fed doc I should be able to access"
          bind:group={access}
          id="fed-document"
        />
        <label class="form-check-label" for="fed-document">
          This it is a U.S. federal document, and therefore I should be able to
          access it.
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="access"
          value="I shouldn't have acccess to this item"
          bind:group={access}
          id="should-not-have-access"
        />
        <label class="form-check-label" for="should-not-have-access">
          I have access to this item but should not.
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="access"
          id="none"
          value="None"
          bind:group={access}
          checked
        />
        <label class="form-check-label" for="none"> No problems </label>
      </div>
    </fieldset>
    <div class="mb-3">
      <label for="description" class="form-label"
        >Other problems or comments? <span class="optional">(required)</span
        ></label
      >
      <textarea
        class="form-control"
        id="description"
        name="description"
        rows="3"
      />
    </div>
    <input name="userURL" id="userURL" type="hidden" bind:value={userURL} />
    <input
      name="userAgent"
      id="userAgent"
      type="hidden"
      bind:value={userAgent}
    />
    <input
      name="userAuthStatus"
      id="userAuthStatus"
      type="hidden"
      bind:value={userAuthStatus}
    />
    <input name="formName" id="formName" type="hidden" bind:value={formName} />

    <button type="submit" class="btn btn-primary" disabled={loading}>
      Submit
      {#if loading}
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
        <span class="visually-hidden">Loading...</span>
      {/if}
    </button>
    <div id="data-message" class="form-text">
      By submitting this form, you agree to send your browser details to help
      our team track down your issue.
    </div>
  </form>

  <!-- TODO: use props to make these messages more modular <FormMessage /> -->
  {#if submitted}
    <section>
      {#if postResponseStatusCode === 200}
        <div transition:slide>
          <div class="alert alert-success submit-message" role="alert">
            <i class="fa-solid fa-circle-check fa-lg me-2" />
            <div>
              <div class="d-flex flex-column">
                <strong>Thank you!&nbsp;</strong>Your feedback has been
                submitted.
              </div>
              <button
                type="button"
                class="btn btn-success"
                on:click={startOver}
                on:keypress={startOver}
                >Start over <i
                  class="fa-solid fa-arrow-rotate-left fa-lg ms-2"
                /></button
              >
            </div>
          </div>
        </div>
      {:else if postResponseStatusCode === 429}
        <div transition:slide>
          <div class="alert alert-danger submit-message" role="alert">
            <i class="fa-solid fa-triangle-exclamation fa-lg me-2" />
            <div>
              <strong>Limit reached.&nbsp;</strong>You have reached the maximum
              amount of submissions for this time period. Please submit your
              request again another time.
            </div>
          </div>
        </div>
      {:else}
        <div transition:slide={{ duration: 300 }}>
          <div class="alert alert-danger submit-message" role="alert">
            <i class="fa-solid fa-triangle-exclamation fa-lg me-2" />
            <div>
              <strong>Oops!&nbsp;</strong>There was an error submitting the
              form. Please try again or email us at support@hathitrust.org
            </div>
          </div>
        </div>
      {/if}
    </section>
  {/if}
</main>

<style lang="scss">
  .form-control:focus {
    background-color: var(--color-neutral-50);
  }
  .hidden {
    display: none;
  }
  .required {
    font-size: 0.75em;
  }
  .submit-message {
    /*styles for md and up screens*/
    display: flex;
    align-items: center;
    gap: 1em;
    @media (min-width: 768px) {
      gap: 0.25em;
    }
    & > div {
      display: flex;
      flex-direction: column;
    }
    & > i {
      font-size: 2em;
      @media (min-width: 768px) {
        font-size: 1.5em;
      }
    }
    button {
      margin-top: 0.5em;
    }
  }
  .alert-success.submit-message {
    & > div {
      @media (min-width: 768px) {
        flex-direction: row;
        gap: 1em;
      }
    }
    button {
      @media (min-width: 768px) {
        margin-top: 0;
      }
    }
  }
</style>
