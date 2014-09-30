<?php
// This function gets a new word from the dictionary and sends it to the client
// The unscrambled answer is stored in 'real_word'
// The scrambled word is stored in 'scrambled_word'

$contents = file(__DIR__."/dict");
$special_contents = file(__DIR__."/special_dict");
$special_line = trim($special_contents[rand(0,count($special_contents)-1)]);
$special_line_array = str_split($special_line);

print($special_line . "->");

//Parse through each character in the special word, getting all words that match a character
//For each character in the $special_line
for($count=0; $count<count($special_line_array); $count++)
{
	$possible_words = array();
	$possible_letter_locations = array();
	//For each word in the original dictionary
	for($idx=0; $idx<count($contents); $idx++)
	{
		$position = strpos($contents[$idx],$special_line_array[$count]);
		//If a particular word contains the letter from the $special_line
		if($position != False)
		{
			array_push($possible_words,$contents[$idx]);
			array_push($possible_letter_locations,$position);
		}
	}
	$chosen_index = rand(0,count($possible_words)-1);
	$chosen_word = $possible_words[$chosen_index];
	$chosen_letter_locations = $possible_letter_locations[$chosen_index];
	print($chosen_letter_locations."@".$chosen_word);
}
?>
