(function() {
  var AdvertisementForm, base;

  AdvertisementForm = (function() {
    function AdvertisementForm() {}

    AdvertisementForm.prototype.init = function() {
      $('input[name="reupload_image"]:radio').change(function(e) {
        if (this.value === "1") {
          return $("#advertisement_image").attr("disabled", "disabled");
        } else {
          return $("#advertisement_image").removeAttr("disabled");
        }
      });
      return $('document').ready(function(e) {
        if ($('input[name="reupload_image"]:checked').val() === "1") {
          return $("#advertisement_image").attr("disabled", "disabled");
        } else {
          return $("#advertisement_image").removeAttr("disabled");
        }
      });
    };

    return AdvertisementForm;

  })();

  this.Susanoo || (this.Susanoo = {});

  (base = this.Susanoo).Advertisement || (base.Advertisement = {});

  Susanoo.Advertisement.Form = new AdvertisementForm;

}).call(this);
