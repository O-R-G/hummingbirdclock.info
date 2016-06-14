<?
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
    
}