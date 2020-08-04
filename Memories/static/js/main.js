$(document).ready(function(){

	$(".story").mouseenter(function(){
		console.log("Story touched");
		$(this).addClass('zoom-animation');

	});
	$(".story").mouseleave(function(){
		console.log("Story touched");
		$(this).removeClass('zoom-animation');

	});

});