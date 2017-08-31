(function() {
  var PageForm, base,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  PageForm = (function() {
    function PageForm() {
      this.init = bind(this.init, this);
    }

    PageForm.prototype.init = function() {
      $("#link-template-preview").click(function() {
        var template_id, url;
        template_id = $("#page_template_id").val();
        if (template_id) {
          url = "/susanoo/visitors/preview_virtual";
          window.open(url + "?mode=template&template_id=" + template_id, '', 'toolbar=yes,status=no,menubar=yes,scrollbars=yes,resizable');
        }
        return false;
      });
    };

    return PageForm;

  })();

  this.Susanoo || (this.Susanoo = {});

  (base = this.Susanoo).Page || (base.Page = {});

  this.Susanoo.Page.Form = new PageForm;

}).call(this);
