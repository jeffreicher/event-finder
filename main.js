/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/***********************
 * hiphop_array - global array to hold hiphop info objects
 * @type {Array}
 */
var hiphop_array = [];
// var keyword ='electronic';
var artistInfo = [];
var artistImg = [];

 /***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
    addClickHandlersToElements();
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){     
   $('.search-events').on('click', getDataFromTicketMaster);   
}

function getDataFromTicketMaster () {
    var keyword = $('#genre')[0];
    keyword = keyword.options[keyword.selectedIndex].value;
    console.log(keyword);

    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events?apikey=tBBObsl2YtXpvAceOW6DOKwRtZpd8bxd&keyword="+keyword+"&countryCode=US&stateCode=Ca",
        dataType: "text",
        success: function (json_data) {
            var data = JSON.parse(json_data);
            console.log(data);
            for(var i =0; i < data._embedded.events.length; i++){
                var fesivalObjects = data._embedded.events[i];
                hiphop_array.push(fesivalObjects);
            }
            getArtistFromEvents();
            // Parse the response.
            // Do other things.
        },
        error: function (xhr, status, err) {
            // This time, we do not end up here!
        }
    });
}

function getArtistFromEvents() {
    for(var i=0; i<hiphop_array.length; i++){
        var attraction = hiphop_array[i]._embedded.attractions;
        artistInfo.push(attraction);
        }
        getArtistImages();
}

function getArtistImages (){
<<<<<<< HEAD
    for(var x=0; x<artistInfo.length; x++){
        // for()
        //     var img = [];
        //         artistInfo[x][0].images[0].url;
        //     artistImg.push(img);
        // // console.log(x)
=======
    for(var i=0; i<artistInfo.length; i++){
        var artistImgArray = [];
        for(var x=0; x<artistInfo[i].length; x++){
            var artistUrl = artistInfo[i][x].images[0].url;
            artistImgArray.push(artistUrl);
            }
        artistImg.push(artistImgArray);
>>>>>>> 8a7bf317ceaefe416476bc138c039870b22d85ff
        }
}