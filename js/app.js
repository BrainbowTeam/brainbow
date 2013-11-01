
$(document).ready(function(){

doubleSecretApiKey="kdnnwrs9su37a4mejftcfpun";
doubleSecretSecret="9Wq9VF6XqB";


function genSig(apikey,secret) {
    //var apikey = "kdnnwrs9su37a4mejftcfpun";
    //var secret = "9Wq9VF6XqB";
    var curdate = new Date();
    var gmtstring = curdate.toGMTString();
    var utc = Date.parse(gmtstring) / 1000;
    return hex_md5(apikey + secret + utc);
}

didit=genSig(doubleSecretApiKey,doubleSecretSecret);


console.log(didit);

// initialize


//split url to get correct server 
	
/*
	var currenturl = $(location).attr('href');

	var splitUrl=currenturl.split('://');
	var scheme = splitUrl[0];
	var serverName=splitUrl[1].split('/')[0];

	myUrl = scheme + '://' + serverName + '';

	*/	//make the call
			$.ajax({				
				 url: 'http://api.rovicorp.com/search/v2.1/video/search?entitytype=movie&query=hanks&rep=1&size=20&offset=0&language=en&country=US&format=json&apikey='+ doubleSecretApiKey + '&sig='+ didit,
				 dataType: 'json',
				 success: function( data ) {

				 	console.log(data);

				 	/*

					 //add mso list to dropdown
						$.each("data path goes here", function(index, value) {
							$('#mylist').append(
									'<option value="' + this.id + '">'
									+ this.name + '</div>')
						});

						$('#mylist').show();*/
						
				 },
				 error: function( data ) {
					alert("Unfortunately, we have run into an issue, please contact the help desk");
				 }
				});

			// check strings
		/*	function validateStringCheck(string) {
				if (string == "") {
					string = "empty";
				}
				return string;
			}


*/

				
			});

	

//validate url and change element background according to validity

function validateUrls(urlIn,idIn){
	
	if(urlIn!=""){
	var url = urlIn;
	url_validate = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	if(!url_validate.test(url)){
	   console.log('error');

	   
	}
	else{
	   console.log('success');

	}
	}
	
}



 //convert rgb to hex 
 // props to http://stackoverflow.com/questions/1740700/how-to-get-hex-color-value-rather-than-rgb-value
 function rgb2hex(rgb) {
	    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	    function hex(x) {
	        return ("0" + parseInt(x).toString(16)).slice(-2);
	    }
	    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}
 







