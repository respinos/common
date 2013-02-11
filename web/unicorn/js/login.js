var HT = HT || {};
head.ready(function() {

    var WAYF_URL = '//roger-full.babel.hathitrust.org/sandbox/cgi/wayffish';

    var $button = $("#login-button");
    if ( ! $button.length ) {
        // nothing to see here
        return;
    }

    HT.login_callback = function(data) {
        $button.click(function(e) {
            e.preventDefault();
            $button.addClass("active");
            var $block = $(
                '<form>' + 
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
                '</form>'
            );

            var $select = $block.find("select[name=mdp]");
    
            $.each(data, function() {
                var $option = $("<option></option>").appendTo($select);
                $option.val(data.value);
                $option.text(data.label);
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
            $dialog.find(".btn-cancel").click(function() {
                $button.removeClass("active");
                $dialog.modal("hide");
            })
        })                
    }

    $.ajax({
        type : "GET",
        url : WAYF_URL,
        async : true,
        jsonp : 'callback',
        dataType : 'jsonp',
        jsonpCallback : 'HT.login_callback'
    })


});