const queryString = window.location.search;
console.log(queryString);
var params = new URLSearchParams(queryString);

var species = params.get('species');
console.log(species);
