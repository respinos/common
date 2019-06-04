head.ready(function() {
  HT.ctools = {}; // hah

  var toggle_checkbox = function($box, checked) {
    if ( checked == null ) { checked = ! ( $box.attr('aria-checked') == 'true' ); }
    $box.attr('aria-checked', checked);
    $box.find('svg > use').attr('xlink:href', checked ? '#checkbox-checked' : '#checkbox-empty');
    if ( $box == $select_all ) {
      $possible_selections.each(function() {
        var $possible = $(this);
        toggle_checkbox($possible, $select_all.attr("aria-checked") == 'true');
      })
    }
  }

  function summarize_results(params) {
      var $div = $(".mb-status");
      if ( $div.length ) { $div.remove(); }
      var status = 'alert-success';
      if ( params.result == 'ADD_ITEM_FAILURE' ) {
          status = 'alert-error';
      }
      if ( 1 || ! $div.length ) {
          $div = $('<div class="mb-status alert {STATUS}"></div>'.replace('{STATUS}', status)).insertAfter($toolbar).hide();
      }

      var collID = params.coll_id;
      var collName = params.coll_name;
      var collHref= '<a href="mb?a=listis;c=' + collID + '">' + collName + '</a>';
      var numAdded=params.NumAdded;
      var numFailed=params.NumFailed;
      var alertMsg;
      var msg;
      if ( params.result == 'ADD_ITEM_FAILURE' ) {
          msg = "Sorry; there was a problem adding these items to your collection.";
      } else if (numFailed > 0 ){
        msg = "numFailed items could not be added to your collection,\n " +  numAdded + " items were added to " + collHref;
      }
      else {
        //  var msg =  params.NumAdded + " items of " + params.NumSubmitted + " were added to " + collHref + " collection";
        if (numAdded >1){
          msg =  numAdded + " items were added to " + collHref;
        }
        else{
          msg =  numAdded + " item was added to " + collHref;
        }
      }

      $div.html(msg).show();
      add_item_to_collist(params);

      toggle_checkbox($select_all, false);
  }


  function submit_post(params, fn) {

      var non_ajax = { movit : true, delit : true, movitnc : true, editc : true, addc: true };

      if ( ! non_ajax[params.a] ) {
          params.page = 'ajax';
      }

      if ( params.page == 'ajax' ) {
          $.ajax({
              url : get_url(),
              data : $.param(params, true)
          }).done(function(data) {
              // console.log(data);
              var params = parse_line(data);
              $(".btn-loading").removeClass("btn-loading");
              summarize_results(params);
              if ( fn ) {
                  fn();
              }
          })
      } else {
          // extend with HT.params...
          var formdata = $.extend({}, $.url().param(), params);
          var $form = $("<form method='GET'></form>");
          $form.attr("action", get_url());

          $.each(formdata, function(name, values) {
            values = $.isArray(values) ? values : [ values ];
            $.each(values, function(index, value) {
              $("<input type='hidden' />").attr({ name : name }).val(value).appendTo($form);
            })
          })

          // _.each(_.keys(formdata), function(name) {
          //     var values = formdata[name];
          //     values = $.isArray(values) ? values : [ values ];
          //     _.each(values, function(value) {
          //         $("<input type='hidden' />").attr({ name : name }).val(value).appendTo($form);
          //     })
          // })
          $form.hide().appendTo("body");
          $form.submit();
      }
  }

  function edit_collection_metadata(args) {

      var options = $.extend({ creating : false, label : "Save Changes" }, args);

      var $block = $(
          '<form class="form-horizontal" action="mb">' +
              '<div class="control-group">' +
                  '<label class="control-label" for="edit-cn">Collection Name</label>' +
                  '<div class="controls">' +
                      '<input type="text" class="input-large" maxlength="100" name="cn" id="edit-cn" value="" placeholder="Your collection name" required />' +
                      '<span class="label counter" id="edit-cn-count">100</span>' +
                  '</div>' +
              '</div>' +
              '<div class="control-group">' +
                  '<label class="control-label" for="edit-desc">Description</label>' +
                  '<div class="controls">' +
                      '<textarea id="edit-desc" name="desc" rows="4" maxlength="255" class="input-large" placeholder="Add your collection description."></textarea>' +
                      '<span class="label counter" id="edit-desc-count">255</span>' +
                  '</div>' +
              '</div>' +
              '<div class="control-group">' +
                  '<label class="control-label">Is this collection <strong>Public</strong> or <strong>Private</strong>?</label>' +
                  '<div class="controls">' +
                      '<input type="radio" name="shrd" id="edit-shrd-0" value="0" checked="checked" > ' +
                      '<label class="radio inline" for="edit-shrd-0">' +
                          '<i class="icomoon icomoon-locked" aria-hidden="true"></i> ' +
                          'Private ' +
                      '</label>' +
                      '<input type="radio" name="shrd" id="edit-shrd-1" value="1" > ' +
                      '<label class="radio inline" for="edit-shrd-1">' +
                          'Public ' +
                      '</label>' +
                  '</div>' +
              '</div>' +
          '</form>'
      );

      if ( options.cn ) {
          $block.find("input[name=cn]").val(options.cn);
      }

      if ( options.desc ) {
          $block.find("textarea[name=desc]").val(options.desc);
      }

      if ( options.shrd != null ) {
          $block.find("input[name=shrd][value=" + options.shrd + ']').attr("checked", "checked");
      } else if ( ! HT.login_status.logged_in ) {
          $block.find("input[name=shrd][value=0]").attr("checked", "checked");
          $('<div class="alert alert-info"><strong>This collection will be temporary</strong>. Log in to create permanent and public collections.</div>').appendTo($block);
          // remove the <label> that wraps the radio button
          $block.find("input[name=shrd][value=1]").remove();
          $block.find("label[for='edit-shrd-1']").remove();
      }

      if ( options.$hidden ) {
          options.$hidden.clone().appendTo($block);
      } else {
          $("<input type='hidden' name='c' />").appendTo($block).val(options.c);
          $("<input type='hidden' name='a' />").appendTo($block).val(options.a);
      }

      if ( options.$selected ) {
        var ids = get_ids(options.$selected);
        ids.forEach(function(id) {
          $("<input type='hidden' name='id' />").appendTo($block).val(id);
        })
      }

      var $dialog = bootbox.dialog($block, [
          {
              "label" : "Cancel",
              "class" : "btn-dismiss"
          },
          {
              "label" : options.label,
              "class" : "btn btn-primary",
              callback : function() {

                  var form = $block.get(0);
                  if ( ! form.checkValidity() ) {
                      form.reportValidity();
                      return false;
                  }

                  var c = $.trim($block.find("input[name=c]").val());
                  var cn = $.trim($block.find("input[name=cn]").val());
                  var desc = $.trim($block.find("textarea[name=desc]").val());

                  if ( ! cn ) {
                      $('<div class="alert alert-error">You must enter a collection name.</div>').appendTo($block);
                      return false;
                  }

                  $dialog.find(".btn-primary").addClass("btn-loading");

                  display_info("Submitting; please wait...");

                  var params = {
                      a : options.a,
                      cn : cn,
                      desc : desc,
                      shrd : $block.find("input[name=shrd]:checked").val()
                  };

                  if ( options.$selected ) {
                      params.id = get_ids(options.$selected);
                  }

                  if ( c ) {
                      params.c = c;
                  }

                  submit_post(params, function() {
                      $dialog.closeModal();
                      hide_info();
                  });
              }
          }
      ]);
      HT.ctools.$dialog = $dialog;

      $dialog.find("input[type=text],textarea").each(function() {
          var $this = $(this);
          var $count = $("#" + $this.attr('id') + "-count");
          var limit = $this.attr("maxlength");

          $count.text(limit - $this.val().length);

          $this.bind('keyup', function() {
              $count.text(limit - $this.val().length);
          });
      })
  }
  HT.ctools.edit_collection_metadata = edit_collection_metadata;

  $("#action-edit-collection").click(function(e) {
      e.preventDefault();
      var $this = $(this);
      edit_collection_metadata({
          a : 'editc',
          cn : $this.data('cn'),
          desc : $this.data('desc'),
          shrd : $this.data('shrd'),
          c : $this.data('c')
      });
  })

  $("#action-new-collection").click(function(e) {
      e.preventDefault();
      var $this = $(this);
      edit_collection_metadata({
          a : 'addc',
          creating: true
      });
  })

  $(".form-download-metadata a.download-help-link").click(function(e) {
      e.preventDefault();
      var html = '<p>You can download certain information about the items in this collection as a text file.';
      html += "\n" + 'You can choose one of these formats of the file:' + "\n" + '<ul class="bullets">';
      html += "\n" + '<li>Item metadata: tab-delimited text (TSV)</li>';
      html += "\n" + '<li>Item + collection metadata as linked data (JSON)</li>';
      html += '</ul>';
      // html += '<p><img src="/mb/mb_download_menu.png" /></p>';
      html += "\n" + '<p>In both formats, the file ​will contain a few fields about each item in the collection, including title, author, date, rights, and important identifiers. The JSON file will also contain a few fields about the collection, including collection title, number of items, owner, identifier, and description.</p>';
      html += "\n" + '<p>JSON downloads can be imported for analysis into the <a href="https://analytics.hathitrust.org">HathiTrust Research Center</a>.</p>';
      html += "\n" + '<p><a target="_blank" href="https://www.hathitrust.org/help_digital_library#CBDownload">More Information</a></p>';
      bootbox.alert(html);
  });

  $(".form-download-metadata").on('submit', function(e) {
    // e.preventDefault();
    var $form = $(this);
    var $button = $form.find("button");
    $button.attr("disabled", "disabled").addClass('btn-loading');

    // var $progress = $form.find("[data-role=progress]").addClass("active");

    var collid = (location.search.match(/c=(\d+)/))[1];
    var cookieName = "download" + collid;

    var downloadTimeout;
    var checkDownloadCookie = function() {
      if ( $.cookie(cookieName, undefined, { json: false }) == 1 ) {
        // $.cookie('downloadStarted', "false");
        $.cookie(cookieName, '', { json: false, expires: -1, path: '/' });
        $button.attr('disabled', null).removeClass("btn-loading");
        HT.update_status("Metadata has been downloaded.");
        // $progress.removeClass('active');
        // $btn.css({ opacity: 1.0 }).find("button").attr('disabled', null);
      } else {
        downloadTimeout = setTimeout(checkDownloadCookie, 1000);
      }
    }

    $.cookie(cookieName, 0, { path: '/' });
    setTimeout(checkDownloadCookie, 1000);
    HT.update_status("Download request submitted.");
  });

  if ( ! $("html").data('use') == 'search' ) { return; }

  var $select_all = $("#action-select-all");
  var $possible_selections = $(".add-to-list-checkbox-container button");

  var DEFAULT_COLL_MENU_OPTION = "0";
  var NEW_COLL_MENU_OPTION = "__NEW__";
  var SRC_COLLECTION = "";
  var ITEMS_SELECTED = [];
  var NEW_COLL_NUM_ITEMS = {};

  var DEFAULT_SLICE_SIZE=25;//XXX need to get this dynamically from xsl/javascript?

  var IN_YOUR_COLLS_LABEL = 'This item is in your collection(s):';
  var $errormsg = $(".errormsg");
  var $infomsg = $(".infomsg");
  var $toolbar = $(".collections-action-container");
  var $available_collections = $toolbar.find("select");
  var $action = $(".collections-action-container button");

  if ( ! $select_all.length ) { return ; }

  HT.ctools.$possible_selections = $possible_selections;
  HT.ctools.$select_all = $select_all;


  $select_all.on('click', function(event) {
    toggle_checkbox($select_all);

    // HT.update_status("Search will use the full-text index.");
  });

  $possible_selections.on('click', function(event) {
    toggle_checkbox($(this));
  })

  function display_error(msg) {
      if ( ! $errormsg.length ) {
          $errormsg = $('<div class="alert alert-error errormsg" style="margin-top: 0.5rem"></div>').insertAfter($toolbar);
      }
      $errormsg.text(msg).show();
      HT.update_status(msg);
  }
  HT.ctools.display_error = display_error;

  function display_info(msg) {
      if ( ! $infomsg.length ) {
          $infomsg = $('<div class="alert alert-info infomsg" style="margin-top: 0.5rem"></div>').insertAfter($toolbar);
      }
      $infomsg.text(msg).show();
      HT.update_status(msg);
  }
  HT.ctools.display_info = display_info;

  function hide_error() {
      $errormsg.hide().text();
  }
  HT.ctools.hide_error = hide_error;

  function hide_info() {
      $infomsg.hide().text();
  }
  HT.ctools.hide_info = hide_info;

  function get_url() {
      var url = "/cgi/mb";
      if ( location.pathname.indexOf("/shcgi/") > -1 ) {
          url = "/shcgi/mb";
      }
      return url;
  }

  function get_ids(items) {
      var id = [];
      items.each(function() {
          id.push($(this).data('barcode'));
      })
      return id;
  }
  HT.ctools.get_ids = get_ids;

  function parse_line(data) {
      var retval = {};
      var kv;
      var tmp = data.split("|");
      for(var i = 0; i < tmp.length; i++) {
          kv = tmp[i].split("=");
          retval[kv[0]] = kv[1];
      }
      return retval;
  }

  function add_item_to_collist(params) {
      var $option = $available_collections.find("option[value='" + params.coll_id + "']");
      if ( ! $option.length ) {
          // need to add
          $option = $('<option></option>').val(params.coll_id).text(params.coll_name).appendTo($available_collections);
          NEW_COLL_NUM_ITEMS[params.coll_id] = params.NumAdded;
      }

      HT.update_status(`Added collection ${params.coll_name} to your list.`);
  }

  function confirm_large(collSize, addNumItems, callback) {

      if ( collSize <= 1000 && collSize + addNumItems > 1000 ) {
          var numStr;
          if (addNumItems > 1) {
              numStr = "these " + addNumItems + " items";
          }
          else {
              numStr = "this item";
          }
          var msg = "Note: Your collection contains " + collSize + " items.  Adding " + numStr + " to your collection will increase its size to more than 1000 items.  This means your collection will not be searchable until it is indexed, usually within 1-5 days.  After that, just newly added items will see this delay before they can be searched. \n\nDo you want to proceed?"

          confirm(msg, function(answer) {
              if ( answer ) {
                  callback();
              }
          })
      } else {
          // all other cases are okay
          callback();
      }
  }

  $toolbar.on('click', 'button#addits,button#movit,button#delit', function(e) {
    e.preventDefault();
    var action = this.id;
    var $btn = $(this);

    hide_error();

    var selected_collection_id = $available_collections.val();
    var selected_collection_name = $available_collections.find("option:selected").text();

    var $selected = $possible_selections.filter("[aria-checked='true']");
    if ( $selected.length == 0 ) {
        display_error("You must choose an item");
        return;
    }

    if ( ( selected_collection_id == DEFAULT_COLL_MENU_OPTION ) &&
         ( action == 'copyit' || action == 'movit' || action == 'addI' || action == 'addits' ) ) {
        display_error("You must select a collection.");
        return;
    }

    if ( selected_collection_id == NEW_COLL_MENU_OPTION ) {
        // deal with new collection
        // var $hidden = $form.find("input[type=hidden]").clone();
        // $hidden.filter("input[name=a]").val(action + 'nc');
        edit_collection_metadata({
            creating : true,
            $selected : $selected,
            a : action + "nc"
        });
        return;
    }

    $btn.addClass("btn-loading");

    var add_num_items = $selected.length;
    var COLL_SIZE_ARRAY = getCollSizeArray();
    var coll_size = COLL_SIZE_ARRAY[selected_collection_id] || NEW_COLL_NUM_ITEMS[selected_collection_id];

    confirm_large(coll_size, add_num_items, function() {
        // possible ajax action
        submit_post({
            a : action,
            id : get_ids($selected),
            c2 : selected_collection_id
        });
    })

  })

});
