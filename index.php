<?php
kjsks
$uri = explode('/', $_SERVER['REQUEST_URI']);
$view = "views/";
$show_clock = true;

/* ------------------------------------------------------
        handle url:
        + /dev > gyroscope (plus hide the clock)
        + /thx > download
        + everything else > object-fullscreen
------------------------------------------------------ */
if($uri[1] == "dev" || $uri[1] == "dev.php")
{
        $view.= "gyroscope.php";
        $show_clock = false;
}
else if($uri[1] == "thx" || $uri[1] == "thx.php")
        $view.= "download.php";
else
        $view.= "object.php";

// show the things
require_once("views/head.php");
require_once($view);
if($show_clock)
       require_once("views/clock.php");
require_once("views/foot.php");
?>
