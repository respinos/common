var HT = HT || {};
head.ready(function() {

    var PING_URL; var PING_DOMAIN;

    PING_URL = 'https://' + HT.service_domain + '/cgi/ping';

    // if ( window.location.hostname.indexOf("babel.hathitrust.org") < 0 ) {
    //     PING_DOMAIN = SCRIPT_URL.split('/')[2];
    //     // PING_DOMAIN = 'roger-full.babel.hathitrust.org';
    //     // PING_URL = 'https://' + PING_DOMAIN + '/cgi/ping';
    //     PING_URL = 'https://beta-3.babel.hathitrust.org/cgi/ping';
    // } else {
    //     PING_URL = '/cgi/ping';
    //     PING_DOMAIN = window.location.hostname;
    // }

    var is_babel = (window.location.href.indexOf("babel.hathitrust") > -1);
    var $button = $("#login-button");

    var prefs = HT.prefs.get();

    function display_login_dialog(args) {
        args = args || {};
        var status = HT.login_status;
        var $block = $(
            '<form method="POST">' + 
                '<div class="headline">' + 
                    '<p>Log in with your partner institution<br />&mdash; no signup is necessary.</p>' +
                '</div>' +
                '<div class="wayf-list">' + 
                    '<label for="idp" class="offscreen">Select your institution</label>' + 
                    '<select id="mdp" name="mdp" aria-labelledby="Selectyourinstitution-ariaLabel"></select>' +
                '</div>' +
                '<div class="actions">' + 
                    '<button class="btn btn-link btn-cancel">Cancel</button>' + 
                    '<button class="button continue">Continue</button>' +
                '</div>' +
                '<div class="questions">' +
                    '<ul>' +
                        '<li><a target="_blank" href="http://www.hathitrust.org/help_digital_library#LoginNotListed">Don\'t see your institution listed? &raquo;</a></li>' +
                        '<li>' +
                            '<span>Not with a partner institution?</span><br />' +
                            '<a id="friend-login-link" href="#">Create or log in with a "Friend" account to create collections. &raquo;</a></li>' +
                        '<li><a href="wayf">What are the benefits of logging in? &raquo;</a></li>' +
                    '</ul>' +
                '</div>' +
                '<input type="hidden" name="target" value="" />' + 
            '</form>'
        );

        var $select = $block.find("select[name=mdp]");

        var target = window.location.href;
        if ( target.indexOf("babel.hathitrust") < 0 ) {
            // not a babel app, need to route through ping/pong
            target = HT.get_pong_target(target);
        } else {
            target = target.replace("http://", "https://");
        }

        $block.find("input[name=target]").val(encodeURI(target));

        // find the default sdrinst first
        var selected_sdrinst = prefs.sdrinst;
        var default_sdrinst;
        var found_sdrinst = false;

        $.each(status.idp_list, function() {
            if ( this.selected ) { 
                default_sdrinst = this.sdrinst;
            }
            if ( this.sdrinst == selected_sdrinst ) {
                found_sdrinst = true;
            }
        })
        if ( ! found_sdrinst && selected_sdrinst != 'uom.dev' ) {
            selected_sdrinst = default_sdrinst;
        }

        var friend_login_link;
        $.each(status.idp_list, function() {

            //var $option = $("<option></option>").appendTo($select);
            var $option = $("<option></option>");
            $option.val(this.idp_url).data('sdrinst', this.sdrinst);
            var name = this.name.replace("&amp;", "&");
            if ( this.enabled == 1 ) {
                $option.text(name);
            } else if ( this.enabled == 0 ) {
                if ( HT.is_dev ) {
                    $option.text(name + " DEV");
                } else {
                    return;
                }
            } else if ( this.enabled == 2 ) {
                return;
            }
            $option.appendTo($select);

            // if ( this.selected ) { default_sdrinst = this.sdrinst; }
            if ( this.sdrinst == selected_sdrinst ) {
                $option.attr("selected", "selected");
            }

            if ( this.sdrinst == 'uom' && ( HT.is_dev || window.location.hash == '#shibboleth' ) ) {
                $option = $("<option></option>").appendTo($select);
                $option.val('https://test.babel.hathitrust.org/Shibboleth.sso/' + this.sdrinst + '?target=___TARGET___');
                $option.text(this.name + ' DEV');
                $option.data('sdrinst', 'uom.dev');
                if ( selected_sdrinst == 'uom.dev' ) {
                    $option.attr("selected", "selected");
                }
            }

            if ( this.sdrinst == 'uom' ) {
                friend_login_link = this.idp_url.replace('&amp;', '&');
            }
        })

        // update the friend account link to be the UM link (for now)
        var $friend_link = $block.find("#friend-login-link");
        $friend_link.attr("href", friend_login_link.replace('___TARGET___', target).replace('&amp;', '&').replace(/\$/, '%24'));

        $block.find("a[href=wayf]").attr("href", 'http://' + HT.service_domain + "/cgi/wayf?target=" + encodeURIComponent(target));

        var classes = 'login-modal';
        if ( args.classname ) {
            classes += ' ' + args.classname;
        }
        var $dialog = bootbox.dialog(
            $block,
            [],
            { classes : classes }
        );

        $dialog.find(".btn-cancel").click(function(e) {
            e.preventDefault();
            $("html").trigger("login.canceled");
            if ( args.$trigger ) {
                args.$trigger.removeClass("active");
            }
            $dialog.modal("hide");
        })

        $dialog.find("button.continue").click(function(e) {
            e.preventDefault();
            var href = $select.val();
            var sdrinst = $select.find("option:selected").data('sdrinst');
            HT.prefs.set({ sdrinst : sdrinst });
            if ( sdrinst == 'uom' ) {
                href = href.replace('___TARGET___', target).replace('&amp;', '&').replace(/\$/, '%24');
            } else {
                target = target.replace('babel.hathitrust.org/cgi/', 'babel.hathitrust.org/shcgi/');
                href = href.replace('___TARGET___', encodeURIComponent(target));
            }

            setTimeout(function() {
                window.location.href = href;
            }, 500);

            // track a fake pageview to the wayf
            HT.analytics.trackPageview("/cgi/wayf?via=" + sdrinst + "&target=" + target);
        })
    }

    function setup_login_link(status) {
        $button.click(function(e) {
            e.preventDefault();
            $button.addClass("active");
            display_login_dialog({ $trigger : $button });
        })

    }

    function setup_logged_in_state(status) {
        if ( $button.length ) {
            // rewrite the header so we appear to be logged in!
            $button.remove();
            var $navbar = $(".navbar-static-top .navbar-inner");
            var coll_url = 'https://babel.hathitrust.org/cgi/mb?colltype=priv';
            if ( status.authType == 'shibboleth' ) {
                coll_url = coll_url.replace("/cgi/", "/shcgi/");
            }
            var html = 
                '<ul id="person-nav" class="nav pull-right">' + 
                    '<li><span>Hi ' + status.displayName + '!</span></li>' + 
                    '<li><a href="' + coll_url + '">My Collections</a></li>' + 
                    '<li><a id="logout-link" href="https://{SERVICE_DOMAIN}/cgi/logout?'.replace('{SERVICE_DOMAIN}', HT.service_domain) + window.location.href.replace('https://', 'http://') + '">Logout</a></li>' + 
                '</ul>';
            $(html).appendTo($navbar);

            var $footer = $(".navbar.footer .navbar-inner");
            html = 
                '<ul class="nav">' + 
                    '<li><span>' + status.affiliation + '<br />Member, HathiTrust</span></li>' + 
                '</ul>';
            $(html).prependTo($footer);
        }
        var $logout_link = $("#logout-link");
        if ( status.authType == 'shibboleth' ) {
            $logout_link.click(function(e) {
                e.preventDefault();
                bootbox.alert("<p>Please quit your browser to logout.</p>");
                return false;
            })
        }
        $("html").trigger("action.login");

        // rewrite /cgi/ links to /shcgi/
        if ( status.authType == 'shibboleth' ) {
            $("a[href*='/cgi/']").map(function() {
                var $this = $(this);
                $this.attr("href", $this.attr("href").replace("/cgi/", "/shcgi/").replace("http://", "https://"));
            })

            // check the action
            var $form = $("#search form, .search-form form");
            if ( $form.length ) {
                var action = $form.attr("action");
                $form.attr("action", action.replace("/cgi/", "/shcgi/").replace("http://", "https://"));
            }

        }
    }

    function track_event(status) {
        var action = "visitor";
        var label = "visitor";
        if ( status.logged_in ) {
            action = "member";
            label = status.authType;
            if ( status.authType == 'cosign' && status.displayName.indexOf('@') > -1 ) {
                label = 'friend';
            }
        }
        HT.analytics.trackEvent({ category : "userType", action : action, label : label });
    }

    HT.login_callback = function(status) {

        if ( status.logged_in ) {
            setup_logged_in_state(status);
        } else {
            setup_login_link(status);
        }
        track_event(status);
    }

    $.ajax({
        type : "GET",
        url : PING_URL,
        async : true,
        jsonp : 'callback',
        dataType : 'jsonp',
        jsonpCallback : 'HT.login_callback'
    })

    $("body").on('click', '.trigger-login', function(e) {
        e.preventDefault();
        // var target = $(this).data('close-target');
        // if ( target ) {
        //     $(target).modal('hide');
        // }
        bootbox.hideAll();
        // $("#login-button").addClass("centered").click();
        display_login_dialog({ classname: 'login-centered' })
    })


});
