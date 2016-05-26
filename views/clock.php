<script type="text/javascript" src="<? echo $host; ?>static/js/clock.js"></script>
<div id="clock-container">
    <canvas id="clock-canvas"></canvas>
</div>
<script>
    var cnavas_id, size, colours;
    canvas_id = "clock-canvas";
    size = "large";
    colours = {};
    colours.bg = 'rgba(255, 255, 255, 0.0)';
    colours.h = '#ffffff';
    colours.m = '#ffffff';
    colours.s = '#ffffff';
    colours.circle = '#ffffff';
    colours.circleopen = '#ffffff';
        
    init_clock(canvas_id);
</script>