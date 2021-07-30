if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("service worker registered"))
    .catch((err) => console.log("service worker not registered", err));
}





//    S T A R T    N O T I F I C A T I O N
if ("Notification" in window && navigator.serviceWorker) {
  Notification.requestPermission(function () {
    if (Notification.permission == "granted") {
      console.log(Notification.permission, 'garantee')
      navigator.serviceWorker.getRegistration().then(function (reg) {
        var options = {
          body: "Here is a notification body!",
          icon: "images/example.png",
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: new Date(new Date().getTime() + 3 * 60000),
            primaryKey: 1,
          },
          actions: [{
              action: "explore",
              title: "Explore this new world",
              icon: "images/checkmark.png",
            },
            {
              action: "close",
              title: "Close notification",
              icon: "images/xmark.png",
            },
          ],
        };
        reg.showNotification("Hello world!", options);
      });
    } else if (Notification.permission === "blocked") {
      /* the user has previously denied push. Can't reprompt. */
      console.log(Notification.permission)
    } else {
      /* show a prompt to the user */
      console.log('show a prompt to the user')
    }
  });
}

//    E N D        N O T I F I C A T I O N








// S T A R T    C A M E R A    I N T E G R A T I O N
let carImgUrl = "";
let enableAdd = false;

function upload() {
  const ref = firebase.storage().ref();
  const file = document.getElementById("image").files[0];
  const name = new Date() + "-" + file.name;
  const metaData = {
    contentType: file.type,
  };
  const task = ref.child(name).put(file, metaData);
  task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      carImgUrl = url;
      enableAdd = true;
    });
}
// E N D       C A M E R A    I N T E G R A T I O N






//    S T A R T    G E O L O C I C A T I O N
if (navigator.geolocation) {
  var button = document.getElementById("location");
  if (button) {
    button.addEventListener("click", function () {
      var startPos;
      var geoOptions = {
        enableHighAccuracy: true,
        timeout: 10 * 1000,
      };
      var geoSuccess = function (position) {
        startPos = position;
        document.getElementById("startLat").innerHTML = startPos.coords.latitude;
        document.getElementById("startLon").innerHTML =
          startPos.coords.longitude;
        document.getElementById("locationResults").style.display = "block";
      };
      var geoError = function (error) {
        console.log("Error occurred. Error code: " + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      };
      navigator.geolocation.getCurrentPosition(
        geoSuccess,
        geoError,
        geoOptions
      );
    });
  }
} else {
  alert("Geolocation is not supported for this Browser/OS");
  console.log("Geolocation is not supported for this Browser/OS");
}

//   E N D       G E O L O C I C A T I O N