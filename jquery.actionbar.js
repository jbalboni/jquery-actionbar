(function($){
    $.fn.actionbar = function(config) {
        function ActionBarMenu($ab, menuItems) {
            var $menu = $ab.append("<menu/>").find("menu"),
                $overflowMenu = $ab.append("<menu class='overflow'/>").find("menu.overflow"),
                width = 0,
                item = null,
                menuWidth = 0,
                overflow = false,
                maxWidth = getSpace();
            function getSpace () {
                return $ab.width() - $ab.find('.back-button').width() - $ab.find('.title').width()
                    - $ab.find('.home-icon').width() - 40;
            }
            for (var i = 0; i < menuItems.length; i++) {
                item = $("<li><a href='#'>" + (menuItems[i].icon ? "<img src='" + menuItems[i].icon + "'/>" : "") +
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
                if (!$(evnt.target).hasClass("overflow-button") && !$(evnt.target).parent().hasClass("overflow-button")) {
                    $(".actionbar menu.overflow").hide();
                }
            });
        }
        function ActionBar(ab) {
            //variable creation
            var $abElem = $(ab);
            this.menu = null;

            //set up
            $abElem.addClass('actionbar');

            //class methods
            this.createMenu = function (items) {
                this.menu = new ActionBarMenu($abElem, items);
            }
            this.addHomeButton = function (icon) {
                $abElem.append("<a href='#' class='home-button'><img class=\"home-icon\" src=\"" + icon + "\"/></a>");
            };
            this.addTitle = function (title) {
                $abElem.append("<span class=\"title\">" + title + "</span>");
            };
            this.addOverflow = function (icon) {
                $abElem.append("<a href='#' class='overflow-button'><img src=\"" + icon + "\"/></a>");
            }
        }

        return this.each(function(){
            var ab = new ActionBar(this);

            ab.addHomeButton(config.home_icon);
            ab.addTitle(config.title);
            ab.addOverflow(config.overflow_icon);
            ab.createMenu(config.menu);

            return this;
        });

    };
}(jQuery));
