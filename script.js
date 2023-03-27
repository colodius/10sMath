$(document).ready(function(){
    var currentQuestion;
    var timeLeft = 10;
    var score = 0;
    var highScore = 0;
    var problemArr = [];

    var choiceCheck = function () {
        problemArr = [];
        if (document.getElementById('plusChecked').checked) {
            problemArr.push('plus');
        }
        if (document.getElementById('minusChecked').checked) {
            problemArr.push('minus');
        }
        if (document.getElementById('mulChecked').checked) {
            problemArr.push('multiply');
        }
        if (document.getElementById('diviChecked').checked) {
            problemArr.push('divide');
        }
        console.log(problemArr);
    }
    
    var problemPick = function (arr) {
        var index= Math.floor(Math.random() * arr.length);
        if (arr[index] == 'plus') {
            return 'plus';
        }
        if (arr[index] == 'minus') {
            return 'minus';
        }
        if (arr[index] == 'multiply') {
            return 'multiply';
        }
        if (arr[index] == 'divide') {
            return 'divide';
        }
    }

    var randomNumber = function (ele) {
        return Math.ceil(Math.random() * ele);
    }

    var questionGenerator = function (arr) {
        var question = {};
        var num1 = randomNumber(10);
        var num2 = randomNumber(10);
        var num3 = randomNumber(10)*num1; //num 3 for divide equations
        var randomProblem = problemPick(arr);

        if (randomProblem == 'plus' || randomProblem == '') {
            question.answer = num1 + num2;
            question.equation = String(num1) + " + " + String(num2);
        }
        if (randomProblem == 'minus') {
            question.answer = Math.abs(num1 - num2);
            
            if (num1 >= num2) {question.equation = String(num1) + " - " + String(num2);}
            if (num2 > num1) {question.equation = String(num2) + " - " + String(num1);}
        }
        if (randomProblem == 'multiply') {
            question.answer = num1 * num2;
            question.equation = String(num1) + " X " + String(num2);
        }
        if (randomProblem == 'divide') {
            question.answer = num3 / num1;
            question.equation = String(num3) + " / " + String(num1);
        }
        
        return question;
    }

    var renderNewQuestion = function () {
        currentQuestion = questionGenerator(problemArr);
        $('#equation').text(currentQuestion.equation);    
    }

    var checkAnswer = function (userInput, answer) {
        if(userInput === answer) {
            renderNewQuestion();
            $('#answerInput').val('');
            updateTimeLeft(+1);
            updateScore(+1);
            $('#answerPrompt').text('Correct !!');
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
                choiceCheck();
            }
            interval = setInterval(function () {
                updateTimeLeft(-1);
                $('#answerPrompt').text('');
                $('#time-left').text(timeLeft);
                if (timeLeft === 0) {
                    clearInterval(interval);
                    interval = undefined;
                    if (score > highScore) {
                        highScore = score;
                        $('#highScore').text(highScore);
                        
                    }
                    score = 0;
                    problemArr = [];
                }
            }, 1000);
        }
    }


    var updateTimeLeft = function (amount) {
        timeLeft += amount;
        $('#time-left').text(timeLeft);
    }

    $('#answerInput').on('click', function () {
        choiceCheck(); //run check when input is clicked
    });

    $('#answerInput').on('keyup', function () {
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer);
    });
    
    choiceCheck(); //initialize with a addition problem
    console.log(problemArr); //log current problem choice
    renderNewQuestion();

});
