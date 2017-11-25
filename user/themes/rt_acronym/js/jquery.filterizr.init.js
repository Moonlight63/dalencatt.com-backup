jQuery('[data-productlist-id]').each(function(index) {
    var product_container = jQuery('#' + this.id + ' .g-productlist-container');
    var productlist_categories = jQuery('#' + this.id + ' .g-productlist-categories li');
    var main_container = jQuery('#' + this.id);

    // Synchronize with demo presets ie: preset1 = filter1, preset2 = filter2 etc..
    if (jQuery(this).attr('data-productlist-demosync')) {
        var options = {
            filter: jQuery(this).attr('data-productlist-demosync'),
            layout: 'sameWidth', //See layouts
            delay: 20,
            delayMode: 'progressive'
        }
        productlist_categories.removeClass('active');
        jQuery('.g-productlist-categories li:eq(' + (jQuery(this).attr('data-productlist-demosync') - 1) + ')', this).addClass('active');
    } else {
        // Revert to default configuration
        var options = {
            layout: 'sameWidth', //See layouts
            filter: '1',
            delay: 20,
            delayMode: 'progressive'
        }
    }

    jQuery(function() {

        var $btn = jQuery('.g-productlist-categories .g-productlist-categories-toggle', main_container);
        var $vlinks = jQuery('.g-productlist-categories .visible-links', main_container);
        var $hlinks = jQuery('.g-productlist-categories .hidden-links', main_container);

        var numOfItems = 0;
        var totalSpace = 0;
        var closingTime = 1000;
        var breakWidths = [];

        // Get initial state
        $vlinks.children().outerWidth(function(i, w) {
            totalSpace += w;
            numOfItems += 1;
            breakWidths.push(totalSpace);
        });

        var availableSpace, numOfVisibleItems, requiredSpace, timer;

        function check() {

            // Get instant state
            availableSpace = $vlinks.width() - 10;
            numOfVisibleItems = $vlinks.children().length;
            requiredSpace = breakWidths[numOfVisibleItems - 1];

            // There is not enought space
            if (requiredSpace > availableSpace) {
                $vlinks.children().last().prependTo($hlinks);
                numOfVisibleItems -= 1;
                check();
                // There is more than enough space
            } else if (availableSpace > breakWidths[numOfVisibleItems]) {
                $hlinks.children().first().appendTo($vlinks);
                numOfVisibleItems += 1;
                check();
            }
            // Update the button accordingly
            $btn.attr("count", numOfItems - numOfVisibleItems);
            if (numOfVisibleItems === numOfItems) {
                $btn.addClass('hidden');
            } else $btn.removeClass('hidden');
        }

        // Window listeners
        jQuery(window).resize(function() {
            check();
        });

        $btn.on('click', function() {
            $hlinks.toggleClass('hidden');
            clearTimeout(timer);
        });

        $hlinks.on('mouseleave', function() {
            // Mouse has left, start the timer
            timer = setTimeout(function() {
                $hlinks.addClass('hidden');
            }, closingTime);
        }).on('mouseenter', function() {
            // Mouse is back, cancel the timer
            clearTimeout(timer);
        })

        check();

    });

    // Wait till images are being loaded
    jQuery(this).imagesLoaded()
    .always( function( instance ) {
        // show the container
        product_container.css("opacity", "1");
        // Initiate every instance of filterizr

        var filterizd = product_container.filterizr(options);

        //Simple layout controls
        var productlist_layouts = jQuery('.g-productlist-layouts li', main_container);

        //Simple category controls
        jQuery('.g-productlist-categories li', main_container).click(function() {
            productlist_categories.removeClass('active');
            jQuery(this).addClass('active');
            filterizd.filterizr('filter', jQuery(this).data('filter'));
        });

        jQuery('.g-productlist-layouts li', main_container).click(function() {
            if (jQuery(this).attr('data-layout') == 'sameWidth' ) {
                productlist_layouts.removeClass('active');
                jQuery(this).addClass('active');
                product_container.addClass('g-productlist-layout-samewidth');
                product_container.removeClass('g-productlist-layout-vertical');
                filterizd.filterizr('setOptions', {layout: 'sameWidth'});
                filterizd.filterizr('sort', 'domIndex', 'asc');
            }
            if (jQuery(this).attr('data-layout') == 'vertical' ) {
                productlist_layouts.removeClass('active');
                jQuery(this).addClass('active');
                product_container.addClass('g-productlist-layout-vertical');
                product_container.removeClass('g-productlist-layout-samewidth');
                filterizd.filterizr('setOptions', {layout: 'vertical'});
                filterizd.filterizr('sort', 'domIndex', 'asc');
            }
        });
    })


});
