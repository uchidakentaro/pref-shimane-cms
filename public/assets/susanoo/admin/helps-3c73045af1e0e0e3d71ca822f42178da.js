(function() {
  var AdminHelperForm, base;

  AdminHelperForm = (function() {
    function AdminHelperForm() {}

    AdminHelperForm.prototype.wysiwyg_id = 'help_content_content';

    AdminHelperForm.prototype.filebrowserBrowseUrl = '/susanoo/admin/help_content_assets/attachment_files';

    AdminHelperForm.prototype.filebrowserImageBrowseLinkUrl = '/susanoo/admin/help_content_assets/images';

    AdminHelperForm.prototype.filebrowserImageBrowseUrl = '/susanoo/admin/help_content_assets/images';

    AdminHelperForm.prototype.filebrowserImageUploadUrl = '/susanoo/admin/help_content_assets/upload_image';

    AdminHelperForm.prototype.filebrowserUploadUrl = '/susanoo/admin/help_content_assets/upload_attachment_file';

    AdminHelperForm.prototype.init = function(help_content_id) {
      var editor;
      this.filebrowserBrowseUrl += '?help_content_id=' + help_content_id;
      this.filebrowserImageBrowseLinkUrl += '?help_content_id=' + help_content_id;
      this.filebrowserImageBrowseUrl += '?help_content_id=' + help_content_id;
      this.filebrowserImageUploadUrl += '?help_content_id=' + help_content_id;
      this.filebrowserUploadUrl += '?help_content_id=' + help_content_id;
      return editor = CKEDITOR.replace(this.wysiwyg_id, {
        toolbar: Toolbar.uploadable,
        filebrowserBrowseUrl: this.filebrowserBrowseUrl,
        filebrowserImageBrowseLinkUrl: this.filebrowserImageBrowseLinkUrl,
        filebrowserImageBrowseUrl: this.filebrowserImageBrowseUrl,
        filebrowserImageUploadUrl: this.filebrowserImageUploadUrl,
        filebrowserUploadUrl: this.filebrowserUploadUrl
      });
    };

    return AdminHelperForm;

  })();

  Susanoo.Admin || (Susanoo.Admin = {});

  (base = Susanoo.Admin).Helper || (base.Helper = {});

  Susanoo.Admin.Helper.Form = new AdminHelperForm;

}).call(this);
