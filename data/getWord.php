<?php
// This function gets a new word list from the dictionary and sends it to the client. It is a horrible O(n^2) algorithm and needs refactoring
// One possibility is to make a single pass through the dictionary, collecting words that match any letter in the special word
// The result is stored in the 'Data_div'
// EX: bat,0,ball,2,drat,1,at
//	Special word is 'bat', the first word to guess is 'ball' and the index of the letter making up part of the special word is '0'

$contents = file(__DIR__."/dict");
$special_contents = file(__DIR__."/special_dict");
$special_line = trim($special_contents[rand(0,count($special_contents)-1)]);
$special_line_scrambled = str_shuffle($special_line);
$special_line_array = str_split($special_line_scrambled);

echo($special_line . ",");

//Parse through each character in the special word, getting all words that match a character
//For each character in the $special_line
for($count=0; $count<count($special_line_array); $count++)
{
	$possible_words = array();
	$possible_letter_locations = array();
	//For each word in the original dictionary
	for($idx=0; $idx<count($contents); $idx++)
	{
		//Check if the letter from the special word appears in the word
		$position = strpos($contents[$idx],$special_line_array[$count]);
		
		//If a particular word contains the letter from the $special_line
		if($position != False)
		{
			array_push($possible_words,trim($contents[$idx]));
			array_push($possible_letter_locations,$position);
		}
	}
	
	//Now that we have an array of words, pick a random one
	$chosen_index = rand(0,count($possible_words)-1);
	$chosen_word = $possible_words[$chosen_index];
	$chosen_letter_locations = $possible_letter_locations[$chosen_index];
	echo($chosen_letter_locations.",".$chosen_word);
	
	//The last word in the array should not have a comma after it
	if($count != count($special_line_array)-1)
	{
		echo ",";
	}
}
?>
