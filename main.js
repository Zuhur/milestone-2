 // Home page text appear
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
var coor = {
    'somalia': {lat: 5.1521, lng: 46.1996},
    'mogadishu': {lat: 2.0591993, lng:45.2366242},
    'kismayo': {lat: -0.3540976, lng: 42.5278184}, // check location is correct
    'bosaso': {lat: 11.2755, lng: 49.1879},
    'berbera': {lat: 10.4325373, lng: 44.9946415},
    'hargeysa': {lat: 9.5624, lng: 44.0770},
};
var map;
var service;
var infowindow;
var type = ['lodging']


function initMap() {
var center = new google.maps.LatLng(coor.mogadishu.lat, coor.mogadishu.lng);

    
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 5,
        mapTypeControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
        }
    });

    var request = {
    location: center,
    radius: 8000,
    type: type
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}
// marker for each city



// marker for each activity
var city = document.querySelectorAll('.city');
var activity = document.querySelectorAll('.activity');
city.forEach(function(e){
    e.addEventListener('click', function(){
        var cityLoc = this.id;
        activity.forEach(function(e){
            e.addEventListener('click', function(){
                if(this.classList.contains('food')){
                    var type = ['food','cafe', 'restaurant'];
                } else if(this.classList.contains('hotel')){
                    var type = ['lodging'];
                } else if(this.classList.contains('beach')){
                    var type = ['natural_feature'];
                } else if(this.classList.contains('shopping')){
                    var type = ['clothing_store','shopping_mall'];
                } else if(this.classList.contains('culture')){
                    var type = ['museum'];
                }

                map = new google.maps.Map(document.getElementById('map'), {
                    center: new google.maps.LatLng(coor[cityLoc].lat, coor[cityLoc].lng),
                    zoom: 12,
                });

                var request = {
                    location: new google.maps.LatLng(coor[cityLoc].lat, coor[cityLoc].lng),
                    radius: 8000,
                    type: type
                };
                var service = new google.maps.places.PlacesService(map);service.nearbySearch(request, callback);
            })
        })
    }) 
})
            /*var request = {
                location: cityLoc,
                radius: 8000,
                type: ['cafe', 'restaurant']
            };
            map = new google.maps.Map(document.getElementById('map'), {
                center: center,
                zoom: 12,
            });
        }
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);*/
  

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
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

var dropdownBtn = document.querySelectorAll('.dropdown-btn');

dropdownBtn.forEach(function(btn){
    btn.addEventListener('click', showOptions);

    function showOptions() {
        this.nextElementSibling.classList.toggle('show');
        console.log(this.children);
    }
})

// Carousel

const coastList = ['boats-on-water.jpeg', 'ceel_sheekh.jpeg', 'hobyo-beach.png', 'jazeera-beach.png', 'kismayo.png', 'murcanyo-beach.png', 'murcanyo-cliff.jpeg', 'warsheikh-beach.jpeg'];
const carousel = document.querySelector('.carousel');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const imgBtn = document.querySelectorAll('.img-btn');

// styled about, explore coast sections
imgBtn.forEach(function(el){
    el.addEventListener('click', changeImg);
    function changeImg(){
        let currentImg = document.querySelector('.current-img').getAttribute('src');
        let url = 'assets/images/'
        if(el.id === 'next'){
            for(i of coastList){
                idx = coastList.indexOf(i);
                if(url+i == currentImg && idx<7){
                    idx++;
                    document.querySelector('.current-img').src = url+coastList[idx];
                    console.log(idx);
                } else if(url+i == currentImg && idx==7){
                    idx = 0;
                    document.querySelector('.current-img').src = url+coastList[idx];
                    console.log(idx);
                }
            }
        } else if (el.id === 'prev'){
            for(i of coastList){
                idx = coastList.indexOf(i);
                if(url+i == currentImg && idx>0){
                    console.log(i,idx);
                    idx--;
                    document.querySelector('.current-img').src = url+coastList[idx];
                }else if(url+i == currentImg && idx==0){
                    idx = 7;
                    document.querySelector('.current-img').src = url+coastList[idx];
                    console.log(i,idx);
                }
            }
        }
    }
})


// Sliding map navbar
var sideBar = document.querySelector('.sidebar-container');
var navBtn = document.querySelector('.nav-btn');
navBtn.addEventListener('click', sideBarToggler);

function sideBarToggler(){
    sideBar.classList.toggle('d-none');
    sideBar.fade
    navBtn.classList.toggle('click');
}


