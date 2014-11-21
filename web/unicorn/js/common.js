if ( window.console === undefined ) {
    window.console = {
        log : function() { }
    }
}

var HT = HT || {};

(function() {
    var prefix = '/';

    if ( window.jQuery ) {
        window.old_jQuery = window.jQuery;
    }

    // figure out if we're in dev or not
    var hostname = location.hostname;
    HT.is_dev = ( hostname != 'www.hathitrust.org' ) && ( hostname != 'catalog.hathitrust.org' ) && ( hostname != 'babel.hathitrust.org' );

    // are we babel or not?
    HT.is_babel = ( hostname.indexOf("babel.hathitrust.org") > -1 );

    // service_url is either the babel dev, beta-3, or babel
    HT.service_domain = ( HT.is_babel ? hostname : ( HT.is_dev ? 'test.babel.hathitrust.org' : 'babel.hathitrust.org' ) );

    // check for whether to load common concatenated or unconcenated
    var common_re = new RegExp(/debug=.*common.*/);
    var do_load_uncompressed = common_re.test(window.location.href);

    //// apache conf so we don't need to do this anymore.
    // if ( location.hostname.indexOf("babel.hathitrust.org") < 0 ) {
    //     prefix = '//beta-3.babel.hathitrust.org/';
    // }

    //--REQUIRED--//
    HT.scripts = HT.scripts || [];

    if ( do_load_uncompressed ) {
        HT.scripts.unshift(prefix + 'common/unicorn/js/google_analytics.js');
        HT.scripts.unshift(prefix + 'common/unicorn/js/search.js');
        HT.scripts.unshift(prefix + 'common/unicorn/js/login.js');
        HT.scripts.unshift(prefix + 'common/unicorn/js/feedback.js');
        HT.scripts.unshift(prefix + 'common/unicorn/vendor/js/jquery.placeholder.js');
        HT.scripts.unshift(prefix + 'common/unicorn/vendor/bootstrap/js/bootbox.js');
        HT.scripts.unshift(prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-tooltip.js');
        HT.scripts.unshift(prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-dropdown.js');
        HT.scripts.unshift(prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-button.js');
        HT.scripts.unshift(prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-modal.js');
        HT.scripts.unshift(prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-transition.js');
        HT.scripts.unshift(prefix + 'common/unicorn/vendor/js/jquery.cookie.js');
        HT.scripts.unshift(prefix + 'common/unicorn/vendor/js/jquery.trap.js');
        HT.scripts.unshift(prefix + 'common/unicorn/vendor/fancyBox/jquery.fancybox.js');
        HT.scripts.unshift(prefix + 'common/unicorn/vendor/js/underscore-min.js');
        HT.scripts.unshift(prefix + 'common/unicorn/vendor/js/jquery-migrate-1.1.1.min.js');
    } else {
        HT.scripts.unshift(prefix + 'common/unicorn/js/common.js-to_load-min.js?_=1416591036');
    }

    if ( location.hostname != 'www.hathitrust.org' && 
         location.hostname != 'catalog.hathitrust.org' && 
         location.hostname != 'babel.hathitrust.org') {
        HT.scripts.push(prefix + 'common/unicorn/js/staging.js');
    }

    HT.scripts.unshift(prefix + 'common/unicorn/vendor/js/modernizr.custom.77754.js');
    HT.scripts.unshift(prefix + 'common/unicorn/vendor/js/jquery-1.9.1.min.js');

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

    head.js.apply(this, HT.scripts, function() {
        $(":input[placeholder]").placeholder();
    });

})();