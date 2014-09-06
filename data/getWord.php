<?php
$contents = file("data/dict");
$line = $contents[rand(0,count($contents)-1)];
$line = trim($line); // Remove whitespace
$md5Line = md5($line);
echo "<script>answer='$md5Line';</script><br>";
echo "Your word is: $line<br>";
$scrambled_line = str_shuffle($line);
echo "Your jumbled word is: $scrambled_line<br>";
?>