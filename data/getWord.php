<?php
// This function gets a new word from the dictionary and sends it to the client
// The unscrambled answer is stored in 'real_word'
// The scrambled word is stored in 'scrambled_word'

$contents = file(__DIR__."/dict");
$line = $contents[rand(0,count($contents)-1)];
$line = trim($line); // Remove whitespace
echo "Your word is: <div id='real_word'>$line</div><br>";
$scrambled_line = str_shuffle($line);
echo "Your jumbled word is: <div id='scrambled_word'>$scrambled_line</div><br>";
?>