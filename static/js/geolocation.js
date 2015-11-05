var map;
var bounds;

function initMap() {
  // Creates a map based off the location of the input text box 'address'
  map = new google.maps.Map(document.getElementById('mapholder'), {
    center: {
      lat: rendezvous.latitude,
      lng: rendezvous.longitude
    },
    zoom: 15
  });

  // Creates the circle with a 500 meter radius on the map that is centered on the rendezvous location
  var circle = new google.maps.Circle({
    strokeColor: '#96ECFF',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#D9F8FF',
    fillOpacity: 0.65,
    map: map,
    center: {
      lat: rendezvous.latitude,
      lng: rendezvous.longitude
    },
    radius: 900
  });

  bounds = circle.getBounds();

  var request = {
    location: map.getCenter(),
    radius: 900,
    // rankBy: google.maps.places.RankBy.DISTANCE,
    query: 'gas',
    openNow: true
  };

  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(results);
    for (var idx in results) {
      if (bounds.contains(results[idx].geometry.location)) {
        var marker = new google.maps.Marker({
          map: map,
          place: {
            placeId: results[idx].place_id,
            location: results[idx].geometry.location
          },
          title: results[idx].name,
          address: results[idx].formatted_address
        });

        // Clickable marker with description
        marker.addListener('click', function(e) {
          var infoWindow = new google.maps.InfoWindow({
            content:  "<p><h3>" + this.title + "</h3>" +
                      "<p>" + this.address + "</p>" +
                      "<form action='/results' method='POST' role='form'>" +
                      "<div class='form-group'>" +
                      "<input type='hidden' class='form-control' name='title' value='" + this.title + "'>" +
                      "<input type='hidden' class='form-control' name='address' value='" + this.address + "'>" +
                      "</div>" +
                      "<button type='submit' class='btn btn-success pull-right' id='share'>Share</button>" +
                      "</form></p>"
            })
          infoWindow.open(map, this);
        })
      }; 
    };
  };
};