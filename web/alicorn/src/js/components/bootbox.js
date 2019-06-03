(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.bootbox = factory());
}(window, (function () { 'use strict';

var version = "0.3.1";

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var bootbox = function () {

  var FOCUSABLE_ELEMENTS = ['a[href]', 'area[href]', 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', 'select:not([disabled]):not([aria-hidden])', 'textarea:not([disabled]):not([aria-hidden])', 'button:not([disabled]):not([aria-hidden])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];

  var Modal = function () {
    function Modal(_ref) {
      var targetModal = _ref.targetModal,
          _ref$triggers = _ref.triggers,
          triggers = _ref$triggers === undefined ? [] : _ref$triggers,
          _ref$onShow = _ref.onShow,
          onShow = _ref$onShow === undefined ? function () {} : _ref$onShow,
          _ref$onClose = _ref.onClose,
          onClose = _ref$onClose === undefined ? function () {} : _ref$onClose,
          _ref$openTrigger = _ref.openTrigger,
          openTrigger = _ref$openTrigger === undefined ? 'data-micromodal-trigger' : _ref$openTrigger,
          _ref$closeTrigger = _ref.closeTrigger,
          closeTrigger = _ref$closeTrigger === undefined ? 'data-micromodal-close' : _ref$closeTrigger,
          _ref$disableScroll = _ref.disableScroll,
          disableScroll = _ref$disableScroll === undefined ? false : _ref$disableScroll,
          _ref$disableFocus = _ref.disableFocus,
          disableFocus = _ref$disableFocus === undefined ? false : _ref$disableFocus,
          _ref$awaitCloseAnimat = _ref.awaitCloseAnimation,
          awaitCloseAnimation = _ref$awaitCloseAnimat === undefined ? false : _ref$awaitCloseAnimat,
          _ref$restore = _ref.restore,
          restore = _ref$restore === undefined ? null : _ref$restore,
          _ref$callbacks = _ref.callbacks,
          callbacks = _ref$callbacks === undefined ? {} : _ref$callbacks,
          _ref$debugMode = _ref.debugMode,
          debugMode = _ref$debugMode === undefined ? false : _ref$debugMode;
      classCallCheck(this, Modal);

      // Save a reference of the modal
      if ( targetModal instanceof HTMLElement ) {
        this.modal = targetModal;
      } else {
        this.modal = document.getElementById(targetModal);
      }

      // Save a reference to the passed config
      this.config = { debugMode: debugMode,
        disableScroll: disableScroll,
        openTrigger: openTrigger,
        closeTrigger: closeTrigger,
        onShow: onShow,
        onClose: onClose,
        awaitCloseAnimation: awaitCloseAnimation,
        disableFocus: disableFocus,
        callbacks: callbacks,
        restore: restore

        // Register click events only if prebinding eventListeners
      };if (triggers.length > 0) this.registerTriggers.apply(this, toConsumableArray(triggers));

      // prebind functions for event listeners
      this.onClick = this.onClick.bind(this);
      this.onKeydown = this.onKeydown.bind(this);

      this.root = document.querySelector('#root');
    }

    /**
     * Loops through all openTriggers and binds click event
     * @param  {array} triggers [Array of node elements]
     * @return {void}
     */


    createClass(Modal, [{
      key: 'registerTriggers',
      value: function registerTriggers() {
        var _this = this;

        for (var _len = arguments.length, triggers = Array(_len), _key = 0; _key < _len; _key++) {
          triggers[_key] = arguments[_key];
        }

        triggers.forEach(function (trigger) {
          trigger.addEventListener('click', function () {
            return _this.showModal();
          });
        });
      }
    }, {
      key: 'showModal',
      value: function showModal() {
        this.activeElement = document.activeElement;
        if ( this.root ) { this.root.setAttribute('aria-hidden', 'true'); }
        this.modal.setAttribute('aria-hidden', 'false');
        this.modal.classList.add('is-open');
        this.setFocusToFirstNode();
        this.scrollBehaviour('disable');
        this.addEventListeners();
        this.config.onShow(this.modal);
      }
    }, {
      key: 'closeModal',
      value: function closeModal() {
        var modal = this.modal;
        this.modal.setAttribute('aria-hidden', 'true');
        this.removeEventListeners();
        this.scrollBehaviour('enable');
        this.activeElement.focus();
        this.config.onClose(this.modal);

        if (this.config.awaitCloseAnimation) {
          this.modal.addEventListener('animationend', function handler() {
            modal.classList.remove('is-open');
            modal.removeEventListener('animationend', handler, false);
          }, false);
        } else {
          modal.classList.remove('is-open');
        }
        if ( this.root ) { this.root.setAttribute('aria-hidden', 'false'); }
      }
    }, {
      key: 'scrollBehaviour',
      value: function scrollBehaviour(toggle) {
        if (!this.config.disableScroll) return;
        var body = document.querySelector('body');
        switch (toggle) {
          case 'enable':
            Object.assign(body.style, { overflow: 'initial', height: 'initial' });
            break;
          case 'disable':
            Object.assign(body.style, { overflow: 'hidden', height: '100vh' });
            break;
          default:
        }
      }
    }, {
      key: 'addEventListeners',
      value: function addEventListeners() {
        this.modal.addEventListener('touchstart', this.onClick);
        this.modal.addEventListener('click', this.onClick);
        document.addEventListener('keydown', this.onKeydown);
      }
    }, {
      key: 'removeEventListeners',
      value: function removeEventListeners() {
        this.modal.removeEventListener('touchstart', this.onClick);
        this.modal.removeEventListener('click', this.onClick);
        document.removeEventListener('keydown', this.onKeydown);
      }
    }, {
      key: 'onClick',
      value: function onClick(event) {
        var id = event.target.getAttribute('id');
        if ( id && this.config.callbacks[id] ) {
          var retval = this.config.callbacks[id](this);
          if ( retval === false ) {
            event.preventDefault();
            return;
          }
        }
        if (event.target.hasAttribute(this.config.closeTrigger)) {
          this.closeModal();
          event.preventDefault();
        }
      }
    }, {
      key: 'onKeydown',
      value: function onKeydown(event) {
        if (event.keyCode === 27) this.closeModal(event);
        if (event.keyCode === 9) this.maintainFocus(event);
      }
    }, {
      key: 'getFocusableNodes',
      value: function getFocusableNodes() {
        var nodes = this.modal.querySelectorAll(FOCUSABLE_ELEMENTS);
        return Object.keys(nodes).map(function (key) {
          return nodes[key];
        });
      }
    }, {
      key: 'setFocusToFirstNode',
      value: function setFocusToFirstNode() {
        if (this.config.disableFocus) return;
        var focusableNodes = this.getFocusableNodes();
        if (focusableNodes.length) focusableNodes[0].focus();
      }
    }, {
      key: 'maintainFocus',
      value: function maintainFocus(event) {
        var focusableNodes = this.getFocusableNodes();

        // if disableFocus is true
        if (!this.modal.contains(document.activeElement)) {
          focusableNodes[0].focus();
        } else {
          var focusedItemIndex = focusableNodes.indexOf(document.activeElement);

          if (event.shiftKey && focusedItemIndex === 0) {
            focusableNodes[focusableNodes.length - 1].focus();
            event.preventDefault();
          }

          if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
            focusableNodes[0].focus();
            event.preventDefault();
          }
        }
      }
    }, {
      key: 'modal',
      value: function modal(action) {
        if ( action == 'hide' ){
          this.closeModal();
        }
      }
    }, {
      key: 'data',
      value: function data(key, value) {
        var element = this.modal.querySelector('.modal__content');
        if ( window.jquery ) {
          var $element = window.jquery(element);
          if ( value === undefined ) {
            return $element.data(key);
          } else {
            $element.data(key, value);
          }
        }
      }
    }, {
      key: 'find',
      value: function find(selector) {
        if ( window.jQuery ) {
          return window.jQuery(this.modal.querySelector('.modal__container')).find(selector);
        }
        return this.modal.querySelector('.modal__container').querySelector(selector);
      }
    }]);
    return Modal;
  }();

  /**
   * Modal prototype ends.
   * Here on code is reposible for detecting and
   * autobinding event handlers on modal triggers
   */

  // Keep a reference to the opened modal


  var activeModal = null;

  /**
   * Generates an associative array of modals and it's
   * respective triggers
   * @param  {array} triggers     An array of all triggers
   * @param  {string} triggerAttr The data-attribute which triggers the module
   * @return {array}
   */
  var generateTriggerMap = function generateTriggerMap(triggers, triggerAttr) {
    var triggerMap = [];

    triggers.forEach(function (trigger) {
      var targetModal = trigger.attributes[triggerAttr].value;
      if (triggerMap[targetModal] === undefined) triggerMap[targetModal] = [];
      triggerMap[targetModal].push(trigger);
    });

    return triggerMap;
  };

  /**
   * Validates whether a modal of the given id exists
   * in the DOM
   * @param  {number} id  The id of the modal
   * @return {boolean}
   */
  var validateModalPresence = function validateModalPresence(id) {
    if (!document.getElementById(id)) {
      console.warn('MicroModal v' + version + ': \u2757Seems like you have missed %c\'' + id + '\'', 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'ID somewhere in your code. Refer example below to resolve it.');
      console.warn('%cExample:', 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', '<div class="modal" id="' + id + '"></div>');
      return false;
    }
  };

  /**
   * Validates if there are modal triggers present
   * in the DOM
   * @param  {array} triggers An array of data-triggers
   * @return {boolean}
   */
  var validateTriggerPresence = function validateTriggerPresence(triggers) {
    if (triggers.length <= 0) {
      console.warn('MicroModal v' + version + ': \u2757Please specify at least one %c\'micromodal-trigger\'', 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'data attribute.');
      console.warn('%cExample:', 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', '<a href="#" data-micromodal-trigger="my-modal"></a>');
      return false;
    }
  };

  /**
   * Checks if triggers and their corresponding modals
   * are present in the DOM
   * @param  {array} triggers   Array of DOM nodes which have data-triggers
   * @param  {array} triggerMap Associative array of modals and thier triggers
   * @return {boolean}
   */
  var validateArgs = function validateArgs(triggers, triggerMap) {
    validateTriggerPresence(triggers);
    if (!triggerMap) return true;
    for (var id in triggerMap) {
      validateModalPresence(id);
    }return true;
  };

  /**
   * Binds click handlers to all modal triggers
   * @param  {object} config [description]
   * @return void
   */
  var init = function init(config) {
    // Create an config object with default openTrigger
    var options = Object.assign({}, { openTrigger: 'data-micromodal-trigger' }, config);

    // Collects all the nodes with the trigger
    var triggers = [].concat(toConsumableArray(document.querySelectorAll('[' + options.openTrigger + ']')));

    // Makes a mappings of modals with their trigger nodes
    var triggerMap = generateTriggerMap(triggers, options.openTrigger);

    // Checks if modals and triggers exist in dom
    if (options.debugMode === true && validateArgs(triggers, triggerMap) === false) return;

    // For every target modal creates a new instance
    for (var key in triggerMap) {
      var value = triggerMap[key];
      options.targetModal = key;
      options.triggers = [].concat(toConsumableArray(value));
      new Modal(options); // eslint-disable-line no-new
    }
  };

  /**
   * Shows a particular modal
   * @param  {string} targetModal [The id of the modal to display]
   * @param  {object} config [The configuration object to pass]
   * @return {void}
   */
  var show = function show(targetModal, config) {
    var options = config || {};
    options.targetModal = targetModal;

    // Checks if modals and triggers exist in dom
    if (options.debugMode === true && validateModalPresence(targetModal) === false) return;

    // stores reference to active modal
    activeModal = new Modal(options); // eslint-disable-line no-new
    activeModal.showModal();
    return activeModal;
  };

  /**
   * Closes the active modal
   * @return {void}
   */
  var close = function close() {
    activeModal.closeModal();
  };

  var template = `<div class="modal micromodal-slide" id="modal-{ID}" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-micromodal-close>
      <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-{ID}-title">
        <div class="modal__header">
          <h2 class="modal__title" id="modal-{ID}-title"></h2>
          <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
        </div>
        <div class="modal__content" id="modal-{ID}-content">
          {TEMPLATE}
        </div>
        <div class="modal__footer">
          {ACTIONS}
        </div>
      </div>
    </div>
  </div>`;

  var buttonTemplate = `<button class="modal__btn modal__btn-primary">Continue</button>`;
  var closeButtonTemplate = `<button class="modal__btn" data-micromodal-close aria-label="Close modal">Close</button>`;

  var idx = 0;
  var alert = function(message, options={}) {
    idx += 1;
    var dialogHTML = template.replace(/{ID}/g, idx).replace('{TEMPLATE}', `<div>${message}</div>`);
    dialogHTML = dialogHTML.replace('{ACTIONS}', closeButtonTemplate);
    var dialog = new DOMParser().parseFromString(dialogHTML, "text/html").body.children[0];
    document.body.appendChild(dialog);
    var h2 = dialog.querySelector('h2');
    if ( options.header ) {
      h2.innerHTML = options.header;
    } else {
      h2.setAttribute('aria-hidden', 'true');
      h2.style.visibility = 'hidden';
      dialog.querySelector('.modal__container').classList.add('compact')
    }
    return show(dialog, {onClose: function(modal) {
      document.body.removeChild(dialog);
    }});
  }

  var dialog = function(message, actions=[], options={}) {
    idx += 1;
    var dialogID = options.id || idx;
    var append_message = false;
    var dialogHTML = template.replace(/{ID}/g, dialogID).replace('{ACTIONS}', '');
    if ( typeof(message) == "string" ) {
      dialogHTML = dialogHTML.replace('{TEMPLATE}', `<div>${message}</div>`);
    } else {
      dialogHTML = dialogHTML.replace('{TEMPLATE}', '');
      append_message = true;
    }
    var dialog = new DOMParser().parseFromString(dialogHTML, "text/html").body.children[0];
    document.body.appendChild(dialog);

    if ( append_message ) {
      if ( message.jquery ) { message = message.get(0); }
      dialog.querySelector('.modal__content').appendChild(message);
    }

    var h2 = dialog.querySelector('h2');
    if ( options.header ) {
      h2.innerHTML = options.header;
    } else {
      h2.setAttribute('aria-hidden', 'true');
      h2.style.visibility = 'hidden';
      dialog.querySelector('.modal__container').classList.add('compact')
    }

    var footer = dialog.querySelector('.modal__footer');
    var callbacks = {};
    for(var i = 0; i < actions.length; i++) {
      var action = actions[i];
      var button = document.createElement('button');
      button.innerHTML = action.label;
      button.setAttribute('id', `action-modal-button-${idx}-${i}`);
      if ( action.ariaLabel ) {
        button.setAttribute('aria-label', action.ariaLabel);
      }
      if ( action.class.indexOf('btn-dismiss') > -1 ) {
        button.classList.add('modal__btn');
        button.dataset.micromodalClose = true;
      } else {
        button.classList.add('modal__btn');
      }
      if ( action.class ) {
        var tmp = action.class.split(' ');
        tmp.forEach(function(cls) {
          button.classList.add(cls);
        })
      }
      // button.classList.add.apply(button.classList, action.class.split(' '))
      if ( action.callback ) {
        callbacks[button.getAttribute('id')] = action.callback;
        // button.addEventListener('click', function() {
        //   action.callback();
        // })
      }
      footer.appendChild(button);
    }
    var onClose = function(modal) {
      document.body.removeChild(dialog);
    }

    if ( options.lightbox ) {
      dialog.classList.add('lightbox');
      var content = dialog.querySelector('.modal__content');
      content.style.width = `${options.width - 0 + 16}px`;
      content.style.height = `${options.height - 0 + 16}px`;
    }

    return show(dialog, {onClose: onClose, callbacks: callbacks});
  }

  var hideAll =function() {
    /* WHEN WOULD THIS BE A VALID SCENARIO? */
  }

  return { init: init, show: show, close: close, alert: alert, dialog: dialog, hideAll: hideAll };
}();

return bootbox;

})));
