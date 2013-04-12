if ( window.console === undefined ) {
    window.console = {
        log : function() { }
    }
}

(function() {
    var prefix = '/';
    window.HT = window.HT || {};

    if ( window.jQuery ) {
        console.log("REBINDING window.jQuery", window.jQuery().jquery);
        window.old_jQuery = window.jQuery;
    }

    // figure out if we're in dev or not
    var hostname = location.hostname;
    HT.is_dev = ( hostname != 'www.hathitrust.org' ) && ( hostname != 'catalog.hathitrust.org' ) && ( hostname != 'babel.hathitrust.org' );

    // are we babel or not?
    HT.is_babel = ( hostname.indexOf("babel.hathitrust.org") > -1 );

    // service_url is either the babel dev, beta-3, or babel
    HT.service_domain = ( HT.is_babel ? hostname : ( HT.is_dev ? 'beta-3.babel.hathitrust.org' : 'babel.hathitrust.org' ) );

    //// apache conf so we don't need to do this anymore.
    // if ( location.hostname.indexOf("babel.hathitrust.org") < 0 ) {
    //     prefix = '//beta-3.babel.hathitrust.org/';
    // }

    head.js(prefix + 'common/unicorn/vendor/js/modernizr.custom.77754.js');

    var toload = [
        window.location.protocol + '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'
    ];

    var common_re = new RegExp(/debug=.*common.*/);
    if ( common_re.test(window.location.href) ) {
        var dev = [

            prefix + 'common/unicorn/vendor/js/jquery-migrate-1.1.1.min.js',
            prefix + 'common/unicorn/vendor/js/underscore-min.js',
            prefix + 'common/unicorn/vendor/fancyBox/jquery.fancybox.js',
            prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-transition.js',
            prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-modal.js',
            prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-button.js',
            prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-dropdown.js',
            prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-tooltip.js',
            prefix + 'common/unicorn/vendor/bootstrap/js/bootbox.js',
            prefix + 'common/unicorn/vendor/js/jquery.placeholder.js',
            prefix + 'common/unicorn/js/feedback.js',
            prefix + 'common/unicorn/js/login.js',
            prefix + 'common/unicorn/js/search.js',
            prefix + 'common/unicorn/js/google_analytics.js'
        ]

        for(var i = 0; i < dev.length; i++) {
            toload.push(dev[i]);
        }
    } else {
        toload.push(prefix + 'common/unicorn/js/_common_concatenated.js');
    }


    if ( location.hostname != 'www.hathitrust.org' && 
         location.hostname != 'catalog.hathitrust.org' && 
         location.hostname != 'babel.hathitrust.org ') {
        toload.push(prefix + 'common/unicorn/js/staging.js');
    }

    head.js.apply(this, toload, function() {
        $(":input[placeholder]").placeholder();
    });

    // head.js(prefix + 'common/unicorn/vendor/js/modernizr.custom.77754.js',
    //         window.location.protocol + '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
    //         function() {
    //             var do_unload = location.hostname.indexOf("www.hathitrust.org") > -1;
    //             console.log("UNLOADING", do_unload);
    //             window.$jQ = jQuery.noConflict(do_unload);
    //             if ( ! do_unload ) { window.$ = window.$jQ; }
    //             (function($) {
    //                 head.js.apply(this, toload, function() {
    //                     $(":input[placeholder]").placeholder();
    //                 })
    //             })($jQ);
    //         }
    //     );    

})();
