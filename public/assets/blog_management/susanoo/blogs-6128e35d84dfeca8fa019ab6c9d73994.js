(function(){var n,t,o=function(n,t){return function(){return n.apply(t,arguments)}};n=function(){function n(){this.init=o(this.init,this)}return n.prototype.init=function(n){$("#treeview").fancytree({source:n,activate:function(n,t){var o;if(o=t.node,!o.data.no_permission)return $.get("/blog_management/susanoo/blogs/select_genre",{genre_id:o.data.id})},lazyload:function(n,t){var o;return o=t.node,t.result={url:"/blog_management/susanoo/blogs/treeview",data:{id:o.data.id}}}}),$(document).on("submit",".form-search",function(){return $.isLoading({text:"\u691c\u7d22\u4e2d"}),!0}),$(document).on("click",".pagination a",function(){return $.isLoading({text:"\u8aad\u8fbc\u4e2d"}),!0})},n}(),this.Susanoo||(this.Susanoo={}),(t=this.Susanoo).Blog||(t.Blog={}),this.Susanoo.ExploreTimer=!1,this.Susanoo.Blog.Index=new n}).call(this);