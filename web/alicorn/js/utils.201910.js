"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(r,a){var t=r.document,e=r.navigator,n=r.location,i=t.documentElement,o=[],s={screens:[240,320,480,640,768,800,1024,1280,1440,1680,1920],screensCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!1},browsers:[{ie:{min:6,max:11}}],browserCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!0},html5:!0,page:"-page",section:"-section",head:"head"};if(r.head_conf)for(var c in r.head_conf)r.head_conf[c]!==a&&(s[c]=r.head_conf[c]);function u(e){o[o.length]=e}function l(e){var t=new RegExp(" ?\\b"+e+"\\b");i.className=i.className.replace(t,"")}function d(e,t){for(var n=0,o=e.length;n<o;n++)t.call(e,e[n],n)}var f=r[s.head]=function(){f.ready.apply(null,arguments)};f.feature=function(e,t,n){return e?("[object Function]"===Object.prototype.toString.call(t)&&(t=t.call()),u((t?"":"no-")+e),f[e]=!!t,n||(l("no-"+e),l(e),f.feature())):(i.className+=" "+o.join(" "),o=[]),f},f.feature("js",!0);var m=e.userAgent.toLowerCase(),p=/mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(m);f.feature("mobile",p,!0),f.feature("desktop",!p,!0);var h=(m=/(chrome|firefox)[ \/]([\w.]+)/.exec(m)||/(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(m)||/(android)(?:.*version)?[ \/]([\w.]+)/.exec(m)||/(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(m)||/(msie) ([\w.]+)/.exec(m)||/(trident).+rv:(\w.)+/.exec(m)||[])[1],g=parseFloat(m[2]);switch(h){case"msie":case"trident":h="ie",g=t.documentMode||g;break;case"firefox":h="ff";break;case"ipod":case"ipad":case"iphone":h="ios";break;case"webkit":h="safari"}f.browser={name:h,version:g},f.browser[h]=!0;for(var v=0,w=s.browsers.length;v<w;v++)for(var y in s.browsers[v])if(h===y){u(y);for(var b=s.browsers[v][y].min,T=s.browsers[v][y].max,E=b;E<=T;E++)E<g?(s.browserCss.gt&&u("gt-"+y+E),s.browserCss.gte&&u("gte-"+y+E)):g<E?(s.browserCss.lt&&u("lt-"+y+E),s.browserCss.lte&&u("lte-"+y+E)):g===E&&(s.browserCss.lte&&u("lte-"+y+E),s.browserCss.eq&&u("eq-"+y+E),s.browserCss.gte&&u("gte-"+y+E))}else u("no-"+y);function x(){i.className=i.className.replace(/ (w-|eq-|gt-|gte-|lt-|lte-|portrait|no-portrait|landscape|no-landscape)\d+/g,"");var t=r.innerWidth||i.clientWidth,e=r.outerWidth||r.screen.width;f.screen.innerWidth=t,f.screen.outerWidth=e,u("w-"+t),d(s.screens,function(e){e<t?(s.screensCss.gt&&u("gt-"+e),s.screensCss.gte&&u("gte-"+e)):t<e?(s.screensCss.lt&&u("lt-"+e),s.screensCss.lte&&u("lte-"+e)):t===e&&(s.screensCss.lte&&u("lte-"+e),s.screensCss.eq&&u("e-q"+e),s.screensCss.gte&&u("gte-"+e))});var n=r.innerHeight||i.clientHeight,o=r.outerHeight||r.screen.height;f.screen.innerHeight=n,f.screen.outerHeight=o,f.feature("portrait",t<n),f.feature("landscape",n<t)}u(h),u(h+parseInt(g,10)),s.html5&&"ie"===h&&g<9&&d("abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|progress|section|summary|time|video".split("|"),function(e){t.createElement(e)}),d(n.pathname.split("/"),function(e,t){var n,o;2<this.length&&this[t+1]!==a?t&&u(this.slice(t,t+1).join("-").toLowerCase()+s.section):(0<(o=(n=e||"index").indexOf("."))&&(n=n.substring(0,o)),i.id=n.toLowerCase()+s.page,t||u("root"+s.section))}),f.screen={height:r.screen.height,width:r.screen.width},x();var C=0;function H(){r.clearTimeout(C),C=r.setTimeout(x,50)}r.addEventListener?r.addEventListener("resize",H,!1):r.attachEvent("onresize",H)}(window),function(e,n){var t=e.document.createElement("i"),o=t.style,r=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),a="Webkit Moz O ms Khtml".split(" "),i=e.head_conf&&e.head_conf.head||"head",s=e[i];function c(e){var t=e.charAt(0).toUpperCase()+e.substr(1);return!!function(e){for(var t in e)if(o[e[t]]!==n)return 1}((e+" "+a.join(t+" ")+t).split(" "))}var u={gradient:function(){var e="background-image:";return o.cssText=(e+r.join("gradient(linear,left top,right bottom,from(#9f9),to(#fff));"+e)+r.join("linear-gradient(left top,#eee,#fff);"+e)).slice(0,-e.length),!!o.backgroundImage},rgba:function(){return o.cssText="background-color:rgba(0,0,0,0.5)",!!o.backgroundColor},opacity:function(){return""===t.style.opacity},textshadow:function(){return""===o.textShadow},multiplebgs:function(){o.cssText="background:url(https://),url(https://),red url(https://)";var e=(o.background||"").match(/url/g);return"[object Array]"===Object.prototype.toString.call(e)&&3===e.length},boxshadow:function(){return c("boxShadow")},borderimage:function(){return c("borderImage")},borderradius:function(){return c("borderRadius")},cssreflections:function(){return c("boxReflect")},csstransforms:function(){return c("transform")},csstransitions:function(){return c("transition")},touch:function(){return"ontouchstart"in e},retina:function(){return 1<e.devicePixelRatio},fontface:function(){var e=s.browser.name,t=s.browser.version;switch(e){case"ie":return 9<=t;case"chrome":return 13<=t;case"ff":return 6<=t;case"ios":return 5<=t;case"android":return!1;case"webkit":return 5.1<=t;case"opera":return 10<=t;default:return!1}}};for(var l in u)u[l]&&s.feature(l,u[l].call(),!0);s.feature()}(window),function(c,o){var a,u=c.document,i=[],s={},l={},e="async"in u.createElement("script")||"MozAppearance"in u.documentElement.style||c.opera,t=c.head_conf&&c.head_conf.head||"head",d=c[t]=c[t]||function(){d.ready.apply(null,arguments)},n=1,r=2,f=3,m=4;function p(){}function h(e,t){if(e){"object"===(void 0===e?"undefined":_typeof(e))&&(e=[].slice.call(e));for(var n=0,o=e.length;n<o;n++)t.call(e,e[n],n)}}function g(e,t){var n=Object.prototype.toString.call(t).slice(8,-1);return t!==o&&null!==t&&n===e}function v(e){return g("Function",e)}function w(e){return g("Array",e)}function y(e){(e=e||p)._done||(e(),e._done=1)}function b(e){var t,n,o,r={};if("object"===(void 0===e?"undefined":_typeof(e)))for(var a in e)e[a]&&(r={name:a,url:e[a]});else r={name:(t=e.split("/"),n=t[t.length-1],-1!==(o=n.indexOf("?"))?n.substring(0,o):n),url:e};var i=l[r.name];return i&&i.url===r.url?i:l[r.name]=r}function T(e){for(var t in e=e||l)if(e.hasOwnProperty(t)&&e[t].state!==m)return;return 1}function E(t){t.state===o&&(t.state=n,t.onpreload=[],C({url:t.url,type:"cache"},function(){var e;(e=t).state=r,h(e.onpreload,function(e){e.call()})}))}function x(e,t){t=t||p,e.state!==m?e.state!==f?e.state!==n?(e.state=f,C(e,function(){e.state=m,t(),h(s[e.name],function(e){y(e)}),a&&T()&&h(s.ALL,function(e){y(e)})})):e.onpreload.push(function(){x(e,t)}):d.ready(e.name,t):t()}function C(o,t){function e(e){e=e||c.event,a.onload=a.onreadystatechange=a.onerror=null,t()}function r(e){("load"===(e=e||c.event).type||/loaded|complete/.test(a.readyState)&&(!u.documentMode||u.documentMode<9))&&(c.clearTimeout(o.errorTimeout),c.clearTimeout(o.cssTimeout),a.onload=a.onreadystatechange=a.onerror=null,t())}var a,n,i;t=t||p,"css"===(n=o.url,(i=(n=n||"").split("?")[0].split("."))[i.length-1].toLowerCase())?((a=u.createElement("link")).type="text/"+(o.type||"css"),a.rel="stylesheet",a.href=o.url,o.cssRetries=0,o.cssTimeout=c.setTimeout(function e(){if(o.state!==m&&o.cssRetries<=20){for(var t=0,n=u.styleSheets.length;t<n;t++)if(u.styleSheets[t].href===a.href)return void r({type:"load"});o.cssRetries++,o.cssTimeout=c.setTimeout(e,250)}},500)):((a=u.createElement("script")).type="text/"+(o.type||"javascript"),a.src=o.url),a.onload=a.onreadystatechange=r,a.onerror=e,a.async=!1,a.defer=!1,o.errorTimeout=c.setTimeout(function(){e({type:"timeout"})},7e3);var s=u.head||u.getElementsByTagName("head")[0];s.insertBefore(a,s.lastChild)}function H(){if(!u.body)return c.clearTimeout(d.readyTimeout),void(d.readyTimeout=c.setTimeout(H,50));a||(a=!0,function(){for(var e=u.getElementsByTagName("script"),t=0,n=e.length;t<n;t++){var o=e[t].getAttribute("data-headjs-load");if(o)return d.load(o)}}(),h(i,function(e){y(e)}))}function k(){u.addEventListener?(u.removeEventListener("DOMContentLoaded",k,!1),H()):"complete"===u.readyState&&(u.detachEvent("onreadystatechange",k),H())}if("complete"===u.readyState)H();else if(u.addEventListener)u.addEventListener("DOMContentLoaded",k,!1),c.addEventListener("load",H,!1);else{u.attachEvent("onreadystatechange",k),c.attachEvent("onload",H);var _=!1;try{_=!c.frameElement&&u.documentElement}catch(e){}_&&_.doScroll&&!function t(){if(!a){try{_.doScroll("left")}catch(e){return c.clearTimeout(d.readyTimeout),void(d.readyTimeout=c.setTimeout(t,50))}H()}}()}d.load=d.js=e?function(){var e=arguments,n=e[e.length-1],o={};return v(n)||(n=null),w(e[0])?(e[0].push(n),d.load.apply(null,e[0])):(h(e,function(e,t){e!==n&&(e=b(e),o[e.name]=e)}),h(e,function(e,t){e!==n&&x(e=b(e),function(){T(o)&&y(n)})})),d}:function(){var e=arguments,t=e[e.length-1],n=[].slice.call(e,1),o=n[0];return v(t)||(t=null),w(e[0])?(e[0].push(t),d.load.apply(null,e[0])):o?(h(n,function(e){!v(e)&&e&&E(b(e))}),x(b(e[0]),v(o)?o:function(){d.load.apply(null,n)})):x(b(e[0])),d},d.test=function(e,t,n,o){var r="object"===(void 0===e?"undefined":_typeof(e))?e:{test:e,success:!!t&&(w(t)?t:[t]),failure:!!n&&(w(n)?n:[n]),callback:o||p},a=!!r.test;return a&&r.success?(r.success.push(r.callback),d.load.apply(null,r.success)):!a&&r.failure?(r.failure.push(r.callback),d.load.apply(null,r.failure)):o(),d},d.ready=function(e,t){if(e===u)return a?y(t):i.push(t),d;if(v(e)&&(t=e,e="ALL"),w(e)){var n={};return h(e,function(e){n[e]=l[e],d.ready(e,function(){T(n)&&y(t)})}),d}if("string"!=typeof e||!v(t))return d;var o=l[e];if(o&&o.state===m||"ALL"===e&&T()&&a)return y(t),d;var r=s[e];return r?r.push(t):r=s[e]=[t],d},d.ready(u,function(){T()&&h(s.ALL,function(e){y(e)}),d.feature&&d.feature("domloaded",!0)})}(window),void 0===window.console&&(window.console={log:function(){}}),Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var t=this;do{if(t.matches(e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null}),window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(e,t){t=t||window;for(var n=0;n<this.length;n++)e.call(t,this[n],n,this)});var docCookies={getItem:function(e){return e&&decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null},setItem:function(e,t,n,o,r,a){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var i="";if(n)switch(n.constructor){case Number:i=n===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n;break;case String:i="; expires="+n;break;case Date:i="; expires="+n.toUTCString()}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+i+(r?"; domain="+r:"")+(o?"; path="+o:"")+(a?"; secure":""),!0},removeItem:function(e,t,n){return!!this.hasItem(e)&&(document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:"")+(t?"; path="+t:""),!0)},hasItem:function(e){return!!e&&new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){for(var e=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),t=e.length,n=0;n<t;n++)e[n]=decodeURIComponent(e[n]);return e}},HT=HT||{};!function(){var e="/";window.jQuery&&(window.old_jQuery=window.jQuery),HT.service_domain="babel.hathitrust.org",HT.catalog_domain="catalog.hathitrust.org",HT.www_domain="www.hathitrust.org";var t,n,o,r,a=location.hostname;HT.is_dev="www.hathitrust.org"!=a&&"catalog.hathitrust.org"!=a&&"babel.hathitrust.org"!=a,HT.is_babel=-1<a.indexOf("babel.hathitrust.org"),HT.is_dev&&("mrnibbs"==(e=a.split(".")[0])?(HT.service_domain=a,HT.catalog_domain=a,HT.www_domain=a):(t=e,"test.www.hathitrust.org"==a&&(e=t="test"),t.match(/beta-|preview|test/)||t.match("-full")||(t+="-full"),e.match("-full")&&(e=e.replace("-full","")),HT.service_domain=t+".babel.hathitrust.org",HT.catalog_domain=e+".catalog.hathitrust.org",HT.www_domain=e+".www.hathitrust.org")),document.addEventListener("DOMContentLoaded",function(e){var t,n,o,r,a;window.location.href.indexOf("babel.hathitrust.org")<0&&-1<window.location.href.indexOf("signon=")&&(n=(t=location.href.split("signon=swle:")).pop(),o=t[0],document.querySelector("#logout-link")||document.querySelector(".logout-link")?history.replaceState({},document.title,o):(r=encodeURIComponent("https://"+HT.service_domain+"/cgi/ping/pong?target="+o),a="wayf"==n?"https://"+HT.service_domain+"/cgi/wayf?target="+r:"https://"+HT.service_domain+"/Shibboleth.sso/Login?entityID="+n+"&target="+r,window.location.href=a))}),HT.prefs={},HT.prefs.get=function(){var t={};try{t=JSON.parse(docCookies.getItem("HT.prefs")||"{}")}catch(e){docCookies.removeItem("HT.prefs"),t={}}return t},HT.prefs.set=function(e){var t=HT.prefs.get(),t=Object.assign({},t,e);try{var n=new Date;n.setDate(n.getDate()+90),docCookies.setItem("HT.prefs",JSON.stringify(t),n,"/",".hathitrust.org",!0)}catch(e){}},HT.scripts=[],HT.update_status=function(e){void 0===n&&(n=document.querySelector("#root > div[role=status]"));var t=n;window.bootbox&&window.bootbox.active()&&(t=window.bootbox.active().modal.querySelector('div[role="status"]')),t&&HT._update_status(t,e)},HT._update_status=function(e,t){var n;"--"!=t?o!=t&&(r&&(clearTimeout(r),r=null),n=HT.params&&"polite"==HT.params.debug?2e3:500,setTimeout(function(){e.innerText=t,o=t,console.log("-- status:",t)},50),r=setTimeout(function(){e.innerText=""},n)):o=t};function i(){var e=window.innerHeight;return window.visualViewport&&1!=window.visualViewport.scale&&(e=window.visualViewport.height*window.visualViewport.scale),e}document.querySelector("html");var s=.01*i();document.documentElement.style.setProperty("--vh",s+"px");var c=0;window.tx=setInterval(function(){0;var e,t=i();t!=c&&(c=t,document.documentElement.style.setProperty("--vh",.01*t+"px"),(e=document.createEvent("UIEvents")).initEvent("resize",!0,!1,window,0),window.dispatchEvent(e))},100),setTimeout(function(){var e=.01*i();document.documentElement.style.setProperty("--vh",e+"px")},500),window.addEventListener("resize",function(){var e=.01*i();document.documentElement.style.setProperty("--vh",e+"px")}),window.addEventListener("orientationchange",function(){setTimeout(function(){var e=.01*i();document.documentElement.style.setProperty("--vh",e+"px"),HT&&HT.utils&&HT.utils.handleOrientationChange&&HT.utils.handleOrientationChange()},500)}),window.addEventListener("beforeunload",function(e){var t=HT.beforeUnloadTimeout||5e3;setTimeout(function(){var e=document.createElement("div");e.classList.add("wait-for-it"),document.body.appendChild(e),setTimeout(function(){document.body.removeChild(e)},t)},501)}),setTimeout(function(){var e=document.createEvent("UIEvents");e.initEvent("resize",!0,!1,window,0),window.dispatchEvent(e)},100),navigator&&navigator.userAgent&&navigator.userAgent.match(/Edge\/1[678]/)&&document.documentElement.classList.add("edge");head.js.apply(this,["/common/alicorn/js/utils.bundle.js"])}();