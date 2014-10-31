<?php
// This function gets a new word list from the dictionary and sends it to the client.
// The result is stored in the 'Data_div'
// EX: bat,0,ball,2,drat,1,at
//	Special word is 'bat', the first word to guess is 'ball' and the index of the letter making up part of the special word is '0'

$special_contents = file(__DIR__."/dictionaries/special_dict");
$special_line = trim($special_contents[rand(0,count($special_contents)-1)]);
$special_line_scrambled = str_shuffle($special_line);
$special_line_array = str_split($special_line_scrambled);

echo($special_line . ",");

//Parse through each character in the special word, getting all words that match a character
//For each character in the $special_line
for($count=0; $count<count($special_line_array); $count++)
{
	//Read the file named the same as the letter from the special word
	$letter_from_special_word = $special_line_array[$count];
	$possible_words = file(__DIR__."/dictionaries/".$letter_from_special_word);
	
	//Now that we have an array of words, pick a random one
	$chosen_index = rand(0,count($possible_words)-1);
	$chosen_word = trim($possible_words[$chosen_index]);
	$chosen_letter_locations = strpos($chosen_word,$letter_from_special_word);
	echo($chosen_letter_locations.",".$chosen_word);
	
	//The last word in the array should not have a comma after it
	if($count != count($special_line_array)-1)
	{
		echo ",";
	}
}
?>
