function jaavaa() {

    alert("greetings friend");
}


function searchTransport() {
    var directionsRenderer = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {lat: 37.77, lng: -122.447}
    });
    directionsRenderer.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsRenderer);
    document.getElementById('mode').addEventListener('change', function() {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
  }

  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    var selectedMode = document.getElementById('mode').value;

    var terst = Geocoder.geocode();
    console.log(terst);

    var markerOrigin = geocodeAddress(document.getElementById("autocomplete").value, map, 1);
    var markerDest = geocodeAddress(document.getElementById("autocompleteDest").value, map, 0);

        if (markerOrigin !== undefined) {
            directionsService.route({
            origin: {lat: markerOrigin.position.lat, lng: markerOrigin.position.lng},  // Haight.
            destination: {lat: markerOriginDest.position.lat, lng: markerOriginDest.position.lng},  // Ocean Beach.
            // Note that Javascript allows us to access the constant
            // using square brackets and a string value as its
            // "property."
            travelMode: google.maps.TravelMode[selectedMode]
            }, function(response, status) {
            if (status == 'OK') {
                directionsRenderer.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
            });
            
        }
  
  }

  
  function geocodeAddress(geocoder, resultsMap, oriDest) {
    
    if (oriDest == 1) {var address = document.getElementById('autocomplete').value;}
    else { document.getElementById("autocompleteDest") }


    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        
        
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location  
        });

        return marker;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
        return undefined;
      }
      

    });
  }


//   function geolocate() {

//         var geolocation = {
//           lat: -35.308030,
//           lng: 149.124438
//         };
//         var circle = new google.maps.Circle(
//             {center: geolocation, radius: 100});
//         autocomplete.setBounds(circle.getBounds());
      
//   }


function initInitMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -35.308402, lng: 149.124433},
        zoom: 8
      });

}



function initializeGMAPI() {
    

    initAutocomplete();
    initDestAutoComplete(); 
    initInitMap();

 }



            // This sample uses the Autocomplete widget to help the user select a
            // place, then it retrieves the address components associated with that
            // place, and then it populates the form fields with those details.
            // This sample requires the Places library. Include the libraries=places
            // parameter when you first load the API. For example:
            // <script
            // src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
            
            var placeSearch, autocomplete;
            
            var componentForm = {
              street_number: 'short_name',
              route: 'long_name',
              locality: 'long_name',
              administrative_area_level_1: 'short_name',
              country: 'long_name',
              postal_code: 'short_name'
            };
            
            function initAutocomplete() {

            
              // Create the autocomplete object, restricting the search predictions to
              // geographical location types.
              autocomplete = new google.maps.places.Autocomplete(
                  document.getElementById('autocomplete'), {types: ['geocode']});
            
              // Avoid paying for data that you don't need by restricting the set of
              // place fields that are returned to just the address components.
              autocomplete.setFields(['address_component']);
            
              // When the user selects an address from the drop-down, populate the
              // address fields in the form.
              //autocomplete.addListener('place_changed', fillInAddress);

              //initDestAutoComplete();

            }
            
            function initDestAutoComplete() {

                // Create the autocomplete object, restricting the search predictions to
                // geographical location types.
                autocompleteDest = new google.maps.places.Autocomplete(
                    document.getElementById('autocompleteDest'), {});
              
                // Avoid paying for data that you don't need by restricting the set of
                // place fields that are returned to just the address components.
                autocompleteDest.setFields(['address_component']);
              
                // When the user selects an address from the drop-down, populate the
                // address fields in the form.
                //autocomplete.addListener('place_changed', fillInAddress);
  
              }


            function fillInAddress() {
              // Get the place details from the autocomplete object.
              var place = autocomplete.getPlace();
            
              for (var component in componentForm) {
                document.getElementById(component).value = '';
                document.getElementById(component).disabled = false;
              }
            
              // Get each component of the address from the place details,
              // and then fill-in the corresponding field on the form.
              for (var i = 0; i < place.address_components.length; i++) {
                var addressType = place.address_components[i].types[0];
                if (componentForm[addressType]) {
                  var val = place.address_components[i][componentForm[addressType]];
                  document.getElementById(addressType).value = val;
                }
              }
            }
            
            // Bias the autocomplete object to the user's geographical location,
            // as supplied by the browser's 'navigator.geolocation' object.
            function geolocate() {

                var geolocation = {
                lat: -35.308030,
                lng: 149.124438
                };
                var circle = new google.maps.Circle(
                {center: geolocation, radius: 2});
                autocomplete.setBounds(circle.getBounds());

            }



// function searchTransport() {



// }