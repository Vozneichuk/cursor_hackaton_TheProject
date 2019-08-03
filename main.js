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

    let marker = new google.maps.Marker({
        position: new google.maps.LatLng(coords.coords.latitude, coords.coords.longitude),
        icon: {
            url: 'img/marker.png',
            //size: new google.maps.Size(32, 50)
        },
        map: map
    });


})


let markersArray = [];

function getCenterLocation() {

    let c = map.getCenter();
    let marker = new google.maps.Marker({
        position: new google.maps.LatLng(c.lat(), c.lng()),
        icon: {
            // url: 'img/marker.png',
            // size: new google.maps.Size(0, 0)
        },
        map: map
    });
    //удалили старые

    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
    }
    markersArray = [];
    markersArray.push(marker);



    let infowindow = new google.maps.InfoWindow({

        content: c.lat() + " : " + c.lng()
    });
    infowindow.open(map, markersArray[0]);

    return {
        lat: c.lat(),
        lng: c.lng()
    }
}
document.addEventListener("mouseup", () => { console.log(getCenterLocation()); });