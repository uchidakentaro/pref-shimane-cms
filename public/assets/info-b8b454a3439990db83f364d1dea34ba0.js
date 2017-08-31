(function() {
  var Info,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Info = (function() {
    function Info() {
      this.init = bind(this.init, this);
    }

    Info.prototype.init = function() {
      $("[data-load-remote]").on("click", function(e) {
        var $this, remote;
        e.preventDefault();
        $this = $(this);
        remote = $this.data("load-remote");
        if (remote) {
          return $($this.data("remote-target")).load(remote);
        }
      });
      return $(document).on("hidden", "#modal-info-show", function(e) {
        return $("#modal-info-show .modal-body").html("");
      });
    };

    return Info;

  })();

  this.Susanoo || (this.Susanoo = {});

  this.Susanoo.Info = new Info;

}).call(this);
