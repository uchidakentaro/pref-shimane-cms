(function() {
  var GenreForm, GenreIndex, base,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  GenreIndex = (function() {
    function GenreIndex() {
      this.init = bind(this.init, this);
    }

    GenreIndex.prototype.link_to = null;

    GenreIndex.prototype.message = null;

    GenreIndex.prototype.selected_genre = null;

    GenreIndex.prototype.button_folder_select = $("#button-folder-select");

    GenreIndex.prototype.init = function(datasource) {
      var select_url, treeview_url;
      treeview_url = "/susanoo/genres/treeview";
      select_url = "/susanoo/genres/select_genre";
      $("#treeview").fancytree({
        autoActivate: false,
        source: datasource,
        activate: function(event, data) {
          var node;
          node = data.node;
          if (!node.data.no_permission) {
            return $.get(select_url, {
              genre_id: node.data.id
            });
          }
        },
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
      $("#treeview-modal").fancytree({
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
              _this.selected_genre = null;
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
      $(document).on("click", "#file-index > tbody > tr", function(e) {
        var element, selected, target;
        target = e.target;
        if (target.tagName !== 'TD') {
          return false;
        }
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
      $(document).on("click", "#button-move-genre", (function(_this) {
        return function(e) {
          _this.link_to = $(e.currentTarget).attr("data-url");
          _this.message = $(e.currentTarget).attr("data-message");
          _this.selected_genre = null;
        };
      })(this));
      $(document).on("click", "#button-copy-genre", (function(_this) {
        return function(e) {
          _this.link_to = $(e.currentTarget).attr("data-url");
          _this.message = $(e.currentTarget).attr("data-message");
          _this.selected_genre = null;
        };
      })(this));
      $(document).on("click", "#button-move-page", (function(_this) {
        return function(e) {
          _this.link_to = $(e.currentTarget).attr("data-url");
          _this.message = $(e.currentTarget).attr("data-message");
          _this.selected_genre = null;
        };
      })(this));
      $(this.button_folder_select).click((function(_this) {
        return function(e) {
          $('#modal-folder-select').modal('hide');
          if (!_this.selected_genre) {
            return;
          }
          if (_this.message) {
            if (!confirm(_this.message)) {
              return;
            }
          }
          if (_this.selected_genre && _this.link_to) {
            $.isLoading({
              text: "処理中"
            });
            window.location = _this.link_to + "?genre_id=" + _this.selected_genre.id;
          }
        };
      })(this)).attr("disabled", true);
      $(document).on("submit", ".form-search", (function(_this) {
        return function(e) {
          return $.isLoading({
            text: "検索中"
          });
        };
      })(this));
      $(document).on("click", "div.move-link > a", (function(_this) {
        return function(e) {
          return $.isLoading({
            text: "処理中"
          });
        };
      })(this));
    };

    return GenreIndex;

  })();

  GenreForm = (function() {
    function GenreForm() {}

    GenreForm.prototype.init = function() {
      return $('#division_id').change(function(e) {
        var division_id;
        division_id = $("#division_id").val();
        if (division_id) {
          return $.ajax({
            url: "/susanoo/genres/select_division",
            data: {
              division_id: division_id
            },
            dataType: 'script'
          });
        }
      });
    };

    return GenreForm;

  })();

  this.Susanoo || (this.Susanoo = {});

  (base = this.Susanoo).Genre || (base.Genre = {});

  Susanoo.Genre.Index = new GenreIndex;

  Susanoo.Genre.Form = new GenreForm;

}).call(this);
