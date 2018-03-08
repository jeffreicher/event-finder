/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/***********************
 * events_array - global array to hold hiphop info objects
 * @type {Array}
 */
var events_array = [];
var artistInfo = [];
var artistImg = [];
var concertVenues = [];

var ticketPrice = [];
var preformerNames =[];
var videoIdArray = [];
var videoPlayer;
/***************************************************************************************************
 * initializeApp
 * @params {undefined} none
 * @returns: {undefined} none
 * initializes the application, including adding click handlers and pulling in any data from the server, in later versions
 */
function initializeApp() {
    addClickHandlersToElements();
    loadVideo();  
    // artistPictureDynamicCreation();
    createPlayer();
    loadVideo();
}

/***************************************************************************************************
 * addClickHandlerstoElements
 * @params {undefined}
 * @returns  {undefined}
 */
function addClickHandlersToElements() {
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
                //events_array.push(fesivalObjects);

                var data_object = {
                    img: data._embedded.events[i].images[0].url,
                    name: data._embedded.events[i].name,
                    location: data._embedded.events[i]._embedded.venues[0].name,
                    date: data._embedded.events[i].dates.start.dateTime,
                    id:data._embedded.events[i].id                
                  } 
                //   events_array.push(data_object);
                  updateEventsLists(data_object);
            }
           // getArtistFromEvents();
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

        var names = hiphop_array[i]._embedded.attractions[0].name;
        preformerNames.push(names)
        }
    getArtistImages();
}

function getArtistImages () {
    for (var i = 0; i < artistInfo.length; i++) {
        var artistImgArray = [];
        for (var x = 0; x < artistInfo[i].length; x++) {
            var artistUrl = artistInfo[i][x].images[0].url;
            artistImgArray.push(artistUrl);
        }
        artistImg.push(artistImgArray);
    }
}
    // getPriceFromConcert()

// function getArtistFromEvents() {
//     for(var i=0; i<events_array.length; i++){
//         var attraction = events_array[i]._embedded.attractions;
//         artistInfo.push(attraction);
//         var venue = events_array[i]._embedded.venues[0].name;
//         concertVenues.push(venue);
//         }
//         getArtistImages();
// }

function loadVideo() {
    $.ajax({
        dataType: 'json',
        data: {
            api_key: 'IkLZGbSrRC',
            q: 'drake live set',
            maxResults: 5,
            type: 'video'
        },
        method: 'POST',
        url: 'https://s-apis.learningfuze.com/hackathon/youtube/search.php',
        success: function(response){
            if(response.success){
                console.log('success', response);
                for ( var i = 0; i < response.video.length; i++) {
                    videoIdArray.push(response.video[i].id);
                }     
                createPlayer(); 
            }
        }
    });
}

function updateEventsLists(data_object) {
    console.log(data_object);
    //debugger;
    var get_img = data_object.img;
    var img_tag = $('<img>').attr('src', get_img).css('width', '100px');
    var img = $('<td>');
    var name = $('<td>').text(data_object.name);
    var location = $('<td>').text(data_object.location);
    var date = $('<td>').text(data_object.date);
    var tr = $('<tr>');


    img.append(img_tag);
    tr.append(img, name, location, date);
    $('tbody').append(tr);
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

function loadVideo() {
    $.ajax({
        dataType: 'json',
        data: {
            api_key: 'IkLZGbSrRC',
            q: 'drake live set',
            maxResults: 5,
            type: 'video'
        },
        method: 'POST',
        url: 'https://s-apis.learningfuze.com/hackathon/youtube/search.php',
        success: function (response) {
            if (response.success) {
                console.log('success', response);
                for (var i = 0; i < response.video.length; i++) {
                    videoIdArray.push(response.video[i].id);
                }
            }
        }
    })
}

//Loads IFrame Player API asynchronously
function createPlayer() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}


//Function creates an <iframe> & Youtube player after API code downloads

function onYouTubeIframeAPIReady() {
    debugger;
    videoPlayer = new YT.Player('player', {
        height: '345',
        width: '530',
        videoId: videoIdArray[0],
        playerVars: {
            'autoplay': 1,
            'start': 1,
            // 'playlist': 'Q8sa_3oHYEc, YnwsMEabmSo, MOpcEayO1Yw', how do I make this populate from videoArray?
        }
    });
}

