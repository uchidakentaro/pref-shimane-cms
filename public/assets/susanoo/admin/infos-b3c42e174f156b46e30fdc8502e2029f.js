(function() {
  var AdminInfoForm, base;

  AdminInfoForm = (function() {
    function AdminInfoForm() {}

    AdminInfoForm.prototype.init = function() {
      var editor;
      return editor = CKEDITOR.replace('info_content', {
        toolbar: Toolbar.standard,
        allowedContent: AllowedContent.info
      });
    };

    return AdminInfoForm;

  })();

  Susanoo.Admin || (Susanoo.Admin = {});

  (base = Susanoo.Admin).Info || (base.Info = {});

  Susanoo.Admin.Info.Form = new AdminInfoForm;

}).call(this);
