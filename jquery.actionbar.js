(function($){
    $.fn.actionbar = function(config) {
        return this.each(function(){
            var ab = $(this),
                menu = config.menu,
                menuEl = ab.append("<menu/>").find("menu"),
                overflowMenuEl = ab.append("<menu class='overflow'/>").find("menu.overflow"),
                item = null,
                width = 0;
            ab.addClass('actionbar');
            menuWidth = 0,
                maxWidth = ab.width() * .4,
                overflow = false;
            ab.append("<img class=\"home-icon\" src=\"" + config.home_icon + "\"/>");
            ab.append("<span class=\"title\">" + config.title + "</span>");
            ab.append("<img class=\"overflow-button\" src=\"" + config.overflow_icon + "\"/>");
            for (var i = 0; i < menu.length; i++) {
                item = $("<li><a href='#'>" + (menu[i].icon ? "<img src='" + menu[i].icon + "'/>" : "") + (menu[i].icon_only ? "" : menu[i].text)  + "</a></li>");
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
            return this;
        });

    };
}(jQuery));
