jQuery(window).ready(function() {
    jQuery('[data-headertabs]').each(function(index) {
        if ((jQuery(this).attr('data-headertabs-animation') == 'up') || (jQuery(this).attr('data-headertabs-animation') == 'down') || (jQuery(this).attr('data-headertabs-animation') == 'left') || (jQuery(this).attr('data-headertabs-animation') == 'right')) {
            jQuery(this).tabs({
                show: {
                    effect: jQuery(this).attr('data-headertabs-animation'),
                    direction: jQuery(this).attr('data-headertabs-animation'),
                    duration: jQuery(this).attr('data-headertabs-duration')
                }
            });
        } else {
            jQuery(this).tabs({
                show: {
                    effect: jQuery(this).attr('data-headertabs-animation') || 'slide',
                    duration: jQuery(this).attr('data-headertabs-duration') || '500'
                }
            });
        }
    });
});
