// initializing all package requests
var fs = require("fs");
var request = require("request");
var spotify = require("spotify");
var twitter = require('twitter');

// registering the user input for what the should do
var action = process.argv[2]


switch (action){

	case "my-tweets":
		tweet()
		break;

	case "spotify-this-song":
		spotifySong()
		break;

	case "movie-this":
		movieInfo()
		break;

	case "do-what-it-says":
		justDoIt()
		break;
}

//This function shows last 20 tweets and their timestamp.
function tweet(){
	//setting the twitter credentials from a separate file to a variable
	var credentials = require("./keys.js");

	//file return an object with property "twitterKeys", which is an object of credentials
	// assigning the keys to an instance of twitter client
	var client = new twitter(credentials.twitterKeys);

	var tweetCount = 20;

	//makes a request to twitter to fetch recent tweets
	client.get("statuses/user_timeline", {count: tweetCount} ,function(error, tweets, response){
		//shows an error, if an error occurs
		if (error){
			console.log(error);
		}
		//cycles through the results, and prints the timestamp and the tweet
		for(var i = 0; i < tweetCount; i++){
			console.log(tweets[i].created_at);
			console.log(tweets[i].text);
			console.log("");
		}

	}) //client.get callback function ends here

} // tweet() function ends here