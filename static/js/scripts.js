//MAPP
console.log('Loaded Scripts');
var gooogleapi = 'AIzaSyBvx0Fowm0vrGqkZl-4lrEhoG5i3gAM4Xo'
accessToken = 'pk.eyJ1Ijoic2hha2lyY2siLCJhIjoiY2tiMmNhOHhpMDk4MjJxcGhqdXc5cTZsMyJ9.lEdt0iifQJVwK_bTm9mMCw';
var tileUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
var mymap;
var initialLoadPosition = {
    Lat:0,
    Lng:0
}
var popup ;

var card  = `<div class="card" style="width: 18rem;">
<img src="http://13.126.210.153/u/88b1a909-be0b-41a7-8384-05ec07d9fa55.jpg" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">spectacled cobra (Naja naja)</h5>
  <p class="card-text">Commonly found across the Indian Subcontinent except most of the north-east, far north in Kashmir and Indian Islands. </p>
  <div class="btns">
    <div class="btn-success btn">Highly Venomous</div>
  <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
</div>`


var hospitalIcon = L.icon({
    iconUrl: 'assets/location.svg',
    iconSize: [38, 95],
    iconAnchor: [19,47],
    popupAnchor: [0, -16],
    
});
var RescuerIcon = L.icon({
    iconUrl: 'assets/icons8-telephone-48.png',
    iconSize: [48, 48],
    iconAnchor: [24,24],
    popupAnchor: [0, -16],
    
});


var myCurrentLocation = L.icon({
    iconUrl: 'assets/marker.svg',
    iconSize: [38, 95],
    iconAnchor: [19, 47],
    popupAnchor: [0, -10],
    
});


// MAPS
//setting initial position of map
function setInitialPosition(latitude,longitude){
    initialLoadPosition.Lat=latitude;
    initialLoadPosition.Lng=longitude;
}


//loading map with lat and lng
function loadMap(initialLoadPosition){

    mymap = L.map('map').setView([initialLoadPosition.Lat, initialLoadPosition.Lng], 11);

L.tileLayer(tileUrl, {
    attribution: attribution,
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: accessToken
}).addTo(mymap);







}
 





function addMarker(){
    // L.marker([11.8335,75.9701]).addTo(mymap);
    // L.marker([9.9954,76.2951]).addTo(mymap).bindPopup("Hi There").openPopup();
    // marker.bindTooltip("my tooltip text");

    for( district in hospitals){
        var Obj = hospitals[district];
        for(hospital of Obj){
            // console.log(hospital.latitude,hospital.longitude,hospital.imgUrl);
            let latitude = hospital.latitude;
            let longitude = hospital.longitude;
            // addMarker(latitude,longitude);
             // addMarker(9.99,76.65);
            // addMarker(hospital.latitude,hospital.longitude);
            var popupContent =`<div class="pop-ups">
            <div class="image-container">
              <img src="${hospital.imgUrl}" alt="">
            </div>
            <div class="name flex-row">
              <img class="pop-up-content-icon" src="./assets/003-doctor.svg"/>
              <p>${hospital.name}</p>
            </div>
            <div class="contact flex-row">
              <img class="pop-up-content-icon" src="./assets/001-phone.svg"/>
              <p>${hospital.contact}</p>
            </div>
            <div class="address flex-row">
              <img class="pop-up-content-icon" src="./assets/002-map.svg"/>
              <p>${hospital.address}</p>
            </div>
          </div>`
            popup= L.popup()
                .setLatLng([latitude,longitude])
                .setContent(popupContent)
                .openOn(mymap);
            L.marker([latitude,longitude],{icon:hospitalIcon}).addTo(mymap).bindPopup(popup);//.openPopup();

        }
     }

    
     
}
 
function createCustomIcon (feature, latlng) {
    let RescuerIcon = L.icon({
      iconUrl: 'assets/icons8-telephone-48.png',
    //   shadowUrl: 'my-icon.png',
      iconSize:     [36, 36], // width and height of the image in pixels
    //   shadowSize:   [35, 20], // width, height of optional shadow image
      iconAnchor:   [18, 18], // point of the icon which will correspond to marker's location
    //   shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
      popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    })
    return L.marker(latlng, { icon: RescuerIcon })
  }
  let RescuerLayerOption = {
      pointToLayer:createCustomIcon
  }


// setInitialPosition(10.8505,76.2711);
var currentLat=initialLoadPosition.Lat;
var currentLong = initialLoadPosition.Lng;
setInitialPosition(currentLat ,currentLong)
loadMap(initialLoadPosition);
addMarker();
loadRescuerMarker();
 




//Load Snake Rescuer

function loadRescuerMarker(){
    // L.geoJSON(snakeRescuer,RescuerLayerOption).addTo(mymap);
    
      var RescuerIcon = L.icon({
        iconUrl: 'assets/icons8-telephone-48.png',
        iconSize: [30, 30],
        iconAnchor: [15,15],
        popupAnchor: [0, -16],
        
    });
        
      L.geoJSON(snakeRescuer, {
        pointToLayer: function (feature, latlng) {
            var mypopup = L.popup().setContent(`
           <div class="rescuer-marker"> 
           <p> ${feature.properties.name}</p>
           <p>${feature.properties.contact}</p>
           </div>
            `);
            var mymarker = L.marker(latlng, {icon:RescuerIcon});
      
            mymarker.bindPopup(mypopup);
            return mymarker;               
        }
      }).addTo(mymap);
}

var allSections;
var currentSection;
// web controlls
function clickEvents(e){
    if(e.target.className=='nav-control'){
        currentSection = e.target.dataset['section'];
         allSections =  document.querySelectorAll('.nav-control');
        for(sec of allSections){
            document.getElementById(sec.dataset.section).classList.add('hide');
        }
        document.getElementById(currentSection).classList.remove('hide');
        // console.log(allSections);

    }
  //  console.log(e);
}

allSections =  document.querySelectorAll('.nav-control');

for(sec of allSections){
    document.getElementById(sec.dataset.section).classList.add('hide');
}
document.getElementById('home').classList.remove('hide');
document.addEventListener('click',clickEvents);