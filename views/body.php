<?
$object = $oo->get($uu->id);
?>
<section id="body">
    <header><? echo $object['name1']; ?></header><?
    echo nl2br($object['body']); 
    $children = $oo->children($uu->id);
    if (!empty($children))
    {
        ?><ul><?
        foreach($children as $child)
        {
            $c_url = $uu->url."/".$child['url'];
        ?><li><a href="<?= $c_url; ?>" target="blank"><?= $child['name1']; ?></a></li><?
        }
        ?></ul><?
        echo nl2br($object['deck']);
        ?><div id="claims">
            <a href= "mailto:claims@hummingbirdclock.info">Submit a Claim. . . </a>
        </div><?
    }  
?></section>
