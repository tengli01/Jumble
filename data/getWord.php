<?php
// This function gets a new word from the dictionary and sends it to the client
// The md5 scrambled word is stored in 'answer_div'
// The cheating(!) answer is stored in 'cheater'
// The scrambled word is stored in 'real_word'

$contents = file(__DIR__."/dict");
$line = $contents[rand(0,count($contents)-1)];
$line = trim($line); // Remove whitespace
$md5Line = md5($line);
echo "<div style='display:none' id='answer_div'>$md5Line</div>";
echo "Your word is: <div id='cheater'>$line</div><br>";
$scrambled_line = str_shuffle($line);
echo "Your jumbled word is: <div id='real_word'>$scrambled_line</div><br>";
?>