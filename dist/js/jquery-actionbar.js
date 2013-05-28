/*! jQuery Actionbar - v0.1.0 - 2013-05-28
* https://github.com/jbalboni/jquery-actionbar
* Copyright (c) 2013 Jeff Balboni; Licensed MIT */
(function ($) {
  'use strict';
  $.fn.actionbar = function (config) {
    function Menu($ab, menuItems) {
      var $menu = $ab.append("<menu/>").find("menu"),
        $overflowMenu = $ab.append("<menu class='overflow'/>").find("menu.overflow"),
        getSpace = function () {
          return $ab.width() - $ab.find('.up-button').width() - $ab.find('.title').width() -
            $ab.find('.home-icon').width() - 70;
        },
        buildMenu = function (menuItems) {
          var width = 0,
            $item = null,
            menuWidth = 0,
            overflow = false,
            maxWidth = getSpace(),
            createMenuEl = function (icon, label, show_icon_only) {
              var labelHtml = "";
              if (typeof icon === "string" && icon !== "") {
                labelHtml = "<img src='" + icon + "'/>";
              }
              if (!show_icon_only) {
                labelHtml += "<span class='menu-label'>" + label + "</span>";
              }
              return $("<li><a href='javascript:void(0);'>" + labelHtml + "</a></li>");
            };

          $menu.html("");
          $overflowMenu.html("");

          for (var i = 0; i < menuItems.length; i++) {
            $item = createMenuEl(menuItems[i].icon, menuItems[i].label, menuItems[i].show_icon_only);
            $menu.append($item);
            width = $item.width();
            if (overflow === true || menuWidth + width > maxWidth) {
              $menu.find("li:last").remove();
              $overflowMenu.append($item).find("img").remove();
              overflow = true;
            } else {
              menuWidth += width;
            }
          }
          if (overflow === false) {
            $ab.find(".overflow-button").hide();
          } else {
            $ab.find(".overflow-button").css("display", "inline-block");
          }
        };

      //setup
      buildMenu(menuItems);

      //events
      $(".overflow-button").on("click", function () {
        $(".actionbar menu.overflow").toggle();
      });
      $(document).on("click", function (evnt) {
        var $target = $(evnt.target);
        if (!$target.hasClass("overflow-button") && !$target.parent().hasClass("overflow-button")) {
          $(".actionbar menu.overflow").hide();
        }
      });
      //TODO: does this work ok in all browsers?
      $(window).on("resize", function () {
        buildMenu(menuItems);
      });

      //class methods
      this.buildMenu = buildMenu;
    }

    function ActionBar(ab, title, overflow_icon) {
      //variable creation
      var $abElem = $(ab);
      this.menu = null;

      //set up
      $abElem.addClass('actionbar');
      $abElem.append("<span class=\"title\">" + title + "</span>");
      $abElem.append("<a href='javascript:void(0);' class='overflow-button'><img src=\"" + overflow_icon +
        "\"/></a>");

      //class methods
      this.createMenu = function (items) {
        this.menu = new Menu($abElem, items);
      };
      this.addHomeButton = function (icon) {
        $abElem.prepend("<a href='javascript:void(0);' class='home-button'><img class=\"home-icon\" src=\"" +
          icon + "\"/></a>");
      };
      this.addUpButton = function (icon) {
        $abElem.prepend("<a href='javascript:void(0);' class='up-button'><img class=\"up-icon\" src=\"" +
          icon + "\"/></a>");
      };
      this.setTitle = function (title) {
        $abElem.find(".title").html(title);
      };
    }

    //defaults
    config = $.extend({
      show_home_icon: false,
      overflow_icon: 'images/ic_action_overflow.png',
      title: 'jQuery Actionbar'
    }, config);
    return this.each(function () {
      var ab = new ActionBar(this, config.title, config.overflow_icon);

      if (config.show_up_icon) {
        ab.addUpButton(config.up_icon);
      }
      if (config.show_home_icon) {
        ab.addHomeButton(config.home_icon);
      }
      if (config.menu) {
        ab.createMenu(config.menu);
      }
      return {
        setTitle: ab.setTitle
      };
    });

  };
}(jQuery));

