(function() {
  var AdminPageTemplateForm, base;

  AdminPageTemplateForm = (function() {
    function AdminPageTemplateForm() {}

    AdminPageTemplateForm.prototype.init = function() {
      var editor;
      return editor = CKEDITOR.replace('page_template_content', {
        toolbar: Toolbar.standard,
        allowedContent: AllowedContent.standard,
        contentsCss: ['/assets/public/default.css', '/assets/public/color.css', '/assets/public/aural.css']
      });
    };

    return AdminPageTemplateForm;

  })();

  Susanoo.Admin || (Susanoo.Admin = {});

  (base = Susanoo.Admin).PageTemplates || (base.PageTemplates = {});

  Susanoo.Admin.PageTemplates.Form = new AdminPageTemplateForm;

}).call(this);
