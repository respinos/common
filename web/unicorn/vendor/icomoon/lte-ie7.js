/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icomoon-first' : '&#x21;',
			'icomoon-last' : '&#x22;',
			'icomoon-go-previous' : '&#x23;',
			'icomoon-go-next' : '&#x24;',
			'icomoon-iconmonstr-magnifier-6-icon' : '&#x25;',
			'icomoon-iconmonstr-magnifier-7-icon' : '&#x26;',
			'icomoon-document' : '&#x27;',
			'icomoon-documents' : '&#x28;',
			'icomoon-reload-CW' : '&#x29;',
			'icomoon-reload-CCW' : '&#x2a;',
			'icomoon-list' : '&#x2b;',
			'icomoon-article' : '&#x2c;',
			'icomoon-book-alt2' : '&#x2d;',
			'icomoon-document-alt-stroke' : '&#x2e;',
			'icomoon-zoom-in' : '&#x2f;',
			'icomoon-zoom-out' : '&#x30;',
			'icomoon-triangle' : '&#x31;',
			'icomoon-triangle-2' : '&#x32;',
			'icomoon-grid-view' : '&#x33;',
			'icomoon-scroll' : '&#x34;',
			'icomoon-twitter' : '&#x35;',
			'icomoon-pinterest' : '&#x36;',
			'icomoon-facebook' : '&#x37;',
			'icomoon-bookmark' : '&#x38;',
			'icomoon-upload' : '&#x39;',
			'icomoon-download' : '&#x3a;',
			'icomoon-email' : '&#x3b;',
			'icomoon-feed' : '&#x3c;',
			'icomoon-info-circle' : '&#x3d;',
			'icomoon-locked' : '&#x3e;',
			'icomoon-document-2' : '&#x3f;',
			'icomoon-arrow-right' : '&#x40;',
			'icomoon-cancel' : '&#x41;',
			'icomoon-arrow-left' : '&#x42;',
			'icomoon-enter' : '&#x43;',
			'icomoon-help' : '&#x44;',
			'icomoon-share' : '&#x45;',
			'icomoon-share-2' : '&#x46;',
			'icomoon-fullscreen' : '&#x47;',
			'icomoon-fullscreen-exit' : '&#x48;',
			'icomoon-checkmark' : '&#x49;',
			'icomoon-eye' : '&#x4a;',
			'icomoon-flash' : '&#x4b;',
			'icomoon-arrow-up' : '&#x4c;',
			'icomoon-arrow-down' : '&#x4d;',
			'icomoon-reorder' : '&#x4e;',
			'icomoon-signup' : '&#x4f;'
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