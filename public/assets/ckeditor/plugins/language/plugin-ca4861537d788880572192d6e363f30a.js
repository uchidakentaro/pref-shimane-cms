"use strict";!function(){var e="span[!lang]",n="span[lang]";CKEDITOR.plugins.add("language",{requires:"menubutton",lang:"ja,en",icons:"language",hidpi:!0,init:function(a){var t,l,g,r,u=a.config.language_list||["ar:Arabic:rtl","fr:French","es:Spanish"],o=this,i=a.lang.language,T={};for(a.addCommand("language",{allowedContent:e,requiredContent:n,contextSensitive:!0,exec:function(e,n){var a=T["language_"+n];a&&e[a.style.checkActive(e.elementPath())?"removeStyle":"applyStyle"](a.style)},refresh:function(e){this.setState(o.getCurrentLangElement(e)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF),this.fire("state")}}),r=0;r<u.length;r++)t=u[r].split(":"),l=t[0],g="language_"+l,T[g]={label:t[1],langId:l,group:"language",order:r,ltr:"rtl"!=(""+t[2]).toLowerCase(),onClick:function(){a.execCommand("language",this.langId)}},T[g].style=new CKEDITOR.style({element:"span",attributes:{lang:l}});T.language_remove={label:i.remove,group:"language_remove",state:CKEDITOR.TRISTATE_DISABLED,order:T.length,onClick:function(){var e=o.getCurrentLangElement(a);e&&a.execCommand("language",e.getAttribute("lang"))}},a.addMenuGroup("language",1),a.addMenuGroup("language_remove"),a.addMenuItems(T),a.ui.add("language",CKEDITOR.UI_MENUBUTTON,{label:i.button,allowedContent:e,requiredContent:n,toolbar:"bidi,30",command:"language",onMenu:function(){var e={},n=o.getCurrentLangElement(a);for(var t in T)e[t]=CKEDITOR.TRISTATE_OFF;return e.language_remove=n?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,n&&(e["language_"+n.getAttribute("lang")]=CKEDITOR.TRISTATE_ON),e}})},getCurrentLangElement:function(e){var n,a,t=e.elementPath(),l=t&&t.elements;if(t)for(var g=0;g<l.length;g++)n=l[g],!a&&"span"==n.getName()&&n.hasAttribute("lang")&&(a=n);return a}})}();