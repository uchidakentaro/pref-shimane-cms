(function() {
  var PageContentEditPrivete, base,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  PageContentEditPrivete = (function() {
    function PageContentEditPrivete() {
      this.init = bind(this.init, this);
    }

    PageContentEditPrivete.prototype.init = function() {
      $('#public_term_switch').click(function(e) {
        if (this.checked) {
          $("select.begin_date").removeAttr("disabled");
          $("select.end_date").removeAttr("disabled");
          $("input#public_term_end_date_enable").removeAttr("disabled");
          $("input#public_term_end_date_enable").attr("checked", false);
        } else {
          $("select.begin_date").attr("disabled", "disabled");
          $("select.end_date").attr("disabled", "disabled");
          $("input#public_term_end_date_enable").attr("disabled", "disabled");
        }
      });
      $('#public_term_end_date_enable').click(function(e) {
        if (this.checked) {
          $("select.end_date").attr("disabled", "disabled");
        } else {
          $("select.end_date").removeAttr("disabled");
        }
      });
    };

    return PageContentEditPrivete;

  })();

  this.Susanoo || (this.Susanoo = {});

  (base = this.Susanoo).PageContent || (base.PageContent = {});

  this.Susanoo.PageContent.EditPrivete = new PageContentEditPrivete;

}).call(this);
