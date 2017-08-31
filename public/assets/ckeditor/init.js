
(function() {
  if (typeof window['CKEDITOR_BASEPATH'] === "undefined" || window['CKEDITOR_BASEPATH'] === null) {
    window['CKEDITOR_BASEPATH'] = "/assets/ckeditor/";
  }
}).call(this);

function ck_load() {
  $('.ckeditor').each(function(){
    CKEDITOR.replace( $(this).attr('name') );
  });
}

$(document).on('page:load', ck_load);
