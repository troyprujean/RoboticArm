// require modules
const Gpio = require('pigpio').Gpio;
const keypress = require('keypress');
// define servo GPIO ports
const PAN_PORT = 22;
// define minimum and maximum PWM values for servos
const PAN_MIN = 500;
const PAN_MAX = 2400;
// define movement step
const STEP = 20;
// configure GPIOs
const pan = new Gpio(PAN_PORT, {mode: Gpio.OUTPUT});
// helper function limiting value to [min, max] range
function constraint(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
// center servos
let panValue = PAN_MIN + (PAN_MAX - PAN_MIN) / 2;
pan.servoWrite(panValue);
// make process.stdin start emitting keypress events 
keypress(process.stdin);
// handle keypress
process.stdin.on('keypress', (ch, key) => {
  switch (key.name) {
    case 'left':
      panValue += STEP;
      panValue = constraint(panValue, PAN_MIN, PAN_MAX);
      pan.servoWrite(panValue);
      break;
    case 'right':
      panValue -= STEP;
      panValue = constraint(panValue, PAN_MIN, PAN_MAX);
      pan.servoWrite(panValue);
      break;
    case 'c':
      // ctrl+c will still stop the script, needs to be added manually because of raw mode
      if (key.ctrl) {
        process.stdin.pause();
      }
  }
  console.log(`pan: ${panValue} tilt: ${tiltValue}`);
});
// use raw mode to enable character-by-character input
process.stdin.setRawMode(true);
// begin reading from stdin
process.stdin.resume();
console.log('Use left and right arrows to control servo. Press ctrl+c to stop.');