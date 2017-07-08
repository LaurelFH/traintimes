//all javascript for the traintimes app 
// USER FLOW
// 1.  the user comes to the page and can see the input spaces to add their own train info to a schedule; 
//this incldues the name, destination, first time of train (military time) and the freq. in mins
// 2.  the user should then click the submit button, and see the information they added pop up on the schedule panel; 
// app should reflect the current time as a base (relative to it)-- first time won't be visible (only the next)
//3.  the user should be able to see this info from many different computers  
// 4.  If they make a mistake, they could potentially delete their information 
// 

// COMPUTER FLOW
// 1.  prepare the layout on the page so the display places for the train info are visible
// 2. when the user submits their train, add this information (name and destination and freq to the display space) to the database
// (use techniques for server-side storage)
// 3.  using the frequency and the local time (based on the times submitted in military and HH:mm format from moment.js) 
//calculate:  next arrival time (local time in military + freq time) and the Minutes away (Arrival time- freq)
// 4.  Display the calculated results for these times in the appropriate divs 
//5.  Update this information in Firebase 
// 
//  
// 
// GLOBAL VARIABLES
// 
var database = firebase.database();

// ALL FUNCTIONS
// 
// 
//
//displays the time information in the correct format (HH:mm A) in the current scheduele location
//displays the information the user submitted to the current train panel
// function displayTimes(){}
//
//
//
// adds the information the user submits to firebase database pushes it there too
//review the set/ref documentation (don't get it mixed up with API/AJAX info)
//Consider the number of parameters we have to pass through?


//adds the new train info to the current schedule table 
function AddNewTrain(name, place, time, freq, nextArrival, minsAway){


	//creates cells for the new train information the user submits 
	var newRow = $("<tr>");
	var trainNameCell = $("<td>");
	var trainPlaceCell = $("<td>");
	var trainTimeCell = $("<td>");
	var trainFreqCell = $("<td>");
	var trainNextArrivalCell = $("<td>");
	var trainMinsAwayCell = $("<td>");
//saves the textual values of the cells; make this more jquery like?   
	trainNameCell.text(name);
	trainPlaceCell.text(place);
	trainTimeCell.text(time);
	trainFreqCell.text(freq);
	//gets numbers not text? need to make this moment(nextArrival etc.).format("hh:mm")
	trainNextArrivalCell.text(nextArrival);
	trainMinsAwayCell.text(minsAway);
//places all the new information in a new row in the schedule 
	//clear table space to prevent double entries with the append 
	//$("#table-body").empty();
	$(newRow).append(trainNameCell, trainPlaceCell, trainTimeCell, trainFreqCell, trainNextArrivalCell, trainMinsAwayCell);
	$("#table-body").append(newRow);
} 
// 
//
//
//get a snapshop of the current data in the database 
function  pullAllSchedules(){

	//clear table space to prevent double entries with the append 
	$("#table-body").empty();

	database.ref().on("value", function(snapshot){

		//create a snapshot for each item in the database
		snapshot.forEach(function(childSnapshot){

			//var key = childSnapshot.key();
			var childData = childSnapshot.val();
		
			trainNameInput = childSnapshot.val().trainNameInput;
			trainPlaceInput = childSnapshot.val().trainPlaceInput;
			trainTimeInput = childSnapshot.val().trainTimeInput;
			trainFreqInput = childSnapshot.val().trainFreqInput;
			trainMinsAwayInput = calculateMinutesAway(trainTimeInput, trainFreqInput);
			trainNextArrivalInput = calculateNextArrival(trainMinsAwayInput);
			//MAKE THIS NOT AN ODD DECIMAL https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
			trainMinsAwayInput = Math.round(trainMinsAwayInput);
			//get updated next arrival/minutes away from the trains 
			AddNewTrain(trainNameInput, trainPlaceInput, trainTimeInput, trainFreqInput, trainNextArrivalInput, trainMinsAwayInput);	


		});
	

	});
}
	//console.log(firebase.database().ref().snapshot);
	//tells Firebase to watch for the child_added event and take snapshot 
	//won't want to use child_added here sicne I want to see everything that changes 
	// database.ref().on("value", function(Snapshot){
	// 	//console.logging the values of the snapshot
	// 	// console.log(snapshot);
	// 	// console.log(snapshot.val().trainNameInput);
	// 	// console.log(snapshot.val().trainPlaceInput);
	// 	// console.log(snapshot.val().trainTimeInput);
	// 	// console.log(snapshot.val().trainFreqInput);

	// 	//add these updated snapshot values to the correct penal/divs so it creates a row for each new train 
	// 	//potentially loop through to do so?

	// });

// 
// 

//calculates the next arrival time for the user's train based on the First Train time entered (military time)
function calculateNextArrival(trainMinsAwayInput){
//start time + freq until it's greater than the current time via moment? less than freq 
		
		return moment().add(trainMinsAwayInput, "m").format("hh:mm");

}
//
//
//
//caluclates the number of minutes away the next arrival train is from the local time (based on the frequency)
function calculateMinutesAway(trainTimeInput, trainFreqInput){
	//making a moment based on the user's train's start time and setting it back 1 year to make sure it's in the past
	var trainStartTime = moment(trainTimeInput, "hh:mm").subtract(1, "years");
	//initalizing this varibale so I can figure out when the next arrival time is 
	var nextArrivalTime = moment(trainStartTime);
	console.log(trainStartTime.format("hh:mm"));
	console.log(nextArrivalTime.format("hh:mm"));

	//figures out when the next arrival time is 
	do {
	
		//calculating/adding the train frequencey to the arrival time 
		nextArrivalTime = moment(nextArrivalTime).add(trainFreqInput, "m");
	
	} 
	//need to stop when the next arrival time is in the future (past the current moment) 
	while(!moment().isBefore(nextArrivalTime));

	//WATCH OUT FOR MILLISECONDS HERE!!!!--60,000
	return moment(nextArrivalTime).diff(moment())/60000;


}
// 
//
//
//updates the next arrival times and minutes away based on the local time (moment.js)
//function updateTimes(){} 
// 
// 
// 
// 


// CALLING THE EVENTS/ACTIONS 

// ready the document?
$(document).ready(function(){

 	//update the schedule panel with the most recent information from the database
	pullAllSchedules();
});

 $("#trainButton").click(function(event){
//prevent the form submission
 	event.preventDefault();
 	//get values from the various inputs from the user doubel check my input use in the IDs 
 	trainNameInput = $("#trainName").val().trim();
 	trainPlaceInput = $("#trainPlace").val().trim();
 	trainTimeInput = $("#trainTime").val().trim();
 	trainFreqInput = $("#trainFreq").val().trim();
 	console.log(trainNameInput);
 	console.log(trainPlaceInput);
 	console.log(trainTimeInput);
 	console.log(trainFreqInput);
 	
 	//save and push this info into firebase
 	database.ref().push({
 		trainNameInput: trainNameInput,
 		trainPlaceInput: trainPlaceInput,
 		trainTimeInput: trainTimeInput,
 		trainFreqInput: trainFreqInput
 	});

	pullAllSchedules();

});
// 
// 
// 
// 
// 
// 
//
// 
// 
// 
// 

//TASKS TO BE COMPLETED:
//1. fix the return format problem for the times 
//2.calculate next arrival times and time remaining using moment.js
//3.IF TIME try out the authentication UI info or the delete/add buttons 
// 
// 
// 
// 
// 
// 
// 

//RESOURCES
//
//
// MOMENT.JS
// https://tutorialzine.com/2012/08/quick-tip-handle-date-and-time-like-a-boss-with-moment-js
//https://stackoverflow.com/questions/22938300/convert-milliseconds-to-hours-and-minutes-using-momentjs
//https://www.sitepoint.com/managing-dates-times-using-moment-js/
//http://momentjs.com/docs/#/displaying/format/
//http://stackabuse.com/moment-js-a-better-date-library-for-javascript/
//
//
//
//FIREBASE
// https://firebase.google.com/docs/auth/web/start
//https://www.youtube.com/watch?v=k1D0_wFlXgo
//https://www.tutorialspoint.com/firebase/firebase_environment_setup.htm
//https://www.tutorialspoint.com/firebase/firebase_write_data.htm
//https://www.raywenderlich.com/139322/firebase-tutorial-getting-started-2
//https://www.youtube.com/watch?v=noB98K6A0TY
//https://firebase.google.com/docs/database/web/read-and-write
//Look up Promise:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
//https://firebase.google.com/docs/database/web/read-and-write#receive_a_promise
//
//
//OTHER
//https://www.w3schools.com/jsref/jsref_dowhile.asp
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
//http://www.javascripter.net/faq/rounding.htm
//https://myanimelist.net/featured/468/20_Most_Memorable_Quotes_from_Spirited_Away
//https://css3gen.com/text-shadow/
//http://www.hexcolortool.com/#b75b2a,0.47
//
//
//
//
//
//


