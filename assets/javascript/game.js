// Global variables
var goal = 0;
var blueValue = 0;
var greenValue = 0;
var redValue = 0;
var purpleValue = 0;
var selection = 0;
var total = 0;
var wins = 0;
var losses = 0;

// Functions

// Start a new game
function startNewGame() {
    setGoal();
    updateDisplay();
    randomlizeCrystals();
    storeCrystals();
}

// Set Number to match to a random number between 19 and 120
function setGoal() {
    goal = Math.floor(Math.random() * 102) + 19;
}

// Updates display
function updateDisplay() {
    displayGoal();
    displayScore();
    displayWins();
    displayLosses();
}

// Display number to guess
function displayGoal() {
    $('#scoreGoal').text(goal);
}

// Displays number of wins
function displayWins() {
    $('#wins').text("Wins: " + wins);
}

// Displays number of losses
function displayLosses() {
    $('#losses').text("Losses: " + losses);
}

// Randomlize crystal values between 1-12
function randomlizeCrystals() {
    blueValue = Math.floor(Math.random() * 12) + 1;
    greenValue = Math.floor(Math.random() * 12) + 1;
    redValue = Math.floor(Math.random() * 12) + 1;
    purpleValue = Math.floor(Math.random() * 12) + 1;
}

// Assign each crystal their randomly generated value
function storeCrystals() {
    $('#crystalBlue').data('data-value', blueValue);
    $('#crystalGreen').data('data-value', greenValue);
    $('#crystalRed').data('data-value', redValue);
    $('#crystalPurple').data('data-value', purpleValue);
}

// Computes the new score and displays
function updateScore(value) {
    addScore(value);
    displayScore();
}

// Adds the selected crystal value to the total score
function addScore(value) {
    total += value;
}

// Displays the new score on the page
function displayScore() {
    $('#scoreCurrent').text(total);
}

// Game logic
// If the current score matches the number to match
// Call win conditions and restart game
// If it exceeds then
// Call lose conditions and restart game
function computeGame() {
    if (total == goal) {
        winGame();
        reset();
        startNewGame();
    }
    else if (total > goal) {
        loseGame();
        reset();
        startNewGame();
    }
}

// Updates status with the win message, increments wins
function winGame() {
    $('#status').text("You win!");
    wins++;
    displayWins();
}

// Updates status with the lost message, increments losses
function loseGame() {
    $('#status').text("You lost!");
    losses++;
    displayLosses();
}

// Resets the total
function reset() {
    total = 0;
    //$('#status').text("");
}

// Debugging functions
function checkValues() {
    // Selection Value
    console.log("You selected: " + selection);

    // Crystal Values
    var temp = $('#crystalBlue').data('data-value');
    console.log("Value of Blue Crystal: " + temp);

    var temp = $('#crystalGreen').data('data-value');
    console.log("Value of Green Crystal: " + temp);

    var temp = $('#crystalRed').data('data-value');
    console.log("Value of Red Crystal: " + temp);

    var temp = $('#crystalPurple').data('data-value');
    console.log("Value of Purple Crystal: " + temp);

    // Score
    console.log("Total Score: " + total)

    // Goal
    console.log("Score to Match: " + goal);

    // Newline
    console.log("");
}


// Main
// Shorthand document ready
$(function () {
    startNewGame();

    // Crystal clicked
    $('.crystals').on('click', function () {
        // Selected crystal
        selection = $(this).data('data-value');

        // Updates score
        updateScore(selection);

        // Debugging
        //checkValues();

        // Game logic
        computeGame();
    })
});