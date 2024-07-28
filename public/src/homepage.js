let map;
    let marker;
    let autocomplete;
    let mapInitialized = false;
    let selectedPlace = null;

    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      });

      const input = document.getElementById('pac-input');
      const searchBox = new google.maps.places.SearchBox(input);

      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
      });

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }

        const bounds = new google.maps.LatLngBounds();
        places.forEach(place => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }

          if (marker) {
            marker.setMap(null);
          }

          marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });

          selectedPlace = place;

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });

      map.addListener('click', (event) => {
        placeMarker(event.latLng);
      });
    }

    function placeMarker(location) {
      if (marker) {
        marker.setPosition(location);
      } else {
        marker = new google.maps.Marker({
          position: location,
          map: map
        });
      }
      document.getElementById('latitude').value = location.lat();
      document.getElementById('longitude').value = location.lng();
    }

    document.getElementById('saveLocation').addEventListener('click', () => {
      const lat = document.getElementById('latitude').value;
      const lng = document.getElementById('longitude').value;
      const locationName = selectedPlace ? selectedPlace.formatted_address : 'Unknown location';
      document.getElementById('location-name').value = locationName;
      alert(`Selected location: ${locationName}`);
    });

    $('#addressModal').on('shown.bs.modal', function () {
      if (!mapInitialized) {
        initMap();
        mapInitialized = true;
      }
    });

    // Prevent closing the modal when selecting from the dropdown
    $(document).on('click', '.pac-container', function(e) {
      e.stopPropagation();
    });
    initMap();