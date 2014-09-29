<?php
// This function gets a new word from the dictionary and sends it to the client
// The unscrambled answer is stored in 'real_word'
// The scrambled word is stored in 'scrambled_word'

$contents = file(__DIR__."/dict");
$special_contents = file(__DIR__."/special_dict");
$special_line = trim($special_contents[rand(0,count($special_contents)-1)]);
$special_line_array = str_split($special_line);

//Parse through each character in the special word, getting all words that match a character
for($count=0; $count<count($special_line_array); $idx++)
{
	for($idx=0; $idx<count($contents); $idx++)
	{
		
	}
}

?>
