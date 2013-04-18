if ( window.console === undefined ) {
    window.console = {
        log : function() { }
    }
}

(function() {
    var prefix = '/';
    window.HT = window.HT || {};

    if ( window.jQuery ) {
        window.old_jQuery = window.jQuery;
    }

    // figure out if we're in dev or not
    var hostname = location.hostname;
    HT.is_dev = ( hostname != 'www.hathitrust.org' ) && ( hostname != 'catalog.hathitrust.org' ) && ( hostname != 'babel.hathitrust.org' );

    // are we babel or not?
    HT.is_babel = ( hostname.indexOf("babel.hathitrust.org") > -1 );

    // service_url is either the babel dev, beta-3, or babel
    HT.service_domain = ( HT.is_babel ? hostname : ( HT.is_dev ? 'beta-3.babel.hathitrust.org' : 'babel.hathitrust.org' ) );

    // check for whether to load common concatenated or unconcenated
    var common_re = new RegExp(/debug=.*common.*/);
    var do_load_uncompressed = common_re.test(window.location.href);

    //// apache conf so we don't need to do this anymore.
    // if ( location.hostname.indexOf("babel.hathitrust.org") < 0 ) {
    //     prefix = '//beta-3.babel.hathitrust.org/';
    // }

    //--STARTUP--//
    head.js(prefix + 'common/unicorn/vendor/js/modernizr.custom.77754.js');

    //--REQUIRED--//
    var to_load = [
        // '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'
        prefix + 'common/unicorn/vendor/js/jquery-1.9.1.min.js'
    ];

    if ( do_load_uncompressed ) {
        to_load.push(prefix + 'common/unicorn/vendor/js/jquery-migrate-1.1.1.min.js');
        to_load.push(prefix + 'common/unicorn/vendor/js/underscore-min.js');
        to_load.push(prefix + 'common/unicorn/vendor/fancyBox/jquery.fancybox.js');
        to_load.push(prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-transition.js');
        to_load.push(prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-modal.js');
        to_load.push(prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-button.js');
        to_load.push(prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-dropdown.js');
        to_load.push(prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-tooltip.js');
        to_load.push(prefix + 'common/unicorn/vendor/bootstrap/js/bootbox.js');
        to_load.push(prefix + 'common/unicorn/vendor/js/jquery.placeholder.js');
        to_load.push(prefix + 'common/unicorn/js/feedback.js');
        to_load.push(prefix + 'common/unicorn/js/login.js');
        to_load.push(prefix + 'common/unicorn/js/search.js');
        to_load.push(prefix + 'common/unicorn/js/google_analytics.js');
    } else {
        to_load.push(prefix + 'common/unicorn/js/common.js-to_load-min.js');
    }


    if ( location.hostname != 'www.hathitrust.org' && 
         location.hostname != 'catalog.hathitrust.org' && 
         location.hostname != 'babel.hathitrust.org ') {
        to_load.push(prefix + 'common/unicorn/js/staging.js');
    }

    head.js.apply(this, to_load, function() {
        $(":input[placeholder]").placeholder();
    });

})();