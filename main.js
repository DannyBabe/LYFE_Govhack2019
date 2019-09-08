// const csv = require('csv-parser');
// const fs = require('file-system');
const parkRideLocals = [
    ["Weston","North Weston - Kirkpatrick Street","-35.320885, 149.058926","No Permit Required"],
    ["Belconnen","Corner of Josephson Street and Walder Street","-35.23824, 149.060841","Permit Only"],
    ["Charnwood","Charnwood Shopping Centre - Lhotsky Street","-35.205147, 149.034283","No Permit Required"],
    ["Jamison","Jamison Centre - Bowman Street","-35.252094, 149.072157","No Permit Required"],
    ["Mawson","Corner of Mawson and Athllon Drive, access from Mawson Place","-35.364975, 149.092885","Permit and Non-permit"],
    ["Bruce","College Street, adjacent to the University of Canberra","-35.242036, 149.084796","Permit Only"],
    ["Wanniassa","Athllon Drive, access via Rylah Crescent","-35.390413, 149.084687","No Permit Required"],
    ["Kippax","Kippax Centre - Hardwick Crescent","-35.22389, 149.020305","No Permit Required"],
    ["Fyshwick","Tom Price Street","-35.340108, 149.184033","No Permit Required"],
    ["Curtin","Curtin Shops - Carruthers Street","-35.325559, 149.081705","No Permit Required"],
    ["Kippax","Moyes Crescent","-35.2207792, 149.0216365","No Permit Required"],
    ["Woden","Woden Bus Station, access from Matilda Street","-35.343136, 149.087253","Permit Only"],
    ["Kambah","Kambah Centre - O'Halloran Circuit","-35.393088, 149.067983","No Permit Required"],
    ["Gungahlin","Gungahlin Town Centre - Gozzard Street, access via Efkarpidis Street","-35.186843, 149.132396","Permit Only"],
    ["Weston","Coolemon Court, Liardet Street","-35.340347, 149.051397","Permit Only"],
    ["Chisholm","Chisholm Shops - Bentham Street","-35.414624, 149.128667","No Permit Required"],
    ["Tuggeranong","Tuggeranong Bus Station, access from Anketell Street","-35.41387, 149.06669","Permit Only"],
    ["Belconnen","Belconnen Community Bus Station, access from Swanson Circuit","-35.239602, 149.069423","Permit Only"],
    ["Calwell","Calwell Shops - Webber Street","-35.433428, 149.113051","No Permit Required"],
    ["Kambah","Kambah Village Shops - Marconi Crescent","-35.379524, 149.057408","No Permit Required"]
  ];


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

    var selectedMode = "TRANSIT" //document.getElementById('mode').value; // 

    var markerOrigin = await findLatLang(document.getElementById("autocomplete").value); // e.g  [-35.3129723, 149.13099599999998]

    console.log(markerOrigin);
    var markerDest = await findLatLang(document.getElementById("autocompleteDest").value);


// CHECKPOINT
    var parkLocal = findclosestparkride(markerOrigin); // -35.123123, 149.1231231

    console.log("gimme the moooney: " + parkLocal);
    document.getElementById("autocomplete").value

    directionsService.route({
        origin: { lat: parkLocal.lat, lng: parkLocal.lng },//origin: { lat: markerOrigin[0], lng: markerOrigin[1] },  // From ADDR
        destination: { lat: markerDest[0], lng: markerDest[1] },  // Dest
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



function findclosestparkride(addrOrigin) {

    // console.log(addrOrigin)
    // // Loop through CSV data:
    // var parkAndRideCsv = [];
    console.log("ADDRORIGIN");
    console.log(addrOrigin);

    // fs.createReadStream('Park_And_Ride_Locations.csv')
    // .pipe(csv())
    // .on('data', (row) => {
    //     console.log(row);
    //     parkAndRideCsv.push(row);
    // })
    // .on('end', () => {
    //     console.log('CSV file successfully processed');
    // });

    var currentClosest = 0;
    var tmpDistance = 1000000;

    var currCoords;

    for(let i = 0; i < parkRideLocals.length; i++){

        // console.log(parkRideLocals[i][2]);

        currCoords = parkRideLocals[i][2].split(',');
        // console.log(currCoords);
        // console.log(currCoords[0]);
        // console.log(currCoords[1]);

        // console.log("break");

        let distance = Math.sqrt(Math.pow((currCoords[0] - addrOrigin[0]), 2) + Math.pow((currCoords[1] - addrOrigin[1]), 2)); // Use current CSV lat long and addrOri
        if (distance < tmpDistance) {
            tmpDistance = distance;
            currentClosest = i;
        }

        console.log(parkRideLocals[currentClosest][0] + "Distance: " + tmpDistance)
    }

    console.log("Final result: " + parkRideLocals[currentClosest][0] + "with distance: " + tmpDistance);
    //let distance = Math.sqrt(Math.pow((end_lat - lat), 2) + Math.pow((end_lon - lon), 2)); // Use current CSV lat long and addrOri
    // keep lowest value
    // return kept lowest

    var resultCoords = parkRideLocals[currentClosest][2].split(',');

    var googCurrClosest = {
        lat: parseFloat(resultCoords[0]), 
        lng: parseFloat(resultCoords[1])
    }

    return googCurrClosest;
    //return parkRideLocals[currentClosest][2];
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

