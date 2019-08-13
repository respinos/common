head.ready(function() {
  if ( ! $("html").data('use') == 'search' ) { return; }

  var $body = $("body");
  var $sidebar = $("#sidebar");
  var $section = $("#section");

  var get_href = function(href) {
    if ( href.indexOf(location.host) < 0 ) {
      href = `${location.protocol}//${location.host}${href}`;
    }
    return href;
  }

  $sidebar.on('click keydown', '.show-all-button', function(event) {

    if ( event.type == 'keydown' && event.keyCode != 32 ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    var $this = $(this);
    var $list = $this.parent().parent();
    $list.toggleClass('filter-list--expanded');
  })

  $("body").on('click keydown', 'button[data-href],label[data-href]', function(event) {
    if ( event.type == 'keydown' && event.keyCode != 32 ) {
      return;
    }
    if ( this.tagName == 'SELECT' ) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    var href = get_href($(this).data('href'));

    location.href = href;
  })

  $sidebar.on('keydown', '[role="radio"]', function(event) {
    if ( event.type == 'keydown' && ! ( event.key == 'ArrowUp' || event.key == 'ArrowDown' ) ) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();

    var delta = 0;
    if ( event.key == 'ArrowUp' ) { delta = -1; }
    else { delta = 1; }

    var $this = $(this);
    var $group = $this.parents("[role=radiogroup]");
    var $items = $group.find("[role=radio]:not(:disabled)");
    var index = $items.index($this);
    var next_index = ( index + delta ) % $items.length;
    var $selected = $items.slice(next_index, next_index + 1);
    $selected.click();
    // $selected.get(0).focus();
  })

  $sidebar.on('click keydown', '.filter-group-toggle-show-button', function(event) {
    if ( event.type == 'keydown' && ! ( event.keyCode == 32 || event.key == 'Enter' )) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();

    var $this = $(this);
    $this.attr('aria-expanded', ! ( $this.attr('aria-expanded') == 'true' ));
    // and then update the icon
    var xlink_href;
    if ( $this.attr('aria-expanded') == 'true' ) {
      xlink_href = '#panel-expanded';
    } else {
      xlink_href = '#panel-collapsed';
    }
    $this.find("svg use").attr("xlink:href", xlink_href);
    $this.trigger('clicked');
  })

  $section.on('change', 'select[data-href]', function(event) {
    event.preventDefault();
    event.stopPropagation();

    var $this = $(this);
    var href = get_href($this.data('href'));
    var value = $this.val();
    location.href = href + value;
  })

});
