/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    timerValue: 0,
    
    // Application Constructor
    // direct call to the event if we are not in a cordova app like a browser
    initialize: function() {
        if(window.cordova)
            document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        else
            this.onDeviceReady();

    },
    
    // bind to native controls
    overrideBrowserAlert: function() {
        if (navigator.notification && device.platform !='browser') { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    message,    // message
                    null,       // callback
                    "Message de TP 01", // title
                    'Compris'        // buttonName
                );
            };
        }
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        console.log('identifier: %s', navigator.appInfo.identifier);
        console.log('version: %s', navigator.appInfo.version);
        console.log('build: %s', navigator.appInfo.build);
        console.log("onDeviceReady");
        var x = 0;
        var y = 0;

        console.log("acceleration : " + navigator.accelerometer);
        function onSuccess(acceleration) {
            value_x = (acceleration.x / 10 * 90);
            value_y = (acceleration.y / 10 * 90);           

            console.log('x : ' + Math.abs(x - value_x));
            console.log('x -> ' + x);
            if((Math.abs(value_x - x) > 0.1)){
                x = value_x;                
                $("#acceleration-x").text(acceleration.x / 10 * 90);
                $("#position-x").css('margin-left' , (value_x)/2+50 + '%');
            }

            if((Math.abs(value_y - y) > 0.1)){
                y = value_y;                
                $("#acceleration-y").text(acceleration.y / 10 * 90);
                $("#position-y").css('top' , (value_y)/2+50 + '%');
            }
        }
        
        function onError() {
            alert('onError!');
        }
        
        var options = { frequency: 100 };  // Update every 3 seconds

        navigator.accelerometer.watchAcceleration(onSuccess, onError, options);

        this.overrideBrowserAlert();
        
        // dumps the device if exsists
        if(typeof device !== 'undefined'){
            console.log(device);
        }

   
        if(navigator.splashscreen)
            navigator.splashscreen.hide();
    
    }, 
};



app.initialize();