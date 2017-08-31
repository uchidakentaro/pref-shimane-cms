(function() {
  var PageForm, PageIndex, base,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  PageIndex = (function() {
    function PageIndex() {
      this.init = bind(this.init, this);
    }

    PageIndex.prototype.init = function(datasource) {
      $("#treeview").fancytree({
        source: datasource,
        activate: function(event, data) {
          var node;
          node = data.node;
          if (!node.data.no_permission) {
            return $.get("/susanoo/pages/select", {
              genre_id: node.data.id
            });
          }
        },
        lazyload: function(event, data) {
          var node;
          node = data.node;
          return data.result = {
            url: "/susanoo/genres/treeview",
            data: {
              id: node.data.id
            }
          };
        }
      });
      $(document).on("submit", ".form-search", function(e) {
        $.isLoading({
          text: "検索中"
        });
        return true;
      });
      $(document).on("click", ".pagination a", function(e) {
        $.isLoading({
          text: "読込中"
        });
        return true;
      });
      $(document).on("click", "a.sort", function(e) {
        $.isLoading({
          text: "読込中"
        });
        return true;
      });
    };

    return PageIndex;

  })();

  PageForm = (function() {
    function PageForm() {
      this.init = bind(this.init, this);
    }

    PageForm.prototype.selected_genre = null;

    PageForm.prototype.button_folder_select = $("#button-folder-select");

    PageForm.prototype.selected_page_content = null;

    PageForm.prototype.init = function() {
      var treeview_url, treeview_with_page_url;
      $(this.button_folder_select).click((function(_this) {
        return function() {
          if (_this.selected_genre) {
            $("#page_genre_id").val(_this.selected_genre.id);
            $("#selected-genre-name").html(_this.selected_genre.title);
          }
          $('#modal-folder-select').modal('hide');
        };
      })(this)).attr("disabled", true);
      $("#link-template-preview").click(function() {
        var template_id, url;
        template_id = $("#page_template_id").val();
        if (template_id) {
          url = "/susanoo/visitors/preview_virtual";
          window.open(url + "?mode=template&template_id=" + template_id, '', 'toolbar=yes,status=no,menubar=yes,scrollbars=yes,resizable');
        }
        return false;
      });
      treeview_url = "/susanoo/genres/treeview";
      $("#treeview").fancytree({
        source: $.ajax({
          url: treeview_url
        }),
        activate: (function(_this) {
          return function(event, data) {
            var node;
            node = data.node;
            if (!node.data.no_permission) {
              _this.selected_genre = {
                id: node.data.id,
                title: node.title
              };
              $(_this.button_folder_select).attr("disabled", false);
            } else {
              _this.selected_genre = {};
              $(_this.button_folder_select).attr("disabled", true);
            }
            return _this.selected_genre;
          };
        })(this),
        lazyload: function(event, data) {
          var node;
          node = data.node;
          return data.result = {
            url: treeview_url,
            data: {
              id: node.data.id
            }
          };
        }
      });
      treeview_with_page_url = "/susanoo/genres/treeview_with_pages";
      $("#treeview_with_page").fancytree({
        autoActivate: false,
        source: $.ajax({
          url: treeview_with_page_url
        }),
        activate: (function(_this) {
          return function(event, data) {
            var node;
            node = data.node;
            if (node.folder) {
              $.ajax({
                url: "/susanoo/pages/select_copy_page"
              });
            } else {
              _this.selected_page_content = {
                title: node.title
              };
              $.ajax({
                url: "/susanoo/pages/select_copy_page" + "?id=" + node.data.id
              });
            }
            return _this.selected_page_content;
          };
        })(this),
        lazyload: function(event, data) {
          var node;
          node = data.node;
          return data.result = {
            url: treeview_with_page_url,
            data: {
              id: node.data.id
            }
          };
        }
      });
      $(document).on("click", "input[name='status']", (function(_this) {
        return function(e) {
          var content_id, title;
          $("#button-page-preview").attr("disabled", false);
          $("#button-page-select").attr("disabled", false);
          content_id = $(e.target).attr("value");
          $("#button-page-preview").attr("href", "/susanoo/visitors/" + content_id + "/preview");
          $("#button-page-select").attr("value", content_id);
          title = _this.selected_page_content.title;
          if ($(e.target).attr("name") === "unpublished") {
            title = title + "（非公開ページ）";
          } else {
            title = title + "（公開ページ）";
          }
          return _this.selected_page_content = {
            title: title,
            id: content_id
          };
        };
      })(this));
      $(document).on("click", "#button-page-select", (function(_this) {
        return function(e) {
          if (_this.selected_page_content) {
            $("#page_copy_id").attr("value", _this.selected_page_content.id);
            $("#selected-page-name").html(_this.selected_page_content.title);
          }
          $('#modal-page-select').modal('hide');
        };
      })(this)).attr("disabled", true);
      $(document).on("click", "#button-page-cancel", (function(_this) {
        return function(e) {
          $("#page_copy_id").attr("value", "");
          $("#selected-page-name").html("既存ページの内容を複製して新規にページを作成する場合は、ページを選択してください.");
          $('#modal-page-select').modal('hide');
        };
      })(this)).attr("disabled", true);
    };

    return PageForm;

  })();

  this.Susanoo || (this.Susanoo = {});

  (base = this.Susanoo).Page || (base.Page = {});

  this.Susanoo.ExploreTimer = false;

  this.Susanoo.Page.Index = new PageIndex;

  this.Susanoo.Page.Form = new PageForm;

}).call(this);
