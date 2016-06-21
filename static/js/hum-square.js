// var audio_context = new AudioContext();
var audio_context = new webkitAudioContext(); // webkit prefix makes it work in safari
var hum_timer;
var hum_delta = 1;
var hum_base = 200;
var hum_min = 100;
var hum_max = 400;

// vco
var vco = audio_context.createOscillator();
vco.type = 'square';
vco.frequency.value = hum_base;
vco.start(0);

// vca
var vca = audio_context.createGain();
vca.gain.value = 0;

// connections
vco.connect(vca);
vca.connect(audio_context.destination);

function init_hum()
{
    vca.gain.value = 1;
    // hum_timer = window.setInterval(change_frequency, 100);
}

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
