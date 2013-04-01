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


})