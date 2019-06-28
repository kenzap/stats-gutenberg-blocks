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

		if(year){temp += '<span style="'+$countdown.attr('data-t1')+'"><strong style="'+$countdown.attr('data-t0')+'">%Y</strong> '+yeart+'</span>';}
		if(month){temp += '<span style="'+$countdown.attr('data-t1')+'"><strong style="'+$countdown.attr('data-t0')+'">%m</strong> '+montht+'</span> ';}
		if(day){temp += '<span style="'+$countdown.attr('data-t1')+'"><strong style="'+$countdown.attr('data-t0')+'">%D</strong> '+dayt+'</span>';}
		if(hour){temp += '<span style="'+$countdown.attr('data-t1')+'"><strong style="'+$countdown.attr('data-t0')+'">%H</strong> '+hourt+'</span>';}
		if(minute){temp += '<span style="'+$countdown.attr('data-t1')+'"><strong style="'+$countdown.attr('data-t0')+'">%M</strong> '+minutet+'</span>';}
		if(second){temp += '<span style="'+$countdown.attr('data-t1')+'"><strong style="'+$countdown.attr('data-t0')+'">%S</strong> '+secondt+'</span>';}

		$countdown.countdown(finalDate, function(event) {
			var $this = $countdown.html(event.strftime(temp)
			);
		});
	});
}