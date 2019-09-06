head.ready(function() {

    var DISMISS_EVENT = (window.hasOwnProperty &&
                window.hasOwnProperty('ontouchstart')) ?
                    'touchstart' : 'mousedown';


    var $menus = $("nav a.menu");
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
        var $items = $popup.find("a");
        $container.data('selected_idx', -1);

        $container.on('keydown', function(event) {
            var code = event.code;
            var selected_idx = $container.data('selected_idx');
            var delta = 0;
            if ( code == 'ArrowDown' ) {
                delta = 1;
            } else if ( code == 'ArrowUp' ) {
                delta = -1;
            } else if ( code == 'Escape' ) {
                $menu.attr('aria-expanded', false);
                // toggle($popup, $menu, $link);
            } else {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            if ( delta == 0 ) { console.log("AHOY KEYCODE", code); return ; }
            event.stopPropagation();
            selected_idx = ( selected_idx + delta ) % $items.length;
            console.log("AHOY MENU KEYDOWN", selected_idx);
            $selected = $items.slice(selected_idx, selected_idx + 1);
            $selected.focus();
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

    return;

    var $menus = $("nav ul > li:has(ul)");
    // var $menus = $("nav .menu");
    var $selected;

    // var toggle = function($popup, $menu, $link) {
    //     if ( $popup.data('state') == 'open' ) {
    //         $menu.removeClass("active");
    //         $popup.attr('aria-hidden', 'true');
    //         $link.focus();
    //         $popup.data('state', 'closed');
    //     } else {
    //         $menu.addClass("active");
    //         $popup.attr('aria-hidden', 'false');
    //         $popup.data('state', 'open');
    //     }
    // }

    var toggle = function($popup, $menu, $link) {
        if ( $popup.data('state') == 'open' ) {
            $menu.removeClass("active");
            $popup.attr('aria-hidden', 'true');
            $link.attr("aria-expanded", "false");
            $link.focus();
            $popup.data('state', 'closed');
        } else {
            $menu.addClass("active");
            $popup.attr('aria-hidden', 'false');
            $popup.data('state', 'open');
            $link.attr("aria-expanded", "true");
        }
    }

    $menus.each(function(index) {
        var $menu = $(this);
        $menu.find("li").each(function(lidx) {
            var $item = $(this);
            $item.attr('aria-role', 'presentation');
            $item.find("a").attr('aria-role', 'menuitem');
        })

        var $link = $menu.find("> a");
        var $popup = $menu.find("ul");
        var $items = $popup.find("a");
        $link.on('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            toggle($popup, $menu, $link);
        })

        $menu.data('selected_idx', -1);
        $menu.on('keydown', function(event) {
            var code = event.code;
            var selected_idx = $menu.data('selected_idx');
            var delta = 0;
            if ( code == 'ArrowDown' ) {
                delta = 1;
            } else if ( code == 'ArrowUp' ) {
                delta = -1;
            } else if ( code == 'Escape' ) {
                toggle($popup, $menu, $link);
            } else {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            if ( delta == 0 ) { console.log("AHOY KEYCODE", code); return ; }
            event.stopPropagation();
            selected_idx = ( selected_idx + delta ) % $items.length;
            console.log("AHOY MENU KEYDOWN", selected_idx);
            $selected = $items.slice(selected_idx, selected_idx + 1);
            $selected.focus();
            $menu.data('selected_idx', selected_idx);
        })
    })

});
