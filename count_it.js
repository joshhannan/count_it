/*
	Built referencing: http://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
*/
jQuery.noConflict();

jQuery(function($) {
	$.fn.count_it = function( options ) {
		var settings = $.extend({
		}, options );
		var i = 0;
		var object = $(this);
		var obj;
		var object_count = object.length;
		object.each(function() {
			i++;
			$( this ).attr( 'id', 'ip-counter-'+i );
			var endtime = $( this ).data( 'enddate' );
			var timeObj = getTimeRemaining( endtime );
			if( timeObj.total > 0 ) {
				if( timeObj.days > 0 ) {
					$(this).append('<div class="ip-block ip-counter-content"><div class="unit quarter days"><div class="number">'+timeObj.days+'</div><div class="type">Days</div></div><!--/days--><div class="unit quarter hours"><div class="number">'+timeObj.hours+'</div><div class="type">Hours</div></div><!--/hours--><div class="unit quarter minutes"><div class="number">'+timeObj.minutes+'</div><div class="type">Minutes</div></div><!--/minutes--><div class="unit quarter seconds"><div class="number">'+timeObj.seconds+'</div><div class="type">Seconds</div></div><!--/seconds--></div><!--/ip-counter-content-->');
				} else {
					$(this).append('<div class="ip-counter-content"><div class="unit third hours"><div class="number">'+timeObj.hours+'</div><div class="type">Hours</div></div><!--/hours--><div class="unit third minutes"><div class="number">'+timeObj.minutes+'</div><div class="type">Minutes</div></div><!--/minutes--><div class="unit third seconds"><div class="number">'+timeObj.seconds+'</div><div class="type">Seconds</div></div><!--/seconds--></div><!--/ip-counter-content-->');
				}
			} else {
				$(this).append( '<div class="ip-counter-content"><p>No Valid End Date.</p></div><!--/ip-counter-content-->' );
			}
		});
		for( n = 1; n <= object_count; n++ ) {
			var object_id = '#ip-counter-'+n;
			var object_enddate = $( object_id ).data( 'enddate' );
			initializeClock( object_id, object_enddate );
		}
		return this;
	};
	function getTimeRemaining( endtime ) {
		var t = Date.parse( endtime ) - Date.parse( new Date() );
		var seconds = Math.floor((t / 1000) % 60);
		var minutes = Math.floor((t / 1000 / 60) % 60);
		var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		var days = Math.floor(t / (1000 * 60 * 60 * 24));
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function initializeClock(id, endtime){
		var timeinterval = setInterval(function(){
			var t = getTimeRemaining(endtime);
			$(id+' .days .number').text( t.days );
			$(id+' .hours .number').text( t.hours );
			$(id+' .minutes .number').text( t.minutes );
			$(id+' .seconds .number').text( t.seconds );
			if(t.total<=0){
				$('.ip-counter-content').html('<h6>The submission period has ended.</h6>');
				clearInterval(timeinterval);
			}
		},1000);
	}

}(jQuery));