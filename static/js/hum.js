// hum.js

// toggle html audio on/off
// with cookie to maintain state
// and use html5 audio synthesis
// ios html5 audio must be triggered
// call init_hum() after DOM loaded

// 0. create audio context
// 1. create oscillator, define
// 2. connect oscillator to gain
// 3. create gain
// 4. connect gain to output
// 5. start oscillator (on click)

var audio;
var audio_context;
var control;
var vco, vca;
var hum_delta = 1;
var hum_base = 200;
var hum_min = 100;
var hum_max = 400;

/* init */

function init_hum() {
    audio = get_cookie("audio");
    console.log("audio = " + audio);
    audio_context = get_audio_context();
    console.log("audio_context = " + audio_context);
    control = get_control();
    if (audio_context != "false") {
        if (audio != "off") {
            set_hum();
            hum_on();
        }
    } else {
        set_cookie("audio", "off");
    }
}

function get_audio_context() {
    var which_audio_context = window.AudioContext || // default
                              window.webkitAudioContext || // safari
                              false;
    this_audio_context = new which_audio_context;
    return this_audio_context;
}

function get_control() {
    var this_control = document.getElementById("control");
    this_control.addEventListener("click", hum_on_off);
    return this_control;
}

function set_hum() {
    vco = audio_context.createOscillator();
    vco.type = 'sine';
    vco.frequency.value = hum_base;
    vca = audio_context.createGain();
    vca.gain.value = 1.25;
    vco.connect(vca);
    vca.connect(audio_context.destination);            
}

/* on off */

function hum_on() {
    set_hum();
    vco.start(0); 
    control.innerHTML="&times;";
    set_cookie("audio", "on");
    audio = get_cookie("audio");
    console.log("audio = " + audio);
}

function hum_off() {
    vco.stop(0); 
    control.innerHTML="+";
    set_cookie("audio", "off");
    audio = get_cookie("audio");
    console.log("audio = " + audio);
    cleanup();
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

/* cookies */

function set_cookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
}

function get_cookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0)
            return c.substring(name.length,c.length);
    }
    return "";
}

function check_cookie(cname) {
    if (getCookie(cname) != "")
        return true;
    else
        return false;
}
