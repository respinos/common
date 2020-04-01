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

var HT = HT || {};

(function() {
    var prefix = '/';

    if ( window.jQuery ) {
        window.old_jQuery = window.jQuery;
    }

    HT.service_domain = 'babel.hathitrust.org';
    HT.catalog_domain = 'catalog.hathitrust.org';

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
                var redirect_href = `https://${HT.service_domain}/Shibboleth.sso/Login?entityID=${entityId}&target=${pong_target}`;
                window.location.href = redirect_href;
            }
        }
    })

    // // service_url is either the babel dev, beta-3, or babel
    // HT.service_domain = ( HT.is_babel ? hostname : ( HT.is_dev ? 'test.babel.hathitrust.org' : 'babel.hathitrust.org' ) );
    // if ( hostname.indexOf('beta-3') > -1 ) {
    //     HT.service_domain = 'beta-3.babel.hathitrust.org';
    // }
    // HT.www_domain = ( HT.is_dev ? 'test.www.hathitrust.org' : 'www.hathitrust.org' );
    // HT.catalog_domain = ( HT.is_dev ? 'test.catalog.hathitrust.org' : 'catalog.hathitrust.org' );

    HT.prefs = {};
    HT.prefs.get = function() {
        var prefs = {};
        try {
            prefs = $.cookie('HT.prefs', undefined, { json : true }) || {};
        } catch (e) {
            // just null the prefs
            $.removeCookie("HT.prefs");
            prefs = {};
        }
        return prefs;
    };

    HT.prefs.set = function(params) {
        var prefs = HT.prefs.get();
        prefs = $.extend({}, prefs, params);
        try {
            $.cookie('HT.prefs', prefs, { json : true, domain : '.hathitrust.org', path : '/', expires : 90 });
        } catch (e) {
            // noop
        }
    };

    HT.scripts = [];
    // HT.scripts.push(function() {
    //     // console.log("PLACEHOLDERS UPDATED");
    //     // $(":input[placeholder]").placeholder();

    //     // var $li;
    //     // $li = $("a:contains('Our Collaborative Programs')").parent();
    //     // if ( $li.size() == 0 ) {
    //     //     $li = $("a:contains('Our Digital Library')").parent();
    //     //     $li.after('<li><a href="https://www.hathitrust.org/collaborative-programs">Our Collaborative Programs</a></li>');
    //     // }
    // });

    var $rootStatus;
    HT.update_status = function(message) {
        if ( $rootStatus === undefined ) { $rootStatus = $("#root > div[role=status]"); }
        var $status = $rootStatus;
        if ( window.bootbox && window.bootbox.active() ) {
            $status = $(window.bootbox.active().modal).find('div[role="status"]');
        }
        if ( ! $status.length ) { return ; }
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
            $status.text(message);
            lastMessage = message;
            console.log("-- status:", message);
          }, 50);
          lastTimer = setTimeout(() => {
            $status.get(0).innerText = '';
          }, clearDelay);

        }
    }

    var $html = $("html");
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
    window.tx = setInterval(function() {
        t += 100;
        var vh = __get_vh();
        if ( vh != lastwh ) {
            lastwh = vh;

            // var vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', ( vh * 0.01 ) + 'px');

            var event = document.createEvent('UIEvents');
            event.initEvent('resize', true, false, window, 0);
            window.dispatchEvent(event)
        }
    }, 100);

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

    window.addEventListener('beforeunload', function(event) {
        var timeout = HT.beforeUnloadTimeout || 5000;
        setTimeout(function() {
            $('<div class="wait-for-it"></div>').appendTo("body");
            setTimeout(function() {
                $(".wait-for-it").remove();
            }, timeout); // maybe something went wrong
        }, 501);
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

})();
