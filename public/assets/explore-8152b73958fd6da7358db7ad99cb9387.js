(function() {
  var Explore,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Susanoo || (this.Susanoo = {});

  this.Susanoo.ExploreTimer = false;

  Explore = (function() {
    function Explore() {
      this.init = bind(this.init, this);
    }

    Explore.prototype.init = function() {
      this.adjustSize();
      $(window).resize((function(_this) {
        return function() {
          if (Susanoo.ExploreTimer) {
            clearTimeout(Susanoo.ExploreTimer);
          } else {
            Susanoo.ExploreTimer = setTimeout(_this.adjustSize(), 300);
          }
        };
      })(this));
    };

    Explore.prototype.adjustSize = function() {
      var h;
      h = $("#header").outerHeight();
      $("#treeview").height(window.innerHeight - h - 30);
    };

    return Explore;

  })();

  this.Susanoo.Explore = new Explore;

}).call(this);
