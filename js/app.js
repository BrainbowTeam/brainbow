
$(document).ready(function(){


$(':input').autotab_magic();


var youAreCorrect=false;



			$('#genre_Action').click(function(e) {
				// fix for firefox to get event click
				var e = window.event || e;
				var targ = e.target || e.srcElement;
				//alert('load my action data');
				displayMetaDeta();
			});



$( "input" ).keyup(function() {
 console.log("i changed value");

checkAnswer();

});


function displayMetaDeta(){

//hide selections
$('#selections').hide();
$('#user_messages').hide();


//show clues and answers
$('#clue').show();
$('#answer').show();
$('#correct').show();


$('#clue_label').html('cast info goes here');




}




function resetToGenre () {
	//hide selections
$('#selections').show();
$('#user_messages').show();


//show clues and answers
$('#clue').hide();
$('#answer').hide();
$('#correct').hide();
}

function showCorrect(){
$('#correct').show();
$('#correct_label').html('You are Correct!');



}


function checkAnswer () {


console.log($("#a_1").val()); 

if($("#a_1").val() == "Q"){

showCorrect();

//resetToGenre();

}

	
}

				
			});

	





