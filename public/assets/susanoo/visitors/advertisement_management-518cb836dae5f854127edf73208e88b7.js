function getElement(e){return document.getElementById?document.getElementById(e):document.all?document.all[e]:void 0}function initBannerAd(){console.log("test");var e=getElement("header_banner_image"),t=getElement("header_banner_anchor");if(e&&t){console.log("test");var n=Math.floor(Math.random()*BANNERS.length);e.setAttribute("src",BANNERS[n].image),e.setAttribute("alt",BANNERS[n].alt),t.setAttribute("href",BANNERS[n].url)}}$(function(){initBannerAd()});