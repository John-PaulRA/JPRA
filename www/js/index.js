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
    }
};
