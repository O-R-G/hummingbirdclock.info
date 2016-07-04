<?
$object = $oo->get($uu->id);
?>
<section id="body">
    <header><? echo $object['name1']; ?></header><?
    echo nl2br($object['body']); 
    $children = $oo->children($uu->id);
    $siblings = $oo->siblings($uu->id);
    if (!empty($children))
    {
        ?><ul><?
        foreach ($children as $child)
        {
            $c_url = $uu->url."/".$child['url'];
            ?><li><a href="<?= $c_url; ?>"><?= $child['name1']; ?></a></li><?
        }
        ?></ul><?
        echo nl2br($object['deck']);
        ?><?
    }
    else 
    {
        ?><ul><?
        foreach ($siblings as $sibling)
        {
            $thissibling = $oo->get($sibling);
            $c_url = $thissibling['url'];
            ?><li><a href="<?= $c_url; ?>"><?= $thissibling['name1']; ?></a></li><?
        }
        ?><li>&nbsp;</li><?
        ?><li><a href="/about">Go back . . .</a></li><?
        ?></ul><?
        echo nl2br($object['deck']);
        ?><?
    }  
?></section><?
?><section id="images"><?
// collect images
$media = $oo->media($uu->id);
foreach($media as $m)
{
    if($m['type'] != "pdf")
    {
        $m_url = m_url($m);    
    ?><div class="img-container">
        <img src="<?= $m_url; ?>">
    </div><?
    }
}
?></section><?
if ($uu->id || $uri[0] == "submit") {
?><div id="claims">
    <a href= "/submit">Submit a Claim . . . </a>
</div><? 
} ?>
