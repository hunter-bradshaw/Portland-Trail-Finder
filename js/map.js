var token = "pk.eyJ1IjoiaHVudGVyLWJyYWRzaGF3IiwiYSI6ImNqdmVidm04ZDB1Z2U0NG9kaWpyemczcmMifQ.7NEAHXgiu6ebOYlzFIWszQ"; // replace with your Mapbox API Access token. Create a Mabpox account and find it on https://www.mapbox.com/studio/

var map = L.map('map').setView([45.5155, -122.6793], 12);

L.marker([45.5155, -122.6793])
    .bindPopup("Downtown<br>Portland, Oregon")
    .addTo(map)
    .openPopup();
var gl = L.mapboxGL({
    accessToken: token,
    style: 'mapbox://styles/hunter-bradshaw/cjw5kavdx2xon1do43dmm20qu'
}).addTo(map);


//my functions
// onEachFeature funtion
function parkTrailsFeature(feature, layer) {
    console.log(feature)

    layer.bindPopup(`
<p><h>Trail Name: </h>${feature.properties.Local_Name}</p>
<p>${feature.properties.MILES}<h> Miles</h></p>
<p><h>Type of Surface: </h>${feature.properties.SURFACE}</p>
`)
}


//parkTrails style
var parkTrailsStyle = {
    "color": "#228B22",
    "weight": 5,
    "opacity": 0.65
};

L.geoJSON(parkTrails, {
    style: parkTrailsStyle,
    onEachFeature: parkTrailsFeature,
}).addTo(map);


//create the async function for getting addys
function getAddys() {

    $.getJSON("", function (data) {
        var address = L.geoJSON(data).addTo(map)
    })
}


$(document).ready(function () {

    getAddys();
});


//instatiate popup
var popup = L.popup()
//function run when map clicked
function onMapClick(e) {

    //then use the popup methods
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())//this could be more HTML
        .openOn(map);



    //set it in the side-pane
    var lat = Math.round(e.latlng.lat * 1000) / 1000;
    var lng = e.latlng.lng;
    document.getElementById("lat").innerHTML = `<strong>${lat}</strong>`;
    document.getElementById("lng").innerHTML = `<strong>${lng}</strong>`;
}

map.on('click', onMapClick)
