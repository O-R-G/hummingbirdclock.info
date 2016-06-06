const SMOOTH_SECOND_HAND = true;

// DOM elements
var canvas;     // canvas
var context;    // canvas context

// integers
var r;          // clock radius

// arrays (objects)
var center = {};
var time = {};
var hand_lengths;
var hand_widths;
var s_history;
var s_length = 1000;

// timer variables;
var hand_timer;

// booleans
var show_hands;

var fr = 60;

// set size variables
function set_size(width, height)
{
    var min, line_width_factor;
    
    if (size == "small")
    {
        width = window.innerWidth * 0.2;
        height = width;
        line_width_factor = 2.0;
    }
    else
    {
        width = window.innerWidth;
        height = window.innerHeight;
        line_width_factor = 1.0;
    }
    min = Math.min(width, height);
    r = min * 0.8;
    
    hand_widths = 
    {
	/*
        h: 0.015,
        m: 0.015,
        s: 0.007,
        circle: 0.015
        */
	h: 0.008,
        m: 0.008,
        s: 0.004,
        circle: 0.015
    };
    hand_lengths = 
    {
        h: 0.5,
        m: 0.8,
        s: 0.9
    };

    // set the hand lengths
    Object.keys(hand_lengths).forEach(function(key, index) {
        hand_lengths[key] *= r;
    });

    // adjust hand_widths based on size
    Object.keys(hand_widths).forEach(function(key, index) {
        hand_widths[key] *= (min * line_width_factor);
    });
    
    // set the center x and y coordinates
    center.x = width;
    center.y = height;
    
    s_history = new Array();
    
    return;
}

// canvasId: id of canvas on page
// a_pos: either "centre" or "lower-right"
function init_clock(canvas_id)
{
    canvas = document.getElementById(canvas_id);
    context = canvas.getContext('2d');
    
    set_size();
    open_clock();
    update_time();
    
    window.onresize = function(event) 
    {
        set_size();
        draw();
    };  
}

function open_clock(starttime, endtime)
{
    show_hands = true;
    hand_timer = window.setInterval(draw, 1000 / fr);
}

function close_clock()
{
    window.clearInterval(hand_timer);
    hand_timer = null;
    show_hands = false;
    draw();
}

// given a date, d, draw hand_lengths at time d
// if no date given, then use now
function draw(d)
{
    var d1, d2;
    
    fill_bg();
    draw_circle();
    
    if (show_hands)
    {
        update_time(d);
        update_title();
        draw_hands();
    }
}

function fill_bg()
{
    // make the canvas not look horrible on retina screens
    // for some reason this has to be called on every loop?
    // it needs to be called in every loop if the background is at
    // all transparent. it appears to reset the canvas.
    canvas.width = center.x * 2;
    canvas.height = center.y * 2;
    canvas.style.width = center.x.toString().concat('px');
    canvas.style.height = center.y.toString().concat('px');
    
    context.strokeStyle = colours.bg;
    context.fillStyle = colours.bg;
    context.fillRect(0, 0, center.x*2, center.y*2);
}

function draw_circle()
{
    context.strokeStyle = colours.circle;
    context.lineCap = 'round';
    context.lineWidth = hand_widths.circle;
    context.beginPath();
    context.fillStyle = "#000000";
    context.arc(center.x, center.y, r, 0, 2* Math.PI);
    context.stroke();
    context.fill();
    
    context.font = get_font();
    context.fillStyle = "#FFFFFF";
    context.textAlign = "center";
    context.fillText("THE HUMMINGBIRD CLOCK", center.x, center.y - r / 2);
    // context.fillText("?", center.x, center.y - r / 2);
}

var font_base = 1000;
var font_size = 70;

function get_font()
{
    var ratio = font_size / font_base;
    var size = r * ratio;
    return (size|0) + 'px Helvetica';
}

function pad_str(num)
{
    var str, pad;
    str = "" + num;
    pad = "00";
    return pad.substring(0, pad.length - str.length) + str;
}

function update_time(d)
{   
    if (d === undefined)
        d = new Date();

    time.h = d.getHours();
    time.m = d.getMinutes();
    time.s = d.getSeconds();
    time.ms = d.getMilliseconds();
}

function update_title()
{
    var ts;
    
    ts = pad_str(time.h) + ":" + pad_str(time.m) + ":" + pad_str(time.s);
    document.title = ts;
}

var s_min = .88;
var s_max = .92;
function draw_hands()
{
    var rad, k, x, y, s, i, l;

    // get angles for each hand (hours, minutes, seconds)
    rad = {};
    rad.h = (((time.h % 12) + time.m / 60.0) / 6.0);
    rad.m = (time.m + time.s / 60.0) / 30.0;
    // smooth second hand (uses milliseconds)
    if (SMOOTH_SECOND_HAND)
        rad.s = (time.s + time.ms / 1000.0) / 30.0;
    else
        rad.s = time.s / 30.0;

    // adjust hand angles
    Object.keys(rad).forEach(function(key, index) {
        rad[key] *= Math.PI;
        rad[key] -= Math.PI / 2.0;
    });

    for (i = 0; i < s_length && i < s_history.length; i++)
    {
        alpha = 1 - (s_length - i) / s_length;
        k = s_history[i];
        context.fillStyle = 'rgba(255, 0, 0, '+ alpha +'';
        context.fillRect(k.x, k.y, 5, 5);
    }
    // draw hands on canvas
    for(k in rad)
    {
        context.beginPath();
        context.strokeStyle = colours[k];
        context.lineWidth = hand_widths[k];
        context.moveTo(center.x, center.y);
        x = Math.cos(rad[k]) * hand_lengths[k] + center.x;
        y = Math.sin(rad[k]) * hand_lengths[k] + center.y;
        if (k == "s")
        {
            if (s_history.length > 0)
                l = s_history[s_history.length - 1].l;
            else
                l = hand_lengths[k];
            
            rand = (Math.floor(Math.random() * 3) - 1);
            
            if (l < r * s_min & rand < 0)
                rand = 1;
            else if (l > r * s_max & rand > 0)
                rand = -1;
            
            vco.frequency.value += rand * hum_delta;
            l += rand;   
            x = Math.cos(rad[k]) * l + center.x;
            y = Math.sin(rad[k]) * l + center.y;
            s = {
                x: x,
                y: y,
                l: l
            }
            s_history.push(s);
            if (s_history.length > s_length)
                s_history.shift();
        }
        context.lineTo(x, y);
        context.stroke();
    }
    

}

