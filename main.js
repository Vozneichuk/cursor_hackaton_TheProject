//API key AIzaSyCDz9nTD3ZvX96FT3OjKUJxBdrE4CAAeyQ

let map;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
}



function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((coords) => {
                resolve(coords);
            });
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    })
}

getLocation().then((coords) => {

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: coords.coords.latitude, lng: coords.coords.longitude },
        zoom: 8
    });

    new google.maps.Marker({
        position: new google.maps.LatLng(coords.coords.latitude, coords.coords.longitude),
        icon: {
            url: 'img/marker.png',
            //size: new google.maps.Size(32, 50)
        },
        map: map
    });

})

function getCenterLocation() {
    let c = map.getCenter();
    console.log(c.lat());
    console.log(c.lng());
}
document.addEventListener("mouseup", getCenterLocation);