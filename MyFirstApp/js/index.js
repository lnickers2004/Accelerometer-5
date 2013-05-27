document.addEventListener("deviceready", onDeviceReady, false);
//Activate :active state on device
document.addEventListener("touchstart", function() {}, false);

function onDeviceReady() {
    navigator.splashscreen.hide();
	var accelerometerHelper = new AccelerometerApp();
	accelerometerHelper.run();
}

function AccelerometerApp() {

}

AccelerometerApp.prototype = {
	watchID : null,
    direction: null, 
	run: function() {
		var that = this,
    		startButton = document.getElementById("startButton"),
    		stopButton = document.getElementById("stopButton");
    		that.direction = document.getElementById("direction");

		startButton.addEventListener("click", 
									 function() { 
										 that._startWatch.apply(that, arguments)
									 });
		stopButton.addEventListener("click", 
									function() { 
										that._stopWatch.apply(that, arguments)
									});
	},
    
	// Start watching the acceleration
	_startWatch: function() {
		// Only start testing if watchID is currently null.
		var that = this;
		if (that.watchID === null) {
			// Update acceleration every .5 second
			var options = { frequency: 500 };
			that.watchID = navigator.accelerometer.watchAcceleration(function() { 
				that._onAccelerometerSuccess.apply(that, arguments)
			}, 
            function(error) { 
             that._onAccelerometerError.apply(that, arguments)
            }, 
            options);
		}
	},
     
	// Stop watching the acceleration
	_stopWatch: function() {
		var that = this;
		if (that.watchID !== null) {
			navigator.accelerometer.clearWatch(that.watchID);
			that.watchID = null;
		}
	},
 
	//Get a snapshot of the current acceleration
	_onAccelerometerSuccess: function(acceleration) {
		var that = this;
        if(acceleration.x*acceleration.y<0){
            that.direction.innerText = "left";
        }
        else if(acceleration.x*acceleration.y>0){
            that.direction.innerText = "right";
        }
		//that.spanX.innerText = acceleration.x;
		//that.spanY.innerText = acceleration.y;
		//that.spanZ.innerText = acceleration.z;              
	},
    
	//Failed to get the acceleration
	_onAccelerometerError: function(error) {
		alert("Unable to start accelerometer! Error code: " + error.code );
	}
}