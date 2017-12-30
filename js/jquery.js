$(document).ready(function(){

	$('.startGame-p').on('click', function () {
		$('.startGame-div').addClass('none');
		$('.gameBegin').removeClass('none');
	});

	$('.gameOver-p').on('click', function (){
		$('.gameOver-div').addClass('none');
		$('.gameBegin').removeClass('none');
	});

});