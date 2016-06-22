<?
// $json_url = "http://lvps92-51-132-110.dedicated.hosteurope.de:28018/clock/last";
// $json = file_get_contents($json_url);
// $obj = json_decode($json);
// $freqs = $obj->frequencies;
?><script type="text/javascript" src="<? echo $host; ?>static/js/clock.js"></script><? 
if ($wave == 1) {
?><script type="text/javascript" src="<? echo $host; ?>static/js/hum.js"></script><?
} if ($wave == 2) {
?><script type="text/javascript" src="<? echo $host; ?>static/js/hum-square.js"></script><?
} if ($wave == 3) { 
?><script type="text/javascript" src="<? echo $host; ?>static/js/hum-sawtooth.js"></script><?
} if ($wave == 4) { 
?>&nbsp;<?
} 

if ($uu->id || $uri[0] == "submit")
{ 
?><div id="clock-container" class="small">
    <a href="/">
        <canvas id="clock-canvas"></canvas>
    </a>
  </div><?
}
else
{
?><div id="clock-container">
    <a href="/about">
        <canvas id="clock-canvas"></canvas>
    </a>
  </div><?
}
?>

<script>
    var cnavas_id, size, colours;
    canvas_id = "clock-canvas";
    <?
    if ($uu->id || $uri[0] == "submit")
    {
    ?>size = "small";<?
    }
    else
    {
    ?>size = "large";<?
    }
    ?>
    colours = {};
    colours.bg = 'rgba(0, 0, 0, 0.0)';
    colours.h = '#ffffff';
    colours.m = '#ffffff';
    colours.s = '#ffffff';
    colours.circle = '#000';
    colours.circleopen = '#ffffff';
        
    init_clock(canvas_id);
    if (this_audio_context) 
       init_hum();

</script>
