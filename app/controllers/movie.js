$(document).ready(function () {

    var keywordList = [];
    var movieList = [];
    var messageList = [];

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
    window.addEventListener("load", function() {
        // Set a timeout...
        setTimeout(function() {
            // Hide the address bar!
            window.scrollTo(0, 1);
        }, 0);
    });

    getGenres();
    getMessages();
    
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
        $('#correct_label').hide();
        $('#hints').hide();
        $('#nav_button').hide();
        $('footer').hide();
        $('#show_answer').hide();
        $('#selected_genre').hide();
        //getGenres();
    }


    
    function showCorrect() {
        var rand = messageList[Math.floor(Math.random() * messageList.length)];
        $('#correct').show();

        $('#correct_label').show();
        $('#correct_label').html(rand.name);

    }


    /* display Movie info and hide genre choices*/

    function displayMetaDeta() {


        //grab the movie data
        //moviename and cast list and hint  

        //start counting
        //startCounting();

        //hide selections
        $('#selections').hide();
        $('#user_messages').hide();


        //show clues and answers
        $('#clue').show();
        $('#answer').show();
        $('#correct').show();
        $('#correct_label').show();
        $('#hints').show();
        $('#nav_button').show();
        $('footer').show();
        $('#selected_genre').show();
         $('#show_answer').show();

        $('#hints').html('the cast:');
        $('#nav_button').html('next');
        $('#show_answer').html('show answer');


        $('#selected_genre').html(pickedGenre);

        $('#nav_button').click(function (e) {
            // fix for firefox to get event click
            var e = window.event || e;
            var targ = e.target || e.srcElement;


            resetToGenre();
            getGenres();

        });

    $('#show_answer').click(function (e) {
            // fix for firefox to get event click
            var e = window.event || e;
            var targ = e.target || e.srcElement;

            displayAnswer();

        });


    }

    function getGenres() {
        $('#selections div').remove();
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
                $('#loader').show();
                //hide selections
                $('#selections').hide();
                $('#user_messages').hide();
                
                console.log($(targ).html());
                pickedGenre=$(targ).html();

                getMovie($(targ)[0].id);
                
            });
        });
    }

    function getMessages() {
        $.getJSON("app/stores/messages.txt", function (data) {

            $.each(data.messages, function (key, val) {

                messageList.push(val);

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
                getMovie(genre);
            },
            success: function (data) {

                //display meta data

                movieList = [];

                $.each(data.searchResponse.results, function (key, val) {
                    var queryStr = {
                        'MasterTitle': val.movie.title,
                        'castList': val.movie.cast
                    };
                    //alert('This is live title from API: ' + queryStr.MasterTitle);
                    movieList.push(queryStr);
                });
                var randId = 0;
                if (movieList[randId].castList != null) {
                    console.log(movieList);

                   // alert(movieList[randId].MasterTitle);
                    //display meta data

                    displayMetaDeta();
                    //$('#answer').html(queryStr.MasterTitle);
                    $('#clue_label').html(movieList[randId].castUri);
                    createInputs(movieList[randId]);

                    loadCast(movieList[randId].castList);
                    

                    $('#loader').hide();
                    $('#correct_label').hide();
                } else
                    getMovie(genre);
                
            }
        });
    }
    /*split up movie name to inputs */

    function createInputs(queryStr) {

        var titleArray = queryStr.MasterTitle.split("");

        console.log(titleArray.length);
        $('#answer input').remove();
        $('#answer input').removeClass();
        for (var i = 0; i < titleArray.length; i++) {

            if (titleArray[i] != " ") {
                var inputString = '';
                if (isAlphaNumeric(titleArray[i]) === false) {
                    inputString = '<input type="text" maxlength="1" id="mt_' + i + '" style="background-color:#98ACC8; color:#fff;" value="' + titleArray[i] + '"></input>';
                } else {
                    inputString = '<input type="text" maxlength="1" id="mt_' + i + '"></input>';
                }

                $('#answer').append(inputString);

            } else {

                //if(jQuery.browser.mobile){
                if (isMobile.any()) {

                    $('#answer').append('</br>');

                }
                $('#answer').append('<input type="text" maxlength="1" id="mt_blank" disabled>' + titleArray[i] + '</input>');

            }
        }
        $(':input').autotab_magic();
        var maxchars = 1;
        $(':input').keydown(function (e) {
            if ($(this).val().length >= 2) {
                $(this).val($(this).val().substr(0, maxchars));
            }
        });

        $(':input').keyup(function (e) {
            if ($(this).val().length >= 2) {
                $(this).val($(this).val().substr(0, maxchars));
            }
            validateInput(this);
        });
    }

    function loadCast(castList) {
        if (castList != null) {
            var castNameRole = '';
            var castLength = 6;
            if (castList.length < castLength)
                castLength = castList.length;
            $('#clue_label div').remove();
            for (var ca = 0; ca < castLength; ca++) {
                if (ca === 0)
                    castNameRole = '<td id="cast" imgSrc="' + castList[ca].thumbnail + '">' + castList[ca].name + "</td>";
                else {
                    castNameRole = castNameRole + ' ● ' + '<td id="cast" imgSrc="' + castList[ca].thumbnail + '">' + castList[ca].name + "</td>";
                }
            }            
            $('#clue_label').append('<div id="castmember_' + ca + '">' + castNameRole + '</div>');
            
        }
    }


//auto-tab inputs
    
    function validateInput(input) {
        var arrayId = input.id.replace('mt_', '');
        var inputValue = input.value;        
        var originalValue = movieList[0].MasterTitle.split("")[arrayId];
        
        if(inputValue.toString().toLowerCase() === originalValue.toString().toLowerCase()) {
            $(input).css("background-color", '#98ACC8');
            $(input).css("color", '#fff');
        } else {
            $(input).css("background-color", '#fff');
            $(input).css("color", '#F00');
        }
        checkAnswer();
    }

    function checkAnswer() {
        var inputs = $('#answer input');
        var allInputsValid = true;
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].id != "mt_blank") {
                var color = $(inputs[i]).css("background-color");
                if (color != 'rgb(152, 172, 200)') {
                    allInputsValid = false;
                    break;
                }
            }
        }
        if (allInputsValid === true) {
            showCorrect();
        }
    }

    function displayAnswer() {
        var inputs = $('#answer input');        
        var allInputsValid = true;
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            
            if (input.id != "mt_blank") {
                $(input).css("background-color", '#98ACC8');
                $(input).css("color", '#fff');
                input.value = movieList[0].MasterTitle.split("")[i];
            }
        }
    }
    
    function isAlphaNumeric(x) {
        
        var regex = /^[a-zA-Z0-9]+$/g;

        if (regex.test(x)) {
            return true;
        } else
            return false;
    }
});