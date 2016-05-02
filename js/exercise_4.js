// Here is the javascript setup for a basic map:

// Enter your mapbox map id here to reference it for the base layer,
// this one references the ugly green map that I made.
var mapId = 'lduncanintrah.019h3911';

// And this is my access token, use yours.
var accessToken = 'pk.eyJ1IjoibGR1bmNhbmludHJhaCIsImEiOiJjaW5wem1jYmYxMDM3dHRtM2h4dWtxejk1In0.yDfj0I5gxAHRQAue9Pl12Q';

// Create the map object with your mapId and token,
// referencing the DOM element where you want the map to go.
L.mapbox.accessToken = accessToken;
var map = L.mapbox.map('map', mapId);

// Set the initial view of the map to the whole US
map.setView([39, -96], 4);

// Great, now we have a basic web map!

var dataFileToAdd = 'data/restaurants.geojson';

var featureLayer = L.mapbox.featureLayer()
  .loadURL( dataFileToAdd )
  .addTo(map);

featureLayer.on('ready', function() {
  this.eachLayer(function( layer ) {
      layer.setIcon( L.mapbox.marker.icon( {
        "marker-color" : "#8834bb",
        "marker-size" : "large",
        "marker-symbol" : "restaurant"
      } ) );
    });
    map.fitBounds( this.getBounds() );
});

/*featureLayer.on('ready', function() {
  this.eachLayer(function(layer) {
    layer.bindPopup('Welcome to '+layer.feature.properties.name);
  });
});*/

var clickHandler = function( e ) {
  $('#info').empty();
  var feature = e.target.feature;
  
  $('#sidebar').fadeIn(400, function() {
    var info = '';
    
    info += '<div><h2>' + feature.properties.name + '</h2>';
    if ( feature.properties.cuisine ) info += '<p>' + feature.properties.cuisine + '</p>';
    if ( feature.properties.phone ) info += '<p>' + feature.properties.phone + '</p>';
    if ( feature.properties.website ) info += '<p><a href="' + feature.properties.website + '">Website</a></p>';
    info += '</div>';
    
    $('#info').append(info);
  });
}

featureLayer.on('ready', function() {
  this.eachLayer(function(layer) {
    layer.on('click', clickHandler);
  });
});

