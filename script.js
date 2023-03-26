$(document).ready(function(){
    var currentQuestion;
    var timeLeft = 10;
    var score = 0;
    var highScore = 0;
    var problemArr = ['plus'];

    var randomNumber = function (ele) {
        return Math.ceil(Math.random() * ele);
    }

    var questionGenerator = function () {
        var question = {};
        var num1 = randomNumber(10);
        var num2 = randomNumber(10);
        
        question.answer = num1 + num2;
        question.equation = String(num1) + " + " + String(num2);
        
        return question;
    }

    var renderNewQuestion = function () {
        currentQuestion = questionGenerator();
        $('#equation').text(currentQuestion.equation);    
    }
   
    var checkAnswer = function (userInput, answer) {
        if(userInput === answer) {
            renderNewQuestion();
            $('#answerInput').val('');
            updateTimeLeft(+1);
            updateScore(+1);
        }
    }

    var updateScore = function (amount) {
        score += amount;
        $('#score').text(score);
    }

    var interval;
    var startGame = function () {
        if (!interval) {
            if (timeLeft === 0) {
                updateTimeLeft(10);
                if (score > highScore) {
                    highScore = score;
                    $('#highScore').text(highScore);
                }
                score = 0;
            }
            interval = setInterval(function () {
                updateTimeLeft(-1);
                $('#time-left').text(timeLeft);
                if (timeLeft === 0) {
                    clearInterval(interval);
                    interval = undefined;
                }
            }, 1000);
        }
    }


    var updateTimeLeft = function (amount) {
        timeLeft += amount;
        $('#time-left').text(timeLeft);
    }

    $('#answerInput').on('keyup', function () {
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer);
    });

    renderNewQuestion();

});
