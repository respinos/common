var HT = HT || {};
HT.analytics = {};
HT.analytics.enabled = false;
HT.analytics.trackPageview = function(href) { /* no op */ };
HT.analytics.trackEvent = function(params) { /* no op */ };
HT.analytics.getTrackingLabel = function(arg) { return "-"; }
HT.analytics.getContentGroupData = function() {};
HT.analytics.getPageHref = function() { return window.location.href ; }
HT.analytics.post_setup = [];

head.ready(function() {
    var $html = $("html");
    var $window = $(window);

    HT.analytics.profile_id = $.trim($html.data('analytics-code'));
    var is_enabled = ($.trim($html.data("analytics-enabled")) == 'true');
    if ( is_enabled ) {

        // deconstructed version of the tracking code, to mesh with unicorn
        // <script>
        //   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        //   (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        //   m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        //   })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        //   ga('create', 'UA-954893-23', 'hathitrust.org');
        //   ga('send', 'pageview');

        // </script>

        window['GoogleAnalyticsObject'] = 'ga';
        window['ga'] = window['ga'] || function() {
            (window['ga'].q = window['ga'].q || []).push(arguments);
        }
        window['ga'].l = 1 * new Date();

        var profiles = [ HT.analytics.profile_id ];
        function _get_prefix(profile_id) {
            var idx = profiles.indexOf(profile_id);
            if ( idx < 0 ) {
                profiles.push(profile_id);
                idx = profiles.length - 1;
                // and then setup the tracker
                var config = { cookieDomain : 'hathitrust.org', legacyCookieDomain : 'hathitrust.org', name : "ht" + idx };
                window['ga']('create', profile_id, config);
            }
            return ( "ht" + idx + "." );
        }
        window['ga']('create', HT.analytics.profile_id, { cookieDomain : 'hathitrust.org', legacyCookieDomain : 'hathitrust.org' });

        head.js((("https:" == document.location.protocol) ? "https://ssl." : "http://www.") + "google-analytics.com/analytics.js",
            function() {
                HT.analytics.enabled = true;

                function _munge_href(href) {
                    if ( href.indexOf(";") > -1 ) {
                        href = href.replace(/;/g, "&");
                    }
                    return href.replace(window.location.protocol + "//" + window.location.hostname, '');
                }

                HT.analytics.trackPageview = function(href, profile_id) {
                    // allow for passing alternative profile for analytics experiments
                    var prefix = profile_id ? _get_prefix(profile_id) : '';

                    ga(prefix + 'set', 'dimension1', $window.width() + 'x' + $window.height());

                    var content_group_data = HT.analytics.getContentGroupData();
                    if ( content_group_data ) {
                        ga(prefix + 'set', 'contentGroup' + content_group_data.index, content_group_data.value);
                    }

                    // do we have any extra dimensions?
                    var value = $html.data('anlaytics-dimension');
                    if ( value ) {
                        value = value.split("=");
                        ga(prefix + 'set', value[0], value[1]);
                    }

                    if ( HT.login_status ) {
                        var value;
                        if ( HT.login_status.logged_in ) {
                            value = HT.login_status.institutionCode + "/" + HT.login_status.affiliation.toLowerCase();
                            if ( HT.login_status.mappedInstitutionCode ) {
                                value = HT.login_status.mappedInstitutionCode + "/" + value;
                            }
                        } else {
                            value = "anon/guest";
                        }
                        ga(prefix + 'set', 'dimension3', value);
                    }

                    ga(prefix + 'send', 'pageview', _munge_href(href));
                }

                HT.analytics.trackEvent = function(params, profile_id) {
                    var prefix = profile_id ? _get_prefix(profile_id) : '';
                    ga('send', 'event', params.category, params.action, params.label);
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

                for(var i = 0; i < HT.analytics.post_setup; i++) {
                    HT.analytics.post_setup[i]();
                }

                if ( $.trim($html.data('analytics-skip')) == 'true' ) {
                    return;
                }

                // // track the current page view
                // HT.analytics.trackPageview(HT.analytics.getPageHref());

            });
    }
})
