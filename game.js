var gamePattern = [];
var colors = ["red", "blue", "green", "yellow"];
var userClickedColour = [];

var started = false;
var level = 0;

$(".start").click(function () {
    if (!started) {
        $(title).text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    // var select = ('#' + pattern)
    var userChosenColour = $(this).attr("id");
    userClickedColour.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedColour.length - 1);

})


function nextSequence() {
    userClickedColour = [];
    level++;

    $(title).text("Level " + level);

    var randomNumber = Math.random() * 4;
    a = (Math.floor(randomNumber));
    //console.log(a);
    var pattern = colors[a];
    gamePattern.push(pattern);
    // console.log(gamePattern);

    $("#" + pattern).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(pattern);

}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    //console.log(audio);
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {

        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

function checkAnswer(CurrentLevel) {
    var b = userClickedColour.length;
    var c = gamePattern.length;
    if (gamePattern[CurrentLevel] === userClickedColour[CurrentLevel]) {
        if (b === c) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $(title).text("Game Over, Press Start Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

