
$(document).ready(function(){


			$('#genre_Action').click(function(e) {
				// fix for firefox to get event click
				var e = window.event || e;
				var targ = e.target || e.srcElement;
				//alert('load my action data');
				displayMetaDeta();
			});




function displayMetaDeta(){

//hide selections
$('#selections').hide();
$('#user_messages').hide();


//show clues and answers
$('#clue').show();
$('#answer').show();


$('#clue_label').html('cast info goes here');




}


				
			});

	





