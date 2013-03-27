var HT = HT || {};
head.ready(function() {

    var SCRIPT_URL = $('script[src$="login.js"]').attr('src');
    var PING_URL; var PING_DOMAIN;
    if ( SCRIPT_URL.indexOf("//") >= 0 ) {
        PING_DOMAIN = SCRIPT_URL.split('/')[2];
        // PING_DOMAIN = 'roger-full.babel.hathitrust.org';
        PING_URL = 'https://' + PING_DOMAIN + '/cgi/ping';
    } else {
        PING_URL = '/cgi/ping';
        PING_DOMAIN = window.location.hostname;
    }

    var is_babel = (window.location.href.indexOf("babel.hathitrust") > -1);
    var $button = $("#login-button");

    function setup_login_link(status) {
        $button.click(function(e) {
            e.preventDefault();
            $button.addClass("active");
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
                            '<li><a href="#">Don\'t see your institution listed? &raquo;</a></li>' +
                            '<li>' +
                                '<span>Not with a partner institution?</span><br />' +
                                '<a href="#">Create a "Friend" account to create collections. &raquo;</a></li>' +
                            '<li><a href="#">What are the benefits of logging in? &raquo;</a></li>' +
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
        
            $.each(status.idp_list, function() {
                var $option = $("<option></option>").appendTo($select);
                $option.val(this.idp_url);
                $option.text(this.name);
                if ( this.selected ) {
                    $option.attr('selected', 'selected');
                }
                if ( this.sdrinst == 'uom' ) {
                    $option = $("<option></option>").appendTo($select);
                    $option.val('https://test.babel.hathitrust.org/Shibboleth.sso/' + this.sdrinst + '?target=___TARGET___');
                    $option.text(this.name + ' DEV');                
                }
            })

            var classes = 'login-modal';
            if ( $button.hasClass("centered") ) {
                classes += ' login-centered';
            }
            var $dialog = bootbox.dialog(
                $block,
                [],
                { classes : classes }
            );
            $dialog.find(".btn-cancel").click(function(e) {
                e.preventDefault();
                $button.removeClass("active").removeClass("centered");
                $dialog.modal("hide");
            })

            $dialog.find("button.continue").click(function(e) {
                e.preventDefault();
                var href = $select.val();
                if ( href == '___TARGET___' ) {
                    // href = target.replace("http:", "https:");
                } else {
                    target = target.replace('babel.hathitrust.org/cgi/', 'babel.hathitrust.org/shcgi/');
                    // if ( target.substr(0,5) == 'http:' ) {
                    //     target = target.replace('http://', 'https://');
                    // }
                    href = href.replace('___TARGET___', encodeURIComponent(target));
                }
                window.location.href = href;
            })

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
                    '<li><a id="logout-link" href="https://babel.hathitrust.org/cgi/logout?' + window.location.href.replace('https://', 'http://') + '">Logout</a></li>' + 
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
    }


    HT.login_callback = function(status) {

        if ( status.logged_in ) {
            setup_logged_in_state(status);
        } else {
            setup_login_link(status);
        }
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
        var target = $(this).data('close-target');
        if ( target ) {
            $(target).modal('hide');
        }
        $("#login-button").addClass("centered").click();
    })


});
