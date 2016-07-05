// audio on/off controls
// (adapted from radioathenes.org)

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
