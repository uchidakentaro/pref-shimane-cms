(function(){var e,t,i=function(e,t){return function(){return e.apply(t,arguments)}};e=function(){function e(){this.init=i(this.init,this)}return e.prototype.init=function(){$("#public_term_switch").click(function(){this.checked?($("select.begin_date").removeAttr("disabled"),$("select.end_date").removeAttr("disabled"),$("input#public_term_end_date_enable").removeAttr("disabled"),$("input#public_term_end_date_enable").attr("checked",!1)):($("select.begin_date").attr("disabled","disabled"),$("select.end_date").attr("disabled","disabled"),$("input#public_term_end_date_enable").attr("disabled","disabled"))}),$("#public_term_end_date_enable").click(function(){this.checked?$("select.end_date").attr("disabled","disabled"):$("select.end_date").removeAttr("disabled")})},e}(),this.Susanoo||(this.Susanoo={}),(t=this.Susanoo).PageContent||(t.PageContent={}),this.Susanoo.PageContent.EditPrivete=new e}).call(this);