var audio_context;	
var hum_timer;
var hum_delta = 1;
var hum_base = 200;
var hum_min = 100;
var hum_max = 400;
var vco;
var vca;

/* audio */

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

/* controls */

function init_controls() {
	var audio = getCookie("audio");
    var controls = document.getElementById("controls");
    controls.addEventListener("click", hum_on_off);
	if (audio != "off")
        hum_on(controls);
	else
        hum_off(controls);
}

function hum_on_off() {
	if (!audio_context) {
		// if iOS need user event to unlock context
	    get_audio_context();
		init_hum();
    	console.log(audio_context);
	}
    var controls = document.getElementById("controls");
	var audio = getCookie("audio");
	if (audio == "off")
        hum_on(controls);
	else
        hum_off(controls);
}

function hum_on(controls) {
    vca.gain.value = 1;
    controls.innerHTML = "&times;";
    set_cookie("audio", "on");
    console.log("audio = " + getCookie("audio"));
}

function hum_off(controls) {
    vca.gain.value = 0;
    controls.innerHTML = "+";
    set_cookie("audio", "off");
    console.log("audio = " + getCookie("audio"));
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

/* cookies */

function set_cookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
}

function getCookie(cname) {
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

function checkCookie(cname) {                
    if (getCookie(cname) != "")
        return true;
    else
        return false;
}
