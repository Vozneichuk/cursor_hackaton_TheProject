//API key AIzaSyCDz9nTD3ZvX96FT3OjKUJxBdrE4CAAeyQ
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
class Taxi {
    constructor(lat, lng) {
            this.lat1 = lat;
            this.lng1 = lng;
        }
        //сеттер для задавания рандомных позицый рядом с нашей локацией
    set SetRandomLocation(location) {
        let a = Number(getRandomFloat(-1, 1).toFixed(5));
        let b = Number(getRandomFloat(-1, 1).toFixed(5));

        this.lat1 = location.lat + a;
        this.lng1 = location.lng + b;
    }
}




let map;


function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
}



///Создала массив с таксишками!!!!
let taxi = new Taxi;
let taxiArray = [];
for (let i = 0; i < 5; i++) {
    taxiArray[i] = new Taxi;
}
////
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


        // Идем по всем такси и шпулим их на карту
        let loc = { lat: coords.coords.latitude, lng: coords.coords.longitude };
        taxiArray.forEach(taxi => {
            generateTaxiOnMap(loc, taxi);
        });


    })
    //делает маркер таксишку
function generateTaxiOnMap(loc, taxi) {
    taxi.SetRandomLocation = loc;
    console.log(taxi.lat1, taxi.lng1);
    let markerTaxi = new google.maps.Marker({
        position: new google.maps.LatLng(taxi.lat1, taxi.lng1),
        icon: {
            url: 'img/taxi.png',
            //size: new google.maps.Size(32, 50)
        },
        map: map
    });

}

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