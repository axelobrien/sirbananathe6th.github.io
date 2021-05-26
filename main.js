var userScore = 0;
var computerScore =  0;
var repeats = 0;
var storedResult = "r";
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_div = document.querySelector(".result");
const rock_div = document.getElementById("r")
const paper_div = document.getElementById("p")
const scissors_div = document.getElementById("s")

function getComputerChoice() {
    const choices = ["r", "p", "s"];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber]
}

function convertToWord(letter) {
    if (letter === "r") {
        return "Rock"
    }
    if (letter === "p") {
        return "Paper"
    }
    if (letter === "s") {
        return "Scissors"
    }
}

function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    result_div.innerHTML = `${convertToWord(userChoice)} beats ${convertToWord(computerChoice)} you win!`;
    const userChoice_div = document.getElementById(userChoice)
    userChoice_div.classList.add('green-glow');
    setTimeout(() => userChoice_div.classList.remove("green-glow"), 300);
}

function lose(userChoice, computerChoice) {
    computerScore++;
    computerScore_span.innerHTML = computerScore;
    result_div.innerHTML = `${convertToWord(computerChoice)} beats ${convertToWord(userChoice)} you lose...`;
    if (repeats >= 3) {
        result_div.innerHTML += "\n You might want to change your strategy"
    }
    const userChoice_div = document.getElementById(userChoice)
    userChoice_div.classList.add('red-glow');
    setTimeout(() => userChoice_div.classList.remove("red-glow"), 300);
}

function draw(userChoice, computerChoice) {
    result_div.innerHTML = `You both picked ${convertToWord(userChoice)} ¯\\_(ツ)_/¯`
    const userChoice_div = document.getElementById(userChoice)
    userChoice_div.classList.add('gray-glow');
    setTimeout(() => userChoice_div.classList.remove("gray-glow"), 300);
}

function game(userChoice) {
    var computerChoice = getComputerChoice();
    const pop = new Audio();
    pop.src = "audio/pop.mp3";
    pop.play();
    if (userChoice == storedResult) {
        repeats++;
        if (repeats >= 3) {
            switch (userChoice) {
            case "r": 
                computerChoice = "p";
                break;
            case "p":
                computerChoice = "s";
                break;
            case "s":
                computerChoice = "r";
                break;
            }
        }
    }
    else  {
        repeats = 0;
        storedResult = userChoice;
    }
    switch (computerChoice + userChoice) {
        case "rp":
        case "ps":
        case "sr":
            win(userChoice, computerChoice);
            break;
        case "pr":
        case "sp":
        case "rs":
            lose(userChoice, computerChoice);
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
            break;
    }
}

function main() {
rock_div.addEventListener('click', () => game("r"));
paper_div.addEventListener('click', () => game("p"));
scissors_div.addEventListener('click', () => game("s"));
}

main();