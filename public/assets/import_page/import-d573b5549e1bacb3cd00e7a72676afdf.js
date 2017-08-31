(function() {
  var ImportForm, base;

  ImportForm = (function() {
    function ImportForm() {}

    ImportForm.prototype.selected_genre = null;

    ImportForm.prototype.button_folder_select = $("#button-folder-select");

    ImportForm.prototype.init = function() {
      $(this.button_folder_select).click((function(_this) {
        return function() {
          if (_this.selected_genre) {
            $("#upload_file_genre_id").val(_this.selected_genre.id);
            $("#selected-genre-name").html(_this.selected_genre.title);
          }
          $('#modal-folder-select').modal('hide');
        };
      })(this)).attr("disabled", true);
      $("#treeview").fancytree({
        source: $.ajax({
          url: "/susanoo/genres/treeview"
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
            url: "/susanoo/genres/treeview",
            data: {
              id: node.data.id
            }
          };
        }
      });
    };

    return ImportForm;

  })();

  this.ImportPage || (this.ImportPage = {});

  (base = this.ImportPage).Import || (base.Import = {});

  this.ImportPage.Import.Form = new ImportForm;

}).call(this);
