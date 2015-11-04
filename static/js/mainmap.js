function initMap() {
  // Creates a map based off the location of the input text box 'address'
  map = new google.maps.Map(document.getElementById('mapholder'), {
    center: {
      lat: 47.6097,
      lng: -122.3331
    },
    zoom: 13
  });
};