/*
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {

        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    
    onBatteryStatus: function(status) {
        document.getElementById('battery_level').innerHTML="Level: " + status.level + " isPlugged: " + status.isPlugged;
    },

    onGPSsuccess: function(position) {
        alert('Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');
    },

    onGPSerror: function(error) {
        alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    },

    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        alert('hi - device ready');

	    var ref = window.open('http://jp.panda7.ca/', '_blank', 'location=yes');
        ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
        ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
        ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
        ref.addEventListener('exit', function(event) { alert(event.type); }); 

        // TODO what is this for?
        app.receivedEvent('deviceready');

        //////////////////////////////////////////
        // Battery
        //////////////////////////////////////////
        window.addEventListener("batterystatus", this.onBatteryStatus, false);

        //////////////////////////////////////////
        // Device
        //////////////////////////////////////////
        document.getElementById('device_info').innerHTML= device.model+' '+device.platform+' '+device.uuid;

        //////////////////////////////////////////
        // GPS
        //////////////////////////////////////////
        navigator.geolocation.getCurrentPosition(onGPSsuccess, onGPSerror);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);
    },
	inAppBrowserRef: '',

	 showHelp: function(url) {
	 
		var target = "_blank";
	 
		var options = "location=yes,hidden=yes";
	 
		this.inAppBrowserRef = cordova.InAppBrowser.open(url, target, options);
	 
		this.inAppBrowserRef.addEventListener('loadstart', this.loadStartCallBack);
	 
		this.inAppBrowserRef.addEventListener('loadstop', this.loadStopCallBack);
	 
		this.inAppBrowserRef.addEventListener('loaderror', this.loadErrorCallBack);
	 
	},
	 
    loadStartCallBack: function() {
	 
		$('#status-message').text("loading please wait ...");
	 
	},
	 
    loadStopCallBack: function() {
	 
		if (this.inAppBrowserRef != undefined) {
	 
			this.inAppBrowserRef.insertCSS({ code: "body{font-size: 25px;" });
	 
			$('#status-message').text("");
	 
			this.inAppBrowserRef.show();
		}
	 
	},
	 
	loadErrorCallBack: function(params) {
	 
		$('#status-message').text("");
	 
		var scriptErrorMesssage =
		   "alert('Sorry we cannot open that page. Message from the server is : "
		   + params.message + "');"
	 
		this.inAppBrowserRef.executeScript({ code: scriptErrorMesssage }, executeScriptCallBack);
	 
		this.inAppBrowserRef.close();
	 
		this.inAppBrowserRef = undefined;
	 
	},
	 
	executeScriptCallBack: function(params) {
	 
		if (params[0] == null) {
	 
			$('#status-message').text(
			   "Sorry we couldn't open that page. Message from the server is : '"
			   + params.message + "'");
		}
	 
	},
};
