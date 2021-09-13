head.ready(function() {

    if ( $(".nav .nav-link").length > 0 ) {
        return; 
    }

    var DISMISS_EVENT = (window.hasOwnProperty &&
                window.hasOwnProperty('ontouchstart')) ?
                    'touchstart' : 'mousedown';


    var $menus = $("nav a.menu");
    var $about_menu = $("#about-menu");
    var $burger_menu = $("#burger-menu");

    $menus.on('click',  function(e) {
      var $this = $(this);
      if ( $this.css('opacity') == "0.75" ) { return ; }
      var expanded = ( $this.attr('aria-expanded') || 'false' ) == 'false' ? true : false;
      $this.attr("aria-expanded", expanded);
      $this.next().find("a[aria-expanded]").attr('aria-expanded', false)
    })

    $menus.each(function(index) {
        var $menu = $(this);
        var $container = $menu.parent();
        var $popup = $menu.next("ul");
        $container.data('menu', $menu);
        $container.data('selected_idx', -1);

        $container.on('keydown', function(event) {

            var $items = $popup.find("a[aria-hidden != 'true']");

            if ( $container.data('menu').attr('aria-expanded') == 'false' ) {
                return;
            }

            var code = event.code;
            var selected_idx = $container.data('selected_idx');
            var delta = 0;
            if ( code == 'ArrowDown' ) {
                delta = 1;
            } else if ( code == 'ArrowUp' ) {
                delta = -1;
            } else if ( code == 'Escape' || code == 'Tab' ) {
                $menu.attr('aria-expanded', false);
                $container.data('selected_index', -1);
                return;
                // toggle($popup, $menu, $link);
            } else {
                $container.data('selected_index', -1);
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            if ( delta == 0 ) { console.log("AHOY KEYCODE", code); return ; }
            event.stopPropagation();
            selected_idx = ( selected_idx + delta ) % $items.length;
            if ( selected_idx < 0 ) { selected_idx = $items.length - 1 ; }

            $selected = $items.slice(selected_idx, selected_idx + 1);
            $selected.focus();
            // console.log("AHOY MENU KEYDOWN", selected_idx, $selected);
            $container.data('selected_idx', selected_idx);
        })
    })

    $(document).on('click', function(event) {
        var $target = $(event.target);
        if ( ! $target.parents(".menu").length ) {
            $menus.attr("aria-expanded", false);
            return;
        }
    })

    var _resizeTimer;
    var _resizer = function() {
        $about_menu.attr('aria-hidden', $burger_menu.is(":visible"));
        if ( _resizeTimer ) { clearTimeout(_resizeTimer); _resizeTimer = null; }
    }
    $(window).on('resize', function() {
        if ( _resizeTimer ) { clearTimeout(_resizeTimer); }
        _resizeTimer = setTimeout(_resizer, 100);
    });

    setTimeout(_resizer, 500);

});
