( function( $ ) {

		$(function() {
		
			// in case more than one occurance
			setTimeout(function(){

				launchCircle($);

			},100);
	});

}( jQuery ) );

function launchCircle($){

	$( '.kp-circle' ).find('.kp-rem').remove();
	$( '.kp-circle' ).each(function() {

		var $circle = $( this );
		$circle.circleProgress({
			fill: $circle.attr('data-color'),
			size: $circle.attr('data-size'),
			thickness: $circle.attr('data-border'),
			emptyFill: "#f7f7f7",
			startAngle: 4.7
			})
		.on('circle-animation-progress', function(event, progress, stepValue ) {
			$(this).find('strong').html(Math.round(stepValue * 100) + '<span>%</span>');
		});

	});
}