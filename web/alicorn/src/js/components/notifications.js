var HT = HT || {};

let notificationData = [];
// notificationData.push({
//   title: 'Have you checked your ergonomics?',
//   message: 'Perhaps you\'ve been sitting too long, reading screens. Stand up and stretch and get a snack. A healthy snack.',
//   link: 'https://umich.edu'
// })

head.ready(function () {

  let $action = $(".action-toggle-notifications");
  if ( ! $action.get(0) ){ return; }

  $("html").on('ht:login', function(event) {
    console.log("AHOY WE ARE LOGGED IN");

    if ( HT.login_status.institutionCode == 'sc' || 
         HT.login_status.displayName == 'Roger Roberto Espinosa' || 
         HT.login_status.displayName.indexOf('Zaytsev') > -1
    ) {
      notificationData.push({
        title: 'University of South Carolina is migrating to Open Athens!',
        message: `If you've made personal collections, those will have to be migrated to your new identity.`,
        link: 'https://httpstatusdogs.com/416-requested-range-not-satisfiable'
      })
    }

    if ( notificationData.length == 0 ) { return ; }

    $action.prop('disabled', false);

    let modal_html = `
<div
  id="notifications-modal"
  aria-labelledby="notifications-modal-title"
  aria-describedby="notifications-modal-description"
  aria-hidden="true"
  class="dialog-container"
>
  <div class="dialog-overlay" data-a11y-dialog-hide></div>
  <div role="document" class="dialog-content">
    <button type="button" data-a11y-dialog-hide aria-label="Close dialog" class="dialog-close">
    </button>
    <!-- 5. The dialog title -->
    <h1 id="notifictaions-modal-title">Your notifications</h1>
    <!-- 6. Dialog content -->
    
    <dl id="notifications-modal-description">
    </dl>
  </div>
</div>
    `;

    modal_html = `
<div class="notifications-panel modal micromodal-slide" tabindex="-1" aria-hidden="true" id="notifications-modal">
  <div class="modal__overlay" tabindex="-1" data-micromodal-close>
    <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
      <div class="notifications-panel-arrow"></div>
      <div class="modal__header"><h2 class="modal__title" id="notifications-modal-title">Your notifications</h2><button class="modal__close" aria-label="Close" data-micromodal-close></button></div>
      <div class="modal__content" id="notifications-modal-content">
        <dl id="notifications-modal-description">
        </dl>
      </div>
    </div>
  </div>
</div>
    `;


    // 296px

    let dialogEl = $(modal_html).appendTo('body').get(0);
    // let dialog = new A11yDialog(dialogEl);

    notificationData.forEach((datum) => {
      let notice_html = `<div>
        <dt>${datum.title}</dt>
        <dd>
          <p>${datum.message}</p>
          <p><a href="${datum.link}">Would you like to know more?</a></p>
        </dd>
      </div>`;
      $(notice_html).appendTo(dialogEl.querySelector('dl'));
    })

    // dialogEl.dataset.right = ( $action.position().left - $action.width() / 2 ) - dialogEl.offsetWidth;
    let rightX = (window.outerWidth - $action.position().left - ( $action.width() ) + ( $action.width() / 2 ));
    rightX -= ( 2 * 16 ); // padding
    rightX -= ( 150 / 2 );
    dialogEl.style.setProperty('--right-x',  rightX);

    $action.get(0).dataset.active = 'true';
    // dialog.show();
    bootbox.show('notifications-modal');


  })

});