// 0. create audio context
// 1. create oscillator, define
// 2. connect oscillator to gain
// 3. create gain
// 4. connect gain to output
// 5. start oscillator (on click)
    
var audio = "off";
var hum_delta = 1;
var hum_base = 200;
var hum_min = 100;
var hum_max = 400;
var vco;
var vca;
var this_audio_context = window.AudioContext || // default
                         window.webkitAudioContext || // safari
                         false;
var audio_context = new this_audio_context;
var control = init_control();
    
// this is not great, as it is in two places (init_hum also)
if (audio_context == "true")
    init_hum();

/* init */

function init_control() {
    // var audio = getCookie("audio");
    var this_control = document.getElementById("control");
    this_control.addEventListener("click", hum_on_off);
    /* 
    // cookie *fix*
    if (audio != "off")
        hum_on(this_control);
    else
        hum_off(this_control);
    */
    return this_control;
}

function init_hum() {
    vco = audio_context.createOscillator();
    vco.type = 'sine';
    vco.frequency.value = hum_base;
    vca = audio_context.createGain();
    vca.gain.value = .25;
    vco.connect(vca);
    vca.connect(audio_context.destination);
}

/* on off */

function hum_on() {
    if (audio_context != "true")
        init_hum();
    vco.start(0); 
    control.innerHTML="&times;";
    audio = "on";
}

function hum_off() {
    vco.stop(0); 
    control.innerHTML="+";
    audio = "off";
}

function hum_on_off() {
    if (audio == "off")
        hum_on();
    else
        hum_off();
}

function cleanup() {
    vco.disconnect(0); 
}
