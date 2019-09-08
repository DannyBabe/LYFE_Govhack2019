function jaavaa() {

    alert("greetings friend");
}


function searchTransport() {
    var directionsRenderer = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: { lat: -35.12, lng: 149.12 }
    });
    directionsRenderer.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsRenderer);
    document.getElementById('mode').addEventListener('change', function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
}

async function calculateAndDisplayRoute(directionsService, directionsRenderer) {

    var selectedMode = document.getElementById('mode').value;

    var markerOrigin = await findLatLang(document.getElementById("autocomplete").value); // e.g  [-35.3129723, 149.13099599999998]
    var markerDest = await findLatLang(document.getElementById("autocompleteDest").value);

    

    document.getElementById("autocomplete").value

    directionsService.route({
        origin: { lat: markerOrigin[0], lng: markerOrigin[1] },  // Haight.
        destination: { lat: markerDest[0], lng: markerDest[1] },  // Ocean Beach.
        travelMode: google.maps.TravelMode[selectedMode]
    }, function (response, status) {
        if (status == 'OK') {

            // Determine the distance of the trip
            var distance = response.routes[0].legs[0].distance.value;
            console.log(distance + "m (distance)");

            directionsRenderer.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function findLatLang(address) {
    var geocoder = new google.maps.Geocoder();

    return new Promise(function (resolve, reject) {
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
                // Wait for Google API before proceeding
                resolve([results[0].geometry.location.lat(), results[0].geometry.location.lng()]);
            }
            else {
                reject(new Error('Couldnt\'t find the location ' + address));
            }
        })
    })
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
        center: { lat: -35.308402, lng: 149.124433 },
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

    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-35.087185, 148.874097),
        new google.maps.LatLng(-35.492961, 149.261650));
      
      var input = document.getElementById('autocomplete');
      var options = {
        bounds: defaultBounds,
        types: ['geocode']
      };
      
      autocomplete = new google.maps.places.Autocomplete(input, options);


    //autocomplete = new google.maps.places.Autocomplete(
      //  document.getElementById('autocomplete'), { types: ['geocode'] });
    
    
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

    var geolocation = {
        lat: -35.308030,
        lng: 149.124438
    };
    var circle = new google.maps.Circle(
        { center: geolocation, radius: 100000 });

        console.log(circle);
        console.log(circle.getBounds());
    autocompleteDest.setBounds(circle.getBounds());
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


    // var geolocation = {
    //     lat: -35.308030,
    //     lng: 149.124438
    // };
    // var circle = new google.maps.Circle(
    //     { center: geolocation, radius: 150 });
    // autocomplete.setBounds(circle.getBounds());

}

