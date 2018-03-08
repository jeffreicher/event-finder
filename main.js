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
var concertVenues = [];
var ticketPrice = [];
var preformerNames =[];
/***************************************************************************************************
 * initializeApp
 * @params {undefined} none
 * @returns: {undefined} none
 * initializes the application, including adding click handlers and pulling in any data from the server, in later versions
 */
function initializeApp(){
    addClickHandlersToElements();
    // artistPictureDynamicCreation();

}

/***************************************************************************************************
 * addClickHandlerstoElements
 * @params {undefined}
 * @returns  {undefined}
 */
function addClickHandlersToElements(){
    $('.search-events').on('click', getDataFromTicketMaster);
}
// function artistPictureDynamicCreation() {
//     for(var i = 0; i<artistImg[1].length; i++){
//         var container = $(".left-bottom-col-3");
//         var imgContainer = $("<div>").append(artistImg[i][i]);
//         imgContainer.appendTo(container);
//     }
// }
function flickrImages(){
    // var flickrImages = {
    //     [img src =
    // } ]}
    var flickr_pic = $('<img>');
    //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    var img_src = "https://farm" + response_dummy.photos.photo[0].farm + ".staticflickr.com/" +   response_dummy.photos.photo[0].server + "/" + response_dummy.photos.photo[0].id +"_" + response_dummy.photos.photo[0].secret + ".jpg";
    flickr_pic.attr("src", img_src);
}
var response_dummy =
    {
        "photos": {
            "page": 1,
            "pages": 749,
            "perpage": 100,
            "total": "74856",
            "photo": [
                {
                    "id": "38798911820",
                    "owner": "150350703@N05",
                    "secret": "64482bf2ff",
                    "server": "4701",
                    "farm": 5,
                    "title": "A Master Guide to Collectives – For All Types of Denver Creatives",
                    "ispublic": 1,
                    "isfriend": 0,
                    "isfamily": 0
                },
                {
                    "id": "25734785827",
                    "owner": "31140271@N06",
                    "secret": "d26b5191dd",
                    "server": "4671",
                    "farm": 5,
                    "title": "Close Counters",
                    "ispublic": 1,
                    "isfriend": 0,
                    "isfamily": 0
                }
            ]
        }
    };
/* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/

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
        var venue = hiphop_array[i]._embedded.venues[0].name;
        concertVenues.push(venue);
        var names = hiphop_array[i]._embedded.attractions[0].name;
        preformerNames.push(names)
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
        // getPriceFromConcert()
}

// function getPriceFromConcert() {
//     for(var x=0; x<hiphop_array.length; x++){
//         var priceArray = [];
//         var minPrice = hiphop_array[x].priceRanges;
//         var maxPrice = hiphop_array[x].priceRanges;
//         priceArray.push(minPrice,maxPrice);
//         ticketPrice.push(priceArray);
//     }
//     getArtistImages();
// }
