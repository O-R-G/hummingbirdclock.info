<?
$json_url = "http://lvps92-51-132-110.dedicated.hosteurope.de:28018/clock/last";
$json = file_get_contents($json_url);
$obj = json_decode($json);
$freqs = $obj->frequencies;
?><script type="text/javascript" src="<? echo $host; ?>static/js/clock.js"></script>
<script type="text/javascript" src="<? echo $host; ?>static/js/hum.js"></script>
<div id="clock-container">
    <canvas id="clock-canvas"></canvas>
</div>
<script>
    var cnavas_id, size, colours;
    canvas_id = "clock-canvas";
    size = "large";
    colours = {};
    colours.bg = 'rgba(0, 0, 0, 0.0)';
    colours.h = '#ffffff';
    colours.m = '#ffffff';
    colours.s = '#ffffff';
    colours.circle = '#ffffff';
    colours.circleopen = '#ffffff';
        
    init_clock(canvas_id);
    init_hum();
</script>
