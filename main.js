/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/***********************
 * hiphop_array - global array to hold hiphop info objects
 * @type {Array}
 */
var hiphop_array = [];
var keyword ='electronic';
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
     getDataFromTicketMaster(keyword);
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){     
   
}

function getDataFromTicketMaster (keyword) {
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events?apikey=tBBObsl2YtXpvAceOW6DOKwRtZpd8bxd&keyword="+keyword+"&countryCode=US&stateCode=Ca",
        dataType: "text",
        success: function (json) {
            json = JSON.parse(json);
            for(var i =0; i < json._embedded.events.length; i++){
                var fesivalObjects = json._embedded.events[i];
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
    for(var i=0; i<artistInfo.length; i++){
        var artistImgArray = [];
        for(var x=0; x<artistInfo[i].length; x++){
            var artistUrl = artistInfo[i][x].images[0].url;
            artistImgArray.push(artistUrl);
            }
        artistImg.push(artistImgArray);
        }
}