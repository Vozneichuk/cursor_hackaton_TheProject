//API key AIzaSyCDz9nTD3ZvX96FT3OjKUJxBdrE4CAAeyQ

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
}