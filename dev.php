<!DOCTYPE html>
<html>
<style>
.btn {
    background-color: #000;
    border: none;
    border-radius: 4px;
    padding: 15px 30px;
    margin: 15px;
    text-align: center;
    font-size: 36pt;
    color: #FFF;
    -webkit-appearance: none; /* ios */
}
</style>
<input id="play" class="btn" type="button" value="* p l a y *"/>
<input id="stop" class="btn" type="button" value="* s t o p *">
<input id="play_stop" class="btn" type="button" value="* p l a y *">

<script>

// 0. create audio context
// 1. create oscillator, define
// 2. connect oscillator to gain
// 3. create gain
// 4. connect gain to output
// 5. start oscillator (on click)
    
var hum_base = 200;
var audio = "off";
var this_audio_context = window.AudioContext || // default
                         window.webkitAudioContext || // safari
                         false;
audio_context = new this_audio_context;

function init_hum() {
    // vco
    vco = audio_context.createOscillator();
    vco.type = 'sine';
    vco.frequency.value = hum_base;

    // vca
    vca = audio_context.createGain();
    vca.gain.value = .25;

    // connections
    vco.connect(vca);
    vca.connect(audio_context.destination);
}

// listeners

document.getElementById('play').addEventListener('click', on);
document.getElementById('stop').addEventListener('click', off);
document.getElementById('play_stop').addEventListener('click', on_off);

// control

function on() {
    init_hum();
    vco.start(0); 
    document.getElementById('play').style.color="#666";
    document.getElementById('stop').style.color="#FFF";
    document.getElementById('play_stop').value="* s t o p *";
    audio = "on";
}

function off() {
    vco.stop(0); 
    document.getElementById('play').style.color="#FFF";
    document.getElementById('stop').style.color="#666";
    document.getElementById('play_stop').value="* p l a y *";
    audio = "off";
}

function on_off() {
    if (audio == "off")
        on();
    else
        off();
}

function cleanup() {
    vco.disconnect(0); 
}
</script>
</html>
