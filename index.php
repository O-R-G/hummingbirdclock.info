<?php
$uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

// only html head -- no content
require_once("views/head.php");

// splash page (clock)
// require_once("views/clock.php");

if (!empty($uri[0])) {
    if ($uri[0] == "submit")
        require_once("views/submit.php");
    else
        require_once("views/body.php");
}
require_once("views/foot.php");
?>
