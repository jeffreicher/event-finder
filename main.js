/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

function initializeApp() {
    firstConcert = new MusicConcert();
    $('.right-col').addClass('hidden');
};

/***********************
 * events_array - global array to hold hiphop info objects
 * @type {Array}
 */
class MusicConcert {
    constructor(){
        this.stateSelector;
        this.zipCode;
        this.events_array = [];
        this.events_array1 = [];
        this.artistInfo = [];
        this.artistImg = [];
        this.concertVenues = [];
        this.data_object;
        this.ticketPrice = [];
        this.preformerNames =[];
        this.videoIdArray = [];
        this.videoPlayer = 0;
        this.artistName;
        this.marker = [];
        this.map;
        this.currentMarker = 0;
        this.increaser = 0;
        this.locations = [];
        this.ticketObject = {
        ticketPrice: [],
        }
        this.refList = {
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
        this.addClickHandlersAndStylesToElements();
        this.createPlayer();
        // this.initMap();
    };
    /***************************************************************************************************
     * initializeApp
     * @params {undefined} none
     * @returns: {undefined} none
     * initializes the application, including adding click handlers and pulling in any data from the server, in later versions
     */


    /***************************************************************************************************
     * addClickHandlersAndStylesToElements
     * @params {undefined} none
     * @returns  {undefined} none
     * gives buttons function to execute when clicked, as well as adding a class to the hidden div
     */
    //================CLICK HANDLERS================================//
    addClickHandlersAndStylesToElements() {
        $('.left-col').addClass('hidden');
        $('.secondScreen').addClass('hidden');
        $('.search-events').on('click', function(){
            $('.firstScreen').addClass('hidden');
            $('.right-col').removeClass('hidden');
            $('.left-col').removeClass('hidden');
            // firstConcert.latLong();
            // firstConcert.initMap();
            // $('#genre').val('');
            // $('#stateSelector').val('Al');
            firstConcert.stateSelector = $("#stateSelector").val();
            console.log('Click Working');
            firstConcert.locations = [];
            firstConcert.marker = [];
            firstConcert.events_array = [];
            firstConcert.events_array1 = [];
            firstConcert.artistInfo = [];
            firstConcert.artistImg = [];
            firstConcert.artistInfo = [];
            firstConcert.artistInfo = [];
            firstConcert.latAndLong = [];
            $('.events-lists').empty();
            $('.errorMessage').hide();
            firstConcert.onYouTubeIframeAPIReady();
        })
        $('.search-events').on('click', this.getDataFromTicketMaster.bind(this));
        $('.backButton').on('click', this.backButtonActions.bind(this));
    }
<<<<<<< HEAD
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
                        "id": "24538777316",
                        "owner": "114791119@N03",
                        "secret": "8f47c61d74",
                        "server": "1599",
                        "farm": 2,
                        "title": "Concert Night: Vixen @ house of blues - Anaheim",
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
                    // Toyota Amphitheatre
                    {
                        "id": "35313499455",
                        "owner": "26517219@N02",
                        "secret": "d2855bb70b",
                        "server": "4279",
                        "farm": 5,
                        "title": "Reggae In The Desert 2017",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },

                    // Copper Blues Oxnard Resturant
                    {
                        "id": "16911708381",
                        "owner": "132128485@N07",
                        "secret": "f51a79f4e8",
                        "server": "8726",
                        "farm": 9,
                        "title": "House of Blues Anaheim",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    // Dodger Stadium
                    {
                        "id": "28245830409",
                        "owner": "30005186@N02",
                        "secret": "673c3e16aa",
                        "server": "4614",
                        "farm": 5,
                        "title": "Dodger Stadium Sunset",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    // Save Mart Center
                    {
                        "id": "7015873977",
                        "owner": "33769160@N08",
                        "secret": "43e7beed0b",
                        "server": "7182",
                        "farm": 8,
                        "title": "Save Mart Center",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    // Honda Center
                    {
                        "id": "24167854377",
                        "owner": "34247477@N02",
                        "secret": "9df10fb85e",
                        "server": "4574",
                        "farm": 5,
                        "title": "ANAHEIM, HONDA CENTER",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    // The Forum
                    {
                        "id": "26708886578",
                        "owner": "157882033@N04",
                        "secret": "aa87a23dd8",
                        "server": "4605",
                        "farm": 5,
                        "title": "1989.11.24 Inglewood,CA The Great Western Forum",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    // The Pacific Amphitheatre
                    {
                        "id": "37329376526",
                        "owner": "32382511@N08",
                        "secret": "2432f1890c",
                        "server": "4432",
                        "farm": 5,
                        "title": "The Good Vibes Summer Tour 2017",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    // Pechanga Resort and Casino
                    {
                        "id": "14703167940",
                        "owner": "96695795@N08",
                        "secret": "1ccdcbea74",
                        "server": "3851",
                        "farm": 4,
                        "title": "Slash at Pechanga Resort & Casino",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    // William Saroyan Theatre Fresno Convention & Entertainment Center
                    {
                        "id": "12917601805",
                        "owner": "27914970@N04",
                        "secret": "315ef8e9e4",
                        "server": "2864",
                        "farm": 3,
                        "title": "William Saroyan Theatre",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    // Empire Polo Field
                    {
                        "id": "14362034359",
                        "owner": "12178022@N05",
                        "secret": "a285a83c5c",
                        "server": "5503",
                        "farm": 6,
                        "title": "T60C1748 Stagecoach 2014, Thursday",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    },
                    // Del Mar Fairgrounds
                    {
                        "id": "7599282810",
                        "owner": "30051793@N07",
                        "secret": "8139e00fb0",
                        "server": "7115",
                        "farm": 8,
                        "title": "Del Mar Fairgrounds",
                        "ispublic": 1,
                        "isfriend": 0,
                        "isfamily": 0
                    }
                ]
            }
        };

    var refList = {
        "Mattress Firm Amphitheatre": "37522480132",
        "Mattress Firm Amphitheatre (Formerly Sleep Train Amphitheatre)": "37522480132",
        "The Observatory - Santa Ana": "22927627330",
        "Teragram Ballroom": "30043253042",
        "House of Blues Anaheim": "24538777316",
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
        "Toyota Amphitheatre": "35313499455",
        "Copper Blues Oxnard Resturant": "16911708381",
        "Dodger Stadium": "28245830409",
        "Save Mart Center": "7015873977",
        "Honda Center": "24167854377",
        "The Forum": "26708886578",
        "The Pacific Amphitheatre": "37329376526",
        "Pechanga Resort and Casino": "14703167940",
        "William Saroyan Theatre Fresno Convention & Entertainment     Center": "12917601805",
        "Empire Polo Field": "14362034359",
        "Del Mar Fairgrounds": "7599282810"
    };
=======

    backButtonActions() {
        firstConcert.showMarkers();
        $('.secondHeader h1, #img-1, #img-2, #img-3, #img-4, .artists, .venue, .date, .tickets, .time, #innerArtistImageContainer').empty();
        $('.secondScreen').addClass('hidden');
        $('.events-lists').removeClass('hidden');
        $('.search-events').prop('disabled', false);
        $('.secondScreenTopContainer').empty();
        firstConcert.updateSidebar();
        firstConcert.disableMarker(firstConcert.currentMarker);
    }

>>>>>>> 38166a946a95d648ac266351d45dd9a4d8b2ef39

    clearTableContentOnSearch(){
        
    }
    //=====================================================================//

    //=============================GOOGLE==================================//
    latLong() {
        // console.log('Inside Function');
        for(let i=0; i < firstConcert.events_array.length; i++){
            let latPair = [];
            let latit = firstConcert.events_array1[i]._embedded.venues[0].location.latitude;
            let longit = firstConcert.events_array1[i]._embedded.venues[0].location.longitude;
            parseInt(latit, longit);
            latPair.push({
                lat:latit,
                lng:longit
            });
            firstConcert.locations.push(latPair);
            // console.log(latPair[0]);
            // firstConcert.latAndLong.push(latPair);
        }
        firstConcert.initMap();
    }
    
    initMap() {
            var map = new google.maps.Map(
                document.getElementById('map'), {
                    zoom: 5,
                    center: new google.maps.LatLng(parseFloat(firstConcert.locations[0][0].lat), parseFloat(firstConcert.locations[0][0].lng)),
                });
                firstConcert.map = map;
                firstConcert.setMarkerOnMap(map);
            }

    setMarkerOnMap(map) {
            for(var i=0; i<firstConcert.locations.length; i++){
                let lati = firstConcert.locations[i][0].lat
                let lngi = firstConcert.locations[i][0].lng
                parseFloat(lati, lngi)
                // console.log(lati, lngi);
                firstConcert.addMarker(
                {
                    lat:parseFloat(lati),
                    lng:parseFloat(lngi)
                }, map);
                
            }
        }        

    clearMarkers() {
            for(var i=0; i<firstConcert.marker.length; i++){
                let marker = firstConcert.marker[i];
                marker.setMap(null);
            }
        }
    
    showMarkers() {
        for(var i=0; i<firstConcert.marker.length; i++){
                let marker = firstConcert.marker[i];
                marker.setMap(firstConcert.map)
        }
    
    }
    
    showCurrentConcert(marker) {
                marker.setMap(firstConcert.map)
    }

    addMarker(coords, map) {
            var marker = new google.maps.Marker({
                position: coords,
                animation: google.maps.Animation.DROP,
                map: map
            });
            firstConcert.marker.push(marker);
        }        
    changeMarker(marker) {
            // var icon = new google.maps.MarkerImage({ url:"http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=1|ffffff|c41200"});
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    disableMarker(marker) {
            marker.setAnimation(null);
        }   
    //=====================================================================//


    //=========================FLICKR======================================//

    artistPictureDynamicCreation() {
        for(var i = 0; i<firstConcert.artistImg[1].length; i++){
            var container = $(".left-bottom-col-3");
            var imgContainer = $("<div>").append(this.artistImg[i][i]);
            imgContainer.appendTo(container);
        }
    }

    flickrImages() {
        var flickr_pic = $('<img>');
        var img_src = "https://farm" + venueImages.photos.photo[0].farm + ".staticflickr.com/" + venueImages.photos.photo[0].server + "/" + venueImages.photos.photo[0].id + "_" + venueImages.photos.photo[0].secret + ".jpg";
        flickr_pic.attr("src", img_src);
    }




    flickrLoop(venueLocation) {
        $.ajax({
            url: 'https://api.flickr.com/services/rest',
            method: 'GET',
            data: {
                method: 'flickr.photos.search',
                api_key: '555bbd6b607a0ffb10da03124b8906b6',
                format: 'json',
                nojsoncallback: 1,
                text: venueLocation
            },
            success: function(response) {
                console.log("Flickr response: ", response);
                var venueImages = response;
                var locationId = firstConcert.refList[venueLocation];

                for(var i = 0; i < venueImages.photos.photo.length; i++){
                    if(venueImages.photos.photo[i].id === locationId){
                        firstConcert.displayImage(venueImages.photos.photo[i]);
                    }
                };
            }
        })
    }

    displayImage(venueImage){
        var img_src = "https://farm" + venueImage.farm + ".staticflickr.com/" + venueImage.server + "/" + venueImage.id + "_" + venueImage.secret + ".jpg";
        var one_image= $('<img>').attr("src", img_src).addClass('venueImages');
        $('.secondScreenTopContainer').empty().append(one_image);
        $('.firstScreen').addClass('.hidden');
        $('.secondScreen').removeClass('.hidden');
    }
//=================================================================================================//

//=======================YOUTUBE PLAYER FUNCTIONS==================================================//
    createPlayer() {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    onYouTubeIframeAPIReady() {
            firstConcert.videoPlayer = new YT.Player('player', {
            height: '345',
            width: '530',
            videoId: '',
            playerVars: {
                'autoplay': 1,
                'controls': 0,
                'loop': 1,
                'modestbranding': 1,
            }
        });
<<<<<<< HEAD
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

//how does this work with the youtubeframapiready?
function createPlayer() {
    debugger;
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

//loads new YouTube player with properties and stores in video player global 
//Error parsing header X-XSS-Protection is a bug found in chrome
function onYouTubeIframeAPIReady() {
    videoPlayer = new YT.Player('player', {
        height: '345',
        width: '530',
        videoId: 'L6c_mYQ9LaM',
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'loop': 1,
            'modestbranding': 1,
        }
    });
}

// loads video from learningfuze server using an api key to that if is successful, stores videos in a video array and calls changeplayer with video array at 0
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
                for ( var video_i = 0; video_i < response.video.length; video_i++) {
                    videoIdArray.push(response.video[video_i].id);
=======
    }

    loadVideo(name) {
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
                    firstConcert.videoIdArray=[];
                    for ( var video_i = 0; video_i < response.video.length; video_i++) {
                        firstConcert.videoIdArray.push(response.video[video_i].id);
                    }
                    firstConcert.changePlayer(firstConcert.videoIdArray[0]);
>>>>>>> 38166a946a95d648ac266351d45dd9a4d8b2ef39
                }
            }
<<<<<<< HEAD
        }
    });
}

//changes the video played by changing the video Id
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
=======
        });
    }

    changePlayer(newID){
        firstConcert.videoPlayer.a.src = 'https://www.youtube.com/embed/'+newID+'?autoplay=1&loop=1&controls=0&modestbranding=1';
    }
    //=======================TICKET MASTER FUNCTIONS==================================================//

    sendDataToOtherSections(eventId,object) {
        $('.search-events').prop('disabled', true);
        for(var i = 0; i<firstConcert.events_array.length; i++) {
            if(eventId === firstConcert.events_array[i].id) {      
                $(".secondHeader h1").append(firstConcert.events_array[i].name).addClass('secondHeader');
                $("#innerArtistImageContainer").append($("<img>").attr('src', firstConcert.artistImg[0][i]).addClass('artistImages'));
                // $("#img-2").append($("<img>").attr('src', firstConcert.artistImg[i][1]).addClass('artistImages'));
                // $("#img-3").append($("<img>").attr('src', firstConcert.artistImg[i][2]).addClass('artistImages'));
                // $("#img-4").append($("<img>").attr('src', firstConcert.artistImg[i][3]).addClass('artistImages'));
                $(".artists").append(firstConcert.events_array[i].name);
                $(".venue").append(firstConcert.events_array[i].location);
                $(".date").append(firstConcert.events_array[i].date);
                $(".tickets-container > a").attr('href', firstConcert.events_array[i].url);
                $(".time").append("Time: " + firstConcert.events_array1[i].url);
>>>>>>> 38166a946a95d648ac266351d45dd9a4d8b2ef39
                $('.secondScreen').removeClass('hidden');
                $('.firstScreen').addClass('hidden');
                $('.events-lists').addClass('hidden'); 
                firstConcert.flickrLoop(firstConcert.events_array[i].location);
                firstConcert.loadVideo(firstConcert.events_array[i].name);
            }
        }    

    }
    


    getArtistImages () {
        var artistImgArray = [];
        for (var i = 0; i < firstConcert.events_array.length; i++) {
            var artistUrl = firstConcert.events_array[i].img;
            artistImgArray.push(artistUrl);
        }
        firstConcert.artistImg.push(artistImgArray);
    } 

    getArtistFromEvents() {
        for(var i=0; i<firstConcert.events_array1.length; i++){
            var attraction = firstConcert.events_array1[i]._embedded.attractions;
            firstConcert.artistInfo.push(attraction);
            var venue = firstConcert.events_array1[i]._embedded.venues[0].name;
            firstConcert.concertVenues.push(venue);
            }
            firstConcert.getArtistImages();
    }  

    getDataFromTicketMaster() {
        var keyword = $('#genre').val();
        var state = $('#stateSelector').val();
        var city = $('#zipCode').val();
        // console.log(zipCode);
        // console.log(state)
        // var ca
        // keyword = keyword.options[keyword.selectedIndex].value;
        console.log(keyword);
        $.ajax({
            type: "GET",
            url: "https://app.ticketmaster.com/discovery/v2/events?apikey=tBBObsl2YtXpvAceOW6DOKwRtZpd8bxd&keyword=" + keyword + "&countryCode=US&stateCode="+ state + "&city=" + city,
            dataType: "text",
            success: (json_data) => {
                var data = JSON.parse(json_data);
                console.log(data);
                if(data._embedded !== undefined){
                for (var i = 0; i < data._embedded.events.length; i++) {
                    var fesivalObjects = data._embedded.events[i];
                    // console.log(fesivalObjects);
                    // console.log(typeof firstConcert.events_array1);
                    firstConcert.events_array1.push(fesivalObjects);
                    firstConcert.data_object = {
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
                    if(firstConcert.events_array > 20){
                        firstConcert.events_array = [];
                        $(".events-lists").remove();
                        console.log(data_object);
                        firstConcert.events_array.push(firstConcert.data_object);
                    } else {
                        firstConcert.events_array.push(firstConcert.data_object);
                        // console.log(firstConcert.events_array)
                    }
                    
                }
                firstConcert.latLong();

                firstConcert.updateEventsLists(firstConcert.events_array);

                firstConcert.getArtistFromEvents();
              } else {
                  $('.left-col').append('<div class="errorMessage">No events found :(</div>');
              }
            },
            error: function (xhr, status, err) {
            }
        });
    }

    updateEventsLists(events_array) {
        var tbody = $('<tbody>').addClass('table-content');   
        var table = $('<table>').addClass('events-lists');  
        for(var i=0; i<this.events_array.length; i++){
            var id = i;
            var get_img = events_array[i].img;
            var img_tag = $('<img>').attr('src', get_img).css('width', '100px');
            var img = $('<td>');
            var name = $('<td>').text(this.events_array[i].name);
            var location = $('<td>').text(this.events_array[i].location);
            var date = $('<td>').text(this.events_array[i].date);  
            var tr =  $('<tr>', {
                // on: {
                //     mouseover:function(){
                //         changeMarker(firstConcert.marker[i])
                //         console.log('inside onmouseover function')
                //     }
                // },
                class:'row',
                id: i,
                "data-event": this.events_array[i].id,
                on: { 
                    click:function() {
                        let currentId = this.id;
                        console.log(currentId);
                        firstConcert.clearMarkers();
                        firstConcert.showCurrentConcert(firstConcert.marker[currentId])
                        firstConcert.changeMarker(firstConcert.marker[currentId])
                        firstConcert.currentMarker = firstConcert.marker[currentId];
                        console.log('inside onmouseover function')
                        $('.secondHeader h1, #img-1, #img-2, #img-3, #img-4, .artists, .venue, .date, .tickets, .time').empty();
                        var eventId = $(this).attr('data-event');
                        firstConcert.sendDataToOtherSections(eventId,this);
                        $('.event-info').removeClass('hidden');
                        // firstConcert.onYouTubeIframeAPIReady();
                    },          
                },
                
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

    updateSidebar() {
        $(".artists").append("Artist");
        $(".venue").append("Location");
        $(".date").append("Date");
        $(".time").append('Time')
        $(".tickets").append("Tickets");
    }
} 
//===========================================================================================================//
