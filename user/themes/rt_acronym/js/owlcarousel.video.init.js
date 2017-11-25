jQuery(document).ready(function() {
    jQuery('[data-owlcarousel-id]').each(function(index) {
        var container = jQuery( this );
        container.find('.video').each(function(index) {
            var vcontainer = jQuery( this );
            jQuery( this ).find('.owl-videolocal-play-icon').click(function() {
                jQuery( this ).toggleClass('paused')
                jQuery('video', vcontainer )[0].paused ? jQuery('video', vcontainer )[0].play() : jQuery('video', vcontainer )[0].pause();
            });
        });

    });
});
