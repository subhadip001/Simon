
var buttonColors = ["red" , "blue" , "green" , "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false ;
var level = 0 ;
var highScore = 0;

$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});
$("#start").click(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

//color chosen by user
$(".btn").click(function(){
    var userChosenColor = $(this).attr('id');
    //console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);
    //console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currLevel) {
    if(gamePattern[currLevel] === userClickedPattern[currLevel]){
       
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key / refresh to Restart");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

//random color chosen by game
function nextSequence() {
    userClickedPattern = [];
    level++;
    var randomNumber = Math.floor(Math.random()*4);
    //console.log(randomNumber);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    //console.log(gamePattern);
    var randomId = "#" + randomChosenColor;
    $(randomId).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $("#level-title").text("Level " + level);
    highScore = getHighScore();
    
        if (level> highScore) {
            localStorage.setItem('highScore', level);
    
        }
    
    
    function getHighScore() {
        return parseInt(localStorage.getItem("highScore")) || 0;
    }
    console.log(highScore)
    $("p").text(" High Score : " + highScore);
}


function animatePress(currentColor) {
    $('#' + currentColor).addClass("pressed");
    setTimeout(() => {
        $('#' + currentColor).removeClass("pressed");
    }, 100);
}


function playSound(name) {
    var audio = new Audio(name+ ".mp3");
    audio.play();
}

function startOver() {
    level = 0 ;
    gamePattern = [];
    started = false;
}

$("#reset").click(function(){
    console.log("clicked");
    resetHighScore();
})
function resetHighScore(){
    localStorage.clear();
}
