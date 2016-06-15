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
<header>Submit a Claim. . . </header>
<form action="/submit" method="post">
    <table>
        <tr>
            <td class="label">Name</td>
            <td><input type="text" name="name"></td>
        <tr>
            <td class="label">Email</td>
            <td><input type="text" name="email"></td>
        </tr>
        <tr>
            <td class="label">Message</td>
            <td><textarea name="body"></textarea></td>
        </tr>
    </table>
    <input type='hidden' name='action' value='mail'>
    <input type="submit" name="submit" value="Submit">
</form><?
?></section><?
}
else
{
    $object = $oo->get($uu->id);
    
    $hum_name = "Hummingbird Clock Claims";
    $hum_email = "claims@hummingbirdclock.info";
    $hum_subject = "Thank you.";
    $hum_body = $object['deck'];
    
    $claim_name = $_POST['name'];
    $claim_email = $_POST['email'];
    $claim_subject = "Claim from ".$claim_name;
    $claim_body = $object['notes']; //$_POST['body'];
    
    // modify $hum_body
    $hum_body = str_replace("[name]", $claim_name, $hum_body);
    
    // modify $claim_body
    $claim_body = str_replace("[name]", $claim_name, $claim_body);
    $claim_body = str_replace("[email]", $claim_email, $claim_body);
    $claim_body = str_replace("[message]", $_POST['body'], $claim_body);
    
    // TODO
    // + deal with invalid emails
    // + send a confirmation email to claimant
    
    // send email to hummingbird
    send_mail_long( $claim_name, $claim_email, 
                    $hum_name, $hum_email, 
                    $claim_subject, $claim_body);
    
    // send email to claimant
    send_mail_long( $hum_name, $hum_email,
                    $claim_name, $claim_email,
                    $hum_subject, $hum_body);

    $body = $object['body'];
    $body = str_replace("[email]", $claim_email, $body);
    ?><section id="body"><? echo $body; ?></section><?
}