(function() {
  var EditableContent, EditableField,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  EditableContent = (function() {
    EditableContent.prototype.template = {
      content: "<div class='editable-content'></div>",
      control: "<div class='editable-control bootstrap'>\n  <div class='btn-group'>\n    <a href='#' class='edit btn btn-inverse' title='編集'><i class='icon-edit'></i></a>\n    <a href='#' class='move btn btn-inverse' title='移動'><i class='icon-move'></i></a>\n    <a href='#' class='remove btn btn-inverse' title='削除'><i class='icon-remove'></i></a>\n  </div>\n</div>",
      popover: "<a href='#' class='accessibility-popover btn btn-inverse' title='エラー内容'><i class='icon-ok'></i></a>"
    };

    EditableContent.prototype.editable_field = null;

    EditableContent.prototype.just_drop = false;

    EditableContent.prototype.data_type = null;

    EditableContent.prototype.content = null;

    EditableContent.prototype.target = null;

    EditableContent.prototype.control = null;

    EditableContent.prototype.manager = null;

    EditableContent.prototype.editor = {
      wysiwyg: null,
      plugin: null
    };

    function EditableContent(manager) {
      this.show_editor = bind(this.show_editor, this);
      this.initialize = bind(this.initialize, this);
      this.create_on_drop = bind(this.create_on_drop, this);
      this.create_on_load = bind(this.create_on_load, this);
      this.manager = manager;
      this.editor.wysiwyg = manager.editor.wysiwyg;
      this.editor.plugin = manager.editor.plugin;
      return;
    }

    EditableContent.prototype.create_on_load = function(field, index, element) {
      var alert_content, control_btn_group, obj, offset, plugin_names, plugin_type, popover, popover_data_content;
      this.editable_field = field;
      obj = $(element);
      obj.wrap(this.template.content);
      obj.after(this.template.control);
      this.target = obj;
      this.content = obj.closest("div.editable-content");
      this.control = this.content.find("div.editable-control");
      offset = obj.position();
      if (offset) {
        this.control.css('left', offset.left);
      }
      if (obj.hasClass("data-type-plugin")) {
        this.data_type = 'plugin';
        obj.attr('title', 'plugin');
        plugin_names = {
          "plugin": ["page_list", "genre_list", "section_news", "section_news_by_path", "emergency", "genre_down_list", "genre_news_list", "genre_news_list_truncate", "section", "section_top_list", "sitemap", "sub_genre_list", "counter", "event_calendar_calendar", "event_calendar_pickup", "event_page_list"]
        };
        for (plugin_type in plugin_names) {
          if ($.inArray(obj.attr('name'), plugin_names[plugin_type]) >= 0) {
            obj.attr('title', plugin_type);
          }
        }
      } else {
        this.data_type = 'wysiwyg';
      }
      alert_content = this.content.find("[data-content]");
      if (alert_content.length > 0) {
        control_btn_group = this.content.find("div.editable-control div.btn-group");
        control_btn_group.append(this.template.popover);
        popover_data_content = "<ul>";
        alert_content.each(function(index, element) {
          popover_data_content += "<li>" + ($(element).attr("data-content")) + "</li>";
          return $(element).removeAttr("data-content");
        });
        popover_data_content += "</ul>";
        popover = control_btn_group.find("a.accessibility-popover");
        popover.attr("data-content", popover_data_content);
        popover.attr("data-contentsize", alert_content.length);
      }
      this.initialize();
      return this;
    };

    EditableContent.prototype.create_on_drop = function(field, element) {
      var count, data_deault, data_name, data_text, data_title, data_type, drag_item, next_item, obj, parent_field, plugin_names, plugin_type, prev_item, wrapper_id;
      wrapper_id = '#page-content';
      this.editable_field = field;
      this.just_drop = true;
      data_text = element.text();
      data_name = element.attr('name');
      data_type = element.attr('data-type');
      data_deault = element.attr('data-default');
      data_title = element.attr('title');
      drag_item = $(wrapper_id + ' .widget-item');
      prev_item = drag_item.prev();
      next_item = drag_item.next();
      parent_field = drag_item.closest(".susanoo-editable-field");
      drag_item.remove();
      count = parent_field.find('.editable-content').length;
      if (data_type === 'plugin') {
        obj = $("<button class='editable data-type-plugin'></button>");
        obj.attr('name', data_name);
        obj.attr('title', 'plugin');
        plugin_names = {
          "plugin": ["page_list", "genre_list", "section_news", "section_news_by_path", "emergency", "genre_down_list", "genre_news_list", "genre_news_list_truncate", "section", "section_top_list", "sitemap", "sub_genre_list", "counter", "event_calendar_calendar", "event_calendar_pickup", "event_page_list"]
        };
        for (plugin_type in plugin_names) {
          if ($.inArray(obj.attr('name'), plugin_names[plugin_type]) >= 0) {
            obj.attr('title', plugin_type);
          }
        }
        obj.text(data_text);
        this.data_type = 'plugin';
      } else {
        obj = $(data_deault);
        this.data_type = 'wysiwyg';
      }
      this.content = $(this.template.content);
      this.content.append(obj);
      this.content.append(this.template.control);
      this.target = this.content.find('.editable');
      this.control = this.content.find('div.editable-control');
      if (count === 0) {
        parent_field.append(this.content);
      } else {
        if (prev_item && prev_item.length === 1) {
          $(prev_item).after(this.content);
        } else {
          $(next_item).before(this.content);
        }
      }
      this.initialize();
      this.show_editor();
      return this;
    };

    EditableContent.prototype.initialize = function() {
      this.content.mouseenter((function(_this) {
        return function(e) {
          if (_this.editable_field.dragging === false) {
            return _this.control.show();
          }
        };
      })(this));
      this.content.mouseleave((function(_this) {
        return function(e) {
          if (_this.editable_field.dragging === false) {
            return _this.control.hide();
          }
        };
      })(this));
      this.control.find(".edit").click((function(_this) {
        return function(e) {
          return _this.show_editor();
        };
      })(this));
      this.control.find(".remove").click((function(_this) {
        return function(e) {
          if (confirm("指定したコンテンツを削除します.")) {
            _this.manager.disable_save();
            _this.content.remove();
            return delete _this;
          }
        };
      })(this));
      return this;
    };

    EditableContent.prototype.show_editor = function() {
      this.control.hide();
      if (this.data_type === 'wysiwyg') {
        this.editor.wysiwyg.show(this);
      } else if (this.data_type === 'plugin') {
        this.editor.plugin.show(this);
      } else {

      }
    };

    return EditableContent;

  })();

  EditableField = (function() {
    function EditableField() {
      this.html = bind(this.html, this);
      this.add_content = bind(this.add_content, this);
      this.init = bind(this.init, this);
    }

    EditableField.prototype.editors = null;

    EditableField.prototype.dragging = false;

    EditableField.prototype.manager = null;

    EditableField.prototype.wrapper_id = null;

    EditableField.prototype.field_class = '.susanoo-editable-field';

    EditableField.prototype.drag_target = null;

    EditableField.prototype.draggable_obj = null;

    EditableField.prototype.init = function(manager) {
      var draggable_field;
      this.wrapper_id = '#page-content';
      this.manager = manager;
      this.dragging = false;
      this.drag_target = null;
      $('.editable').each((function(_this) {
        return function(index, element) {
          var c;
          c = new EditableContent(_this.manager);
          c.create_on_load(_this, index, element);
        };
      })(this));
      $(this.field_class).sortable({
        connectWith: this.field_class,
        dropOnEmpty: true,
        placeholder: 'editable-placeholder',
        handle: '.editable-control .move',
        cursorAt: {
          left: 0,
          top: 0
        },
        items: '.editable-content',
        update: (function(_this) {
          return function() {
            _this.manager.disable_save();
          };
        })(this)
      });
      draggable_field = $(this.field_class);
      if (this.draggable_obj) {
        $(".widget-item", parent.document).draggable("destroy");
        $(".widget-item", parent.document).off('click');
        this.draggable_obj = null;
      }
      if ($.support.opacity) {
        this.draggable_obj = $(".widget-item", parent.document).draggable({
          appendTo: 'parent.body',
          connectToSortable: this.field_class,
          helper: "clone",
          cursor: "move",
          cursorAt: {
            left: 0,
            top: 0
          },
          zIndex: 9999,
          iframeFix: true,
          start: (function(_this) {
            return function(e, ui) {
              _this.dragging = true;
            };
          })(this),
          stop: (function(_this) {
            return function(e, ui) {
              _this.dragging = false;
              _this.manager.disable_save();
              _this.add_content($(ui.helper));
            };
          })(this)
        });
      } else {
        this.draggable_obj = $(".widget-item", parent.document).draggable({
          appendTo: 'parent.body',
          connectToSortable: this.field_class,
          helper: "clone",
          cursor: "move",
          cursorAt: {
            left: 0,
            top: 0
          },
          zIndex: 9999,
          iframeFix: true,
          start: (function(_this) {
            return function(e, ui) {
              _this.dragging = true;
            };
          })(this),
          stop: (function(_this) {
            return function(e, ui) {
              _this.dragging = false;
              _this.manager.disable_save();
              _this.add_content($(ui.helper));
            };
          })(this)
        }).click((function(_this) {
          return function(e) {
            if (!_this.drag_target) {
              _this.drag_target = $(e.target);
              _this.drag_target.data('uiDraggable')._mouseCapture(e, true);
              _this.drag_target.data('uiDraggable')._mouseStart(e, true, true);
            } else {
              _this.drag_target.data('uiDraggable')._mouseUp(e);
              _this.drag_target.data('uiDraggable')._mouseStop(e);
              _this.drag_target = null;
            }
            return false;
          };
        })(this));
        $(document).on('mousemove', ".susanoo-editable-field", (function(_this) {
          return function(e) {
            if (_this.drag_target) {
              return _this.drag_target.data('uiDraggable')._mouseDrag(e);
            }
          };
        })(this));
        $(this.field_class).click((function(_this) {
          return function(e) {
            if (_this.drag_target) {
              return _this.drag_target.trigger("click");
            }
          };
        })(this));
      }
      $("#accessibility-content").remove();
      $("body").append("<div id='accessibility-content' class='bootstrap'></div>");
      $(document).off('mouseenter', '.accessibility-popover');
      $(document).off('mouseleave', '.accessibility-popover');
      $(document).off('click', 'a');
      $(document).off('submit', 'form');
      $('.accessibility-popover').popover('destroy');
      $('.accessibility-popover').popover({
        html: true,
        trigger: "manual",
        container: "#accessibility-content"
      });
      $(document).on('mouseenter', '.accessibility-popover', function(e) {
        var h;
        h = 35 + $(this).attr('data-contentsize') * 30;
        $("#accessibility-content").height(h);
        return $(this).popover('show');
      });
      $(document).on('mouseleave', '.accessibility-popover', function(e) {
        return $(this).popover('hide');
      });
      $(document).on('click', 'a', function(e) {
        e.preventDefault();
        return false;
      });
      $(document).on('submit', 'form', function(e) {
        e.preventDefault();
        return false;
      });
      $('[onclick]').each(function() {
        return $(this).removeAttr('onclick');
      });
    };

    EditableField.prototype.add_content = function(element) {
      var c;
      if (element && element.is(".widget-item")) {
        c = new EditableContent(this.manager);
        c.create_on_drop(this, element);
      } else {
        $(element).remove();
      }
    };

    EditableField.prototype.html = function() {
      var clone;
      $('.accessibility-popover').popover('hide');
      clone = $(this.wrapper_id).clone();
      clone.find('.ui-sortable').each(function() {
        return $(this).removeClass('ui-sortable');
      });
      clone.find('.editable-control').each(function() {
        return $(this).remove();
      });
      clone.find('.editable').each(function() {
        $(this).css('position', '');
        return $(this).unwrap();
      });
      clone.removeAttr('data-content');
      clone.removeClass('accessibility-error-highlight');
      clone.find('.accessibility-error-highlight').each(function() {
        $(this).removeClass('accessibility-error-highlight');
      });
      return clone.html();
    };

    return EditableField;

  })();

  this.Visitor || (this.Visitor = {});

  this.Visitor.EditableField = new EditableField;

}).call(this);
