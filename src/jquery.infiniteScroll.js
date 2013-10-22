/**
 * Your plugin name and a small description
 * Author: Sergey Glukhov, AnjLab (http://anjlab.com)
 * Version: 0.0.1
 */

(function($){

    $.fn.infiniteScroll = function(settings){
        var $this = $(this)
        if (!$this.length) {
            return $this;
        }

        var opts = $.extend({}, $.fn.infiniteScroll.defaults, settings);
        var currentScrollPage = 1;
        var scrollTriggered = 0;

        $this.find(opts.itemSelector + ':last').addClass('last-scroll-row');

        $(window).on('scroll', function() {
            var row = $('.last-scroll-row');
            if (row.length && !scrollTriggered && isScrolledIntoView(row)) {
                scrollTriggered = 1;
                triggerDataLoad();
            }
        });

        function isScrolledIntoView(elem) {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
            var elemTop = $(elem).offset().top;
            var elemBottom = elemTop + $(elem).height();
            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }

        function onDataLoaded(data) {
            var prev = $('.last-scroll-row');
            if (prev.length && data.length) {
                prev.after(data);
                prev.removeClass('last-scroll-row');
                $this.find(opts.itemSelector + ':last').addClass('last-scroll-row');
                scrollTriggered = 0;
            }
            if (jQuery.isFunction(opts.onDataLoaded)) {
                opts.onDataLoaded(currentScrollPage);
            }
        }

        function triggerDataLoad() {
            currentScrollPage += 1;
            if (jQuery.isFunction(opts.onDataLoading)) {
                opts.onDataLoading(currentScrollPage);
            }
            $.get(opts.dataPath + '?page=' + currentScrollPage)
                .always(onDataLoaded)
                .fail(function() {
                    if (jQuery.isFunction(opts.onDataError)) {
                        opts.onDataError(currentScrollPage);
                    }
                });
        }

        return this;
    }

    // plugin defaults - added as a property on our plugin function
    $.fn.infiniteScroll.defaults = {
        dataPath: null,
        itemSelector: '.item',
        onDataLoading: null, // function (page)
        onDataLoaded: null, // function (page)
        onDataError: null // function (page)
    }

})(jQuery);
