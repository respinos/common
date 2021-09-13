head.ready(function() {

    if ( $(".nav .nav-link").length > 0 ) {

        return; 
        
        var $nav = $("header nav");
        var $navUlEl = $("#nav");
        var $burgerMenuTriggerEl = $("#burger-menu-trigger");
        var $burgerMenu = $("#burger-menu");
        var $burgerMenuContainer = $("#burger-menu-container");

        var $aboutMenuTrigger = $("#about-menu");
        var $aboutMenuContainer = $("#about-menu-container");

        var toggleNav = function(target) {
            var mode = $nav.get(0).dataset.mode;
            if ( target === undefined  ) {
                target = mode == "small" ? "large" : "small";
            }
            if ( mode == target ) {
                return;
            }

            if ( target == 'small' ) {
                // $("li.movable").each((index, liEl) => {
                //     $burgerMenu.append(liEl);
                // })
                $burgerMenuContainer.css({ display: 'list-item' });
                $aboutMenuContainer.css({ display: 'none' });
                $("li.movable").css({ display: 'none' });
                // $aboutMenuTrigger.attr('disabled', 'disabled');
            } else {
                $burgerMenuContainer.css({ display: 'none' });
                $aboutMenuContainer.css({ display: 'list-item' });
                $("li.movable").css({ display: 'list-item' });

                // $("li.movable").each((index, liEl) => {
                //     $navUlEl.append(liEl);
                // })
                // $aboutMenuTrigger.attr("disabled", null);
            }

            $nav.get(0).dataset.mode = target;
        }

        const navTriggerWidth = 53 * 16;
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                console.log("--", entry, entry.target, entry.target.offsetWidth);
                const offsetWidth = entry.target.offsetWidth;
                if (offsetWidth >= navTriggerWidth) {
                    toggleNav("large");
                } else if (offsetWidth < navTriggerWidth) {
                    toggleNav("small");
                }
            }
        });
        resizeObserver.observe(document.querySelector('header'));

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
