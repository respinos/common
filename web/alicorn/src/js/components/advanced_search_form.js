head.ready(function () {
  var $form = $(".advanced-search-form");
  if (!$form.length) {
    return;
  }

  jQuery.expr[":"].icontains = function (a, i, m) {
    return (
      (a.textContent || a.innerText || "")
        .toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0
    );
  };

  var update_toggle_message = function ($toggle, count) {
    $toggle.data("message", `Show only selected options (${count})`);
    if (!$toggle.data("state")) {
      $toggle.find("span").text($toggle.data("message"));
    }
  };

  var update_selected_count = function ($items, $toggle, toggle) {
    var count = $items.find("input:checked").length;
    var num_visible = $items.find("input:visible").length;
    update_toggle_message($toggle, count);
    if (count == 0 || $items.legnth == num_visible) {
      $toggle.hide();
    } else {
      $toggle.show();
      if (toggle && count > 0) {
        $toggle.click();
      }
    }
  };

  var filter_items = function ($items, value) {
    if (value == "") {
      $items.css({ display: "list-item" }); // .find("input").attr('tabindex', -1);
    } else {
      $items
        .find("label:not(:icontains(" + value + "))")
        .parent()
        .css({ display: "none" });
      $items
        .find("label:icontains(" + value + ")")
        .parent()
        .css({ display: "list-item" });
      // $items.find("input[type=checkbox]:not(:checked):hidden").attr("tabindex", -1);
      // $items.find("input[type=checkbox]:visible").attr("tabindex", 0);
    }
  };

  $(".multiselect").each(function () {
    var $container = $(this);
    var $input = $container.find("input.multiselect-search");
    var $list = $container.find(".multiselect-options");
    var $items = $list.find("li");
    var $toggle = $container.find(".multiselect-show-checked-toggle");

    // disable the tabindex
    $items.find("input").attr("tabindex", "-1");
    $list.attr("tabindex", "0");
    $list.css({ position: "relative" });

    // // 2020-12-09 - chrome is triggering focusin on click, before the
    // // targeted input can catch the click
    // $container.on('focusin', 'fieldset', function(event) {
    //   if ( event.target.tagName == 'FIELDSET' && $input.filter(":focus").length == 0 ) {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     setTimeout(function() {
    //       $items.filter(":visible").first().find("input").focus();
    //     })
    //   }
    // })

    $list.on("keyup", "input", function (event) {
      var $possible = $items.filter(":visible");
      if (event.key == "ArrowDown" || event.key == "ArrowUp") {
        var delta = event.key == "ArrowDown" ? 1 : -1;
        var $current = $(document.activeElement).parent("li");
        var index = $possible.index($current);
        var nextIndex = (index + delta) % $possible.length;
        if (nextIndex < 0) {
          nextIndex = $possible.length - 1;
        }
        var $next = $possible.slice(nextIndex, nextIndex + 1).find("input");
        $next.focus(); // $next.parent().get(0).scrollIntoView();
        // $list.get(0).scrollBy(0, -( $next.parent().height() * 1.125 ));
      }
    });

    $list.on("keydown", function (event) {
      if (
        event.target == $list.get(0) &&
        event.key == "Tab" &&
        !event.shiftKey
      ) {
        event.preventDefault();
        console.log("-- bogart");
        $items.filter(":visible").first().find("input").focus();
      }
    });

    $list.on("keydown", "input", function (event) {
      if (event.key == "Tab" && event.shiftKey) {
        event.preventDefault();
        event.stopPropagation();
        if (event.shiftKey) {
          $list.prevAll(":tabbable").focus();
        } else {
          $list.nextAll(":tabbable").focus();
        }
      }
    });

    $input.on("keyup", function (event) {
      var value = $(this).val();
      filter_items($items, value);
    });

    var update_toggle_button = function ($toggle, state) {
      if (state != null) {
        $toggle.data("state", state);
      }
      var $span = $toggle.find("span");
      if ($toggle.data("state")) {
        $span.text("Show all options");
      } else {
        $span.text($toggle.data("message"));
      }
    };

    // var $last_selected;
    // $toggle.on('click', function(event) {
    //   $toggle.data('state', ! $toggle.data('state'));
    //   if ( $toggle.data('state') ) {
    //     $last_selected = $items.filter(":visible");
    //     $items.css({ display: 'none' });
    //     $items.find("input:checked").parent().css({ display: 'list-item' });
    //     $input.attr("disabled", "disabled");
    //   } else {
    //     $items.filter(":visible").css({ display: 'none' });
    //     $last_selected.css({ display: 'list-item' });
    //     $input.attr("disabled", null);
    //   }
    //   update_toggle_button($toggle);
    // })

    $toggle.on("click", function (event) {
      $toggle.data("state", !$toggle.data("state"));
      if ($toggle.data("state")) {
        // show only selected
        $items.css({ display: "none" });
        $items.find("input:checked").parent().css({ display: "list-item" });
        $input.attr("disabled", "disabled");
      } else {
        filter_items($items, $.trim($input.val()));
        $input.attr("disabled", null);
      }
      update_toggle_button($toggle);
    });

    filter_items($items, $input.val());
    update_selected_count($items, $toggle, true);

    $container.on("click", "input[type=checkbox]", function (event) {
      // update the toggle
      var $this = $(this);
      update_selected_count($items, $toggle);
      // $this.attr('tabindex', $this.is(":checked") ? '0' : '-1');
      if (
        !$this.is(":checked") &&
        $items.filter(":visible:checked").length == 0
      ) {
        // de-selected the last visible item, so un-filter
        $input.attr("disabled", null);
        filter_items($items, $input.val());
        update_toggle_button($toggle, false);
      }
    });
  });

  // -- DATE RANGE
  var $date_range_input = $(".date-range-input input[type=radio]");

  var update_date_range = function (value) {
    $(".date-range-input-text").hide();
    $(`.date-range--${value}`).show();
  };

  $date_range_input.on("change", function (event) {
    update_date_range($(this).val());
  });

  var init_date_range =
    $date_range_input.filter(":checked").length == 0
      ? "between"
      : $date_range_input.filter(":checked").val();
  update_date_range(init_date_range);

  $(".action-add-clause").on("click", function (event) {
    event.preventDefault();
    $(".group-boolean-container").addClass("active");
    // HT.update_status("You've added a another group of search fields.");
  });

  var show_error_message = function ($container, $focus, message) {
    // var $alert = $(`<div class="alert alert-error alert-block" role="alert"><p>${message}</p></div>`);
    // if ( $container.is("fieldset") ) {
    //   $alert.insertAfter($container.children("legend"));
    // } else {
    //   $alert.insertBefore($container.children(":first"));
    // }
    // HT.update_status(message);
    var $alert = $container.find("[role='alert']");
    $alert.html(`<p>${message}</p>`);
    $focus.focus();
  };

  var check_for_query = function () {
    if ($form.data("ignore-empty-query")) {
      return true;
    }
    var query_exists = false;
    var $inputs = $form.find(".advanced-input-container input[type=text]");
    $inputs.each(function (index, input) {
      var value = $.trim($(input).val());
      if (value != "") {
        query_exists = true;
      }
    });

    if (!query_exists) {
      show_error_message(
        $("form > fieldset:first"),
        $inputs.first(),
        "A search term is required to submit an advanced search."
      );
    }

    return query_exists;
  };

  var check_date_range = function () {
    var is_valid = true;
    var $inputs = $form.find(".date-range-input-text:visible");
    $inputs.each(function () {
      var $this = $(this);
      var value = $.trim($this.val());
      if (value) {
        // check to see this looks like a year?
        if (!value.match(/^\d+$/)) {
          show_error_message(
            $this.parents(".advanced-filter-inner-container"),
            $this,
            "Date of Publication must be between 0-9999."
          );
          is_valid = false;
          return;
        }
      }
    });

    if ($inputs.length == 2) {
      // the input class names are keyed to the radio buttons
      var $input_start = $inputs.filter(".date-range--after");
      var $input_end = $inputs.filter(".date-range--before");
      if ($input_start.val() > $input_end.val()) {
        show_error_message(
          $input_start.parents(".advanced-filter-inner-container"),
          $input_start,
          "The Start date must be less than the End date."
        );
        is_valid = false;
      }
    }

    return is_valid;
  };

  var clone_input = function ($this) {
    var $input = $('<input type="hidden" />');
    $input.val($this.val());
    $input.attr("name", $this.data("param") || $this.attr("name"));
    return $input;
  };

  var scroll_error_into_view = function () {
    $(".alert-error").get(0).scrollIntoView();
    $("html").get(0).scrollTop -= $(window).height() * 0.125;
  };

  //set up for unified advanced search box
  const paramCounts = {};

  const getParam = function (field, d = 0) {
    let idx = paramCounts[field] || d;
    idx += 1;
    paramCounts[field] = idx;
    return `${field}${idx}`;
  };

  const isFullTextQuery = function (formData) {
    for (var tuple of formData.entries()) {
      if (tuple[0] == "type[]" && tuple[1].indexOf("ocr") >= 0) {
        return true;
      }
    }
  };

  const convertToFullTextQuery = function (formData) {
    const submitData = new URLSearchParams();
    for (var tuple of formData.entries()) {
      let key = tuple[0];
      let value = tuple[1];
      if (key == "type[]") {
        submitData.set(getParam("field"), value);
      } else if (key == "lookfor[]") {
        submitData.set(getParam("q"), value);
      } else if (key == "bool[]") {
        submitData.set(getParam("op", 1), value);
      } else if (key == "ft") {
        if (value == "true") {
          submitData.set("lmt", "ft");
        }
      } else if (key == "yop") {
        submitData.set("yop", value);
      } else if (key == "fqrange-start-publishDateTrie-1") {
        submitData.set("pdate_start", value);
      } else if (key == "fqrange-end-publishDateTrie-1") {
        submitData.set("pdate_end", value);
      } else if (key == "fqor-publishDateTrie[]") {
        submitData.set("pdate", value);
      } else if (key == "fqor-language[]") {
        submitData.set("facet_lang", value);
      } else if (key == "fqor-format[]") {
        submitData.set("facet_format", value);
      }
    }
    return submitData;
  };

  $form.on("submit", function (event) {
    event.preventDefault();
    $("[role='alert']").empty();
    if (!check_for_query()) {
      return scroll_error_into_view();
    }
    if (!check_date_range()) {
      return scroll_error_into_view();
    }

    //not _really sure_ where to put this function that builds the FormData object

    const formData = new FormData(event.target);
    let req;
    let queryType = "catalog";
    if (isFullTextQuery(formData)) {
      queryType = "fulltext";
      req = convertToFullTextQuery(formData);
    } else {
      req = new URLSearchParams(formData);
    }
    // console.log(queryType, "->", req.toString());
    let alertMessage = `${queryType} -> ${req.toString()}`;
    alert(alertMessage);

    // assemble form
    var $proxy = $("<form style='display: none'></form>");
    $proxy.attr("action", $form.attr("action"));
    $form.children("input[type=hidden]").each(function () {
      $proxy.append($(this).clone());
    });

    var $fieldsets;
    if ($form.find("fieldsets.group:visible").length) {
      $fieldsets = $form.find("fieldset.group:visible fieldset.clause");
    } else {
      $fieldsets = $form.find("fieldset.clause");
    }

    $fieldsets.each(function () {
      var $fieldset = $(this);
      var $input = $fieldset.find("input[type=text]");
      if ($.trim($input.val())) {
        // have input
        $proxy.append($input.clone());
        $fieldset.find("select").each(function () {
          var $select = $(this);
          $proxy.append(clone_input($select));
        });
        $fieldset.find(".advanced-boolean-clause:checked").each(function () {
          $proxy.append(clone_input($(this)));
        });
      }
    });

    // clone the group clause if present
    $proxy.append($form.find(".group-boolean:visible input:checked").clone());

    $form
      .find(
        ".advanced-search-filter-container input[type=radio]:checked:visible"
      )
      .each(function () {
        $proxy.append(clone_input($(this)));
      });

    $form
      .find(".advanced-search-filter-container input[type=checkbox]:checked")
      .each(function () {
        $proxy.append(clone_input($(this)));
      });

    $form.find(".date-range-input-text:visible").each(function () {
      var $this = $(this);
      if (!$.trim($this.val())) {
        return;
      }
      $proxy.append(clone_input($this));
    });

    $("body").append($proxy);
    $proxy.submit();
  });
});
