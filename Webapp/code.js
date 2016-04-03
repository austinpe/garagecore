/*jslint browser: true*/
/*global $, jQuery*/
/*jshint strict: true */

/*EDIT THESE VARIABLES*/
//key is the same as your 'access token'
var key = "xxxxx";

//device_id is the same as the 'core id'
var device_id = "xxxxxx";

//status_check_time is the amount of time in ms that you want 
//to wait between checking the status of the garage door
// this should be a little longer than it takes for your garage door to open/close
var status_check_time = 30000;

//API call URL
var api_url = "https://api.particle.io";

/*EDIT ABOVE VARIABLES*/

var status = '-1';

var debug = 0;


function ajax_call() {
    "use strict";
    $.ajax({
        url: api_url + "/v1/devices/" + device_id + "/status",
        async: false,
        type: "POST",
        data: {access_token: key},
        success: function (response) {status = response.return_value; }
    });
}

function check_status() {
    "use strict";
    if (!debug) {
        ajax_call();
    }
    
    $('.status_closed').css('display', 'none');
    $('.status_open').css('display', 'none');
    $('.status_none').css('display', 'none');
    
    if (status === '1') {
        $('.status_open').css('display', 'block');
    } else if (status === '0') {
        $('.status_closed').css('display', 'block');
    } else if (status === '-1') {
        $('.status_none').css('display', 'block');
    }
}


$(document).ready(function () {
    "use strict";
    check_status();
});


$(".button").click(function () {
    "use strict";
    $.ajax({
        url: api_url + "/v1/devices/" + device_id + "/relay",
        async: false,
        type: "POST",
        data: {access_token: key}
    });
	delay_check_status();
});

var delay_check_status = function(){
	setInterval(function () {
		check_status(); 
		console.log('checked status after', status_check_time);
	}, status_check_time);
}
