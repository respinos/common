function mungeLink(href) {
  if ( href.indexOf("www.hathitrust.org") > -1 ) {
      href = href.replace(/[\w-\.]*www.hathitrust.org/, HT.www_domain);
  } else if ( href.indexOf("babel.hathitrust.org") > -1 ) {
      href = href.replace(/[\w-\.]*babel.hathitrust.org/, HT.service_domain);
  } else if ( href.indexOf("catalog.hathitrust.org") > -1 ) {
      href = href.replace(/[\w-\.]*catalog.hathitrust.org/, HT.catalog_domain);
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
  }
  return href.replace('https:', location.protocol);
}

export function stageLinks() {
  let HT = window.HT || {};
  if ( ! HT.is_dev ) { return ; }

  document.querySelectorAll('a').forEach((link) => {
    let href = link.getAttribute('href');
    if ( ! href ) { return ; }

    link.setAttribute("href", mungeLink(href));
  })

  document.querySelectorAll('form[action]').forEach((form) => {
    let action = form.getAttribute('action');
    if ( ! action ) {
      // no op
      return;
    } else if ( action.indexOf('babel.hathitrust.org') > -1 ) {
      action = action.replace(/[\w-\.]*babel.hathitrust.org/, HT.service_domain);
    } else if ( action.indexOf("catalog.hathitrust.org") > -1 ) {
      action = action.replace(/[\w-\.]*catalog.hathitrust.org/, HT.catalog_domain);
    }
    form.setAttribute("action", action.replace('https:', location.protocol));
  })

  document.querySelectorAll("[data-href]").forEach(function(link) {
    let href = link.dataset.href;
    if ( ! href ) { return; }
    link.dataset.href = mungeLink(href);
  })

  document.body.querySelectorAll('[src]').forEach((el) => {
    let src = el.getAttribute('src');
    if ( ! src ) { return ; }
    el.setAttribute('src', mungeLink(src));
  })

}