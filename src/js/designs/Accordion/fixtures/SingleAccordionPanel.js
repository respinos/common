const i = 1;
export default {
  example: `<div class="accordion-item">
    <h2 class="accordion-header" id="heading${i}">
      <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
        Accordion Item #${i}
      </button>
    </h2>
    <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}">
      <div class="accordion-body">
        <p>This is just a panel.</p>
        <ul>
          <li>Option 1.</li>
          <li>Option 2.</li>
          <li>Option 3.</li>
          <li>Option 4.</li>
          <li>Option 5.</li>
        </ul>
      </div>
    </div>
  </div>`
}