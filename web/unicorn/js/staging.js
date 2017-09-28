head.ready(function() {

    var this_hostname = location.hostname;
    var babel_string= '/test.babel.hathitrust.org';
    if ( this_hostname.indexOf("babel.hathitrust.org") > -1 ) {
        // this is a babel server, so stay within this domain
        babel_string= '/' + this_hostname;
    }

    $("a").each(function() {
        var $link = $(this);
        var href = $link.attr("href");
        if ( ! href ) {
            // no op
        } else if ( href.indexOf("//www.hathitrust.org") > -1 ) {
            $link.attr("href", href.replace("//www.hathitrust.org", "//test.www.hathitrust.org"));
        } else if ( href.indexOf("/babel.hathitrust.org") > -1 ) {
            $link.attr("href", href.replace("/babel.hathitrust.org", babel_string));
        } else if ( href.indexOf("/catalog.hathitrust.org") > -1 ) {
            $link.attr("href", href.replace("/catalog.hathitrust.org", "/test.catalog.hathitrust.org"));
        } else if ( href.indexOf("/hdl.handle.net") > -1 ) {
            // e.g. https://hdl.handle.net/2027/uc2.ark:/13960/t9s19288f
            // var tmp = href.split("/");
            // href = "http:/" + babel_string + "/cgi/pt?id=" + tmp.pop();
            href = href.replace("//hdl.handle.net/2027/", "//" + babel_string + "/cgi/pt?id=");
            $link.attr("href", href);
        }
    })
})