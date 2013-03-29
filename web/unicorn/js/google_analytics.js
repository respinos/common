var HT = HT || {};
HT.analytics = {};
HT.analytics.enabled = false;
HT.analytics.trackPageview = function(href) { /* no op */ };
HT.analytics.trackEvent = function(params) { /* no op */ };

head.ready(function() {
    var $html = $("html");

    HT.analytics.profile_id = $.trim($html.data('analytics-code'));
    var is_enabled = ($.trim($html.data("analytics-enabled")) == 'true');
    if ( is_enabled ) {
        head.js((("https:" == document.location.protocol) ? "https://ssl." : "http://www.") + "google-analytics.com/ga.js",
            function() {
                if ( ! window._gaq ) { return; }
                HT.analytics.enabled = true;

                function _munge_href(href) {
                    if ( href.indexOf(";") > -1 ) {
                        href = href.replace(/;/g, "&");
                    }
                    return href;
                }

                HT.analytics.trackPageview = function(href, profile_id) {
                    // allow for passing alternative profile for analytics experiments
                    _gaq.push(
                        ['_setAccount', profile_id ? profile_id : HT.analytics.profile_id],
                        ['_setDomainName', 'hathitrust.org'],
                        ['_trackPageview', href]
                    );
                }

                HT.analytics.trackEvent = function() {
                    // need to work this out
                }

                if ( $.trim($html.data('analytics-skip')) == 'true' ) {
                    return;
                }

                // track the current page view
                HT.analytics.trackPageview(window.location.href);
            });
    }
})
