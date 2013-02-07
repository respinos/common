head.ready(function() {
    var HT = HT || {};
    var FEEDBACK_URL = HT.FEEDBACK_URL || '//roger-full.babel.hathitrust.org/cgi/feedback';

    $(document).on('click.feedback.data-api', '[data-toggle="feedback"]', function(e) {
            e.preventDefault();
            var id = $(this).data('id');
            var m = $(this).data('m') || 'ht';
            var $dialog = bootbox.dialog(
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
                            '<textarea rows="5" id="comments" name="comments" class="input-xlarge" placeholder="Add your feedback here"></textarea>' +
                        '</div>' +
                    '</div>' +
                '</form>',
                [
                    {
                        "label" : "Cancel",
                        "class" : "btn-dismiss"
                    },
                    {
                        "label" : "Submit",
                        "class" : "btn-primary",
                        "callback" : function() {
                            var val_email = $.trim($("#email").val());
                            var val_comments = $.trim($("#comments").val());
                            $dialog.find(".btn").attr("disabled", "disabled");
                            if ( val_comments ) {
                                $dialog.find(".btn-primary").addClass("btn-loading");
                                $.post(FEEDBACK_URL, 
                                    { id : id, 
                                      email : val_email, 
                                      comments : val_comments, 
                                      'return' : location.href,
                                      m : m }, 
                                      function() {
                                        $dialog.modal('hide');
                                        bootbox.alert("<p>Thank you for your feedback!</p>");
                                      })
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