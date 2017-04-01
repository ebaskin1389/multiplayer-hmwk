/* global moment firebase */

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDxQqkGa3AKrcGmGVFalJe40g4hdzADf6w",
  authDomain: "coder-bay-views.firebaseapp.com",
  databaseURL: "https://coder-bay-views.firebaseio.com",
  storageBucket: "coder-bay-views.appspot.com"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// -----------------------------

// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
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
  $("#connected-viewers").html(snap.numChildren());
});

// ------------------------------------
// Global variables
var user1 = "";
var user2 = "";


// --------------------------------------------------------------
// Whenever a user clicks the click button
$("#submitName").on("click", function(event) {
  event.preventDefault();

  // Get the input values
  var user1 = $("#bidder-name").val().trim();
  //var user2 = parseInt($("#bidder-price").val().trim());

  // Log the Bidder and Price (Even if not the highest)
  console.log(submitName);
  //console.log(bidderPrice);

      // Save the new price in Firebase
    database.ref("user1").push({
      // highBidder: bidderName,
      // highPrice: bidderPrice
    });

    // Log the new High Price
    console.log(user1);
   // console.log(bidderPrice);



    // Change the HTML to reflect the new high price and bidder
    $(".userName1").html("<strong>Name: "+ user1 + "</strong>");
  //  $("#highest-price").html("$" + bidderPrice);

});



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

// At the initial load, get a snapshot of the current data.
database.ref("/clicks").on("value", function(snapshot) {

  // Print the initial data to the console.
  console.log(snapshot.val());

  // Change the html to reflect the initial value.
  $("#click-value").html(snapshot.val().clickCount);

  // Change the clickcounter to match the data in the database
  clickCounter = snapshot.val().clickCount;

  // Log the value of the clickCounter
  console.log(clickCounter);

  // Change the HTML Value
  $("#click-value").html(clickCounter);

// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// Whenever a user clicks the click-button
$("#click-button").on("click", function() {

  // Reduce the clickCounter by 1
  clickCounter--;

  // Alert User and reset the counter
  if (clickCounter === 0) {
    alert("Phew! You made it! That sure was a lot of clicking.");
    clickCounter = initialValue;
  }

  // Save new value to Firebase
  database.ref("/clicks").set({
    clickCount: clickCounter
  });

  // Log the value of clickCounter
  console.log(clickCounter);
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