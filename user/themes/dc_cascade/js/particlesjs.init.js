jQuery(document).ready(function() {
    jQuery('[data-particlesjs-id]').each(function(index) {
        particlesJS.load(jQuery(this).attr('id'), jQuery(this).attr('data-particlesjs-path'), function() {});
    });
});
