import docCookies from './cookies';
import cookies from './cookies';
import { stageLinks } from './staging';

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, source) {
  let output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function setDomains() {
  HT.service_domain = 'babel.hathitrust.org';
  HT.catalog_domain = 'catalog.hathitrust.org';
  HT.www_domain = 'www.hathitrust.org';
  HT.cookies_domain = '.hathitrust.org';
  var hostname = location.hostname;
  HT.is_dev = (hostname != 'www.hathitrust.org') && (hostname != 'catalog.hathitrust.org') && (hostname != 'babel.hathitrust.org');
  if (HT.is_dev) {
    var prefix = hostname.split(".")[0];
    console.log("-- main setting hostname", prefix, hostname);
    if (prefix == 'localhost') {
      if (location.port) {
        hostname += ':' + location.port;
      }
      HT.service_domain = hostname;
      HT.catalog_domain = hostname;
      HT.www_domain = hostname;
      HT.cookies_domain = 'localhost';
    } else if ( hostname.indexOf('phiredevelopment') > -1 ) {
      // shameless green
      HT.www_domain = hostname;
    } else {
      // make this more robust later
      var babel_prefix = prefix;
      if (hostname == 'test.www.hathitrust.org') {
        babel_prefix = 'test'; // beta-3';
        prefix = 'test'; // beta-3';
      }
      HT.service_domain = babel_prefix + '.babel.hathitrust.org';
      HT.catalog_domain = prefix + '.catalog.hathitrust.org';
      HT.www_domain = prefix + '.www.hathitrust.org';
    }
  }
}

function setupHTEnv() {
  const HT = window.HT = ( window.HT || {} );
  setDomains();
  HT.prefs = {};
  HT.prefs.get = function () {
    var prefs = {};
    try {
      prefs = JSON.parse(docCookies.getItem('HT.prefs') || '{}');
    } catch (e) {
      // just null the prefs
      cookies.removeItem("HT.prefs");
      prefs = {};
    }
    return prefs;
  };

  HT.prefs.set = function (params) {
    var prefs = HT.prefs.get();
    prefs = mergeDeep(prefs, params);
    try {
      var expires = new Date();
      expires.setDate(expires.getDate() + 90);
      cookies.setItem('HT.prefs', JSON.stringify(prefs), expires, '/', HT.cookies_domain, true);
    } catch (e) {
      // noop
      console.log(e);
    }
  };

  HT.cookieJar = docCookies;

  if ( HT.is_dev ) {
    stageLinks();
  }
}

export { mergeDeep, setDomains, setupHTEnv };