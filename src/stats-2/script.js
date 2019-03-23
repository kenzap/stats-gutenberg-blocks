( function( $ ) {

		$(function() {

			// in case more than one occurance
			setTimeout(function(){

				launchCounter($);

			},100);
	});

}( jQuery ) );

function launchCounter($){

	$( '.kp-counter-val' ).each(function() {

		var $counter = $( this ), delay = $(this).parent().parent().parent().parent().attr('data-delay'), time = $(this).parent().parent().parent().parent().attr('data-time');
		$counter.counterUp({
			delay: parseInt(delay),
			time: parseInt(time)
		});
	});
}