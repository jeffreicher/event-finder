/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/***********************
 * hiphop_array - global array to hold hiphop info objects
 * @type {Array}
 */
var hiphop_array = []

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

}

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
