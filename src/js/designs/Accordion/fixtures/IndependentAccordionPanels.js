let panelsHTML = '';

for (let i = 1; i <= 10; i++) {
  let panelHTML = '';
  let numLines = (i % 3 == 0) ? 10 : 5;
  for (let n = 1; n <= numLines; n++) {
    panelHTML += `<p>This is line ${n} in panel ${i}</p>`;
  }
  let detailsHTML = `<div class="accordion-item">
    <h2 class="accordion-header" id="heading${i}">
      <button class="accordion-button fw-bold collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
        Accordion Item #${i}
      </button>
    </h2>
    <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}">
      <div class="accordion-body">
        ${panelHTML}
      </div>
    </div>
  </div>`;
  panelsHTML += detailsHTML;
}

export default {
  alwaysOpen: true,
  alert: 'Each accordion panel can be opened indepdently.',
  example: panelsHTML
}