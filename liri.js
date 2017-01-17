// initializing all package requests
var fs = require("fs");
var request = require("request");
var spotify = require("spotify");
var twitter = require('twitter');

// registering the user input for what the should do
var action = process.argv[2];

// checks if the user has input additional arguments
var additionalArgs;
if (process.argv.length > 2) {

	additionalArgs = "";
	for(var i = 3; i < process.argv.length; i++){
		additionalArgs = additionalArgs + process.argv[i] + " ";
	}
}

switch (action){

	case "my-tweets":
		tweet()
		break;

	case "spotify-this-song":
		songName = process.argv[3];
		spotifySong(songName)
		break;

	case "movie-this":
		movieInfo()
		break;

	case "do-what-it-says":
		justDoIt()
		break;
}

// ======================================================================

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
			return;
		}
		//cycles through the results, and prints the timestamp and the tweet
		for(var i = 0; i < tweetCount; i++){
			console.log(tweets[i].created_at);
			console.log(tweets[i].text);
			console.log("");
		}

		return;

	}) //client.get callback function ends here

} // tweet function ends here

// =======================================================================

//this function shows information about a song that the user requests
//if a song is not provided, information about "the sign" by Ace of Base is shown
function spotifySong(){

	console.log(additionalArgs);
	// if user specifies a song
	if (additionalArgs) {
		spotify.search({ type: 'track', query: additionalArgs, limit: 1 }, function(err, data) {
			//console log an error, if there is one.
    		if ( err ) {
        		console.log('Error occurred: ' + err);
        		return;
    		}
			
			console.log("Artist(s):")
			// Loops through the array of artists, and console logs the names
			for (var i = 0; i < data.tracks.items[0].artists.length; i++){
				console.log(data.tracks.items[0].artists[i].name);
			} 
			console.log("");
			console.log("Song:");
			// console logs name of the song
			console.log(data.tracks.items[0].name);
			console.log("");
			console.log("Link:");
			// console logs preview URL for the song
			console.log(data.tracks.items[0].preview_url);
			console.log("");
			console.log("Album:")
			// console logs name of the album that the song is from
			console.log(data.tracks.items[0].album.name);


		}); // Callback function ends here
	}
	// if user does not specify a song
	else{
		spotify.search({ type: 'track', query: 'The Sign', limit: 1 }, function(err, data) {
			//console log an error, if there is one.
    		if ( err ) {
        		console.log('Error occurred: ' + err);
        		return;
    		}

			console.log("Artist(s):")
			// Loops through the array of artists, and console logs the names
			for (var i = 0; i < data.tracks.items[0].artists.length; i++){
				console.log(data.tracks.items[0].artists[i].name);
			} 
			console.log("");
			console.log("Song:");
			// console logs name of the song
			console.log(data.tracks.items[0].name);
			console.log("");
			console.log("Link:");
			// console logs preview URL for the song
			console.log(data.tracks.items[0].preview_url);
			console.log("");
			console.log("Album:")
			// console logs name of the album that the song is from
			console.log(data.tracks.items[0].album.name);
		}); // callback function ends here
	}


} //spotifySong function ends here

// =======================================================================

