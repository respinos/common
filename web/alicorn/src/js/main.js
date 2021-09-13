
// const Dropdown = require('bootstrap/js/dist/dropdown');

if ( window.console === undefined ) {
    window.console = {
        log : function() { }
    }
}

// IE11 POLYFILL
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector ||
                              Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

var docCookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};

var HT = HT || {};

(function() {
    var prefix = '/';

    if ( window.jQuery ) {
        window.old_jQuery = window.jQuery;
    }

    HT.service_domain = 'babel.hathitrust.org';
    HT.catalog_domain = 'catalog.hathitrust.org';
    HT.www_domain = 'www.hathitrust.org';

    // figure out if we're in dev or not
    var hostname = location.hostname;
    HT.is_dev = ( hostname != 'www.hathitrust.org' ) && ( hostname != 'catalog.hathitrust.org' ) && ( hostname != 'babel.hathitrust.org' );

    // are we babel or not?
    HT.is_babel = ( hostname.indexOf("babel.hathitrust.org") > -1 );

    if ( HT.is_dev ) {
        var prefix = hostname.split(".")[0];
        if ( prefix == 'mrnibbs' ) {
            HT.service_domain = hostname;
            HT.catalog_domain = hostname;
            HT.www_domain = hostname;
            // HT.www_domain = 'test.www.hathitrusg.org';
        } else {
            // make this more robust later
            var babel_prefix = prefix;
            if ( hostname == 'test.www.hathitrust.org' ) {
                babel_prefix = 'test'; // beta-3';
                prefix = 'test'; // beta-3';
            }
            if ( ! babel_prefix.match(/beta-|preview|test/) && ! babel_prefix.match('-full') ) { babel_prefix += '-full'; }
            if ( prefix.match('-full') ) { prefix = prefix.replace('-full', ''); }
            HT.service_domain = babel_prefix + '.babel.hathitrust.org';
            HT.catalog_domain = prefix + '.catalog.hathitrust.org';
            HT.www_domain = prefix + '.www.hathitrust.org';
        }
    }


    document.addEventListener('DOMContentLoaded', function(event) {

        if ( 
            ( window.location.href.indexOf('babel.hathitrust.org') < 0 ) &&
            ( window.location.href.indexOf('signon=') > -1 )        
        ) {
            // try to do the shibboleth dance
            var tmp = location.href.split('signon=swle:');
            var entityId = tmp.pop();
            var target = tmp[0];
            if ( document.querySelector('#logout-link') || document.querySelector('.logout-link') ) {
                history.replaceState({}, document.title, target);
            } else {
                var pong_target = encodeURIComponent(`https://${HT.service_domain}/cgi/ping/pong?target=${target}`);
                var redirect_href;
                if ( entityId == 'wayf' ) {
                    redirect_href = `https://${HT.service_domain}/cgi/wayf?target=${pong_target}`;
                } else {
                    redirect_href = `https://${HT.service_domain}/Shibboleth.sso/Login?entityID=${entityId}&target=${pong_target}`;
                }
                window.location.href = redirect_href;
            }
        }
    })

    function isObject(item) {
      return (item && typeof item === 'object' && !Array.isArray(item));
    }

    function mergeDeep(target, source) {
      let output = Object.assign({}, target);
      if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
          if (isObject(source[key])) {
            if (!(key in target))
              Object.assign(output, { [key]: source[key] });
            else
              output[key] = mergeDeep(target[key], source[key]);
          } else {
            Object.assign(output, { [key]: source[key] });
          }
        });
      }
      return output;
    }

    // const cookie = name => `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift();
    HT.prefs = {};
    HT.prefs.get = function() {
        var prefs = {};
        // try {
        //     prefs = $.cookie('HT.prefs', undefined, { json : true }) || {};
        // } catch (e) {
        //     // just null the prefs
        //     $.removeCookie("HT.prefs");
        //     prefs = {};
        // }

        try {
            prefs = JSON.parse(docCookies.getItem('HT.prefs') || '{}');
        } catch (e) {
            // just null the prefs
            docCookies.removeItem("HT.prefs");
            prefs = {};
        }
        return prefs;
    };

    HT.prefs.set = function(params) {
        var prefs = HT.prefs.get();
        // prefs = Object.assign({}, prefs, params);
        prefs = mergeDeep(prefs, params);
        try {
            var expires = new Date();
            expires.setDate(expires.getDate() + 90);
            docCookies.setItem('HT.prefs', JSON.stringify(prefs), expires, '/', '.hathitrust.org', true);
        } catch(e) {
            // noop
        }

        // prefs = $.extend({}, prefs, params);
        // try {
        //     $.cookie('HT.prefs', prefs, { json : true, domain : '.hathitrust.org', path : '/', expires : 90 });
        // } catch (e) {
        //     // noop
        // }
    };

    HT.scripts = [];

    var $rootStatus;
    HT.update_status = function(message) {
        if ( $rootStatus === undefined ) { $rootStatus = document.querySelector("#root > div[role=status]"); }
        var $status = $rootStatus;
        if ( window.bootbox && window.bootbox.active() ) {
            // $status = $(window.bootbox.active().modal).find('div[role="status"]');
            $status = window.bootbox.active().modal.querySelector('div[role="status"]');
        }
        if ( ! $status ) { return ; }
        HT._update_status($status, message);
    }

    var lastMessage; var lastTimer;
    HT._update_status = function($status, message) {
        if ( message == '--') {
            lastMessage = message;
            return;
        }
        if ( lastMessage != message ) {
          if ( lastTimer ) { clearTimeout(lastTimer); lastTimer = null; }

          var clearDelay = HT.params && HT.params.debug == 'polite' ? 2000 : 500;
          setTimeout(() => {
            //$status.text(message);
            $status.innerText = message;
            lastMessage = message;
            console.log("-- status:", message);
          }, 50);
          lastTimer = setTimeout(() => {
            // $status.get(0).innerText = '';
            $status.innerText = '';
          }, clearDelay);

        }
    }

    var $html = document.querySelector("html");
    var __get_vh = function() {
        var vh = window.innerHeight;
        // if ( navigator.userAgent.match(/iphone|ipod|ipad/i) && window.visualViewport ) { vh *= window.visualViewport.scale; }
        if ( window.visualViewport && window.visualViewport.scale != 1 ) {
            vh = window.visualViewport.height * window.visualViewport.scale;
        }
        return vh;
    };

    var vh = __get_vh() * 0.01; // window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');

    var t = 0;; var lastwh = 0;
    var __check_timestamp;
    var __check_vh = function(timestamp) {
        if ( __check_timestamp === undefined ) {
            __check_timestamp = timestamp;
        }
        var elapsed = timestamp - __check_timestamp;

        if ( elapsed > 100 ) {
            __check_timestamp = timestamp;

            var vh = __get_vh();
            if ( vh != lastwh ) {
                lastwh = vh;

                // var vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', ( vh * 0.01 ) + 'px');

                var event = document.createEvent('UIEvents');
                event.initEvent('resize', true, false, window, 0);
                window.dispatchEvent(event)
            }

            window.tx = requestAnimationFrame(__check_vh);
        }
    }
    window.txt = requestAnimationFrame(__check_vh);

    setTimeout(function() {
        // vh = window.innerHeight * 0.01;
        var vh = __get_vh() * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    }, 500);

    window.addEventListener('resize', function() {
        var vh = __get_vh() * 0.01; // window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    });

    window.addEventListener("orientationchange", function() {
        setTimeout(function() {
            var vh = __get_vh() * 0.01; // window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', vh + 'px');

            if ( HT && HT.utils && HT.utils.handleOrientationChange ) {
                HT.utils.handleOrientationChange();
            }
        }, 500);
    })

    let ignoreUnload = false;
    let unloadTimeout;
    window.addEventListener('beforeunload', function(event) {
        if ( HT.disableUnloadTimeout ) { return ; }
        var timeout = HT.beforeUnloadTimeout || 10 * 1000;
        unloadTimeout = setTimeout(function() {
            if ( ignoreUnload ) { return ; }
            var div = document.createElement('div');
            div.classList.add('wait-for-it');
            document.body.appendChild(div);
            if ( $("html").is("ie") ) {
                setTimeout(function() {
                    document.body.removeChild(div);
                }, timeout);
            }
        }, 501);
    })

    window.addEventListener('pagehide', function(event) {
      ignoreUnload = true;
      if ( unloadTimeout ) { clearTimeout(unloadTimeout); }
      var div = document.querySelector('.wait-for-it');
      if ( div ) { document.body.removeChild(div); }
    })

    window.addEventListener('unload', function(event) {
      ignoreUnload = true;
      if ( unloadTimeout ) { clearTimeout(unloadTimeout); }
      var div = document.querySelector('.wait-for-it');
      if ( div ) { document.body.removeChild(div); }
    })

    setTimeout(() => {
        var event = document.createEvent('UIEvents');
        event.initEvent('resize', true, false, window, 0);
        window.dispatchEvent(event)
    }, 100);

    if ( navigator && navigator.userAgent && navigator.userAgent.match(/Edge\/1[678]/) ) {
        document.documentElement.classList.add('edge');
    }

    // var $alert = $(".alert");
    // if ( $alert.length ) {
    //     // have alerts that were drawn on the page so read them aloud
    //     HT.update_status($alert.text());
    // }

    var scripts = [ '/common/alicorn/js/utils.bundle.js' ];
    head.js.apply(this, scripts);

})();
