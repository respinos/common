var HT = HT || {};

let $action;
let notificationData;
let dialogEl;

const openNotifications = function() {
  if ( notificationData == null || notificationData.length == 0) { return; }

  if ( dialogEl === undefined ) {
    let modal_html = `
<div class="notifications-panel modal micromodal-slide" tabindex="-1" aria-hidden="true" id="notifications-modal">
  <div class="modal__overlay" tabindex="-1" data-micromodal-close>
    <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="notifications-modal-title">
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

    dialogEl = $(modal_html).appendTo('body').get(0);

    notificationData.forEach((datum) => {
      let message;
      if (datum.message.indexOf('<p>') > -1) {
        message = datum.message + '<p>';
      } else {
        message = `<p>${datum.message} `;
      }
      message += `<a href="${datum.read_more_link}">${datum.read_more_label}</a></p>`;
      let notice_html = `<div>
        <dt>${datum.title}</dt>
        <dd>
          ${message}
        </dd>
      </div>`;
      $(notice_html).appendTo(dialogEl.querySelector('dl'));
    })
  }

  // dialogEl.dataset.right = ( $action.position().left - $action.width() / 2 ) - dialogEl.offsetWidth;
  let rightX = (window.outerWidth - $action.position().left - ($action.width()) + ($action.width() / 2));
  rightX -= (2 * 16); // padding
  rightX -= (150 / 2);
  dialogEl.style.setProperty('--right-x', rightX);

  $action.get(0).dataset.active = 'true';
  // dialog.show();
  bootbox.show('notifications-modal', {
    onClose: function (modal) {
      localStorage.setItem('ht.notification', notificationData[0].published_on);
    }
  });

}

head.ready(function () {

  $action = $(".action-toggle-notifications");
  if ( ! $action.get(0) ){ return; }

  $("html").on('ht:login', function(event) {
    console.log("AHOY WE ARE LOGGED IN");

    notificationData = HT.login_status.notificationData;
    if (notificationData == null || notificationData.length == 0) { return; }

    $action.prop('disabled', false);

    let notificationTimestamp = notificationData[0].published_on;
    let lastNotificationTimestamp = localStorage.getItem('ht.notification');

    console.log("-- notification timestamp", notificationTimestamp, lastNotificationTimestamp, lastNotificationTimestamp != notificationTimestamp);
    if ( lastNotificationTimestamp != notificationTimestamp ) {
      // automatically open if there are unseen notifications
      openNotifications();
    }
    

    $action.on('click', (event) => {
      openNotifications();
    })

  })

});