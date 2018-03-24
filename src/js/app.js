
var Accel = require('ui/accel');
Accel.init();
var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

var isAccEnabled = false;

// Create Window
var main_window = new UI.Window();

// Open Button and Display
var txtOnLabel = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'Gothic 28 Bold',
    text: 'Like a boss',
    textAlign: 'center',						
    color: 'white'
});

// Display Main Window
main_window.backgroundColor('black');
main_window.add(txtOnLabel);
main_window.show();

// URL To Particle Cloud
function Toggle(function_name,function_value){
  var URL = 'https://api.particle.io/v1/devices/DEVICE_ID/' + function_name +'?access_token=SECURE_TOKEN';

  ajax(	
    {
      url: URL,
      method: 'post',	
      type: 'json',
      data: { "args": function_value}
    }
  );
}

// Accelerometer Poll and Function (Default 100Hz 25)
Accel.on('data', function(e) {
  if (!isAccEnabled) {
    return;
  }
  console.log(e.accel.x);
  if (e.accel.x > 900) {
    Toggle('eLikeABoss','start');
  } else if (e.accel.x < -900) {
    Toggle('eLikeABoss','stop');
  }
});

// Button Function and Photon Parameters
main_window.on('click', 'up', function() {
  Toggle('eLikeABoss','start');
});

// Button Function and Photon Parameters
main_window.on('click', 'down', function() {
  Toggle('eLikeABoss','stop');
});

main_window.on('click', 'select', function() {
  isAccEnabled = !isAccEnabled;
});


