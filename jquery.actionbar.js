(function($){
    $.fn.actionbar = function(config) {
        function getMenuSpace($el) {
            return $el.width() - $el.find('.back-button').width() - $el.find('.title').width()
                - $el.find('.home-icon').width() - 40;
        }
        return this.each(function(){
            var $ab = $(this),
                menu = config.menu,
                menuEl = $ab.append("<menu/>").find("menu"),
                overflowMenuEl = $ab.append("<menu class='overflow'/>").find("menu.overflow"),
                item = null,
                width = 0,
                menuWidth = 0,
                maxWidth = $ab.width(),
                overflow = false;

            $ab.addClass('actionbar');
            $ab.append("<a href='#' class='home-button'><img class=\"home-icon\" src=\"" + config.home_icon + "\"/></a>");
            $ab.append("<span class=\"title\">" + config.title + "</span>");
            $ab.append("<a href='#' class='overflow-button'><img src=\"" + config.overflow_icon + "\"/></a>");
            maxWidth = getMenuSpace($ab);

            for (var i = 0; i < menu.length; i++) {
                item = $("<li><a href='#'>" + (menu[i].icon ? "<img src='" + menu[i].icon + "'/>" : "") +
                    (menu[i].icon_only ? "" : menu[i].text)  + "</a></li>");
                menuEl.append(item);
                width = item.width();
                if (overflow === true || menuWidth + width > maxWidth) {
                    menuEl.find("li:last").remove();
                    overflowMenuEl.append(item).find("img").remove();
                    overflow = true;
                } else {
                    menuWidth += width;
                }

            }
            if (overflowMenuEl.find("li").size() === 0) {
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
            return this;
        });

    };
}(jQuery));
