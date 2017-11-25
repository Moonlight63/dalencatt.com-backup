jQuery(window).load(function() {
    jQuery('[data-accordion-id]').each(function(index) {
        var mainContainer = jQuery(this);
        function openFirstPanel() {
            jQuery('> li:first-child div', jQuery(this)).addClass('active').css('opacity', 0).slideDown("slow").animate({ opacity: 1 }, {
                queue: false,
                duration: 'slow'
            });
            jQuery('> li:first-child', jQuery(this)).addClass('active').slideDown("slow").animate({ opacity: 1 }, {
                queue: false,
                duration: 'slow'
            });
            jQuery('> li:first-child .indicator span', jQuery(this)).text('-');
        }

        var allPanels = jQuery('li .accordion-item-content', jQuery(this)).hide();
        openFirstPanel();

        jQuery('> li', jQuery(this)).click(function() {
            var selectedItem = jQuery(this);
            var target = jQuery('.accordion-item-content', jQuery(this));

            if (target.hasClass('active')) {
                target.removeClass('active').slideUp("slow").animate({ opacity: 0 }, {
                    queue: false,
                    duration: 'slow'
                });
            } else {
                allPanels.removeClass('active').slideUp("slow").animate({ opacity: 0 }, {
                    queue: false,
                    duration: 'slow'
                });
                target.addClass('active').slideDown("slow").animate({ opacity: 1 }, {
                    queue: false,
                    duration: 'slow'
                });
            }
            if (selectedItem.hasClass('active')) {
                selectedItem.removeClass('active');
                jQuery('.indicator span', jQuery(this)).text('+');
            } else {
                jQuery('.accordion li', mainContainer).removeClass('active');
                jQuery('.indicator span', mainContainer).text('+');
                selectedItem.addClass('active');
                jQuery('.indicator span', jQuery(this)).text('-');
            }
            return false;
        });

    });
});

jQuery( ".accordion-item-content a" ).click(function( event ) {
    event.stopPropagation();
});

jQuery( ".accor-button" ).click(function( event ) {
    event.stopPropagation();
});
