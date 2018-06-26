
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);
let firstConcert = null;

function initializeApp() {
    firstConcert = new MusicConcert();
};

/***********************
 * events_array - global array to hold hiphop info objects
 * @type {Array}
 */
class MusicConcert {
    constructor(){
        this.events_array = [];
        this.events_array1 = [];
        this.artistInfo = [];
        this.artistImg = [];
        this.concertVenues = [];
        this.data_object;
        this.ticketPrice = [];
        this.preformerNames =[];
        this.videoIdArray = [];
        this.videoPlayer;
        this.artistName;
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

    addClickHandlersAndStylesToElements() {
        $('.search-events').on('click', this.getDataFromTicketMaster.bind(this));
        $('.backButton').on('click', this.backButtonActions.bind(this));
        $('.secondScreen').addClass('hidden');
    }

    artistPictureDynamicCreation() {
        for(var i = 0; i<this.artistImg[1].length; i++){
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
                var locationId = this.refList[venueLocation];

                for(var i = 0; i < venueImages.photos.photo.length; i++){
                    if(venueImages.photos.photo[i].id === locationId){
                        displayImage(venueImages.photos.photo[i]);
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

    // getArtistImages() {
    //     console.log(this.artistInfo);
    //     for (var i = 0; i < this.artistInfo.length; i++) {
    //         var artistImgArray = [];
    //         for (var x = 0; x < this.artistInfo[i].length; x++) {
    //             var artistUrl = this.artistInfo[i][x].images[0].url;
    //             artistImgArray.push(artistUrl);
    //         }
    //         this.artistImg.push(artistImgArray);
    //     }
    // } 

    getArtistFromEvents() {
        for(var i=0; i<this.events_array1.length; i++){
            var attraction = this.events_array1[i]._embedded.attractions;
            this.artistInfo.push(attraction);
            var venue = this.events_array1[i]._embedded.venues[0].name;
            this.concertVenues.push(venue);
            }
            // this.getArtistImages();
    }  

    getDataFromTicketMaster() {
        var keyword = $('#genre')[0];
        keyword = keyword.options[keyword.selectedIndex].value;
        console.log(keyword);
        $.ajax({
            type: "GET",
            url: "https://app.ticketmaster.com/discovery/v2/events?apikey=tBBObsl2YtXpvAceOW6DOKwRtZpd8bxd&keyword=" + keyword + "&countryCode=US&stateCode=Ca",
            dataType: "text",
            success: (json_data) => {
                var data = JSON.parse(json_data);
                console.log(data);
                for (var i = 0; i < data._embedded.events.length; i++) {
                    var fesivalObjects = data._embedded.events[i];
                    console.log(fesivalObjects);
                    console.log(typeof this.events_array1);
                    this.events_array1.push(fesivalObjects);
                    this.data_object = {
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
                    if(this.events_array.length > 20){
                        this.events_array = [];
                        $(".events-lists").remove();
                        this.events_array.push(this.data_object);
                    } else {
                        this.events_array.push(this.data_object);
                    }
                    
                }           
                this.updateEventsLists(this.events_array);

                this.getArtistFromEvents();
            },
            error: function (xhr, status, err) {
            }
        });
    }

    updateEventsLists(events_array) {
        var tbody = $('<tbody>').addClass('table-content');   
        var table = $('<table>').addClass('events-lists');  
        for(var i=0; i<this.events_array.length; i++){
            var get_img = this.events_array[i].img;
            var img_tag = $('<img>').attr('src', get_img).css('width', '100px');
            var img = $('<td>');
            var name = $('<td>').text(this.events_array[i].name);
            var location = $('<td>').text(this.events_array[i].location);
            var date = $('<td>').text(this.events_array[i].date);  
            var tr =  $('<tr>', {
                class:'row',
                "data-event": this.events_array[i].id,
                on: { 
                    click:() => {
                        var eventId = $(this).attr('data-event');
                        this.sendDataToOtherSections(eventId,this);
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

    createPlayer() {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    onYouTubeIframeAPIReady() {
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
                    videoIdArray=[];
                    for ( var video_i = 0; video_i < response.video.length; video_i++) {
                        videoIdArray.push(response.video[video_i].id);
                    }
                    changePlayer(videoIdArray[0]);
                }
            }
        });
    }

    changePlayer(newID){
        videoPlayer.a.src = 'https://www.youtube.com/embed/'+newID+'?autoplay=1&loop=1&controls=0&modestbranding=1';
    }

    sendDataToOtherSections(eventId,object) {
        $('.search-events').prop('disabled', true);
        for(var i = 0; i<this.events_array.length; i++) {
            if(eventId === this.events_array[i].id) {      
                $(".secondHeader h1").append(this.events_array[i].name).addClass('secondHeader');
                $("#img-1").append($("<img>").attr('src', this.artistImg[i][0]).addClass('artistImages'));
                $("#img-2").append($("<img>").attr('src', this.artistImg[i][1]).addClass('artistImages'));
                $("#img-3").append($("<img>").attr('src', this.artistImg[i][2]).addClass('artistImages'));
                $("#img-4").append($("<img>").attr('src', this.artistImg[i][3]).addClass('artistImages'));
                $(".artists").append("Name: " + this.events_array[i].name);
                $(".venue").append("Location: " + this.events_array[i].location);
                $(".date").append("Date: " + this.events_array[i].date);
                $(".tickets").append("Ticket-URL " + this.events_array[i].url);
                $('.secondScreen').removeClass('hidden');
                $('.firstScreen').addClass('hidden');
                $('.events-lists').addClass('hidden'); 
                this.flickrLoop(this.events_array[i].location);
                this.loadVideo(this.events_array[i].name);
            }
        }    

    }
    
    backButtonActions() {
        $('.secondHeader h1, #img-1, #img-2, #img-3, #img-4, .artists, .venue, .date, .tickets').empty();
        $('.secondScreen').addClass('hidden');
        $('.events-lists, .firstScreen').removeClass('hidden');
        $('.search-events').prop('disabled', false);
    }
}

