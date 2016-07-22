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
require_once("lib/systemCookie.php");
    
$db = db_connect("guest");
$oo = new Objects();
$mm = new Media();
$ww = new Wires();
$uu = new URL();
$rr = new Request();

// document title
$title = date("H:i:s");

?><!DOCTYPE html>
<html>
	<head>
		<title><? echo $title; ?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<link rel="stylesheet" href="/static/css/main.css">
		<link rel="apple-touch-icon" href="/media/png/touchicon.png">
	</head>
	<body>
