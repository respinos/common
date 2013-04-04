var HT = HT || {};
HT.analytics = {};
HT.analytics.enabled = false;
HT.analytics.trackPageview = function(href) { /* no op */ };
HT.analytics.trackEvent = function(params) { /* no op */ };
HT.analytics.getTrackingLabel = function(arg) { return "-"; }

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

                HT.analytics.trackEvent = function(params, profile_id) {
                    _gaq.push(
                        ['_setAccount', profile_id ? profile_id : HT.analytics.profile_id],
                        ['_setDomainName', 'hathitrust.org'],
                        ['_trackEvent', params.category, params.action, params.label]
                    );
                }

                // bind to track events
                $(document).on('click.google', '[data-toggle*=tracking]', function (e) {
                    var $link = $(this);
                    var label = $link.data('tracking-label') || HT.analytics.getTrackingLabel($link);
                    var category = $link.data('tracking-category') || $html.data('tracking-category') || 'HT';
                    var action = $link.data('tracking-action');
                    var toggle = $link.data('toggle');

                    HT.analytics.trackEvent({ label : label, category : category, action : action });

                    if ( toggle.indexOf('tracking-action') > -1 ) {
                        return true;
                    }

                    var retval = true;

                    if ( $link.is("a") ) {
                        if ( $link.attr('target') ) {
                          return true;
                        }
                        retval = false;
                        var href = $link.attr('href');
                        setTimeout(function() {
                            window.location.href = href;
                        }, 500);
                    } else if ( $link.is("input[type=submit]") ) {
                        var frm = $(this).parents("form");
                        retval = false;
                        var events = $.data(frm.get(0), 'events');
                        if ( events && events.submit == undefined ) {
                          setTimeout(function() {
                              frm.submit();
                          }, 500);
                        } else {
                          return true;
                        }
                    }

                    return retval;

                })

                if ( $.trim($html.data('analytics-skip')) == 'true' ) {
                    return;
                }

                // track the current page view
                HT.analytics.trackPageview(window.location.href);

            });
    }
})
