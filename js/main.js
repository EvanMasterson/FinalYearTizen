window.onload = function () {
	
	var location = document.getElementById("textbox");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
        	var latitude = position.coords.latitude;
    		var longitude = position.coords.longitude;
    		location.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
    		firebase.database().ref('location/').set({
    		    latitude: latitude,
    		    longitude: longitude
    		});
        });
        console.log("woo");
    } else {
    	console.log("erro");
        location.innerHTML = "Geolocation is not supported by this browser.";
    }

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName === "back"){
			try {
				tizen.application.getCurrentApplication().exit();
			}
			catch (ignore) {
			}
        }
    });
};
