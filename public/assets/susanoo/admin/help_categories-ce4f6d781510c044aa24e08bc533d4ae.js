(function() {
  var AdminHelpCategoryIndex, base;

  AdminHelpCategoryIndex = (function() {
    function AdminHelpCategoryIndex() {}

    AdminHelpCategoryIndex.prototype.init = function() {
      var image_tag;
      image_tag = "<img src='/assets/wakaba.png' class='wakaba'/>";
      $("#treeview").fancytree({
        icons: false,
        renderNode: function(event, data) {
          var node, siblings, span, tag;
          node = data.node;
          if (node.data) {
            span = $(node.span).find('.fancytree-title');
            if (span.length > 0) {
              if (node.data.id) {
                siblings = $(span).siblings();
                tag = "<a class='delete-category' help_category_id='" + node.data.id + "' href='/susanoo/admin/help_categories/" + node.data.id + "'><i class='icon-remove-sign icon-white'></i></a>";
                if (!$(siblings).is('.delete-category')) {
                  $(span).after(tag);
                }
                if (node.data.navigation === true) {
                  if (!$(siblings).is('.wakaba')) {
                    $(span).before(image_tag);
                  }
                } else {
                  if ($(siblings).is('.wakaba')) {
                    $(siblings).remove('.wakaba');
                  }
                }
              }
            }
          }
        },
        source: $.ajax({
          url: "/susanoo/admin/help_categories/treeview"
        }),
        activate: (function(_this) {
          return function(event, data) {
            var node, params;
            node = data.node;
            if (node.data.id) {
              params = {};
              params.parent_id = node.data.id;
              return $.get("/susanoo/admin/help_categories/new", params, function(new_html) {
                return $('#center-form-area').html(new_html);
              });
            }
          };
        })(this),
        lazyload: function(event, data) {
          var node;
          node = data.node;
          return data.result = {
            url: "/susanoo/admin/help_categories/treeview",
            data: {
              id: node.data.id
            }
          };
        }
      });
      $(document).on('ajax:success', '#sort-help', function(e, data, status, xhr) {
        return $("tbody#helps").html(data);
      });
      $(document).on('click', '.delete-category', function(e) {
        e.preventDefault;
        if (window.confirm('削除しますか？')) {
          $.ajax({
            type: 'DELETE',
            url: $(this).attr('href'),
            dataType: 'script'
          });
        }
        return false;
      });
      return $('tbody#helps').sortable({
        cursor: 'move',
        opacity: 0.7,
        handle: ".icon-align-justify",
        update: function() {
          return $.post('/susanoo/admin/helps/update_sort', $(this).sortable('serialize'), function(result) {
            if (result) {
              return $('tbody#helps').effect('highlight', '', 2000);
            }
          });
        }
      });
    };

    return AdminHelpCategoryIndex;

  })();

  Susanoo.Admin || (Susanoo.Admin = {});

  (base = Susanoo.Admin).HelpCategory || (base.HelpCategory = {});

  Susanoo.Admin.HelpCategory.Index = new AdminHelpCategoryIndex;

}).call(this);
