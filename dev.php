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
    font-size: 36px;
    color: #FFF;
}
</style>
<input id="play" class="btn" type="button" value="* p l a y *"/>
<input id="stop" class="btn" type="button" value="* s t o p *">

<script>

// 0. create audio context
// 1. create oscillator, define
// 2. connect oscillator to gain
// 3. create gain
// 4. connect gain to output
// 5. start oscillator (on click)

var this_audio_context = window.AudioContext || // default
                         window.webkitAudioContext || // safari
                         false;
audio_context = new this_audio_context;

function init() {
    var hum_base = 200;

    // oscillator
    vco = audio_context.createOscillator();
    vco.type = 'sine';
    vco.frequency.value = hum_base;

    // gain
    vca = audio_context.createGain();
    vca.gain.value = .25;

    // connect
    vco.connect(vca);
    vca.connect(audio_context.destination);
}

// listeners

document.getElementById('play').addEventListener('click', on);
document.getElementById('stop').addEventListener('click', off);

// control

function on() {
    init();
    vco.start(0); 
    document.getElementById('play').style.color="#666";
    document.getElementById('stop').style.color="#FFF";
}

function off() {
    vco.stop(0); 
    document.getElementById('play').style.color="#FFF";
    document.getElementById('stop').style.color="#666";
}

function cleanup() {
    vco.disconnect(0); 
}
</script>
</html>
