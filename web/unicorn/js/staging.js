head.ready(function() {

    var this_hostname = location.hostname;

    $("a").each(function() {
        var $link = $(this);
        var href = $link.attr("href");
        if ( ! href ) {
            // no op
        } else if ( href.indexOf("http://www.hathitrust.org") > -1 ) {
            $link.attr("href", href.replace("http://www.hathitrust.org", "http://test.www.hathitrust.org"));
        } else if ( href.indexOf("/babel.hathitrust.org") > -1 ) {
            $link.attr("href", href.replace("/babel.hathitrust.org", "/beta-3.babel.hathitrust.org"));
        } else if ( href.indexOf("/catalog.hathitrust.org") > -1 ) {
            $link.attr("href", href.replace("/catalog.hathitrust.org", "/test.catalog.hathitrust.org"));
        } else if ( href.indexOf("/hdl.handle.net") > -1 ) {
            var tmp = href.split("/");
            href = "http://beta-3.babel.hathitrust.org/cgi/pt?id=" + tmp.pop();
            $link.attr("href", href);
        }
    })
})