jQuery(window).load(function() {
    jQuery('[data-flippingcards-id]').each(function(index) {
        var main_container = jQuery(this);
        jQuery('.g-flippingcard', this).flip({
            axis: main_container.data('flippingcards-axis'),
            reverse: false,
            trigger: main_container.data('flippingcards-trigger'),
            speed: main_container.data('flippingcards-speed'),
            forceHeight: main_container.data('flippingcards-forceheight'),
            forceWidth: main_container.data('flippingcards-forcewidth'),
            autoSize: main_container.data('flippingcards-autosize'),
            front: '.g-flippingcards-front',
            back: '.g-flippingcards-back'
        }
        );
    });
});
