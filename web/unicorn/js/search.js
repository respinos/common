head.ready(function() {

    var $form = $(".search-form").filter(function() {
      return !($(this).css('visibility') == 'hidden' || $(this).css('display') == 'none');
    })
    if ( $form.length == 0 ) {
      // punt!
      return;
    }

    var $tabs = $form.find(".search-tabs input[type=radio]");
    var $input = $form.find("input.search-input-text");
    var $select = $form.find("select");

    var setup = {}
    setup.ls = function() {
        $(".search-catalog-link").hide();
        $(".search-advanced-link").show();
        $select.find("option[data-target=ls]").attr({ disabled : null });
        $input.attr("placeholder", 'Search words about or within the items');
    };

    setup.catalog = function() {
        $(".search-catalog-link").show();
        $(".search-advanced-link").hide();
        $select.find("option[data-target=ls]").attr({ disabled : 'disabled' });
        var $check = $select.find("option:selected[disabled]");
        if ( $check.length ) {
          $check.attr("selected", null);
          $select.find("option[value=all]").attr('selected', 'selected');
        }
        $input.attr("placeholder", 'Search words about the items');
    }

    $tabs.click(function() {
        var selected = $(this).val();
        setup[selected]();
    })

    // what's the initial state?
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
