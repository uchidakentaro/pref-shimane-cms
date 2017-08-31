(function() {
  var PageAssetBrowseResource, base, base1;

  PageAssetBrowseResource = (function() {
    function PageAssetBrowseResource() {}

    PageAssetBrowseResource.prototype.link_to = null;

    PageAssetBrowseResource.prototype.message = null;

    PageAssetBrowseResource.prototype.selected_genre = null;

    PageAssetBrowseResource.prototype.init = function(datasource) {
      $("#treeview").fancytree({
        autoActivate: false,
        source: datasource,
        activate: (function(_this) {
          return function(event, data) {
            var node;
            node = data.node;
            if (node.data.path) {
              CKEDITOR.tools.callFunction(CKEditorFuncNum, node.data.path);
              return window.close();
            }
          };
        })(this),
        lazyload: function(event, data) {
          var node;
          node = data.node;
          return data.result = {
            url: "/susanoo/genres/treeview_with_pages",
            data: {
              id: node.data.id
            }
          };
        }
      });
      return $(document).on("click", "#file-index > tbody > tr", function(e) {
        var element, selected;
        selected = $(".resource-selected");
        selected.removeClass("info");
        selected.removeClass("resource-selected");
        element = $(this);
        element.addClass("info");
        element.addClass("resource-selected");
        return $.ajax({
          url: "/susanoo/genres/select_resource",
          data: {
            type: element.attr("data-type"),
            id: element.attr("data-id")
          },
          dataType: 'script'
        });
      });
    };

    return PageAssetBrowseResource;

  })();

  this.Susanoo || (this.Susanoo = {});

  (base = this.Susanoo).PageAsset || (base.PageAsset = {});

  (base1 = this.Susanoo.PageAsset).BrowseResource || (base1.BrowseResource = new PageAssetBrowseResource);

}).call(this);
