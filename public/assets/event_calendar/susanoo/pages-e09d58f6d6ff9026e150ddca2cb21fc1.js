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
            return $.get("/event_calendar/susanoo/pages/select", {
              genre_id: node.data.id
            });
          }
        },
        lazyload: function(event, data) {
          var node;
          node = data.node;
          return data.result = {
            url: "/event_calendar/susanoo/genres/treeview",
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
    };

    return PageIndex;

  })();

  PageForm = (function() {
    function PageForm() {}

    PageForm.prototype.init = function() {
      $('#event_top_id').change(function(e) {
        var event_top_id;
        event_top_id = $("#event_top_id").val();
        if (event_top_id) {
          return $.ajax({
            url: "/event_calendar/susanoo/pages/select_event_top",
            data: {
              event_top_id: event_top_id
            },
            dataType: 'script'
          });
        }
      });
      $('input[name="select_use_categroy_folder"]:radio').change(function(e) {
        if (this.value === "1") {
          return $("#category_folder_id").removeAttr("disabled");
        } else {
          return $("#category_folder_id").attr("disabled", "disabled");
        }
      });
      return $('document').ready(function(e) {
        if ($('input[name="select_use_categroy_folder"]:checked').val() === "2") {
          return $("#category_folder_id").attr("disabled", "disabled");
        }
      });
    };

    return PageForm;

  })();

  this.Susanoo || (this.Susanoo = {});

  (base = this.Susanoo).Page || (base.Page = {});

  this.Susanoo.ExploreTimer = false;

  this.Susanoo.Page.Index = new PageIndex;

  Susanoo.Page.Form = new PageForm;

}).call(this);
