<?
// path to config file
$config = $_SERVER["DOCUMENT_ROOT"];
$config = $config."/open-records-generator/config/config.php";
require_once($config);

// specific to this 'app'
$config_dir = $root."/config/";
require_once($config_dir."url.php");
require_once($config_dir."request.php");

$db = db_connect("guest");

$oo = new Objects();
$mm = new Media();
$ww = new Wires();
$uu = new URL();
// $rr = new Request();

// self
if($uu->id)
	$item = $oo->get($uu->id);
else
	$item = $oo->get(0);
$name = ltrim(strip_tags($item["name1"]), ".");

// document title
$item = $oo->get($uu->id);
$title = $item["name1"];
$db_name = "O-R-G";
if ($title)
	$title = $db_name ." | ". $title;
else
	$title = $db_name;

$nav = $oo->nav($uu->ids);



$show_menu = false;
if($uu->id)
{
	$is_leaf = empty($oo->children_ids($uu->id));
	$internal = (substr($_SERVER['HTTP_REFERER'], 0, strlen($host)) === $host);
	
	if(!$is_leaf && $internal)
		$show_menu = true;
}

?><!DOCTYPE html>
<html>
	<head>
		<title><? echo $title; ?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link rel="stylesheet" href="<? echo $host; ?>static/css/global.css">
		<link rel="stylesheet" href="<? echo $host; ?>static/css/sf-text.css">
		<link rel="apple-touch-icon" href="<? echo $host; ?>media/png/touchicon.png" />
		<script src="static/js/analytics.js"></script>
	</head>
	<body>
		<div id="page"><?
			if(!$uu->id)
			{
			?><header id="header" class="hidden homepage"><?
			}
			else if($show_menu)
			{
			?><header id="header" class="visible"><?
			}
			else
			{
			?><header id="header" class="hidden"><?
			}
				?><ul>
					<li><?
						if($uu->id)
						{
							?><a href="<? echo $host; ?>">O-R-G</a><?
						}
						else { ?>O-R-G<? }
					?></li>
					<ul class="nav-level"><?
				$prevd = $nav[0]['depth'];
				foreach($nav as $n)
				{
					$d = $n['depth'];
					if($d > $prevd)
					{
					?><ul class="nav-level"><?
					}
					else
					{
						for($i = 0; $i < $prevd - $d; $i++)
						{ ?></ul><? }
					}
					?><li><?
						if($n['o']['id'] != $uu->id)
						{
						?><a href="<? echo $host.$n['url']; ?>"><?
							echo htmlentities($n['o']['name1']);
						?></a><?
						}
						else
						{
						?><span><? echo htmlentities($n['o']['name1']); ?></span><?
						}
					?></li><?
					$prevd = $d;
				}
				?></ul>
				</ul>
			</header>
