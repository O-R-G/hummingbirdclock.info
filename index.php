<?php
$uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

// only html head -- no content
require_once("views/head.php");

// splash page (clock)
if (empty($uri[0]) || $uri[0] == "?status=on")
{
    require_once("views/clock.php");
}
else 
{
    require_once("views/body.php");
}
require_once("views/foot.php");
?>
