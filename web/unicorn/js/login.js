var HT = HT || {};
head.ready(function() {

    var SCRIPT_URL = $('script[src$="login.js"]').attr('src');
    var PING_URL; var PING_DOMAIN;
    if ( SCRIPT_URL.indexOf("//") >= 0 ) {
        PING_DOMAIN = SCRIPT_URL.split('/')[2];
        PING_URL = 'https://' + PING_DOMAIN + '/cgi/ping';
    } else {
        PING_URL = '/cgi/ping';
        PING_DOMAIN = window.location.hostname;
    }

    var $button = $("#login-button");
    if ( ! $button.length ) {
        // nothing to see here
        var $logout_link = $("#logout-link");
        if ( window.location.href.indexOf("/shcgi/") > -1 ) {
            $logout_link.click(function(e) {
                e.preventDefault();
                bootbox.alert("<p>Please quit your browser to logout.</p>");
                return false;
            })
        }
        return;
    }

    HT.login_callback = function(data) {

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
            }

            $block.find("input[name=target]").val(encodeURI(target));
    
            $.each(data.idp_list, function() {
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

            var $dialog = bootbox.dialog(
                $block,
                [],
                { classes : 'login-modal' }
            );
            $dialog.find(".btn-cancel").click(function(e) {
                e.preventDefault();
                $button.removeClass("active");
                $dialog.modal("hide");
            })

            $dialog.find("button.continue").click(function(e) {
                e.preventDefault();
                var href = $select.val();
                if ( href == '___TARGET___' ) {
                    href = target.replace("http:", "https:");
                } else {
                    target = target.replace('/cgi/', '/shcgi/').replace('http://', 'https://');
                    href = href.replace('___TARGET___', encodeURI(target));
                }
                window.location.href = href;
            })

        })                
    }

    $.ajax({
        type : "GET",
        url : PING_URL,
        async : true,
        jsonp : 'callback',
        dataType : 'jsonp',
        jsonpCallback : 'HT.login_callback'
    })


});