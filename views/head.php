<?
// path to config file
$config = $_SERVER["DOCUMENT_ROOT"];
$config = $config."/open-records-generator/config/config.php";
require_once($config);

// specific to this 'app'
$config_dir = $root."/config/";
require_once($config_dir."url.php");
require_once($config_dir."request.php");

require_once("lib/lib.php");

$db = db_connect("guest");

$oo = new Objects();
$mm = new Media();
$ww = new Wires();
$uu = new URL();
$rr = new Request();

// document title
$title = date("H:i:s");

$on = $_REQUEST['status'];
if (isset($on)) {
    set_cookie("status", $on);
}
else
    $on = get_cookie("status");

if (!isset($on))
    die($title);

$square = $_REQUEST['square'];
if (isset($on)) {
    set_cookie("square", $square);
}
else
    $on = get_cookie("square");

?><!DOCTYPE html>
<html>
	<head>
		<title><? echo $title; ?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link rel="stylesheet" href="/static/css/main.css">
		<link rel="stylesheet" href="/static/css/helvetica-neue-r.css">
		<link rel="apple-touch-icon" href="<? echo $host; ?>media/png/touchicon.png">
	</head>
	<body>
