/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icomoon-first' : '&#xe000;',
			'icomoon-last' : '&#xe001;',
			'icomoon-go-previous' : '&#xe002;',
			'icomoon-go-next' : '&#xe003;',
			'icomoon-iconmonstr-magnifier-6-icon' : '&#xe004;',
			'icomoon-iconmonstr-magnifier-7-icon' : '&#xe005;',
			'icomoon-document' : '&#xe006;',
			'icomoon-documents' : '&#xe007;',
			'icomoon-reload-CW' : '&#xe008;',
			'icomoon-reload-CCW' : '&#xe009;',
			'icomoon-list' : '&#xe00a;',
			'icomoon-article' : '&#xe00b;',
			'icomoon-book-alt2' : '&#xe00c;',
			'icomoon-document-alt-stroke' : '&#xe00d;',
			'icomoon-zoom-in' : '&#xe00e;',
			'icomoon-zoom-out' : '&#xe00f;',
			'icomoon-triangle' : '&#xe010;',
			'icomoon-triangle-2' : '&#xe011;',
			'icomoon-grid-view' : '&#xe012;',
			'icomoon-scroll' : '&#xe013;',
			'icomoon-twitter' : '&#xe014;',
			'icomoon-pinterest' : '&#xe015;',
			'icomoon-facebook' : '&#xe016;',
			'icomoon-bookmark' : '&#xe017;',
			'icomoon-upload' : '&#xe018;',
			'icomoon-download' : '&#xe019;',
			'icomoon-email' : '&#xe01a;',
			'icomoon-feed' : '&#xe01b;',
			'icomoon-info-circle' : '&#xe01c;',
			'icomoon-locked' : '&#xe01d;',
			'icomoon-document-2' : '&#xe01e;',
			'icomoon-arrow-right' : '&#xe01f;',
			'icomoon-cancel' : '&#xe020;',
			'icomoon-arrow-left' : '&#xe021;',
			'icomoon-enter' : '&#xe022;',
			'icomoon-help' : '&#xe023;',
			'icomoon-share' : '&#xe024;',
			'icomoon-share-2' : '&#xe025;',
			'icomoon-fullscreen' : '&#xe026;',
			'icomoon-fullscreen-exit' : '&#xe027;',
			'icomoon-checkmark' : '&#xe028;',
			'icomoon-eye' : '&#xe029;',
			'icomoon-flash' : '&#xe02a;',
			'icomoon-arrow-up' : '&#xe02b;',
			'icomoon-arrow-down' : '&#xe02c;',
			'icomoon-reorder' : '&#xe02d;',
			'icomoon-signup' : '&#xe02f;'
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