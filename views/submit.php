<?

// form labels

$label_1 = "1. What is the recording you want to submit for analysis?";
$label_2 = "2. Where was this recording made and how did you obtain this recording?";
$label_3 = "3. When do you believe this recording was made?";
$label_4 = "4. Why do you want to verify when this recording was made?";

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
<header>Submit a Claim . . . </header>
<form action="/submit" method="post">
    <table>
        <tr>
            <td class="label">Name</td>
        </tr>
        <tr>
            <td><input type="text" name="name"></td>
        </tr>

        <tr>
            <td class="label">Email</td>
        </tr>
        <tr>
            <td><input type="text" name="email"></td>
        </tr>

        <tr>
            <td class="label"><? echo $label_1; ?></td>
        </tr>
        <tr>
            <td><textarea name="body_1"></textarea></td>
        </tr>

        <tr>
            <td class="label"><? echo $label_2; ?></td>
        </tr>
        <tr>
            <td><textarea name="body_2"></textarea></td>
        </tr>

        <tr>
            <td class="label"><? echo $label_3; ?></td>
        </tr>
        <tr>
            <td><textarea name="body_3"></textarea></td>
        </tr>

        <tr>
            <td class="label"><? echo $label_4; ?></td>
        </tr>
        <tr>
            <td><textarea name="body_4"></textarea></td>
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
    $claim_body = $object['notes']; //$composite_body;
    
    // build composite body

    $line_return = "<br /><br />";

    $composite_body  = $line_return . "--" . $line_return;
    $composite_body .= $label_1 . "<br/><br/>";
    $composite_body .= $_POST['body_1'];

    $composite_body .= $line_return . "--" . $line_return;
    $composite_body .= $label_2 . "<br/><br/>";
    $composite_body .= $_POST['body_2'];

    $composite_body .= $line_return . "--" . $line_return;
    $composite_body .= $label_2 . "<br/><br/>";
    $composite_body .= $_POST['body_3'];

    $composite_body .= $line_return . "--" . $line_return;
    $composite_body .= $label_4 . "<br/><br/>";
    $composite_body .= $_POST['body_4'];

    // modify $hum_body
    $hum_body = str_replace("[name]", $claim_name, $hum_body);
    
    // modify $claim_body
    $claim_body = str_replace("[name]", $claim_name, $claim_body);
    $claim_body = str_replace("[email]", $claim_email, $claim_body);
    $claim_body = str_replace("[message]", $composite_body, $claim_body);
    
    // ** todo **
    // + deal with invalid emails

    // debug
    /*
    echo    $claim_name . "," .
            $claim_email . "," .
            $hum_name . "," .
            $hum_email . "," .
            $claim_subject . "," .
            $claim_body . ",";
    */

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
