(function() {
    var prefix = '/';
    var HT = HT || {};

    if ( location.hostname.indexOf("babel.hathitrust.org") < 0 ) {
        prefix = '//beta-3.babel.hathitrust.org/';
    }

    var toload = [];

    var common_re = new RegExp(/debug=.*common.*/);
    if ( common_re.test(window.location.href) ) {
        var dev = [

            // '//code.jquery.com/jquery-1.9.1.min.js',
            // '//code.jquery.com/jquery-migrate-1.1.0.min.js',
            prefix + 'common/unicorn/vendor/js/jquery-migrate-1.1.1.min.js',
            prefix + 'common/unicorn/vendor/js/underscore-min.js',
            prefix + 'common/unicorn/vendor/fancyBox/jquery.fancybox.js',
            prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-modal.js',
            prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-button.js',
            prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-dropdown.js',
            prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-tooltip.js',
            prefix + 'common/unicorn/vendor/bootstrap/js/bootbox.min.js',
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


    head.js(prefix + 'common/unicorn/vendor/js/modernizr.custom.77754.js',
            window.location.protocol + '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
            function() {
                var do_unload = location.hostname.indexOf("www.hathitrust.org") > -1;
                console.log("UNLOADING", do_unload);
                window.$jQ = jQuery.noConflict(do_unload);
                if ( ! do_unload ) { window.$ = window.$jQ; }
                (function($) {
                    head.js.apply(this, toload, function() {
                        $(":input[placeholder]").placeholder();
                    })
                })($jQ);
            }
        );

})();
