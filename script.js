var timeLeft = 60
var startScreen = $("#start-screen")
var questionContainer = $("#question-container")
var startButton = $("#start-button")
var question = $("#question")
var option1 = $("#option1")
var option2 = $("#option2")
var option3 = $("#option3")
var option4 = $("#option4")

function endGame() {
    questionContainer.css("display", "none");
    $("#end-screen").css("display", "block");
    let initials = prompt("Enter your initials:");
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({initials: initials, score: timeLeft});
    localStorage.setItem("scores", JSON.stringify(scores));
}

startButton.on("click",function(){
    startScreen.css("display","none")
    questionContainer.css("display","block")
    let timer = setInterval(function(){
    timeLeft--;
    $('#timer').text(timeLeft);
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame();
    }
}, 1000);
})

var currentQuestionIndex = 0;

var questions = [
    {
        text: "Which of these is an amphibian?",
        options: ["Snake", "Lizard", "Newt", "Fish"],
        answer: 'Newt'
    },
    {
        text: "Which evolved flight first?",
        options: ["Birds", "Mammals", "Insects", "Reptiles"],
        answer: 'Insects'
    },
    {
        text: "Which can detect electicity?",
        options: ["Bird", "Elephant", "Shark", "Snake"],
        answer: 'Shark'
    },
    {
        text: "Which is not a marsupial?",
        options: ["Opposum", "Koala", "Panda", "Wallaby"],
        answer: 'Panda'
    },
    {
        text: "Which is the largest fish?",
        options: ["Giant Manta Ray", "Great White Shark", "Whale Shark", "Blue Whale"],
        answer: 'Whale Shark'
    }
]

function showQuestion() {
    question.text(questions[currentQuestionIndex].text)

    option1.text(questions[currentQuestionIndex].options[0])
    option2.text(questions[currentQuestionIndex].options[1])
    option3.text(questions[currentQuestionIndex].options[2])
    option4.text(questions[currentQuestionIndex].options[3])
}

function guessClick (event) {
    var currentAnswer = questions [currentQuestionIndex].answer
    var currentGuess = event.target.textContent 
    if (currentAnswer == currentGuess) {
        $('#result').text('Right!')
    }
    else {
        $('#result').text("Wrong")
        timeLeft-=10
    }
    setTimeout(function(){
        $('#result').text('')
    },1300)
    currentQuestionIndex++;
if (currentQuestionIndex < questions.length) {
    showQuestion();
} else {
    clearInterval(timer);
    endGame();
}
}

$("#view-scores").on("click", function() {
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.sort(function(a, b) {
        return b.score - a.score;
    });
    scores = scores.slice(0, 10);
    $("#scores-list").empty(); 
    for (let i = 0; i < scores.length; i++) {
        let score = scores[i];
        let li = $("<li>").text(score.initials + ": " + score.score);
        $("#scores-list").append(li);
    }
    $("#scoreboard").css("display", "block"); 
});

option1.on("click", guessClick)
option2.on("click", guessClick)
option3.on("click", guessClick)
option4.on("click", guessClick)

showQuestion();