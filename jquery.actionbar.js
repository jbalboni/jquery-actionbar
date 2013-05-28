(function($){
    'use strict';
    $.fn.actionbar = function(config) {
        function Menu($ab, menuItems) {
            var $menu = $ab.append("<menu/>").find("menu"),
                $overflowMenu = $ab.append("<menu class='overflow'/>").find("menu.overflow"),
                width = 0,
                item = null,
                menuWidth = 0,
                overflow = false,
                maxWidth = getSpace();
            function getSpace () {
                return $ab.width() - $ab.find('.up-button').width() - $ab.find('.title').width()-
                    $ab.find('.home-icon').width() - 40;
            }
            for (var i = 0; i < menuItems.length; i++) {
                item = $("<li><a href='javascript:void(0);'>" + (menuItems[i].icon ? "<img src='" + menuItems[i].icon + "'/>" : "") +
                    (menuItems[i].icon_only ? "" : menuItems[i].text)  + "</a></li>");
                $menu.append(item);
                width = item.width();
                if (overflow === true || menuWidth + width > maxWidth) {
                    $menu.find("li:last").remove();
                    $overflowMenu.append(item).find("img").remove();
                    overflow = true;
                } else {
                    menuWidth += width;
                }

            }
            if ($overflowMenu.find("li").size() === 0) {
                $(".actionbar .overflow-button").hide();
            }
            $(".overflow-button").on("click", function() {
                $(".actionbar menu.overflow").toggle();
            });
            $(document).on("click", function(evnt) {
                var $target = $(evnt.target);
                if (!$target.hasClass("overflow-button") &&
                    !$target.parent().hasClass("overflow-button")) {
                    $(".actionbar menu.overflow").hide();
                }
            });
        }
        function ActionBar(ab, title, overflow_icon) {
            //variable creation
            var $abElem = $(ab);
            this.menu = null;

            //set up
            $abElem.addClass('actionbar');
            $abElem.append("<span class=\"title\">" + title + "</span>");
            $abElem.append("<a href='javascript:void(0);' class='overflow-button'><img src=\"" + overflow_icon + "\"/></a>");

            //class methods
            this.createMenu = function (items) {
                this.menu = new Menu($abElem, items);
            };
            this.addHomeButton = function (icon) {
                $abElem.prepend("<a href='javascript:void(0);' class='home-button'><img class=\"home-icon\" src=\"" + icon + "\"/></a>");
            };
            this.addUpButton = function (icon) {
                $abElem.prepend("<a href='javascript:void(0);' class='up-button'><img class=\"up-icon\" src=\"" + icon + "\"/></a>");
            };
            this.setTitle = function (title) {
                $abElem.find(".title").html(title);
            };
        }

        //defaults
        $.extend(config, {
            show_home_icon: true,
            home_icon: 'images/ic_launcher.png',
            overflow_icon: 'images/ic_action_overflow.png',
            title: 'jQuery Actionbar'
        });
        return this.each(function(){
            var ab = new ActionBar(this, config.overflow_icon);

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
