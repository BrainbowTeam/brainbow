$(document).ready(function () {

    var keywordList = [];
    var movieList = [];

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    getGenres();

    /*countdown timer stuff*/
    function doneCounting() {
        console.log("done counting");
        $('#countdown').countdown('destroy');
    }


    function startCounting() {
        var now = new Date();
        now.setSeconds(now.getSeconds() + 60);

        $('#countdown').countdown({ until: now, format: 'S', compact: true, onExpiry: doneCounting });
    }


    /**** reset back to genre choice */
    function resetToGenre() {

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

    function displayMetaDeta() {


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

    function createInputs() {

        var titleArray = queryStr.MasterTitle.split("");

        console.log(titleArray.length);

        for (var i = 0; i < titleArray.length; i++) {

            if (titleArray[i] != " ") {
                //var inputString = '<input type="text" maxlength="1" id="mt_' + i + '">' + titleArray[i] + '</input>';
                var inputString = '<input type="text" maxlength="1" id="mt_' + i + '"></input>';
                $('#answer').append(inputString);
            } else {

                //if(jQuery.browser.mobile){
                if (isMobile.any()) {

                    $('#answer').append('</br>');

                } else {
                    $('#answer').append('<input type="text" maxlength="1" id="mt_blank" disabled>' + titleArray[i] + '</input>');
                }

            }

        }


        //auto-tab inputs
        $(':input').autotab_magic();
        var maxchars = 1;
        $('#input').keydown(function (e) {
            if ($(this).val().length >= 2) {
                $(this).val($(this).val().substr(0, maxchars));
            }
        });

        $('#input').keyup(function (e) {
            if ($(this).val().length >= 2) {
                $(this).val($(this).val().substr(0, maxchars));
            }
        });

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

        var apiUrl = 'http://brainbowrovicloud.azurewebsites.net/api/Values?typeofsearch=movie&filtercriteria=' + genre;
        $.ajax({
            url: apiUrl,
            dataType: 'jsonp',
            crossDomain: true,
            error: function (e) {
                console.log(e.message);
            },
            success: function (data) {

                //display meta data

                movieList = [];

                $.each(data.searchResponse.results, function (key, val) {
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
                //$('#answer').html(queryStr.MasterTitle);
                $('#clue_label').html(queryStr.castUri);
                createInputs();


            }
        });
    }


});