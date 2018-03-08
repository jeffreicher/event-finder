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

/***************************************************************************************************
 * initializeApp
 * @params {undefined} none
 * @returns: {undefined} none
 * initializes the application, including adding click handlers and pulling in any data from the server, in later versions
 */
function initializeApp() {
    addClickHandlersToElements();
}

/***************************************************************************************************
 * addClickHandlerstoElements
 * @params {undefined}
 * @returns  {undefined}
 */
function addClickHandlersToElements() {
    $('.search-events').on('click', getDataFromTicketMaster);
}

// function flickrImages() {
//     var venue = "hollywood palladium venue outside";
//     var search_url = 'https://api.flickr.com/services/rest?method=flickr.photos.search&api_key=555bbd6b607a0ffb10da03124b8906b6&format=json&nojsoncallback=1&text=' + venue;
//
//     $.ajax({
//         dataType: 'json',
//         method: 'get',
//         url: search_url,
//         data: {
//             'api_key': '555bbd6b607a0ffb10da03124b8906b6'
//         },
//         success: function (response) {
//
//             error: function (response) {
//                 console.log(response);
//             }
//         });
//
//     //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
//
//
// }

function flickrLoop() {
    var venueImages =
        {
            "photos": {
                "photo": [
                    {
                        "id": "27020496362",
                        "owner": "94467141@N00",
                        "secret": "32cb198536",
                        "server": "7070",
                        "farm": 8,
                        "title": "Stevie Nicks and Dave Grohl, ladies...",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    {
                        "id": "30198250325",
                        "owner": "100899330@N03",
                        "secret": "a09725a645",
                        "server": "5562",
                        "farm": 6,
                        "title": "Pre-Show",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    {
                        "id": "22592033217",
                        "owner": "58112562@N00",
                        "secret": "9700cbbcc0",
                        "server": "5689",
                        "farm": 6,
                        "title": "City National Civic",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    {
                        "id": "35489133763",
                        "owner": "7948216@N05",
                        "secret": "9c28d0e767",
                        "server": "4303",
                        "farm": 5,
                        "title": "07-22-2017 Berkeley, CA - Greek Theatre",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    {
                        "id": "31142080295",
                        "owner": "34457978@N00",
                        "secret": "5b455ec238",
                        "server": "5764",
                        "farm": 6,
                        "title": "Fox Theater (Oakland)",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    }

                ]
            }

        };

    for(var i = 0; i < venueImages.photos.photo.length; i++){
        console.log(venueImages.photos.photo[i]);
        var img_src = "https://farm" + venueImages.photos.photo[i].farm + ".staticflickr.com/" + venueImages.photos.photo[i].server + "/" + venueImages.photos.photo[i].id + "_" + venueImages.photos.photo[i].secret + ".jpg";
        // flickr_pic.attr("src", img_src);
       var one_image= $('<img>').attr("src", img_src);
        $("#venues").append(one_image);
    }
};


function getDataFromTicketMaster() {
    var keyword = $('#genre')[0];
    keyword = keyword.options[keyword.selectedIndex].value;
    console.log(keyword);

    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events?apikey=tBBObsl2YtXpvAceOW6DOKwRtZpd8bxd&keyword=" + keyword + "&countryCode=US&stateCode=Ca",
        dataType: "text",
        success: function (json_data) {
            var data = JSON.parse(json_data);
            console.log(data);
            for (var i = 0; i < data._embedded.events.length; i++) {
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
    for (var i = 0; i < hiphop_array.length; i++) {
        var attraction = hiphop_array[i]._embedded.attractions;
        artistInfo.push(attraction);
        var venue = hiphop_array[i]._embedded.venues[0].name;
        concertVenues.push(venue);
    }
    getArtistImages();
}

function getArtistImages() {
    for (var i = 0; i < artistInfo.length; i++) {
        var artistImgArray = [];

        for (var x = 0; x < artistInfo[i].length; x++) {
            var artistUrl = artistInfo[i][x].images[0].url;
            artistImgArray.push(artistUrl);
        }
        artistImg.push(artistImgArray);
    }
}
