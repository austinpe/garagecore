/*jslint browser: true*/
/*global $, jQuery*/
/*jshint strict: true */

/*EDIT THESE VARIABLES*/
//key is the same as your 'access token'
var key = "1234123412341234123412341234123412341234";

//device_id is the same as the 'core id'
var device_id = "0123456789abcdef01234567";

//status_check_time is the amount of time in ms that you want 
//to wait between checking the status of the garage door
var status_check_time = 15000;

/*EDIT ABOVE VARIABLES*/

var status = '-1';

var debug = 0;


function ajax_call() {
    "use strict";
    $.ajax({
        url: "https://api.spark.io/v1/devices/" + device_id + "/status",
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
        url: "https://api.spark.io/v1/devices/" + device_id + "/relay",
        async: false,
        type: "POST",
        data: {access_token: key}
    });
});

setInterval(function () {"use strict"; check_status(); }, status_check_time);
