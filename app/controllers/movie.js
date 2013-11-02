$(document).ready(function () {
    
     var keywordList = [];
     $.getJSON("app/stores/keywords.txt", function (data) {

         $.each(data.genres, function (key, val) {

             var queryStr = {
                 id: val.id,
                 name: val.name,
                 type: val.type
             };
             
             keywordList.push(queryStr);
             
         });

         for (var i = 0; i < 5; i++) {
             var rand = keywordList[Math.floor(Math.random() * keywordList.length)];
             
             $('#selections').append('<div id="' + rand.id + '">' + rand.name + '</div>');

            
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
    
    var movieList = [];


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

                 movieList = [];

                 $.each(data.searchResponse.results, function(key, val) {
                     var queryStr = {
                         'MasterTitle': val.video.masterTitle,
                         'castUri': val.video.castUri
                     };
                     alert('This is live title from API: ' + queryStr.MasterTitle);
                     movieList.push(queryStr);
                 });
             }
         });
     }
});