<?
function is_valid_email($email)
{
	// return preg_match("/^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i", $email);
	return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function send_mail($from, $to, $subject, $message)
{
	// address headers
	$header = "From: $from <$from>\r\n";
	$header.= "X-X-Sender: $from\r\n";
	
	// mail program headers
	$header.= "Message-ID: <".md5(uniqid(time()))."@{$_SERVER['SERVER_NAME']}>\r\n";
	
    mail($to, $subject, $message, $header, "-f$from");
}

function send_mail_long($from_name, $from_email, $to_name, $to_email, $subject, $message)
{
	$header = "From: $from_name <$from_email>\r\n";
	$header.= "Message-ID: <".md5(uniqid(time()))."@{$_SERVER['SERVER_NAME']}>\r\n";
	$to = "$to_name <$to_email>";
	mail($to, $subject, $message, $header, "-f$from_email");
}

if($_POST['action'] != "mail")
{
?>
<section id="body">
<form action="/submit" method="post">
    <table>
        <tr>
            <td>Name</td>
            <td><input type="text" name="name"></td>
        <tr>
            <td>Email</td>
            <td><input type="text" name="email"></td>
        </tr>
        <tr>
            <td>Message</td>
            <td><textarea name="body"></textarea></td>
        </tr>
    </table>
    <input type='hidden' name='action' value='mail'>
    <input type="submit" name="submit" value="Submit">
</form>
</section><?
}
else
{
    foreach($_POST as $k => $v)
        $$k = $v;

    $from_name = $name;
    $from_email = $email;
    $subject = "Claim from ".$from_name;
    $to_name = "lily";
    $to_email = "lilyhealey1@gmail.com";
    
    send_mail_long($from_name, $from_email, $to_name, $to_email, $subject, $body);
    
    ?>thank you!<?
}