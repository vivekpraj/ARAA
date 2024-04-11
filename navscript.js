mapboxgl.accessToken ='pk.eyJ1Ijoidml2ZWsyMTIwMDMiLCJhIjoiY2x1dXgxeWJ2MGNqOTJtcTd5MmgwdjBneSJ9.LFbcX0hNOZtFq4-JYaLWRg'; //GENERATE YOUR OWN ACCESS TOKEN BY CREATING A MAPBOX ACCOUNT. Follow the tutorial for help.

navigator.geolocation.getCurrentPosition( successLocation, errorLocation, {
    enableHighAccuracy: true
})

function successLocation(position){
    setUpMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation(){
    setUpMap([-2.28, 41.45])
}

function setUpMap(center){
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom: 15
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.addControl(
        new MapboxDirections({
        accessToken: mapboxgl.accessToken
        }),
        'top-left'
        );
        
        mapboxgl.accessToken = 'pk.eyJ1Ijoidml2ZWsyMTIwMDMiLCJhIjoiY2x1dXgxeWJ2MGNqOTJtcTd5MmgwdjBneSJ9.LFbcX0hNOZtFq4-JYaLWRg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
  });
}

