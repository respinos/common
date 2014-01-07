var HT = HT || {};

head.ready(function() {


    function get_feedback_url() {
        var login_status = HT.login_status || {};
        if ( ! login_status.authType ) {
            if ( window.location.href.indexOf("/shcgi/") > -1 ) {
                login_status.authType = 'shibboleth';
            }
        }
        var FEEDBACK_URL = '//' + HT.service_domain + (login_status.authType == 'shibboleth' ? '/shcgi' : '/cgi') + '/feedback';
        if ( login_status.logged_in ) {
            FEEDBACK_URL = 'https:' + FEEDBACK_URL;
        }
        return FEEDBACK_URL;
    }

    function default_dialog() {
        var html = 
        '<form class="form-horizontal">' + 
            '<div class="control-group">' + 
                '<label class="control-label" for="email">Email Address<br /><span class="label">Optional</span></label>' +
                '<div class="controls">' +
                    '<input id="email" name="email" type="text" class="input-xlarge" placeholder="[Your email address]" />' +
                '</div>' +
            '</div>' +
            '<div class="control-group">' + 
                '<label class="control-label" for="comments">Comments</label>' +
                '<div class="controls">' +
                    '<textarea rows="5" id="comments" name="comments" required="required" class="input-xlarge" placeholder="Add your feedback here"></textarea>' +
                '</div>' +
            '</div>' +
        '</form>';

        return html;
    }

    $(document).on('click.feedback.data-api', '[data-toggle^=feedback]', function(e) {
            e.preventDefault();
            bootbox.hideAll();

            var id = $(this).data('id');
            var m = $(this).data('m') || 'ht';
            var html = $(this).data('default-form') ? default_dialog() : ( HT.feedback ? HT.feedback.dialog() : default_dialog() );
            var $dialog = bootbox.dialog(
                html,
                [
                    {
                        "label" : "Cancel",
                        "class" : "btn-dismiss"
                    },
                    {
                        "label" : "Submit",
                        "class" : "btn-primary",
                        "callback" : function() {

                            var data = { 'return' : location.href, m : m };
                            if ( id ) { data.id = id ; }
                            var is_valid = true; is_empty = true;
                            $dialog.find("input[type=text],textarea,input:checked,input[type=hidden]").each(function() {
                                var value = $.trim($(this).val());
                                if ( value ) {
                                    data[$(this).attr("name")] = $(this).val();
                                    is_empty = false;
                                }
                                if ( $(this).attr("required") && ! value ) {
                                    is_valid = false;
                                }
                            })

                            // var val_email = $.trim($("#email").val());
                            // var val_comments = $.trim($("#comments").val());
                            if ( is_valid && ! is_empty) {
                                $dialog.find(".btn").attr("disabled", "disabled");
                                $dialog.find(".btn-primary").addClass("btn-loading");

                                if ( location.hostname == HT.service_domain ) {
                                    // we can do this with ajax
                                    $.post(get_feedback_url(), 
                                        data, 
                                        function() {
                                            $dialog.modal('hide');
                                            bootbox.alert("<p>Thank you for your feedback!</p>");
                                    });
                                } else {
                                    // have to post the form
                                    var $form = $("<form method='POST'></form>");
                                    $form.attr("action", get_feedback_url());
                                    _.each(_.keys(data), function(name) {
                                        var values = data[name];
                                        values = $.isArray(values) ? values : [ values ];
                                        _.each(values, function(value) {
                                            $("<input type='hidden' />").attr({ name : name }).val(value).appendTo($form);
                                        })
                                    })
                                    $dialog.modal('hide');
                                    $form.hide().appendTo("body");
                                    $form.submit();
                                }


                            } else if ( ! is_valid) {
                                $("<div class='alert alert-error'>Please fill in required fields.</div>").insertBefore($dialog.find(".btn-dismiss"));
                                $dialog.addClass("required");
                            } else {
                                $("<div class='alert alert-error'>You cannot submit an empty form.</div>").insertBefore($dialog.find(".btn-dismiss"));
                            }
                            return false;
                        }
                    }
                ],
                {
                    header : 'Feedback'
                }
            );
        }
    );

})
