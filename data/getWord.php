<?php
$contents = file(__DIR__."/dict");
$line = $contents[rand(0,count($contents)-1)];
$line = trim($line); // Remove whitespace
$md5Line = md5($line);
echo "<div style='display:none' id='answer_div'>$md5Line</div>";
echo "Your word is: $line<br>";
$scrambled_line = str_shuffle($line);
echo "Your jumbled word is: $scrambled_line<br>";
?>