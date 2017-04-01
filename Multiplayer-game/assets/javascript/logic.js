/* global moment firebase */

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB88vMLvX7VuNKOpaBRk1VK_PmxNeC8N-s",
    authDomain: "rock-paper-scissors-a3fd9.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-a3fd9.firebaseio.com",
    projectId: "rock-paper-scissors-a3fd9",
    storageBucket: "rock-paper-scissors-a3fd9.appspot.com",
    messagingSenderId: "55635400532"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// -----------------------------



// ------------------------------------
// Global variables
var numPlayers = 0;
var playerRef;

var user1 = "";
var user2 = "";


// --------------------------------------------------------------
$(document).ready(function() {

  $("#nameInputButton").on("click", function(event) {
    event.preventDefault();
    var name = $.trim($("input[name='nameInput']").val());

    if (name !== '')
    {
      if (numPlayers < 2)
      {
        numPlayers++;
        //Greet Player (local change)
        $("#banner").empty();
        $("#banner").append("<h2 id='greeting'>Hello, " + name + ", you're player " + numPlayers + ".</h2>");
        $("#banner").append("<h2 id='gameMessage' class='displayNone'></h2>");

        //write status message to chat node indicating player has joined
        database.ref("chat").push(
        {
          playerName: name,
          playerNumber: 0,  //0 here indicates it's a status message
          message: name + " has joined the game."
        });

        //Create players node, add player to it. 
        playerRef = database.ref("players").push(
        {
          name: name,
          wins: 0,
          losses: 0,
          playerNumber: numPlayers
        });

console.log(name);
        //setup onDisconnect now that playerRef is defined
        playerRef.onDisconnect().remove();
        // console.log("playerRef key: " + playerRef.key);

}}

// -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#watchers").html(snap.numChildren());
});

// -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
// Set Initial Counter
var initialValue = 100;
var clickCounter = initialValue;

// // At the initial load, get a snapshot of the current data.
// database.ref("/clicks").on("value", function(snapshot) {

//   // Print the initial data to the console.
//   console.log(snapshot.val());

//   // Change the html to reflect the initial value.
//   $("#click-value").html(snapshot.val().clickCount);

//   // Change the clickcounter to match the data in the database
//   clickCounter = snapshot.val().clickCount;

//   // Log the value of the clickCounter
//   console.log(clickCounter);

//   // Change the HTML Value
//   $("#click-value").html(clickCounter);

// // If any errors are experienced, log them to console.
// }, function(errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });

// --------------------------------------------------------------

// Whenever a user clicks the click-button
$("#click-button").on("click", function() {
event.preventDefault();
  comment = $("#comment-input").val().trim(); 

database.ref().push({
        comment: comment
      });

  // Log the value of clickCounter
  console.log(comment);
});


  // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function(snapshot) {

      // Log everything that's coming out of snapshot
      console.log(snapshot.val().comment);

      // Change the HTML to reflect
      $("#comment-display").html(snapshot.val().comment);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });



// Whenever a user clicks the restart button
$("#restart-button").on("click", function() {

  // Set the clickCounter back to initialValue
  clickCounter = initialValue;

  // Save new value to Firebase
  database.ref("/clicks").set({
    clickCount: clickCounter
  });

  // Log the value of clickCounter
  console.log(clickCounter);

  // Change the HTML Values
  $("#click-value").html(clickCounter);
});




      // Variables for tracking our wins, losses and ties. They begin at 0.
      var wins1 = 0;
      var losses1 = 0;
          
      var wins2 = 0;
      var losses2 = 0;
      var ties = 0;
      var rock = $("button #rock").click(function(){
    var rock = "r";
});;
      var paper1 = "p";
      var paper2 = "p";
      var scissors1 = "s";
      var scissors2 = "s";
      var rock1 = "r";
      var rock2 = "r";

      //ask Mike or Adam for a beter way to define the buttons as rps

        // // Determine which button was pressed
        // var user1 = event.key;
        // var user2 = event.key;
       

        // If the user presses "r" or "p" or "s", run the game logic.
        if ((user1 || user2 === "r") || (user1 || user2 === "p") || (user1 || user2  === "s")) {

          // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate counter.
          if ((user1 === "r") && (user2 === "s")) {
            wins++;
          }
          else if ((user1 === "r") && (user2 === "p")) {
            losses++;
          }
          else if ((user1 === "s") && (user2 === "r")) {
            losses++;
          }
          else if ((user1 === "s") && (user2 === "p")) {
            wins++;
          }
          else if ((user1 === "p") && (user2 === "r")) {
            wins++;
          }
          else if ((user1 === "p") && (user2 === "s")) {
            losses++;
          }
          else if (user1 === user2) {
            ties++;
          }

          // Here we create the HTML that will be injected into our div and displayed on the page.
          var html = "<p>Press r, p or s to start playing!</p>" +
          $(".win1").html("Wins: " + wins);
          $(".loss1").html("Losses: " + losses); 
          $(".tie").html("Ties: " + ties);
          $(".win2").html("Wins: " + wins);
          $(".loss2").html("Losses: " + losses); 

          // Injecting the HTML we just created into our div and updating the game information on our page.
          document.querySelector("#game").innerHTML = html;

        
      };