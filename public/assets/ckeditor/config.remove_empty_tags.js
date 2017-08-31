(function() {
  var RemoveEmptyTags,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  RemoveEmptyTags = (function() {
    function RemoveEmptyTags() {
      this.block = bind(this.block, this);
      this.all_block = bind(this.all_block, this);
    }

    RemoveEmptyTags.prototype.standard_tags = ['strong', 'li', 'ol', 'ul', 'sub', 'sup', 'strike', 'blockquote', 'th', 'td', 'tr', 'table', 'div', 'span', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    RemoveEmptyTags.prototype.all_block = function(html) {
      var i, j, len, obj, ref;
      if (html === null || html === "") {
        return html;
      }
      obj = $("<div></div>");
      obj.append(html);
      ref = this.standard_tags;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        obj.find("div.editable " + i + ":empty").remove();
      }
      return obj.html();
    };

    RemoveEmptyTags.prototype.block = function(html) {
      var i, j, len, obj, ref;
      if (html === null || html === "") {
        return html;
      }
      obj = $("<div></div>");
      obj.append(html);
      ref = this.standard_tags;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        obj.find(i + ":empty").remove();
      }
      return obj.html();
    };

    return RemoveEmptyTags;

  })();

  this.Susanoo || (this.Susanoo = {});

  this.Susanoo.RemoveEmptyTags = new RemoveEmptyTags();

}).call(this);
