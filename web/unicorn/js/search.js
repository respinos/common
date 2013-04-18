head.ready(function() {

    // var $form = $(".search-form").filter(function() {
    //   return !($(this).css('visibility') == 'hidden' || $(this).css('display') == 'none');
    // })
    var $form = $(".search-form");
    var $hidden = $form.filter(function() {
      return ($(this).css('visibility') == 'hidden');
    })
    if ( $hidden.length ) {
      $hidden.css({ height : $hidden.height() }).children().remove();
      $form = $form.not($hidden);
    }

    if ( $form.length == 0 ) {
      // punt!
      return;
    }

    var $tabs = $form.find(".search-tabs input[type=radio]");
    var $input = $form.find("input.search-input-text");
    var $select = $form.find("select");
    var $select_div = $form.find(".search-input-options");

    $select.find("option[data-target=ls]").remove();

    var setup = {}
    setup.ls = function() {
        $(".search-catalog-link").hide();
        $(".search-advanced-link").show();
        // $select.find("option[data-target=ls]").attr({ disabled : null });
        $select_div.hide();
        $input.attr("placeholder", 'Search words about or within the items');
    };

    setup.catalog = function() {
        $(".search-catalog-link").show();
        $(".search-advanced-link").hide();
        // $select.find("option[data-target=ls]").attr({ disabled : 'disabled' });
        var $check = $select.find("option:selected[disabled]");
        if ( $check.length ) {
          $check.attr("selected", null);
          $select.find("option[value=all]").attr('selected', 'selected');
        }
        $select_div.show();
        $input.attr("placeholder", 'Search words about the items');
    }

    $tabs.click(function() {
        var selected = $(this).val();
        setup[selected]();
    })

    // what's the initial state?
    // --- if we need to switch the default: if $input.val() == '', 
    // --- find the "catalog" radio button and select it.
    var selected = $tabs.filter(":checked").val();
    setup[selected]();


  // add event handler for submit to check for empty query or asterisk
    $form.submit(function(event) 
         {

           //check for blank or single asterisk
           var query = $(this).find("input[name=q1]").val();
           query = $.trim(query);
           if (query === '')
           {
             bootbox.alert("Please enter a search term.");
             return false;
           }
           /**  Bill says go ahead and forward a query with an asterisk   ######
           else if (query === '*')
           {
             change q1 to blank
             $("#q1-input").val("")
             $(".search-form").submit(); 
           }
           ##################################################################**/
           else
           {
             return true;
           }

     } );

})
