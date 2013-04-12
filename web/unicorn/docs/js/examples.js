head.ready(function() {
    $("textarea.example").each(function() {
        var content = $(this).val();
        var $pre = $('<pre class="example"></pre>').replaceAll($(this));
        $pre.text($.trim(content));
    })
})
