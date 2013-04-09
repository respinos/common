head.ready(function() {

    var $form = $(".search-form");
    var $tabs = $form.find(".search-tabs input[type=radio]");
    var $input = $form.find("input.search-input-text");

    var setup = {}
    setup.ls = function() {
        $(".search-catalog-link").hide();
        $(".search-advanced-link").show();
        $input.attr("placeholder", 'Search words about or within the items');
    };

    setup.catalog = function() {
        $(".search-catalog-link").show();
        $(".search-advanced-link").hide();
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
           var query = $(this).find($input).val();
           query = $.trim(query);
           if (query === '')
           {
             bootbox.alert("Please enter a search term.");
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
             $(".search-form").submit(); 
           }

           event.preventDefault();
     } );

})
