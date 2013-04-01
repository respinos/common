(function() {
    var prefix = '/';

    if ( location.hostname.indexOf("babel.hathitrust.org") < 0 ) {
        prefix = '//beta-3.babel.hathitrust.org/';
    }

    head.js(prefix + 'common/unicorn/vendor/js/modernizr.custom.77754.js');

    var toload = [
        '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',

        // '//code.jquery.com/jquery-1.9.1.min.js',
        // '//code.jquery.com/jquery-migrate-1.1.0.min.js',
        prefix + 'common/unicorn/vendor/js/jquery-migrate-1.1.0.min.js',
        prefix + 'common/unicorn/vendor/js/underscore-min.js',
        prefix + 'common/unicorn/vendor/fancyBox/jquery.fancybox.js',
        prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-modal.js',
        prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-button.js',
        prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-dropdown.js',
        prefix + 'common/unicorn/vendor/bootstrap/js/bootstrap-tooltip.js',
        prefix + 'common/unicorn/vendor/bootstrap/js/bootbox.min.js',
        prefix + 'common/unicorn/js/feedback.js',
        prefix + 'common/unicorn/js/login.js',
    ]

    if ( location.hostname != 'www.hathitrust.org' && 
         location.hostname != 'catalog.hathitrust.org' && 
         location.hostname != 'babel.hathitrust.org ') {
        toload.push(prefix + 'common/unicorn/js/staging.js');
    }


    head.js.apply(this, toload);

})();
