console.log('Loaded ReverseGeoCoding')
var apikey = '789ee058a7df49d2aa659fcbef8f8f96';
var currentLocation ;
var loc;
setTimeout(function(){
    
  var geolatitude = initialLoadPosition.Lat;
  var geolongitude = initialLoadPosition.Lng;

  var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url
    + '?'
    + 'key=' + apikey
    + '&q=' + encodeURIComponent(geolatitude + ',' + geolongitude)
    + '&pretty=1'
    + '&no_annotations=1';

  // see full list of required and optional parameters:
  // https://opencagedata.com/api#forward

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {
     

    if (request.status == 200){ 
       
      var data = JSON.parse(request.responseText);
    //   alert(data.results[0].formatted);
    console.log(data.results[0]);
    loc = data.results[0];
      currentLocation = data.results[0].formatted;

    } else if (request.status <= 500){ 
      
                           
      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log(data.status.message);
    } else {
      console.log("server error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");        
  };

  request.send();  // make the request

},10000)

var refresh = setInterval(function(){
  var userLocation = document.getElementById('user-location');
  var load = document.getElementsByClassName('sk-chase')
if(currentLocation!=undefined){
  userLocation.innerHTML=" ";
  load[0].classList.add('hide')
  userLocation.innerText=currentLocation;
  mymap.setView([loc.geometry.lat, loc.geometry.lng], 11);
  L.marker([loc.geometry.lat, loc.geometry.lng],{icon:myCurrentLocation}).addTo(mymap).bindPopup("You are Here");
  var circle = L.circle([loc.geometry.lat, loc.geometry.lng], {
    color: 'none',
    fillColor: 'blue',
    fillOpacity: 0.2,
    radius: 50000
}).addTo(mymap);
  clearInterval(refresh);

}
console.log('refresh')

},1000)