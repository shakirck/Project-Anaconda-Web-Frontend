
(function(){
  console.log('loaded GeoLocation')
var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,function(){console.log('error geolocation')},{enableHighAccuracy:true, timeout:60000, maximumAge:600000});
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
  initialLoadPosition.Lat=position.coords.latitude;
  initialLoadPosition.Lng = position.coords.longitude;
  
}

getLocation();
})();