<script>
  import { slide } from 'svelte/transition';
  let userURL = location.href;
  let userAgent = navigator.userAgent;

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

  let postResponseStatusCode;

  // when true, spinner on submit button animates
  let loading = false;
  // when true, hides the element (in this case, the form)
  let hidden = false;
  // when true, shows the success/failure alert message
  let submitted = false;

  const postForm = async () => {
    //shoelace serializer for turning FormData into JSON
    const form = document.querySelector('form');
    const data = serialize(form);

    return fetch('http://localhost:5000/api', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then((response) => {
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
  const onSubmit = () => {
    // set the submit button spinner spinning
    loading = true;

    // do the post fetch function
    postForm()
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
  };

  const startOver = () => {
    //unhide the form, hide the submission message, reset the form
    hidden = !hidden;
    submitted = !submitted;
    document.querySelector('form').reset();
  };
</script>

<main>
  <form on:submit|preventDefault={onSubmit} class:hidden>
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="name" class="form-control" id="name" name="name" required />
      <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        id="email"
        name="email"
        required
      />
    </div>
    <div class="mb-3">
      <label for="summary" class="form-label">Short summary</label>
      <input type="text" class="form-control" id="summary" name="summary" />
    </div>
    <div class="mb-3">
      <label for="bookDescription" class="form-label"
        >Description or URL of the book</label
      >
      <input
        type="text"
        class="form-control"
        id="bookDescription"
        name="bookDescription"
      />
    </div>
    <div class="mb-3">
      <label for="description" class="form-label"
        >Full description of problem or question</label
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

    <button type="submit" class="btn btn-primary">Submit</button>

    <!-- <div class="form-options">
      <sl-button
        class="btn form-button"
        variant="default"
        type="submit"
        value="Submit"
        aria-label="Submit">Cancel</sl-button
      >
      <sl-button
        class="btn form-button"
        variant="primary"
        type="submit"
        value="Submit"
        aria-label="Submit"
        {loading}>Submit</sl-button
      >
    </div> -->
  </form>

  <!-- TODO: use props to make these messages more modular <FormMessage /> -->
  <!-- a whole bunch of shoelace stuff that needs to be converted to bootstrap-->
  <!--
  {#if submitted}
    <section>
      {#if postResponseStatusCode === 200}
        <div transition:slide>
          <sl-alert variant="success" open>
            <sl-icon slot="icon" name="check2-circle" />
            <strong>Thank you!</strong><br />
            Your feedback has been submitted.
            <sl-button
              variant="default"
              on:click={startOver}
              on:keypress={startOver}
              ><sl-icon slot="suffix" name="arrow-counterclockwise" />Start over</sl-button
            >
          </sl-alert>
        </div>
      {:else if postResponseStatusCode === 429}
        <div transition:slide>
          <sl-alert variant="danger" open>
            <sl-icon slot="icon" name="exclamation-octagon" />
            <strong>Limit reached</strong><br />
            You have reached the maximum amount of submissions for this time period.
            Please submit your request again another time.
          </sl-alert>
        </div>
      {:else}
        <div transition:slide={{ duration: 300 }}>
          <sl-alert variant="danger" open>
            <sl-icon slot="icon" name="exclamation-octagon" />
            <strong>Oops!</strong><br />
            There was an error submitting the form. Please try again or email us
            at support@hathitrust.org
          </sl-alert>
        </div>
      {/if}
    </section>
  {/if}
-->
</main>

<style>
  .form-control:focus {
    background-color: var(--color-neutral-50);
  }
  .hidden {
    display: none;
  }

  /* .label-on-left {
    --label-width: 150px;
    --gap-width: 1rem;
  }

  .label-on-left + .label-on-left {
    margin-top: var(--sl-spacing-medium);
  }

  .label-on-left::part(form-control) {
    display: grid;
    grid: auto / var(--label-width) 1fr;
    gap: var(--sl-spacing-3x-small) var(--gap-width);
    align-items: center;
  }

  .label-on-left::part(form-control-label) {
    text-align: right;
  }

  .form-options {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 1em 0;
  } */
</style>
