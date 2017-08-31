(function() {
  var EditManager, HtmlEditor, PluginEditor, WysiwygEditor,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  WysiwygEditor = (function() {
    WysiwygEditor.prototype.wysiwyg_id = 'wysiwyg-editor';

    WysiwygEditor.prototype.body_id = '';

    WysiwygEditor.prototype.body_class = '';

    WysiwygEditor.prototype.object = null;

    WysiwygEditor.prototype.content = null;

    WysiwygEditor.prototype.stylesheets = null;

    WysiwygEditor.prototype.mobile = false;

    WysiwygEditor.prototype.manager = false;

    WysiwygEditor.prototype.filebrowserBrowseUrl = '/susanoo/page_assets/attachment_files';

    WysiwygEditor.prototype.filebrowserImageBrowseLinkUrl = '/susanoo/page_assets/images';

    WysiwygEditor.prototype.filebrowserImageBrowseUrl = '/susanoo/page_assets/images';

    WysiwygEditor.prototype.filebrowserImageUploadUrl = '/susanoo/page_assets/upload_image';

    WysiwygEditor.prototype.filebrowserUploadUrl = '/susanoo/page_assets/upload_attachment_file';

    function WysiwygEditor(manager, id, mobile, options) {
      var page_id;
      if (options == null) {
        options = {};
      }
      this.close = bind(this.close, this);
      this.cancel = bind(this.cancel, this);
      this.save = bind(this.save, this);
      this.show = bind(this.show, this);
      this.manager = manager;
      this.mobile = mobile;
      this.object = $(id);
      $(id + " .modal-save").click(this.save);
      $(id + " .modal-cancel").click(this.cancel);
      if (options) {
        if (options.body_id) {
          this.body_id = options.body_id;
        }
        if (options.body_class) {
          this.body_class = options.body_class;
        }
      }
      page_id = $('#page_content_page_id').val();
      this.filebrowserBrowseUrl += '?page_id=' + page_id;
      this.filebrowserImageBrowseLinkUrl += '?page_id=' + page_id;
      this.filebrowserImageBrowseUrl += '?page_id=' + page_id;
      this.filebrowserImageUploadUrl += '?page_id=' + page_id;
      this.filebrowserUploadUrl += '?page_id=' + page_id;
      return;
    }

    WysiwygEditor.prototype.show = function(content) {
      var bodyId, enterMode, forceEnterMode, format_tags, instance, tag, target, toolbar;
      this.content = content;
      target = this.content.target;
      instance = CKEDITOR.instances[this.wysiwyg_id];
      if (instance) {
        instance.destroy(true);
      }
      if (target.hasClass('data-type-h')) {
        toolbar = Toolbar.header;
        enterMode = CKEDITOR.ENTER_BR;
        forceEnterMode = true;
        tag = target.children().get(0).tagName;
        format_tags = tag.toLowerCase();
      } else if (this.mobile) {
        toolbar = Toolbar.mobile;
        enterMode = CKEDITOR.ENTER_P;
        forceEnterMode = false;
        format_tags = 'p';
      } else {
        toolbar = Toolbar.div;
        enterMode = CKEDITOR.ENTER_P;
        forceEnterMode = false;
        format_tags = 'p;h1;h2;h3;h4;h5;h6;pre;address;div';
      }
      bodyId = target.attr('id');
      bodyId || (bodyId = this.body_id);
      instance = CKEDITOR.replace(this.wysiwyg_id, {
        forceEnterMode: forceEnterMode,
        toolbar: toolbar,
        removeFormatAttributes: "",
        contentsCss: this.stylesheets,
        allowedContent: AllowedContent.standard,
        format_tags: format_tags,
        enterMode: enterMode,
        bodyId: bodyId,
        bodyClass: this.body_class,
        height: '300px',
        resize_enabled: false,
        extraPlugins: 'language,jisxtable,jisxtabletools,letterspacing',
        removePlugins: 'tabletools,table',
        language_list: LanguageList,
        filebrowserBrowseUrl: this.filebrowserBrowseUrl,
        filebrowserImageBrowseLinkUrl: this.filebrowserImageBrowseLinkUrl,
        filebrowserImageBrowseUrl: this.filebrowserImageBrowseUrl,
        filebrowserImageUploadUrl: this.filebrowserImageUploadUrl,
        filebrowserUploadUrl: this.filebrowserUploadUrl,
        on: {
          instanceReady: function(e) {
            var editor;
            editor = e.editor;
            return editor.setData(target.html());
          }
        }
      });
      this.object.modal({
        backdrop: 'static'
      });
      this.object.modal('show');
    };

    WysiwygEditor.prototype.save = function() {
      var data, instance;
      instance = CKEDITOR.instances[this.wysiwyg_id];
      if (instance) {
        this.content.just_drop = false;
        data = instance.getData();
        if (Susanoo.RemoveEmptyTags) {
          data = Susanoo.RemoveEmptyTags.block(data);
        }
        this.content.target.html(data);
      }
      this.manager.disable_save();
      this.close();
    };

    WysiwygEditor.prototype.cancel = function() {
      if (this.content.just_drop) {
        this.content.content.remove();
      }
      this.close();
    };

    WysiwygEditor.prototype.close = function() {
      this.content = null;
      this.object.modal('hide');
    };

    return WysiwygEditor;

  })();

  PluginEditor = (function() {
    PluginEditor.prototype.object = null;

    PluginEditor.prototype.content = null;

    PluginEditor.prototype.manager = null;

    function PluginEditor(manager, id) {
      this.close = bind(this.close, this);
      this.cancel = bind(this.cancel, this);
      this.save = bind(this.save, this);
      this.show = bind(this.show, this);
      this.manager = manager;
      this.object = $(id);
      $(id + " .modal-save").click(this.save);
      $(id + " .modal-cancel").click(this.cancel);
      return;
    }

    PluginEditor.prototype.show = function(content) {
      var args, data, form, target, title, values;
      this.content = content;
      target = this.content.target;
      data = target.attr("name");
      title = {
        "plugin": {
          "title": "プラグイン設定"
        }
      };
      this.object.find("#pluginEditorModalLabel").html(title[target.attr("title")].title);
      form = $("#form-plugin-sample #" + data).html();
      this.object.find("#plugin-editor-body").html(form);
      if ($("#form-plugin-sample #" + data + ".disabled-plugin").length > 0) {
        this.object.find(".modal-save").hide();
      } else {
        this.object.find(".modal-save").show();
      }
      values = target.attr("value");
      if (values) {
        args = values.split(",");
        this.object.find("#plugin-editor-body input, #plugin-editor-body textarea").each((function(_this) {
          return function(i, e) {
            var array;
            if ($(e).attr("data-type") === "array") {
              array = args.slice(i, +args.length + 1 || 9e9);
              return $(e).val(array.join("\n"));
            } else {
              return $(e).val(args[i]);
            }
          };
        })(this));
      }
      this.object.modal({
        backdrop: 'static'
      });
      this.object.modal('show');
    };

    PluginEditor.prototype.save = function() {
      var args, error, errors, i18n_errors, j, len, tmpl_error;
      args = [];
      errors = [];
      this.object.find('#plugin-editor-body input, #plugin-editor-body textarea').each((function(_this) {
        return function(i, e) {
          var array, j, len, v, value, values;
          if ($(e).attr('data-type') === 'array') {
            array = $(e).val();
            if (array) {
              values = array.split('\n');
              for (j = 0, len = values.length; j < len; j++) {
                v = values[j];
                if (v) {
                  args.push(v);
                }
              }
            } else if ($(e).attr('data-required')) {
              errors.push({
                elem: e,
                kind: 'data_required_array'
              });
            }
          } else {
            value = $(e).val();
            if (value) {
              args.push($(e).val());
            } else if ($(e).attr('data-required')) {
              errors.push({
                elem: e,
                kind: 'data_required'
              });
            }
          }
          return $(e).parent().find('.alert-error').remove();
        };
      })(this));
      if (errors.length > 0) {
        i18n_errors = JSON.parse('{"data_required":"必須項目です。入力して下さい。","data_required_array":"必須項目です。1つ以上入力して下さい。"}');
        for (j = 0, len = errors.length; j < len; j++) {
          error = errors[j];
          tmpl_error = $("<div/>", {
            "class": "alert-error"
          });
          $(error.elem).after(tmpl_error.append(i18n_errors[error.kind]));
        }
        return;
      }
      if (args.length > 0) {
        this.content.target.attr('value', args.join(','));
      }
      this.content.just_drop = false;
      this.manager.disable_save();
      this.close();
    };

    PluginEditor.prototype.cancel = function() {
      if (this.content.just_drop) {
        this.content.content.remove();
      }
      this.close();
    };

    PluginEditor.prototype.close = function() {
      this.content = null;
      this.object.modal('hide');
    };

    return PluginEditor;

  })();

  HtmlEditor = (function() {
    HtmlEditor.prototype.object = null;

    HtmlEditor.prototype.content = null;

    HtmlEditor.prototype.post_url = null;

    HtmlEditor.prototype.manager = null;

    function HtmlEditor(manager, id, url) {
      this.close = bind(this.close, this);
      this.cancel = bind(this.cancel, this);
      this.save = bind(this.save, this);
      this.show = bind(this.show, this);
      this.manager = manager;
      this.object = $(id);
      this.post_url = url;
      $(id + ' .modal-save').click(this.save);
      $(id + ' .modal-cancel').click(this.cancel);
      return;
    }

    HtmlEditor.prototype.show = function(content) {
      this.object.modal({
        backdrop: 'static'
      });
      this.object.modal('show');
    };

    HtmlEditor.prototype.save = function() {
      var source;
      source = $('#direct-html-textarea').val();
      if (source) {
        $.isLoading({
          text: "処理中"
        });
        this.manager.disable_save();
        $.ajax({
          type: "POST",
          url: this.post_url,
          data: {
            source: source
          },
          dataType: 'script'
        });
      }
      this.close();
    };

    HtmlEditor.prototype.cancel = function() {
      this.close();
    };

    HtmlEditor.prototype.close = function() {
      this.object.modal('hide');
    };

    return HtmlEditor;

  })();

  EditManager = (function() {
    function EditManager() {
      this.cleanup = bind(this.cleanup, this);
      this.iframe_loaded = bind(this.iframe_loaded, this);
      this.init_iframe = bind(this.init_iframe, this);
      this.init = bind(this.init, this);
    }

    EditManager.prototype.editable_field = null;

    EditManager.prototype.stylesheets = [];

    EditManager.prototype.mobile = false;

    EditManager.prototype.editor = {
      wysiwyg: null,
      plugin: null,
      html: null
    };

    EditManager.prototype.init = function(mobile, wysiwyg_options) {
      var direct_html_post_url;
      if (wysiwyg_options == null) {
        wysiwyg_options = {};
      }
      direct_html_post_url = $('#direct_html').attr('data-url');
      this.mobile = mobile;
      this.editor.plugin = new PluginEditor(this, '#modal-plugin-editor');
      this.editor.wysiwyg = new WysiwygEditor(this, '#modal-wysiwyg-editor', mobile, wysiwyg_options);
      this.editor.html = new HtmlEditor(this, '#modal-html-editor', direct_html_post_url);
      $("#widgets").disableSelection();
      $(document).keydown(function(e) {
        var tag, target;
        if (e.keyCode === 8) {
          tag = e.target.nodeName.toLowerCase();
          target = $(e.target);
          if ((tag !== 'input' && tag !== 'textarea') || target.attr('readonly') || target.is(':disabled')) {
            return false;
          }
        }
      });
      $(document).on('ready', function() {
        if ($('#save_temporarily')[0]) {
          return $('<input>').attr({
            type: "hidden",
            name: "_save_temporarily"
          }).appendTo('form#new_page_content');
        }
      });
      $(".col-right .sidebar-collapser").click(function(e) {
        var lw, w;
        $("#col-right-transitions").toggle();
        if ($("#col-right-transitions").css("display") === "none") {
          $(".col-right .sidebar-collapser").addClass("closed");
          w = $("div.editor").width();
          lw = $("div.editor > .col-left").width();
          $(".col-center").width("82.5%");
          $(".col-right").width("0.5%");
        } else {
          $(".col-right .sidebar-collapser").removeClass("closed");
          $(".col-center").width("66.66%");
          $(".col-right").width("16.66%");
        }
      });
      $('#check').click((function(_this) {
        return function(e) {
          var content, params;
          $.isLoading({
            text: "処理中"
          });
          content = _this.editable_field.html();
          if (content) {
            params = $(e.target).data('params');
            params || (params = {});
            params['page_id'] = $('#page_content_page_id').val();
            params['content'] = content;
            $(e.target).data("params", params);
            return true;
          } else {
            return false;
          }
        };
      })(this));
      $('#save').click((function(_this) {
        return function(e) {
          var commit_elem, content;
          $.isLoading({
            text: "処理中"
          });
          content = _this.editable_field.html();
          if (content) {
            if (_this.mobile) {
              $('#page_content_mobile').val(content);
            } else {
              $('#page_content_content').val(content);
            }
            commit_elem = $('<input>').attr({
              type: "hidden",
              name: "commit",
              value: $(e.target).attr('id')
            }).appendTo('form#new_page_content');
            $('form#new_page_content').submit();
            commit_elem.detach();
          }
        };
      })(this));
      $('#save_temporarily').click((function(_this) {
        return function(e) {
          return $('#save').trigger(e);
        };
      })(this));
      $('#preview').click((function(_this) {
        return function(e) {
          var content, params;
          $.isLoading({
            text: "処理中"
          });
          content = _this.editable_field.html();
          if (content) {
            params = $(e.target).data("params");
            params || (params = {});
            params['content'] = content;
            $(e.target).data("params", params);
            return true;
          } else {
            return false;
          }
        };
      })(this));
      $('#copy').click((function(_this) {
        return function(e) {
          _this.disable_save();
          _this.init_iframe($(e.target).attr("data-src"));
          return false;
        };
      })(this));
      $('#convert').click((function(_this) {
        return function(e) {
          var content, params;
          _this.disable_save();
          $.isLoading({
            text: "処理中"
          });
          content = _this.editable_field.html();
          if (content) {
            params = $(e.target).data("params");
            params || (params = {});
            params["page_id"] = $("#page_content_page_id").val();
            params['content'] = content;
            $(e.target).data("params", params);
            return true;
          } else {
            return false;
          }
        };
      })(this));
      $('#direct_html').click((function(_this) {
        return function(e) {
          _this.editor.html.show();
          return false;
        };
      })(this));
      this.init_iframe();
      this.col_resize();
      Susanoo.EventTimer = false;
      $(window).resize((function(_this) {
        return function(e) {
          if (Susanoo.EventTimer !== false) {
            clearTimeout(Susanoo.EventTimer);
          }
          return Susanoo.EventTimer = setTimeout(_this.col_resize, 300);
        };
      })(this));
      $("[id^=jquery-ui-effect_]").click((function(_this) {
        return function(e) {
          var menu_id;
          menu_id = $(e.target).attr('id');
          return $("#" + menu_id).css("background-color", "#8DC4E9");
        };
      })(this));
      $("[id^=editor-modal-save], [id^=editor-modal-cancel]").click((function(_this) {
        return function(e) {
          return $("[id^=jquery-ui-effect_]").each(function(i, f) {
            var menu_id;
            menu_id = $(f).attr('id');
            return $("#" + menu_id).css("background-color", "#222222");
          });
        };
      })(this));
    };

    EditManager.prototype.col_resize = function() {
      var h;
      h = $("#header").outerHeight();
      $(".col-content").height($(window).height() - h - 1);
      h = $('.col-center').outerHeight();
      $('iframe.iframe-edit').height(h);
    };

    EditManager.prototype.init_iframe = function(src) {
      var iframe_obj;
      if (src == null) {
        src = null;
      }
      $.isLoading({
        text: "読込中"
      });
      if (src === null) {
        src = $('#iframe_path').val();
      }
      $('#iframe-edit').remove();
      iframe_obj = $('<iframe />', {
        id: 'iframe-edit',
        "class": 'iframe-edit',
        src: src
      }).load((function(_this) {
        return function(e) {
          _this.iframe_loaded();
        };
      })(this));
      iframe_obj.appendTo('.col-center > .col-content');
    };

    EditManager.prototype.iframe_loaded = function() {
      var iframe_doc, iframe_window;
      iframe_window = document.getElementById('iframe-edit').contentWindow;
      iframe_doc = $('#iframe-edit').contents()[0];
      $(iframe_doc).keydown(function(e) {
        var tag, target;
        if (e.keyCode === 8) {
          tag = e.target.nodeName.toLowerCase();
          target = $(e.target);
          if ((tag !== 'input' && tag !== 'textarea') || target.attr('readonly') || target.is(':disabled')) {
            return false;
          }
        }
      });
      $('#iframe-edit').contents().find('link[rel=stylesheet]').each((function(_this) {
        return function(i, e) {
          return _this.stylesheets.push($(e).attr('href'));
        };
      })(this));
      this.editor.wysiwyg.stylesheets = this.stylesheets;
      this.cleanup();
      this.editable_field = iframe_window.Visitor.EditableField;
      this.editable_field.init(this);
      $.isLoading('hide');
    };

    EditManager.prototype.cleanup = function() {
      var filter, fragment, html, wrapper_id, writer;
      wrapper_id = '#page-content';
      html = $('#iframe-edit').contents().find(wrapper_id).html();
      fragment = CKEDITOR.htmlParser.fragment.fromHtml(html);
      writer = new CKEDITOR.htmlParser.basicWriter();
      filter = new CKEDITOR.filter(AllowedContent.standard);
      filter.applyTo(fragment);
      fragment.writeHtml(writer);
      html = writer.getHtml();
      if (Susanoo.RemoveEmptyTags) {
        html = Susanoo.RemoveEmptyTags.all_block(html);
      }
      $('#iframe-edit').contents().find(wrapper_id).html(html);
    };

    EditManager.prototype.disable_save = function() {
      $('#save').hide();
      return $('#save-disalbed').show();
    };

    EditManager.prototype.enable_save = function() {
      $('#save-disalbed').hide();
      $('#save').show();
    };

    return EditManager;

  })();

  this.Susanoo || (this.Susanoo = {});

  this.Susanoo.EventTimer = false;

  this.Susanoo.EditManager = new EditManager();

}).call(this);
