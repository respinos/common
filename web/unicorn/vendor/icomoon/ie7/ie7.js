/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icomoon-plus': '&#xea0a;',
		'icomoon-circle-up': '&#xea41;',
		'icomoon-circle-right': '&#xea42;',
		'icomoon-circle-down': '&#xea43;',
		'icomoon-circle-left': '&#xea44;',
		'icomoon-copy': '&#xe90a;',
		'icomoon-duplicate': '&#xe90a;',
		'icomoon-files1': '&#xe90a;',
		'icomoon-pages1': '&#xe90a;',
		'icomoon-papers1': '&#xe90a;',
		'icomoon-documents2': '&#xe90a;',
		'icomoon-files-empty': '&#xe907;',
		'icomoon-files': '&#xe907;',
		'icomoon-documents': '&#xe907;',
		'icomoon-papers': '&#xe907;',
		'icomoon-pages': '&#xe907;',
		'icomoon-warning': '&#xe901;',
		'icomoon-link': '&#xe9cb;',
		'icomoon-google': '&#xea88;',
		'icomoon-yahoo': '&#xeabb;',
		'icomoon-windows8': '&#xeac2;',
		'icomoon-linkedin': '&#xeac9;',
		'icomoon-attachment': '&#xe9cd;',
		'icomoon-facebook2': '&#xe607;',
		'icomoon-search': '&#xe986;',
		'icomoon-zoom_out': '&#xe903;',
		'icomoon-zoom_in': '&#xe904;',
		'icomoon-zoom-out': '&#xe905;',
		'icomoon-zoom-in': '&#xe906;',
		'icomoon-aol': '&#xe900;',
		'icomoon-first': '&#x30;',
		'icomoon-last': '&#x31;',
		'icomoon-go-previous': '&#x32;',
		'icomoon-go-next': '&#x33;',
		'icomoon-iconmonstr-magnifier-6-icon': '&#x21;',
		'icomoon-iconmonstr-magnifier-7-icon': '&#x22;',
		'icomoon-document': '&#x23;',
		'icomoon-documents1': '&#x24;',
		'icomoon-reload-CW': '&#x25;',
		'icomoon-reload-CCW': '&#x26;',
		'icomoon-list': '&#x27;',
		'icomoon-article': '&#x28;',
		'icomoon-book-alt2': '&#x29;',
		'icomoon-document-alt-stroke': '&#x2a;',
		'icomoon-zoomin': '&#x2c;',
		'icomoon-zoomout': '&#x2d;',
		'icomoon-triangle': '&#x2b;',
		'icomoon-triangle2': '&#x2e;',
		'icomoon-gridview': '&#x36;',
		'icomoon-scroll': '&#x2f;',
		'icomoon-twitter': '&#x37;',
		'icomoon-pinterest': '&#x38;',
		'icomoon-facebook': '&#x39;',
		'icomoon-bookmark': '&#x3a;',
		'icomoon-upload': '&#x3b;',
		'icomoon-download': '&#x3c;',
		'icomoon-email': '&#x3d;',
		'icomoon-feed': '&#x3e;',
		'icomoon-info-circle': '&#x3f;',
		'icomoon-locked': '&#x40;',
		'icomoon-document-2': '&#x41;',
		'icomoon-arrow-right': '&#x42;',
		'icomoon-cancel': '&#x43;',
		'icomoon-arrow-left': '&#x44;',
		'icomoon-enter': '&#x45;',
		'icomoon-help': '&#x46;',
		'icomoon-share': '&#x47;',
		'icomoon-share2': '&#x48;',
		'icomoon-fullscreen': '&#x49;',
		'icomoon-fullscreen-exit': '&#x4a;',
		'icomoon-checkmark': '&#x4b;',
		'icomoon-eye': '&#x4c;',
		'icomoon-flash': '&#x4e;',
		'icomoon-arrow-up': '&#x4f;',
		'icomoon-arrow-down': '&#x50;',
		'icomoon-reorder': '&#xf0c9;',
		'icomoon-signup': '&#xe000;',
		'icomoon-bell-slash-o': '&#xe90b;',
		'icomoon-bell-slash': '&#xe90c;',
		'icomoon-bell-o': '&#xe90d;',
		'icomoon-bell': '&#xe90e;',
		'icomoon-search-minus': '&#xe908;',
		'icomoon-search-plus': '&#xe909;',
		'icomoon-exclamation-triangle': '&#xe902;',
		'icomoon-twitter2': '&#xe600;',
		'icomoon-google-plus': '&#xe601;',
		'icomoon-tumblr': '&#xe602;',
		'icomoon-vk': '&#xe603;',
		'icomoon-reddit': '&#xe604;',
		'icomoon-pinterest-p': '&#xe605;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icomoon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
