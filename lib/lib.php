<?
function set_cookie($name=null, $value=null, $expires=null, $path="/")
{
	if(!empty($value))
	{
		setcookie($name, $value, $expires, $path);
	}
}

function get_cookie($name)
{
	if(isset($_COOKIE[$name]))
		return $_COOKIE[$name];
	else
		return null;
}
?>