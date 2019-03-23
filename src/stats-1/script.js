( function( $ ) {

		$(function() {

			// in case more than one occurance
			setTimeout(function(){

				launchCountdown($);

			},100);
	});

}( jQuery ) );

function launchCountdown($){

	$( '.kp-countdown' ).each(function() {

		var $countdown = $( this ), finalDate = $(this).attr('data-time'), year = $(this).data('year'), month = $(this).data('month'), day = $(this).data('day'), minute = $(this).data('minute'), hour = $(this).data('hour'), second = $(this).data('second');

		finalDate = finalDate.replace("T", " ");
		finalDate = finalDate.replace("-", "/");
		finalDate = finalDate.replace("-", "/");

		var year = $countdown.data('year'), month =$countdown.data('month'), day = $countdown.data('day'), minute = $countdown.data('minute'), hour = $countdown.data('hour'), second = $countdown.data('second');
		var yeart = $countdown.data('yeart'), montht =$countdown.data('montht'), dayt = $countdown.data('dayt'), minutet = $countdown.data('minutet'), hourt = $countdown.data('hourt'), secondt = $countdown.data('secondt');
		
		var temp = '';

		if(year){temp += '<span><strong>%Y</strong> '+yeart+'</span>';}
		if(month){temp += '<span><strong>%m</strong> '+montht+'</span> ';}
		if(day){temp += '<span><strong>%D</strong> '+dayt+'</span>';}
		if(hour){temp += '<span><strong>%H</strong> '+hourt+'</span>';}
		if(minute){temp += '<span><strong>%M</strong> '+minutet+'</span>';}
		if(second){temp += '<span><strong>%S</strong> '+secondt+'</span>';}

		$countdown.countdown(finalDate, function(event) {
			var $this = $countdown.html(event.strftime(temp)
			);
		});
	});
}