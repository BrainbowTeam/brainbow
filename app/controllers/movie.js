﻿$(document).ready(function () {
   
     var keywordList = [];
     $.getJSON("app/stores/keywords.txt", function (data) {

         $.each(data.genres, function (key, val) {

             var queryStr = {
                 id: val.id,
                 name: val.name,
                 type: val.type
             };
             
             keywordList.push(queryStr);
             $('#selections').append('<div id="'+ val.id +'">'+ val.name +'</div>');
         });

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