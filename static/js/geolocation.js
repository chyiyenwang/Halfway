// $(document).ready(function() {
var map;

function initMap() {
  // Creates a map based off the location of the input text box 'address'
  map = new google.maps.Map(document.getElementById('mapholder'), {
    center: {
      lat: rendezvous.lat,
      lng: rendezvous.lng
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
      lat: rendezvous.lat,
      lng: rendezvous.lng
    },
    radius: 1000
  });

  var request = {
    location: map.getCenter(),
    radius: '1000',
    query: 'bar',
    openNow: true
  };

  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(results);
    for (var idx in results) {
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
  






// function initMap() {
//   var map;

//   map = new google.maps.Map(document.getElementById("mapholder"), {
//     center: {lat: yourLocation.lat, lng: yourLocation.lng},
//       zoom: 13
//   });
// };

  // var map;

  // function initMap() {
  //   map = new google.maps.Map(document.getElementById('mapholder'), {
  //     center: { lat: yourLocation.lat, lng: yourLocation.lng,}, zoom: 13
  //   });
  //   console.log(yourLocation.lat, yourLocation.lng)
  // };

  // // Try W3C Geolocation (Preferred)
    // if (navigator.geolocation) {
    //     browserSupportFlag = true;
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //         map.setCenter(initialLocation);
    //     }, function() {
    //         handleNoGeolocation(browserSupportFlag);
    //     });
    // }
  //   // Browser doesn't support Geolocation
  //   else {
  //       browserSupportFlag = false;
  //       handleNoGeolocation(browserSupportFlag);
  //   }

  //   function handleNoGeolocation(errorFlag) {
  //       if (errorFlag == true) {
  //           alert("Geolocation service failed.");
  //           initialLocation = newyork;
  //       } else {
  //           alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
  //           initialLocation = siberia;
  //       }
  //       map.setCenter(initialLocation);
  //   }
  //   var service = new google.maps.places.PlacesService(map);

  //   $('body').on('submit', 'address', function(event) {
  //     event.preventDefault();
  //     var query = $('address').val();
  //     service.textSearch({
  //       query: query,
  //       bounds: map.getBounds()
  //     }, function(results, status) {
  //       if (status !== google.maps.places.PlacesServiceStatus.OK) {
  //         console.error(status);
  //         return;
  //       }
  //       var latlngBounds = new google.maps.LatLngBounds();
  //       results.forEach(function(results) {
  //         var latlng = result.gemotetry.location;
  //         var gLatLng - new google.maps.LatLng(latlng.G, latlng.K);
  //         var marker = new google.maps.Marker({
  //           position: gLatlng,
  //           title: 'A Marker',
  //           map: map
  //         });
  //         latlngBounds.extend(gLatLng);
  //         // info window
  //         maker.addListener('click', function() {
  //           var infoWindow = new google.maps.InfoWindow({
  //             content: '<h3>' + result.name + '</h3><p>' + result.formatted_address + "</p>"
  //           });
  //           infoWindow.open(map, marker);
  //         });
  //       });
  //       map.setCenter(latlngBounds.getCenter());
  //       map.fitBounds(latlngBounds);
  //     });
  //   });

  // getLocation();

  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);
  //   } else {
  //     console.log('Geolocation is not supported by this browser.');
  //   }
  // };

  // function showPosition(position) {
  //   // var lat = position.coords.latitude;
  //   // var lon = position.coords.longitude;
  //   var lat = yourLocation.lat;
  //   var lon = yourLocation.lng;
  //   var latlon = new google.maps.LatLng(lat, lon);
  //   var mapholder = document.getElementById('mapholder')
  //   mapholder.style.height = '500px';
  //   mapholder.style.width = '500px';

  //   var myOptions = {
  //     center:latlon,zoom:16,
  //     mapTypeId:google.maps.MapTypeId.ROADMAP,
  //     mapTypeControl:false,
  //     navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
  //   };

  //   var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);

  //   for (var i in stores.businesses) {
  //     var store = stores.businesses[i]
  //       var marker = new google.maps.Marker({
  //         position: latlon,
  //         map: map
  //       });
  //   };

  //   console.log("Latitude: " + lat + " Longitude: " + lon); 
  // };

// });