// Settings:
// Timeout to hide tooltip
const TIMEOUT_LENGTH = 500;
const ACTIVE_TIMEOUT_LENGTH = 1500;

// global timeout map; quick n dirty
const timeouts = new WeakMap();

// if the user actively dismisses a tooltip, save that setting
// and do not show the tooltip again
const dismissals = new WeakMap();

const initialized = new WeakMap();

const TOOLTIP_OPTION = 'tooltip'; // 'humane'

var idx = 0;
var messageIdx = 0;

function initTooltipHumane(tooltipContainer) {
  const trigger = tooltipContainer;
  const tooltip = trigger;
  tooltipContainer.addEventListener('mouseover', () => {
    showTooltipHumane(tooltip);
  });
  trigger.addEventListener('focus', () => {
    showTooltipHumane(tooltip);
  });
  trigger.addEventListener('click', () => {
    timeoutTooltipHumane(tooltip, ACTIVE_TIMEOUT_LENGTH);
  });
  tooltipContainer.addEventListener('mouseleave', () => {
    timeoutTooltipHumane(tooltip);
  });
  trigger.addEventListener('blur', () => {
    hideTooltipHumane(tooltip);
  });
  
}

// here we attach all event listeners to control the tooltip
function initTooltip(tooltipContainer) {

  // const trigger = tooltipContainer.classList.contains('tooltip-trigger') ? tooltipContainer : tooltipContainer.querySelector('.tooltip-trigger');
  const trigger = tooltipContainer;
  let tooltip = trigger.querySelector('.offscreen');
  trigger.dataset.constructing = ( tooltip == null );
  if ( ! tooltip ) {
    tooltip = document.createElement('div');
  } else {
    trigger.setAttribute('aria-label', $.trim(tooltip.innerText));
  }
  
  initialized.set(trigger, true);

  tooltip.classList.add('tooltip');
  tooltip.classList.remove('offscreen');
  tooltip.classList.add(trigger.dataset.microtipPosition || 'bottom');
  tooltip.style.display = 'none';
  tooltip.setAttribute('aria-hidden', 'true');
  idx += 1;
  tooltip.setAttribute('id', `tooltip${idx}`);

  if ( trigger.dataset.constructing == 'true' ) {
    trigger.appendChild(tooltip);
    tooltip.innerText = trigger.getAttribute('aria-label');
  }

  // // show tooltip on hover and focus
  // tooltipContainer.addEventListener('mouseover', () => {
  //   showTooltip(tooltip);
  // });
  // trigger.addEventListener('focus', () => {
  //   showTooltip(tooltip);
  // });
  // // trigger.addEventListener('click', () => {
  // //   timeoutTooltip(tooltip, ACTIVE_TIMEOUT_LENGTH);
  // // });
  
  // // hide tooltip on mouse out and blur
  // // use timeout on mouse leave
  // tooltipContainer.addEventListener('mouseleave', () => {
  //   timeoutTooltip(tooltip);
  // });
  // trigger.addEventListener('blur', () => {
  //   hideTooltip(tooltip);
  // });
  
  // // hide the tooltip on escape key press
  // trigger.addEventListener('keydown', (event) => {
  //   if (event.key === 'Escape') {
  //     hideTooltip(tooltip);
  //     // save dismissal
  //     dismissals.set(tooltip, true);
  //   }
  // });

  // create a close button for pointer dismissal
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '';
  closeBtn.tabIndex = -1;
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.setAttribute('aria-hidden', 'true');
  closeBtn.classList.add('tooltip__close');
  tooltip.appendChild(closeBtn);
  closeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    hideTooltip(tooltip);
    // save dismissal
    dismissals.set(tooltip, true);
  });

  // hide the tooltip in here so they show up without JS on
  // debateably useful
  tooltip.style.display = 'none';
}

function showTooltipHumane(tooltip) {
  messageIdx += 1;
  if ( timeoutId ) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  message.innerText = tooltip.getAttribute('aria-label');
  message.style.display = 'block';
}

var timeoutId;
function hideTooltipHumane(tooltip) {
  message.style.display = 'none';
}

function showTooltip(tooltip) {
  // do not show if tooltip has been dismissed
  if (dismissals.has(tooltip)) {
    return false;
  }

  // hide all the other tooltips pronto
  document.querySelectorAll('.tooltip[data-active="true"]').forEach((node) => {
    node.style.display = 'none'
    node.dataset.active = false;
  })

  var trigger = tooltip.parentNode;
  var bounds = trigger.getBoundingClientRect();
  if ( tooltip.classList.contains('left') ) {
    tooltip.style.top = `${bounds.top}px`;
    // tooltip.style.left = `${( bounds.left - $(tooltip).width() ) - (bounds.width / 2)}px`;
    tooltip.style.right = `${( window.innerWidth - bounds.left ) * 1.05}px`;
  } else if ( tooltip.classList.contains('bottom') ) {
    tooltip.style.top = `${( bounds.top + bounds.height ) * 1.025}px`;
    tooltip.style.left = `${bounds.left - ( bounds.width / 2 )}px`;
  } else if ( tooltip.classList.contains('top') ) {
    tooltip.style.top = `${( bounds.top - bounds.height ) * 0.995}px`;
    tooltip.style.left = `${bounds.left - ( bounds.width / 2 )}px`;
  }
  tooltip.style.display = 'block';
  tooltip.dataset.active = true;
  // tooltip.removeAttribute('aria-hidden');
  
  // if a hide timeout exists for this tooltip, clear it
  if (timeouts.has(tooltip)) {
    window.clearTimeout(timeouts.get(tooltip));
  }
}

function hideTooltip(tooltip) {
  tooltip.style.display = 'none';
  tooltip.setAttribute('aria-hidden', 'true');
  tooltip.dataset.active = false;
}

function timeoutTooltipHumane(tooltip, duration) {
  if ( ! duration ) { duration = TIMEOUT_LENGTH; }
  messageIdx -= 1;
  if ( timeoutId ) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  // hide the tooltip after a set amount of time
  timeoutId = window.setTimeout(() => {
    hideTooltipHumane(tooltip);
  }, TIMEOUT_LENGTH);
  
  // store the timeout so it can be cleared
  timeouts.set(tooltip, timeoutId);
}

function timeoutTooltip(tooltip) {
  if ( ! tooltip ) { return ; }
  const timeoutId = window.setTimeout(() => {
    hideTooltip(tooltip);
  }, TIMEOUT_LENGTH);  
  timeouts.set(tooltip, timeoutId);
}

head.ready(function() {
  // initiate tooltips

  if ( TOOLTIP_OPTION == 'humane' ) {
    message = document.createElement('div');
    message.classList.add('uber-tooltip');
    message.style.display = 'none';
    document.body.appendChild(message);
  }

  // setTimeout(() => {
  //   const tooltips = document.querySelectorAll('[data-role="tooltip"]');
  //   console.log("AHOY TOOLTIPS INIT", tooltips);
  //   tooltips.forEach((tooltip) => {
  //     if ( TOOLTIP_OPTION == 'tooltip' ) {
  //       initTooltip(tooltip);
  //     } else {
  //       initTooltipHumane(tooltip);
  //     }
  //   });
  // }, 500);

  // mouseover
  // mouseleave
  // focus
  // keydown
  // show tooltip on hover and focus
  document.body.addEventListener('mouseenter', (event) => {
    if ( ! event.target.matches ) { return; }
    if ( ! event.target.matches('[data-role="tooltip"]') ) { return ; }
    if ( ! initialized.has(event.target) ) { initTooltip(event.target); }
    showTooltip(event.target.querySelector('.tooltip'));
  }, true);

  document.body.addEventListener('focusin', (event) => {
    if ( ! event.target.matches ) { return; }
    if ( ! event.target.matches('[data-role="tooltip"]') ) { return ; }
    if ( ! initialized.has(event.target) ) { initTooltip(event.target); }
    showTooltip(event.target.querySelector('.tooltip'));
  });
  
  // hide tooltip on mouse out and blur
  // use timeout on mouse leave

  document.body.addEventListener('mouseleave', (event) => {
    if ( ! event.target.matches ) { return; }
    if ( ! event.target.matches('[data-role="tooltip"]') ) { return ; }
    if ( ! initialized.has(event.target) ) { return; }
    timeoutTooltip(event.target.querySelector('.tooltip'));
  }, true);
  document.body.addEventListener('blur', (event) => {
    if ( ! event.target.matches ) { return; }
    if ( ! event.target.matches('[data-role="tooltip"]') ) { return ; }
    if ( ! initialized.has(event.target) ) { return; }
    hideTooltip(event.target.querySelector('.tooltip'));
  });

  document.body.addEventListener('focusout', (event) => {
    if ( ! event.target.matches ) { return; }
    if ( ! event.target.matches('[data-role="tooltip"]') ) { return ; }
    if ( ! initialized.has(event.target) ) { return; }
    hideTooltip(event.target.querySelector('.tooltip'));
  });
  
  // hide the tooltip on escape key press
  document.addEventListener('keydown', (event) => {
    if ( ! event.target.matches ) { return; }
    if ( ! event.target.matches('[data-role="tooltip"]') ) { return ; }
    if ( ! initialized.has(event.target) ) { return; }
    if (event.key === 'Escape') {
      hideTooltip(event.target.querySelector('.tooltip'));
      // save dismissal
      dismissals.set(event.target.querySelector('.tooltip'), true);
    }
  });


})
