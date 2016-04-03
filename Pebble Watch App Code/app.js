/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');

//key is the same as your 'access token'
var key = "xxxx";

//device_id is the same as the 'core id'
var device_id = "xxxx";

//API call URL
var api_url = "https://api.particle.io/v1/devices/" + device_id + "/";

//status_check_time is the amount of time in ms that you want 
//to wait between checking the status of the garage door
// this should be a little longer than it takes for your garage door to open/close
var status_check_time = 18000;


// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Garage Core',
  subtitle:'Fetching...'
});

// Display the Card
card.show();

var status_to_english = function(status) {
    if (status === 1) {
      card.subtitle('Open');
      console.log('open');
        //$('.status_open').css('display', 'block');
    } else if (status === 0) {
      card.subtitle('Closed');
      console.log('closed');
        //$('.status_closed').css('display', 'block');
    } else {
      card.subtitle('Disconnected');
      console.log('unkown');
        //$('.status_none').css('display', 'block');
    }
};

function garage_status() {
  ajax(
    {
      url: api_url + "status",
      method: 'POST',
      data: {access_token: key},
    },
    function(data){
      data = JSON.parse(data);      
      var response = data.return_value;
      status_to_english(response);
    },
    function(error) {
      console.log(error);
    }
  );
}

function garage_pulse() {
  ajax(
    {
      url: api_url + "relay",
      method: 'POST',
      data: {access_token: key},
    },
    function(data){
      setTimeout(function(){garage_status();}, status_check_time);
      card.body('Command Sent');
      setTimeout(function(){card.body('');}, 1000);
    },
    function(error) {
      console.log(error);
    }
  );
}

card.on('click', 'up', function(){
  garage_pulse();
});

garage_status();