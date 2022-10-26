head.ready(function() {

  var $form = $("#ht-search-form");
  if ( ! $form.length ) { return ; }

  var $header = $form.parents(".container-header");

  var is_search_app = $("html").data('use') == 'search';
  var inited = false;

  var $input = $form.find("input.search-input-text");
  var $input_label = $form.find("label[for='q1-input']");
  var $select = $form.find(".control-searchtype");
  var $search_target = $form.find(".search-target");
  var $ft = $form.find("span.funky-full-view");

  var $ft_check = $("html").data('ft');

  const allItems = $('[aria-labelledby=view-all]').attr('aria-checked');

  var _setup = {};
  _setup.ls = function() {
      $(".ht-search-form .control-searchtype").hide();
      $(".ht-search-form input.search-input-text").attr('placeholder', 'Search words about or within the items');
      $(".ht-search-form label[for='q1-input']").text('Search full-text index');
      // $(".ht-search-form .global-search-ft").hide();
      $("input[name=ft]").attr('checked', 'checked');
      if (allItems == 'true') {
        $("input[name=ft]").attr('checked', null);
      } else {
        $("input[name=ft]").attr('checked', 'checked');
      }
      if ( inited ) {
        HT.update_status("Search will use the full-text index.");
      }
  }

  _setup.catalog = function() {
      $(".ht-search-form .control-searchtype").show();
      $(".ht-search-form input.search-input-text").attr('placeholder', 'Search words about the items');
      $(".ht-search-form label[for='q1-input']").text('Search catalog index');
      // $(".ht-search-form .global-search-ft").hide();
      if (allItems == 'true') {
        $("input[name=ft]").attr('checked', null);
      } else {
        $("input[name=ft]").attr('checked', 'checked');
      }
      if ( inited ) {
        HT.update_status("Search will use the catalog index; use Shift + Tab to limit your search to a selection of fields.");
      }
  }

  var _handler = {};
  _handler.ls = function(formData) {
    let search_url;
    let submitData = new URLSearchParams();
    submitData.set('q1', formData.get('q1'));
    submitData.set('field1', 'ocr');
    submitData.set('a', 'srchls');
    if (formData.get('ft') == 'ft') {
      submitData.set('ft', 'ft');
      submitData.set('lmt', 'ft');
    }
    search_url = `//${HT.service_domain}`;
    search_url += `/cgi/ls?`;
    search_url += submitData.toString();
    location.href = search_url;
  }

  _handler.catalog = function(formData) {
    let search_url;
    let submitData = new URLSearchParams();

    let searchtype = formData.get('searchtype');
    if ( searchtype == 'isbn' ) { searchtype = 'isn'; }
    submitData.set('lookfor', formData.get('q1'));
    submitData.set('searchtype', searchtype);
    if ( formData.get('ft') == 'ft' ) {
      submitData.set('ft', 'ft');
      submitData.set('setft', 'true');
    } else {
      submitData.set('ft', '');
      submitData.set('setft', 'false');
    }

    search_url = `//${HT.catalog_domain}`;
    search_url += `/Search/Home?`;
    search_url += submitData.toString();
    location.href = search_url;
  }

  var target = $search_target.find("input:checked").val();
  _setup[target]();
  inited = true;

  var prefs = HT.prefs.get();
  if ( $ft == null && ! is_search_app && prefs.search && prefs.search.ft ) {
    console.log("AHOY AHOY SEARCH FORM");
      $("input[name=ft]").attr('checked', 'checked');
  }

  // $("body").on('change', '.ht-search-form .control-search-type input[type="radio"]', function(e) {
  $("body").on('change', '.ht-search-form .search-target input[type="radio"]', function(e) {
      target = this.value;
      _setup[target]();
      HT.analytics.trackEvent({ label : "-", category : "HT Search", action : target });
  })

  var $action = $("nav .action-search-hathitrust");
  var $clone; var $dialog;
  $action.on('click', function() {
    if ( $dialog === undefined ) {
      $dialog = $(`
        <div class="modal micromodal-slide" id="search-modal" aria-hidden="true">
          <div class="modal__overlay" tabindex="-1" data-micromodal-close="true">
            <div class="modal__container modal__container--square" role="dialog" aria-modal="true" aria-labelledby="search-modal-title">
              <form action="//${HT.service_domain}/cgi/ls/one" method="GET" role="search" class="ht-search-form">
                <div class="modal__header">
                  <h2 class="modal__title" id="search-modal-title">
                    Search HathiTrust
                  </h2>
                  <button class="modal__close" aria-label="Close modal" data-micromodal-close="true"></button>
                </div>
                <div class="modal__content" id="search-modal-content">
                </div>
                <div class="modal__footer">
                  <button class="modal__btn btn" data-micromodal-close="true" aria-label="Close modal">Close</button>
                  <button class="modal__btn btn btn-primary">Search</button>
                </div>
              </form>
            </div>
          </div>          
        </div>
      `);
      $("body").append($dialog);
    }
    var $content = $dialog.find("#search-modal-content");
    $content.children().remove();
    $content.append($form.children().clone());
    $content.find("#action-search-hathitrust").parent().parent().remove();
    $content.find("#option-full-text-search").attr('id', 'option-full-text-search-2');
    $content.find("#option-catalog-search").attr('id', 'option-catalog-search-2');
    $content.find('label.search-label-full-text').attr('for', 'option-full-text-search-2');
    $content.find("label.search-label-catalog").attr('for', 'option-catalog-search-2');
    $content.find("label[for='global-search-ft']").attr('for', 'global-search-ft-2');
    $content.find('#global-search-ft').attr("id", 'global-search-ft-2');
    var $input_modal = $content.find("input[type=text]");
    $input_modal.on('keyup', function() {
      $input.val($input_modal.val());
    })
    // $dialog.find(".modal__container").remove("form").append($form.clone(true));
    bootbox.show($dialog.get(0), {
        onShow: function(modal) {
            $input.focus();
        }
    });
  })

  var _resizeTimer;
  var _resizer = function() {
    var active = bootbox.active();
    if ( $header.is(":visible") && active && active.modal.getAttribute('id') == 'search-modal' ) {
      bootbox.close();
    } else {
      /* NOP */
    }
  }
  $(window).on('resize', function() {
      if ( _resizeTimer ) { clearTimeout(_resizeTimer); }
      _resizeTimer = setTimeout(_resizer, 500);
  });

  setTimeout(_resizer, 500);

  $("#ht-search-form").addClass('ht-search-form');

  // add event handler for submit to check for empty query or asterisk
  $("body").on('submit', '.ht-search-form', function(event)
       {

          event.preventDefault();

          HT.beforeUnloadTimeout = 15000;
          var $form = $(this);

          if ( ! this.checkValidity() ) {
              this.reportValidity();
              return false;
          }

         //check for blank or single asterisk
         var $input = $(this).find("input[name=q1]");
         var query = $input.val();
         query = $.trim(query);
         if (query === '')
         {
           alert("Please enter a search term.");
           $input.trigger('blur');
           return false;
         }
         // // *  Bill says go ahead and forward a query with an asterisk   ######
         // else if (query === '*')
         // {
         //   // change q1 to blank
         //   $("#q1-input").val("")
         //   $(".search-form").submit();
         // }
         // ##################################################################*
         else
         {

          // save last settings
          var searchtype = ( target == 'ls' ) ? 'all' : $form.find("select").val();
          // this won't set ft because there won't be a checkbox
          //HT.prefs.set({ search : { ft : $form.find("input[name=ft]:checked").length > 0, target : target, searchtype: searchtype }})
          HT.prefs.set({ search : { target : target, searchtype: searchtype }})

          _handler[target](new FormData($form.get(0)));

          return false;
         }

   } );

})
