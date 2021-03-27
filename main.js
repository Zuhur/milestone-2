 function textAppear() {
    var placesText =  document.getElementsByClassName('places-text');
    var screenPosition = window.innerHeight / 1.3;
    
    for (i of placesText){
        var textPosition = i.getBoundingClientRect().top;
        if (textPosition < screenPosition) {
            i.classList.add('places-text-appear');
        }
    }
    
}

window.addEventListener('scroll', textAppear);

// Google Maps API
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: {
            lat: 5.1521,
            lng: 46.1996
        }
    });
}
