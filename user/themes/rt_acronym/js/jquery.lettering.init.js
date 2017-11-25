jQuery(document).ready(function() {
    jQuery(".g-headerlicious-header").lettering();

    jQuery( ".g-headerlicious-header a" ).click(function( event ) {
        event.stopPropagation();
    });
});
