(function() {
  var BlogIndex, base,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BlogIndex = (function() {
    function BlogIndex() {
      this.init = bind(this.init, this);
    }

    BlogIndex.prototype.init = function(datasource) {
      $("#treeview").fancytree({
        source: datasource,
        activate: function(event, data) {
          var node;
          node = data.node;
          if (!node.data.no_permission) {
            return $.get("/blog_management/susanoo/blogs/select_genre", {
              genre_id: node.data.id
            });
          }
        },
        lazyload: function(event, data) {
          var node;
          node = data.node;
          return data.result = {
            url: "/blog_management/susanoo/blogs/treeview",
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

    return BlogIndex;

  })();

  this.Susanoo || (this.Susanoo = {});

  (base = this.Susanoo).Blog || (base.Blog = {});

  this.Susanoo.ExploreTimer = false;

  this.Susanoo.Blog.Index = new BlogIndex;

}).call(this);
