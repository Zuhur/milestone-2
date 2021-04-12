// Carousel

const coastList = ['boats-on-water.jpeg', 'ceel_sheekh.jpeg', 'hobyo-beach.png', 'jazeera-beach.png', 'kismayo.png', 'murcanyo-beach.png', 'murcanyo-cliff.jpeg', 'warsheikh-beach.jpeg'];
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const imgBtn = document.querySelectorAll('.img-btn');

// styled about, explore coast sections
imgBtn.forEach(function(el){
    el.addEventListener('click', changeImg);
    function changeImg(){
        let currentImg = document.querySelector('.current-img').getAttribute('src');
        let url = 'assets/images/';
        if(el.id === 'next'){
            for(i of coastList){
                idx = coastList.indexOf(i);
                if(url+i == currentImg && idx<7){
                    idx++;
                    document.querySelector('.current-img').src = url+coastList[idx];
                } else if(url+i == currentImg && idx==7){
                    idx = 0;
                    document.querySelector('.current-img').src = url+coastList[idx];
                }
            }
        } else if (el.id === 'prev'){
            for(i of coastList){
                idx = coastList.indexOf(i);
                if(url+i == currentImg && idx>0){
                    idx--;
                    document.querySelector('.current-img').src = url+coastList[idx];
                }else if(url+i == currentImg && idx==0){
                    idx = 7;
                    document.querySelector('.current-img').src = url+coastList[idx];
                }
            }
        }
    }
});

// Google Maps API  
var coor = {
    'somalia': {lat: 5.1521, lng: 46.1996},
    'mogadishu': {lat: 2.0591993, lng:45.2366242},
    'kismayo': {lat: -0.3540976, lng: 42.5278184}, // check location is correct
    'bosaso': {lat: 11.2755, lng: 49.1879},
    'berbera': {lat: 10.4325373, lng: 44.9946415},
    'hobyo': {lat: 5.3516146, lng: 48.5203833},
};

function initMap() {
    const center = coor.mogadishu;
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: center,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        }
    });
    new google.maps.Marker({
        position: center,
        map,
        
    });
}
// marker for each city
var city = document.querySelectorAll('.city');

city.forEach(function(e){
    e.addEventListener('click', function(){
        var cityLoc = coor[this.id];
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 6,
            center: cityLoc,
            mapTypeControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            }
        });
        var marker = new google.maps.Marker({
            position: cityLoc,
            map, 
        });
        var infoWindow = new google.maps.InfoWindow({
            content: `<h6>${(this.id).toUpperCase()}</h6>`
        });
        marker.addListener('click', function(){
            infoWindow.open(map, marker);
        });
    });
});

// marker for each activity

var activity = document.querySelectorAll('.activity');
var type;
city.forEach(function(e){
    e.addEventListener('click', function(){
        let cityLoc = this.id;
        activity.forEach(function(e){
            e.addEventListener('click', function(){
                if(this.classList.contains('food')){
                    type = ['food','cafe', 'restaurant'];
                } else if(this.classList.contains('hotel')){
                    type = ['lodging'];
                } else if(this.classList.contains('beach')){
                    type = ['natural_feature'];
                } else if(this.classList.contains('shopping')){
                    type = ['clothing_store','shopping_mall'];
                } else if(this.classList.contains('culture')){
                    type = ['museum'];
                }

                map = new google.maps.Map(document.getElementById('map'), {
                    center: new google.maps.LatLng(coor[cityLoc].lat, coor[cityLoc].lng),
                    zoom: 12,
                    mapTypeControlOptions: {
                        position: google.maps.ControlPosition.LEFT_BOTTOM
                    }
                });

                var request = {
                    location: new google.maps.LatLng(coor[cityLoc].lat, coor[cityLoc].lng),
                    radius: 8000,
                    type: type
                };
                var service = new google.maps.places.PlacesService(map);service.nearbySearch(request, callback);
            });
        });
    }); 
});

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
}

// Side menu options toggle

const dropdownBtn = document.querySelectorAll('.dropdown-btn');

dropdownBtn.forEach(function(btn){
    btn.addEventListener('click', showOptions);

    function showOptions() {
        this.nextElementSibling.classList.toggle('show');
    }
});

// Sliding map navbar
const sideBar = document.querySelector('.sidebar-container');
const navBtn = document.querySelector('.nav-btn');
if(navBtn){
    navBtn.addEventListener('click', sideBarToggler);
} 

function sideBarToggler(){
    sideBar.classList.toggle('d-none');
    navBtn.classList.toggle('click');
}

