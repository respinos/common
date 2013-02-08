head.ready(function() {

    var $button = $("#login-button");
    if ( ! $button.length ) {
        // nothing to see here
        return;
    }

    // this needs tuning
    $.get("/sandbox/institutions.html", function(data) {
        $button.click(function() {
            $button.addClass("active");
            var $block = $(
                '<form>' + 
                    '<div class="headline">' + 
                        '<p>Log in with your partner institution<br />&mdash; no signup is necessary.</p>' +
                    '</div>' +
                    '<div class="wayf-list">' + 
                        '<label for="idp" class="offscreen">Select your institution</label>' + 
                        data +
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
    })


});