/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icomoon-first' : '&#x30;',
			'icomoon-last' : '&#x31;',
			'icomoon-go-previous' : '&#x32;',
			'icomoon-go-next' : '&#x33;',
			'icomoon-iconmonstr-magnifier-6-icon' : '&#x21;',
			'icomoon-iconmonstr-magnifier-7-icon' : '&#x22;',
			'icomoon-document' : '&#x23;',
			'icomoon-documents' : '&#x24;',
			'icomoon-reload-CW' : '&#x25;',
			'icomoon-reload-CCW' : '&#x26;',
			'icomoon-list' : '&#x27;',
			'icomoon-article' : '&#x28;',
			'icomoon-book-alt2' : '&#x29;',
			'icomoon-document-alt-stroke' : '&#x2a;',
			'icomoon-zoom-in' : '&#x2c;',
			'icomoon-zoom-out' : '&#x2d;',
			'icomoon-triangle' : '&#x2b;',
			'icomoon-triangle-2' : '&#x2e;',
			'icomoon-grid-view' : '&#x36;',
			'icomoon-scroll' : '&#x2f;',
			'icomoon-twitter' : '&#x37;',
			'icomoon-pinterest' : '&#x38;',
			'icomoon-facebook' : '&#x39;',
			'icomoon-bookmark' : '&#x3a;',
			'icomoon-upload' : '&#x3b;',
			'icomoon-download' : '&#x3c;',
			'icomoon-email' : '&#x3d;',
			'icomoon-feed' : '&#x3e;',
			'icomoon-info-circle' : '&#x3f;',
			'icomoon-locked' : '&#x40;',
			'icomoon-document-2' : '&#x41;',
			'icomoon-arrow-right' : '&#x42;',
			'icomoon-cancel' : '&#x43;',
			'icomoon-arrow-left' : '&#x44;',
			'icomoon-enter' : '&#x45;',
			'icomoon-help' : '&#x46;',
			'icomoon-share' : '&#x47;',
			'icomoon-share-2' : '&#x48;',
			'icomoon-fullscreen' : '&#x49;',
			'icomoon-fullscreen-exit' : '&#x4a;',
			'icomoon-checkmark' : '&#x4b;',
			'icomoon-eye' : '&#x4c;',
			'icomoon-flash' : '&#x4e;',
			'icomoon-arrow-up' : '&#x4f;',
			'icomoon-arrow-down' : '&#x50;',
			'icomoon-reorder' : '&#xf0c9;',
			'icomoon-signup' : '&#xe000;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icomoon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};