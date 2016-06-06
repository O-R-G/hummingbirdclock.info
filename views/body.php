<?
$object = $oo->get($uu->id);
?>
<section id="body">
    <header><? echo $object['name1']; ?></header>
    <? echo nl2br($object['body']); ?></section>