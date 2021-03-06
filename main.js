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
                }
            }
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
            var img = $('<td>').addClass('mobile'); 
            var name = $('<td>').text(this.events_array[i].name);
            var location = $('<td>').text(this.events_array[i].location);
            var date = $('<td>').text(this.events_array[i].date) 
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

            var th_empty =  $('<th>').addClass('mobile');  
            var th_event =  $('<th>').text('Event').addClass('mobileTh'); 
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
        // $('table').floatThead({
        //     position: 'absolute',
        //     scrollContainer: true
        // });
        table.floatThead({
            scrollContainer: (table) => {
                return table.closest('.left-col');
            }
        });
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
