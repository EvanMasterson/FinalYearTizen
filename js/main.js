//window.onload = function () {
var userid;
window.onload = function() {
	initApp();
};

function initApp(){
	firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          userid = user.uid;
          console.log(userid);
          document.getElementById('signin').style.display = 'none';
          document.getElementById('signout').style.display = 'block';
          showlocation();
        } else {
        	document.getElementById('signout').style.display = 'none';
        	console.log("Not signed in.");
        }
      });
}

function signin(){
	var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
      });
}

function signout(){
	firebase.auth().signOut();
	window.location.reload();
}

function showlocation(){
	var location = document.getElementById("textbox");

	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position){
	    	var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			location.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
			firebase.database().ref(userid+'/').set({
			    latitude: latitude,
			    longitude: longitude
			});
	    });
	    console.log("Signed in.");
	} else {
		console.log("erro");
	    location.innerHTML = "Geolocation is not supported by this browser.";
	}
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
//};
