var audio_context;	
var hum_timer;
var hum_delta = 1;
var hum_base = 200;
var hum_min = 100;
var hum_max = 400;
var vco;
var vca;

function get_audio_context() {
    var this_audio_context = window.AudioContext || // default
                             window.webkitAudioContext || // safari
                             false;
    audio_context = new this_audio_context;
    console.log(audio_context);
}

function init_hum() {
    // vco
    vco = audio_context.createOscillator();
    vco.type = 'sine';
    vco.frequency.value = hum_base;
    vco.start(0);

    // vca
    vca = audio_context.createGain();
    vca.gain.value = 0;

    // connections
    vco.connect(vca);
    vca.connect(audio_context.destination);
    
    vca.gain.value = 1;
    // hum_timer = window.setInterval(change_frequency, 100);
}

























/* this is left over for now as the frequency change is in clock.js */

/*
function change_frequency()
{
    rand = (Math.floor(Math.random() * 3) - 1) * hum_delta;
    if (vco.frequency.value <= hum_min)
        vco.frequency.value += hum_delta;
    else if (vco.frequency.value >= hum_max)
        vco.frequency.value -= hum_delta;
    else
        vco.frequency.value += rand;
}
*/

