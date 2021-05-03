head.ready(function() {
  if ( ! HT.is_dev ) { return ; }


  $("a").each(function() {
      var $link = $(this);
      var href = $link.attr("href");
      if ( ! href ) {
          // no op
      } else if ( href.indexOf("www.hathitrust.org") > -1 ) {
          $link.attr("href", href.replace(/[\w-\.]*www.hathitrust.org/, HT.www_domain));
      } else if ( href.indexOf("babel.hathitrust.org") > -1 ) {
          $link.attr("href", href.replace(/[\w-\.]*babel.hathitrust.org/, HT.service_domain));
      } else if ( href.indexOf("catalog.hathitrust.org") > -1 ) {
          $link.attr("href", href.replace(/[\w-\.]*catalog.hathitrust.org/, HT.catalog_domain));
      } else if ( href.indexOf("/hdl.handle.net") > -1 ) {
          // e.g. https://hdl.handle.net/2027/uc2.ark:/13960/t9s19288f
          // var tmp = href.split("/");
          // href = "http:/" + babel_string + "/cgi/pt?id=" + tmp.pop();
          // href = href.replace("//hdl.handle.net/2027/", "//" + HT.service_domain + "/cgi/pt?id=");
          var tmp = href.split('?');
          href = tmp[0].replace("//hdl.handle.net/2027/", "//" + HT.service_domain + "/cgi/pt?id=");
          if ( tmp[1] ) {
            var tmp2 = tmp[1].split('=');
            href += ";seq=" + tmp2[2];
          }
          $link.attr("href", href);
      }
  })

  $("form[action]").each(function() {
    var $form = $(this);
    var action = $form.attr("action");
    if ( ! action ) {
      // no op
    } else if ( action.indexOf('babel.hathitrust.org') > -1 ) {
      $form.attr("action", action.replace(/[\w-\.]*babel.hathitrust.org/, HT.service_domain));
    } else if ( action.indexOf("catalog.hathitrust.org") > -1 ) {
      $form.attr("action", action.replace(/[\w-\.]*catalog.hathitrust.org/, HT.catalog_domain));
    }
  })

  $("[data-href]").each(function() {
    var $link = $(this);
    var href = $link.data('href');
    if ( ! href ) {
        // no op
    } else if ( href.indexOf("www.hathitrust.org") > -1 ) {
        $link.data("href", href.replace(/[\w-\.]*www.hathitrust.org/, HT.www_domain));
    } else if ( href.indexOf("babel.hathitrust.org") > -1 ) {
        $link.data("href", href.replace(/[\w-\.]*babel.hathitrust.org/, HT.service_domain));
    } else if ( href.indexOf("catalog.hathitrust.org") > -1 ) {
        $link.data("href", href.replace(/[\w-\.]*catalog.hathitrust.org/, HT.catalog_domain));
    } else if ( href.indexOf("/hdl.handle.net") > -1 ) {
        // e.g. https://hdl.handle.net/2027/uc2.ark:/13960/t9s19288f
        // var tmp = href.split("/");
        // href = "http:/" + babel_string + "/cgi/pt?id=" + tmp.pop();
        var tmp = href.split('?');
        href = tmp[0].replace("//hdl.handle.net/2027/", "//" + HT.service_domain + "/cgi/pt?id=");
        if ( tmp[1] ) {
          var tmp2 = tmp[1].split('=');
          href += ";seq=" + tmp2[2];
        }
        $link.data("href", href);
    }
  })

  $("[src]").each(function() {
    var $link = $(this);
    var href = $link.attr('src');
    if ( ! href ) {
        // no op
    } else if ( href.indexOf("www.hathitrust.org") > -1 ) {
        // $link.attr("src", href.replace(/[\w-\.]*www.hathitrust.org/, HT.www_domain));
    } else if ( href.indexOf("babel.hathitrust.org") > -1 ) {
        $link.attr("src", href.replace(/[\w-\.]*babel.hathitrust.org/, HT.service_domain));
    } else if ( href.indexOf("catalog.hathitrust.org") > -1 ) {
        $link.data("src", href.replace(/[\w-\.]*catalog.hathitrust.org/, HT.catalog_domain));
    } else if ( href.indexOf("/hdl.handle.net") > -1 ) {
        // e.g. https://hdl.handle.net/2027/uc2.ark:/13960/t9s19288f
        // var tmp = href.split("/");
        // href = "http:/" + babel_string + "/cgi/pt?id=" + tmp.pop();
        href = href.replace("//hdl.handle.net/2027/", "//" + HT.service_domain + "/cgi/pt?id=");
        $link.attr("src", href);
    }
  })


});