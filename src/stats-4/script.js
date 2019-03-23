( function( $ ) {

		$(function() {
		
			// in case more than one occurance
			setTimeout(function(){

				launchBars($);

			},10);
	});

}( jQuery ) );

function launchBars($){

	$.fn.LineProgressbar = function (options) {

		options = $.extend({
		   percentage: null,
		   ShowProgressCount: true,
		   duration: 1000,

		   // Styling Options
		   fillBackgroundColor: '#000',
		   backgroundColor: '#ffffff',
		   radius: '0px',
		   height: '6px'
	   }, options);

	   $.options = options;
	   return this.each(function (index, el) {
		   // Markup
		   $(el).html('<div class="progressbar"><div class="proggress"><div style="color:'+options.fillBackgroundColor+'" class="percentCount"></div></div></div>');

		   var progressFill = $(el).find('.proggress');
		   var progressBar = $(el).find('.progressbar');

		   progressFill.css({
			   backgroundColor: options.fillBackgroundColor,
			   height: options.height,
			   borderRadius: options.radius
		   });
		   progressBar.css({
			   width: options.width,
			   backgroundColor: options.backgroundColor,
			   borderRadius: options.radius
		   });

		   // Progressing
		   progressFill.animate(
			   {
				   width: options.percentage + "%"
			   },
			   {
				   step: function (x) {
					   if (options.ShowProgressCount) {
						   $(el).find(".percentCount").text(Math.round(x) + "%");
					   }
				   },
				   duration: options.duration
			   }
		   );
		   ////////////////////////////////////////////////////////////////////
	   });
   }

   $.fn.progressTo = function (next) {

	   let options = $.options;
	   return this.each(function (index, el) {

		   var progressFill = $(el).find('.proggress');
		   var progressBar = $(el).find('.progressbar');

		   progressFill.animate(
			   {
				   width: next + "%"
			   },
			   {
				   step: function (x) {
					   if (options.ShowProgressCount) {
						   $(el).find(".percentCount").text(Math.round(x) + "%");
					   }
				   },
				   duration: options.duration
			   }
		   );
		   ////////////////////////////////////////////////////////////////////
	   });
    }

	$( '.kp-bar-1' ).each(function() {

		var $progress = $(this);
		$progress.LineProgressbar({
		  percentage: $progress.attr("data-percent"),
			height: $progress.attr("data-border"),
			backgroundColor: 'transparent',
			fillBackgroundColor: $progress.attr("data-color")
		});

	});
}