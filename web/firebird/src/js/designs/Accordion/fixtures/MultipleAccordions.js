let examples = [];

for (let ex = 1; ex <= 3; ex++) {
  let panelsHTML = '';
  for (let i = 1; i <= 5; i++) {
    let panelHTML = '';
    let numLines = (i % 3 == 0) ? 10 : 5;
    for (let n = 1; n <= numLines; n++) {
      panelHTML += `<p>This is line ${n} in panel ${i} of example ${ex}</p>`;
    }
    let detailsHTML = `<div class="accordion-item">
  <h2 class="accordion-header" id="heading${ex}${i}">
    <button class="accordion-button fw-bold collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#collapse${ex}${i}" aria-expanded="false" aria-controls="collapse${ex}${i}">
      Example ${ex} Item #${i}
    </button>
  </h2>
  <div id="collapse${ex}${i}" class="accordion-collapse collapse" aria-labelledby="heading${ex}${i}" data-bs-parent="#accordion${ex}">
    <div class="accordion-body">
      ${panelHTML}
    </div>
  </div>
</div>`;
    panelsHTML += detailsHTML;
  }
  examples.push(panelsHTML);
}

export default {
  role: 'accordion',
  overflowed: false,
  alert: 'Multiple accordion groups.',
  example: examples
}