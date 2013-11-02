$(document).ready(function () {
    
    var keywordList = [];
    var movieList = [];

    getGenres();

    /*countdown timer stuff*/
    function doneCounting(){
        console.log("done counting");
        $('#countdown').countdown('destroy');
    }


    function startCounting(){
        var now = new Date();
        now.setSeconds(now.getSeconds() + 60);

        $('#countdown').countdown({until: now, format: 'S',compact: true, onExpiry: doneCounting});
    }
    

    /**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 **/
(function(a){jQuery.browser.mobile=/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);


     /**** reset back to genre choice */
    function resetToGenre () {

        doneCounting();

        //hide selections
        $('#selections').show();
        $('#user_messages').show();


        //show clues and answers
        $('#clue').hide();
        $('#answer').hide();
        $('#correct').hide();
        $('#hints').hide();
        $('#nav_button').hide();
    }


     /**** Show correct message and populate answer
    function showCorrect(){
    $('#correct').show();


    $('#correct_label').html('You are Correct!');

    }

    /**** Check text as user inputs
    $( "input" ).keyup(function() {
         console.log("i changed value");

       // checkAnswer();

    });*/

    /* display Movie info and hide genre choices*/

        function displayMetaDeta(){


    //grab the movie data
    //moviename and cast list and hint  

    //start counting
    startCounting();
    
    //hide selections
    $('#selections').hide();
    $('#user_messages').hide();


    //show clues and answers
    $('#clue').show();
    $('#answer').show();
    $('#correct').show();
    $('#hints').show();
    $('#nav_button').show();

    $('#hints').html('hint: my cast is...');
    $('#nav_button').html('next');
    $('#clue_label').html('cast info goes here');

        $('#nav_button').click(function (e) {
     // fix for firefox to get event click
     var e = window.event || e;
     var targ = e.target || e.srcElement;
   
        resetToGenre();
    
    });


            }



    /*split up movie name to inputs */

    function createInputs(){

      var titleArray=queryStr.MasterTitle.split("");

      console.log(titleArray.length);

      for (i=0; i<titleArray.length;i++){

        if(titleArray[i]!=" "){
            $('#answer').append('<input type="text" maxlength="1" id="mt_' + i + '">' + titleArray[i] + '</input>');  
        } else {
            
            if(jQuery.browser.mobile){

            $('#answer').append('</br>');

            }else{
            $('#answer').append('<input type="text" maxlength="1" id="mt_blank" disabled>' + titleArray[i] + '</input>');
            }

        }

      }


    //auto-tab inputs
    $(':input').autotab_magic();

    }


    function getGenres() {
        $.getJSON("app/stores/keywords.txt", function (data) {

            $.each(data.genres, function (key, val) {

                var queryStr = {
                    id: val.id,
                    name: val.name,
                    type: val.type
                };

                keywordList.push(queryStr);

            });

            var count = 1;
            var displayList = [];
            for (var i = 0; i < keywordList.length; i++) {
                var rand = keywordList[Math.floor(Math.random() * keywordList.length)];
                if ($.inArray(rand, displayList) === -1) {
                    displayList.push(rand);
                    $('#selections').append('<div id="' + rand.id + '">' + rand.name + '</div>');
                    count = count + 1;
                }

                if (count > 5)
                    break;
            }
            $('#selections div').click(function (e) {
                // fix for firefox to get event click
                var e = window.event || e;
                var targ = e.target || e.srcElement;
                //alert('load my action data');
                //displayMetaDeta();

                console.log($(targ).html());
                getMovie($(targ).html());
            });
        });
    }
     function getMovie(genre) {

         var apiUrl = 'http://brainbowweb.azurewebsites.net/api/Values?keyword=' + genre;
         $.ajax({
             url: apiUrl,
             dataType: 'jsonp',
             crossDomain: true,
             error: function(e) {
                 console.log(e.message);
             },
             success: function(data) {

                //display meta data

                 movieList = [];

                 $.each(data.searchResponse.results, function(key, val) {
                     queryStr = {
                         'MasterTitle': val.video.masterTitle,
                         'castUri': val.video.castUri
                     };
                     //alert('This is live title from API: ' + queryStr.MasterTitle);
                     movieList.push(queryStr);
                 });

                 console.log(movieList);
                    //display meta data

                    displayMetaDeta();
                    $('#answer').html(queryStr.MasterTitle);
                    $('#clue_label').html(queryStr.castUri);
                    createInputs();


             }
         });
     }
});