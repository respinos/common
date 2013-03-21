(function() {
    var prefix = '/';

    if ( location.hostname.indexOf("babel.hathitrust.org") < 0 ) {
        prefix = '//test.babel.hathitrust.org/';
    }

    var toload = [
        prefix + 'common/unicorn/vendors/js/modernizr.custom.79639.js',
        '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',

        // '//code.jquery.com/jquery-1.9.1.min.js',
        // '//code.jquery.com/jquery-migrate-1.1.0.min.js',
        prefix + 'common/unicorn/vendors/js/jquery-migrate-1.1.0.min.js',
        prefix + 'common/unicorn/vendors/js/underscore-min.js',
        prefix + 'common/unicorn/vendors/fancyBox/jquery.fancybox.js',
        prefix + 'common/unicorn/vendors/bootstrap/js/bootstrap-modal.js',
        prefix + 'common/unicorn/vendors/bootstrap/js/bootstrap-button.js',
        prefix + 'common/unicorn/vendors/bootstrap/js/bootstrap-dropdown.js',
        prefix + 'common/unicorn/vendors/bootstrap/js/bootbox.min.js',
        prefix + 'common/unicorn/js/feedback.js',
        prefix + 'common/unicorn/js/login.js',
    ]

    head.js.apply(this, toload);

})();
