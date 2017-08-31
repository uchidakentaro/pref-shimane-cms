(function() {
  var AdminEmergencyInfoForm, base;

  AdminEmergencyInfoForm = (function() {
    function AdminEmergencyInfoForm() {}

    AdminEmergencyInfoForm.prototype.init = function() {
      var editor;
      return editor = CKEDITOR.replace('emergency_info_content', {
        toolbar: Toolbar.standard,
        allowedContent: AllowedContent.info
      });
    };

    return AdminEmergencyInfoForm;

  })();

  Susanoo.Admin || (Susanoo.Admin = {});

  (base = Susanoo.Admin).EmergencyInfo || (base.EmergencyInfo = {});

  Susanoo.Admin.EmergencyInfo.Form = new AdminEmergencyInfoForm;

}).call(this);
