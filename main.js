/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/***********************
 * events_array - global array to hold hiphop info objects
 * @type {Array}
 */
var events_array = [];
var events_array1 = [];
var artistInfo = [];
var artistImg = [];
var concertVenues = [];
var data_object;
var ticketPrice = [];
var preformerNames =[];
var videoIdArray = [];
var videoPlayer;
var ticketObject = {
  ticketPrice: [],
};
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
}

/***************************************************************************************************
 * addClickHandlerstoElements
 * @params {undefined}
 * @returns  {undefined}
 */
function addClickHandlersToElements() {
    $('.search-events').on('click', getDataFromTicketMaster);
    // $('.row').on('click', sendDataToOtherSections);
}

function artistPictureDynamicCreation() {
    for(var i = 0; i<artistImg[1].length; i++){
        var container = $(".left-bottom-col-3");
        var imgContainer = $("<div>").append(artistImg[i][i]);
        imgContainer.appendTo(container);
    }
}
function flickrImages(){
    var flickr_pic = $('<img>');
    //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    var img_src = "https://farm" + response_dummy.photos.photo[0].farm + ".staticflickr.com/" +   response_dummy.photos.photo[0].server + "/" + response_dummy.photos.photo[0].id +"_" + response_dummy.photos.photo[0].secret + ".jpg";
    flickr_pic.attr("src", img_src);
}
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
                        "id": "30479561483",
                        "owner": "141233868@N02",
                        "secret": "31493d3001",
                        "server": "5715",
                        "farm": 6,
                        "title": "Bill Graham Civic Auditorium",
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
                    },
                    {
                        "id": "4484999982",
                        "owner": "49005895@N08",
                        "secret": "98681bd752",
                        "server": "4008",
                        "farm": 5,
                        "title": "Mezzanine Private Event Venue San Francisco",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    {
                        "id": "8040060204",
                        "owner": "72756218@N04",
                        "secret": "78bca717da",
                        "server": "8179",
                        "farm": 9,
                        "title": "House of Blues Anaheim",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    {
                        "id": "30043253042",
                        "owner": "8263900@N06",
                        "secret": "402dc7f3bd",
                        "server": "5518",
                        "farm": 6,
                        "title": "Okkervil River @ Teragram Ballroom, LA 10-04-2016 28",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    {
                        "id": "22927627330",
                        "owner": "12694516@N04",
                        "secret": "b0f524cb25",
                        "server": "5739",
                        "farm": 6,
                        "title": "Broncho plays their final show of their US tour at the Observatory Orange County on Saturaday Nov 21st, 2015. Skinny Puppy, The Shelters, Pearl Charles and others also played the venue this evening.",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    {
                        "id": "37522480132",
                        "owner": "157274368@N08",
                        "secret": "57b78471b3",
                        "server": "4456",
                        "farm": 5,
                        "title": "DEPECHE MODE",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },

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



function populateEventInformation(data_object) {
    //after button pressed, the data from the event that was pressed will be pulled into this function to be populated onto the DOM.
};


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


function getArtistFromEvents() {
    for(var i=0; i<events_array1.length; i++){
        var attraction = events_array1[i]._embedded.attractions;
        artistInfo.push(attraction);
        var venue = events_array1[i]._embedded.venues[0].name;
        concertVenues.push(venue);
        }
        getArtistImages();
}


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
                events_array1.push(fesivalObjects);
                data_object = {
                    img: data._embedded.events[i].images[0].url,
                    name: data._embedded.events[i].name,
                    location: data._embedded.events[i]._embedded.venues[0].name,
                    date: data._embedded.events[i].dates.start.dateTime,
                    id:data._embedded.events[i].id,
                    ticketPrice: data._embedded.events[i].priceRanges[0].max              
                  };
                  events_array.push(data_object);                  
                 
            }           
            updateEventsLists(events_array);
        
        // Parse the response.
        // Do other things.
            getArtistFromEvents();
        },
        error: function (xhr, status, err) {
            // This time, we do not end up here!
        }
    });
}

function updateEventsLists(events_array) {
    var tbody = $('<tbody>').addClass('table-content');   
    var table = $('<table>').addClass('events-lists');  
    for(var i=0; i<events_array.length; i++){
        var get_img = events_array[i].img;
        var img_tag = $('<img>').attr('src', get_img).css('width', '100px');
        var img = $('<td>');
        var name = $('<td>').text(events_array[i].name);
        var location = $('<td>').text(events_array[i].location);
        var date = $('<td>').text(events_array[i].date);  
        var tr =  $('<tr>', {
            class:'row',
            "data-event": events_array[i].id,
            on: { 
                click:function() {
                    var eventId = $(this).attr('data-event');
                    sendDataToOtherSections(eventId);
                },          
            }
        });
        img.append(img_tag);   
        tr.append(img, name, location, date);

        var th_empty =  $('<th>');  
        var th_event =  $('<th>').text('Event'); 
        var th_location =  $('<th>').text('Location');  
        var th_date =  $('<th>').text('Date');     
        var tr_th = $('<tr>');
        var thead = $('<thead>');
        tr_th.append(th_empty, th_event, th_location, th_date);
        thead.append(tr_th);
        tbody.append(tr);
    }        
       table.append(thead, tbody);
      $('.left-col').prepend(table);   
                  
};

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

//Loads IFrame Player API asynchronously
function createPlayer() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

//Function creates an <iframe> & Youtube player after API code downloads
function onYouTubeIframeAPIReady() {
    //debugger;
    videoPlayer = new YT.Player('player', {
        height: '345',
        width: '530',
        videoId: videoIdArray[0],
        playerVars: {
            'autoplay': 1,
            'start': 1
            // 'playlist': 'Q8sa_3oHYEc, YnwsMEabmSo, MOpcEayO1Yw', how do I make this populate from videoArray?
        }
    });
}

function sendDataToOtherSections(event_Id) {
    console.log(event_Id);
    var sideBarObject = {
        name: data_object.name,
        location: data_object.location,

    };
    // var name = $('.artists').text(data_object.name);
    // console.log(this);
    //how to make tr a clickable button that will send data to the other areas in web page?
}
