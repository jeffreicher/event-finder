
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
var artistName;
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
    createPlayer();
}

/***************************************************************************************************
 * addClickHandlerstoElements
 * @params {undefined}
 * @returns  {undefined}
 */
function addClickHandlersToElements() {
    $('.search-events').on('click', getDataFromTicketMaster);
    $('.backButton').on('click', backButtonActions);
    $('.secondScreen').addClass('hidden');
}
function artistPictureDynamicCreation() {
    for(var i = 0; i<artistImg[1].length; i++){
        var container = $(".left-bottom-col-3");
        var imgContainer = $("<div>").append(artistImg[i][i]);
        imgContainer.appendTo(container);
    }
}

function flickrImages() {
    var flickr_pic = $('<img>');
    var img_src = "https://farm" + venueImages.photos.photo[0].farm + ".staticflickr.com/" + venueImages.photos.photo[0].server + "/" + venueImages.photos.photo[0].id + "_" + venueImages.photos.photo[0].secret + ".jpg";
    flickr_pic.attr("src", img_src);
}


function flickrLoop(venueLocation) {
    var venueImages =
        {
            "photos": {
                "photo": [
                    // Hollywood Palladium
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
                        ,
                    },
                    // Bill Graham Civic Auditorium
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
                    // City National Civic
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
                    // Greek Theatre
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
                    // Fox Theater
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
                    // Mezzanine
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
                    // House of Blues Anaheim
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
                    // Teragram Ballroom
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

                    // The Observatory
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
                    // Mattress Firm Amphitheatre
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
                    // Hollywood Pantages Theater
                    {
                        "id": "31084523630",
                        "owner": "42029827@N00",
                        "secret": "970b9a611c",
                        "server": "5601",
                        "farm": 6,
                        "title": "Hollywood Pantages Theatre",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0

                    },
                    // Fivepoint Amphitheatre
                    {
                        "id": "36211111572",
                        "owner": "21024152@N05",
                        "secret": "52ea661488",
                        "server": "4352",
                        "farm": 5,
                        "title": "KISS 2000 at Irvine Meadows Amphitheater",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    // Shoreline Amphitheatre
                    {
                        "id": "39379605704",
                        "owner": "133744508@N06",
                        "secret": "a49c8b8f13",
                        "server": "4602",
                        "farm": 5,
                        "title": "Shoreline Amphitheatre.",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    {
                        "id": "39379605704",
                    },
                    // Toyota Amphitheatre
                    {
                        "id": "27191296995",
                    }
                ]
            }

        };

    var refList = {
        "Mattress Firm Amphitheatre": "37522480132",
        "Mattress Firm Amphitheatre (Formerly Sleep Train Amphitheatre)": "37522480132",
        "The Observatory - Santa Ana": "22927627330",
        "Teragram Ballroom": "30043253042",
        "House of Blues Anaheim": "8040060204",
        "Mezzanine": "4484999982",
        "Fox Theater - Oakland": "31142080295",
        "Greek Theatre-U.C. Berkeley": "35489133763",
        "Greek Theatre": "35489133763",
        "City National Civic": "22592033217",
        "Bill Graham Civic Auditorium": "30479561483",
        "Hollywood Palladium": "27020496362",
        "Hollywood Pantages Theatre": "31084523630",
        "FivePoint Amphitheatre": "36211111572",
        "Shoreline Amphitheatre": "39379605704",
        "Toyota Amphitheatre": "27191296995",
        "Copper Blues Oxnard Resturant": "",
        "Dodger Stadium": "",
        "Save Mart Center": "",
        "Honda Center": "",
        "The Forum": "",
        "The Pacific Amphitheatre": "",
        "Pechanga Resort and Casino": "",
        "William Saroyan Theatre Fresno Convention & Entertainment Center": ""
    };

    var locationId = refList[venueLocation];

    for(var i = 0; i < venueImages.photos.photo.length; i++){
        if(venueImages.photos.photo[i].id === locationId){
            displayImage(venueImages.photos.photo[i]);
        }
    };
};

function displayImage(venueImage){
    var img_src = "https://farm" + venueImage.farm + ".staticflickr.com/" + venueImage.server + "/" + venueImage.id + "_" + venueImage.secret + ".jpg";
    console.log(img_src);
    debugger;
    var one_image= $('<img>').attr("src", img_src).addClass('venueImages');
    $('.secondScreenTopContainer').empty().append(one_image);
    $('.firstScreen').addClass('.hidden');
    $('.secondScreen').removeClass('.hidden');
};

// function populateEventInformation(data_object) {
//     //after button pressed, the data from the event that was pressed will be pulled into this function to be populated onto the DOM.
// };

//Keaton
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

//keaton
function getArtistFromEvents() {
    for(var i=0; i<events_array1.length; i++){
        var attraction = events_array1[i]._embedded.attractions;
        artistInfo.push(attraction);
        var venue = events_array1[i]._embedded.venues[0].name;
        concertVenues.push(venue);
        }
        getArtistImages();
}


function loadVideo(name) {
    $.ajax({
        dataType: 'json',
        data: {
            api_key: 'IkLZGbSrRC',
            q: name + ' live set',
            maxResults: 5,
            type: 'video'
        },
        method: 'POST',
        url: 'https://s-apis.learningfuze.com/hackathon/youtube/search.php',
        success: function(response){
            if(response.success){
                videoIdArray=[];
                console.log('success', response);
                for ( var i = 0; i < response.video.length; i++) {
                    videoIdArray.push(response.video[i].id);
                }
                changePlayer(videoIdArray[0]);
            }
        }
    });
}
//keaton
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
                    img2: data._embedded.events[i].images[1].url,
                    img3: data._embedded.events[i].images[2].url,
                    img4: data._embedded.events[i].images[3].url,
                    name: data._embedded.events[i].name,
                    location: data._embedded.events[i]._embedded.venues[0].name,
                    date: data._embedded.events[i].dates.start.localDate,
                    id:data._embedded.events[i].id,
                    url: data._embedded.events[i].url,

                  };
                if(events_array.length > 20){
                    events_array = [];
                    $(".events-lists").remove();
                    events_array.push(data_object);
                } else {
                    events_array.push(data_object);
                }
                 
            }           
            updateEventsLists(events_array);

            getArtistFromEvents();
        },
        error: function (xhr, status, err) {
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
                    sendDataToOtherSections(eventId,this);
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
}

function createPlayer() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
    videoPlayer = new YT.Player('player', {
        height: '345',
        width: '530',
        videoId: 'L6c_mYQ9LaM',
        playerVars: {
            'autoplay': 1,
            'loop': 1,
            'controls': 0,
            'modestbranding': 1
        }
    });
}
function changePlayer(newID){
    videoPlayer.a.src = 'https://www.youtube.com/embed/'+newID+'?autoplay=1&loop=1&controls=0&modestbranding=1';
}
//keaton
function sendDataToOtherSections(eventId,object) {
    console.log(object);
    $('.search-events').prop('disabled',true);
    for (var i = 0; i < events_array.length; i++) {
            if(eventId === events_array[i].id) {      
                $(".secondHeader h1").append(events_array[i].name).addClass('secondHeader');
                $("#img-1").append($("<img>").attr('src', artistImg[i][0]).addClass('artistImages'));
                $("#img-2").append($("<img>").attr('src', artistImg[i][1]).addClass('artistImages'));
                $("#img-3").append($("<img>").attr('src', artistImg[i][2]).addClass('artistImages'));
                $("#img-4").append($("<img>").attr('src', artistImg[i][3]).addClass('artistImages'));
                $(".artists").append("Name: " + events_array[i].name);
                $(".venue").append("Location: " + events_array[i].location);
                $(".date").append("Date: " + events_array[i].date);
                $(".tickets").append("Ticket-URL " + events_array[i].url);
                $('.secondScreen').removeClass('hidden');
                $('.firstScreen').addClass('hidden');
                $('.events-lists').addClass('hidden'); 
                flickrLoop(events_array[i].location);
                loadVideo(events_array[i].name);
            }
        }

    }

function backButtonActions() {
    $('.secondHeader h1, #img-1, #img-2, #img-3, #img-4, .artists, .venue, .date, .tickets').empty();
    $('.secondScreen').addClass('hidden');
    $('.events-lists, .firstScreen').removeClass('hidden');
    $('.search-events').prop('disabled',false);
}

