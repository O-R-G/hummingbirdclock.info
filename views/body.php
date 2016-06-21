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
        ?><li><a href="<?= $c_url; ?>"><?= $child['name1']; ?></a></li><?
        }
        ?></ul><?
        echo nl2br($object['deck']);
        ?><?
    }  
?></section><?

// if ($uri[0] == "about") {
    
    ?><!-- <section id="body">
    <a href="/about">Go back . . .</a>
    </section> --><?

// }

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
?></section>
<div id="claims">
    <a href= "/submit">Submit a Claim . . . </a>
</div>
