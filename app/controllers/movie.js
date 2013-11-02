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

            $('#selections div').click(function(e) {
                // fix for firefox to get event click
                var e = window.event || e;
                var targ = e.target || e.srcElement;
                //alert('load my action data');
                //displayMetaDeta();

                console.log($(targ).html());
                

            });

         }
         

     });
    
    var movieList = [];
     $.getJSON("app/stores/movie.txt", function (data) {
         var items = [];
         
         $.each(data.searchResponse.results, function (key, val) {
             items.push("<li id='" + key + "'>" + val.video.masterTitle + ":" + val.video.castUri + "</li>");
             var queryStr = {
                 'MasterTitle': val.video.masterTitle,
                 'castUri': val.video.castUri
             };
             movieList.push(queryStr);
         });

     });

     
     
    
    //$.ajax({
    //    url: 'http://www.google.com',
    //    success: function (data) {

    //        console.log(data);

    //        /*

    //         //add mso list to dropdown
    //            $.each("data path goes here", function(index, value) {
    //                $('#mylist').append(
    //                        '<option value="' + this.id + '">'
    //                        + this.name + '</div>')
    //            });

    //            $('#mylist').show();*/

    //    },
    //    error: function (data) {
    //        alert("Unfortunately, we have run into an issue, please contact the help desk");
    //    }
    //});
    
});