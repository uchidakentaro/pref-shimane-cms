(function(){var t,n=function(t,n){return function(){return t.apply(n,arguments)}};t=function(){function t(){this.init=n(this.init,this)}return t.prototype.init=function(){return $("[data-load-remote]").on("click",function(t){var n,o;if(t.preventDefault(),n=$(this),o=n.data("load-remote"))return $(n.data("remote-target")).load(o)}),$(document).on("hidden","#modal-info-show",function(){return $("#modal-info-show .modal-body").html("")})},t}(),this.Susanoo||(this.Susanoo={}),this.Susanoo.Info=new t}).call(this);