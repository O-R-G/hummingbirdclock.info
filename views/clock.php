<script type="text/javascript" src="<? echo $host; ?>static/js/global.js"></script>
<script type="text/javascript" src="<? echo $host; ?>static/js/clock.js"></script><?
if(!$uu->id)
{
?>
<div id="canvas-container" class="v-centre">
	<canvas id="clock-canvas"></canvas>
</div>
<script>init_clock("clock-canvas", "centre", true);</script><?
}
else
{
?>
	<div id="canvas-container" class="lower-right">
		<canvas id="clock-canvas"></canvas>
	</div><?
	if($show_menu)
	{
	?><script>init_clock("clock-canvas", "lower-right", false);</script><?
	}
	else
	{
	?><script>init_clock("clock-canvas", "lower-right", true);</script><?
	}
}
?><script>
var isHidden;
<?
if($show_menu)
{ ?>isHidden = false;<? }
else
{ ?>isHidden = true;<? }
?>
document.getElementById("clock-canvas").addEventListener("click", showHide);
</script>