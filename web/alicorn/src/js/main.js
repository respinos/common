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
    HT.www_domain = ( HT.is_dev ? 'test.www.hathitrust.org' : 'www.hathitrust.org' );
    HT.catalog_domain = ( HT.is_dev ? 'test.catalog.hathitrust.org' : 'catalog.hathitrust.org' );

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
    HT.scripts.push(function() {
        // console.log("PLACEHOLDERS UPDATED");
        // $(":input[placeholder]").placeholder();

        var $li;
        $li = $("a:contains('Our Collaborative Programs')").parent();
        if ( $li.size() == 0 ) {
            $li = $("a:contains('Our Digital Library')").parent();
            $li.after('<li><a href="https://www.hathitrust.org/collaborative-programs">Our Collaborative Programs</a></li>');
        }
    });

    head.js.apply(this, HT.scripts);

})();
