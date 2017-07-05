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
// 

// GLOBAL VARIABLES
// 
// 
// -TIME CALCULATIONS-
// 
//
//
//-USER INFO-
//
//var trainName = "";
//var trainPlace = "";
//var trainTime = "";
//var trainFreq = "";
//var nextArrival = "";
//var minutesAway ="";
//
// 

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
//function AddNewTrain(){} 
// 
//
//
//
//
//
//calculates the next arrival time for the user's train based on the First Train time entered (military time)
// function calculateArrival(){}
//
//
//
//caluclates the number of minutes away the next arrival train is from the local time (based on the frequency)
// function calculateMinutesAway(){}
// 
//
//
//updates the next arrival times and minutes away based on the local time (moment.js)
//function updateTimes(){} 
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
// 
// 


// CALLING THE EVENTS/ACTIONS 

// 
// 
// ready the document
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
// 

//TASKS TO BE COMPLETED:
//1.
//2.
//3.
// 4.  IF TIME try out the authentication UI info or the delete/add buttons 
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
//
//
//
//FIREBASE
// https://firebase.google.com/docs/auth/web/start
//https://www.youtube.com/watch?v=k1D0_wFlXgo
//https://www.tutorialspoint.com/firebase/firebase_environment_setup.htm
//https://www.tutorialspoint.com/firebase/firebase_write_data.htm
//https://www.raywenderlich.com/139322/firebase-tutorial-getting-started-2

