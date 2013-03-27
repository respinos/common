var HT = HT || {};

head.ready(function() {

    var FEEDBACK_URL = HT.FEEDBACK_URL || '//roger-full.babel.hathitrust.org/cgi/feedback';

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

    $(document).on('click.feedback.data-api', '[data-toggle="feedback"]', function(e) {
            e.preventDefault();
            var id = $(this).data('id');
            var m = $(this).data('m') || 'ht';
            var html = HT.feedback ? HT.feedback.dialog() : default_dialog();
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

                            var data = { id : id, 'return' : location.href, m : m };
                            var is_valid = true; is_empty = true;
                            $dialog.find("input[type=text],textarea,input:checked").each(function() {
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
                                $.post(FEEDBACK_URL, 
                                    data, 
                                    function() {
                                        $dialog.modal('hide');
                                        bootbox.alert("<p>Thank you for your feedback!</p>");
                                    })
                            } else if ( ! is_valid) {
                                $("<div class='alert alert-error'>You must answer required fields.</div>").insertBefore($dialog.find(".btn-dismiss"));
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
            )
        }
    );

})