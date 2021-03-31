//Made by Fraser Copland
const words = ["ROUE-CYR", "DIABOLO", "HANDSTANDS"];
const hints = ["A big metal hoop that you spin in", "A juggling prop shaped like an hourglass that spins", "When you go upside down"];

var lives = 7;

var word;
var hint;

var hiddenWordList = [];

for (let a = 65; a <=90; a++) {
    document.getElementById("letters").innerHTML += `<button class="letterBtn" value="${String.fromCharCode(a)}">${String.fromCharCode(a)}</button>`;
}

function setup() {
    choice = Math.floor(Math.random()*3);
    word = words[choice];
    hint = hints[choice];
    console.log(word);
    
    for (let c = 0; c < word.length; c++) {
        hiddenWordList.push(word[c].replace(/[A-Z]/,"_"));
    }
    var hiddenWord = hiddenWordList.join(' ');
    document.getElementById("word").innerHTML = `<h2>${hiddenWord}</h2>`;
    document.getElementById("hint").innerHTML = `<p>hint: ${hint}</p>`
}

const buttons = document.getElementsByClassName("letterBtn");

Array.from(buttons).forEach(button => button.addEventListener("click", showVal));

function showVal(event) {
    const button = event.target;
    button.disabled = true;
    console.log(button.value);
    letterInWord(button.value);
}

function letterInWord(letter) {
    var inword = false;
    for (let i = 0; i < word.length; i++) {
        if (letter == word[i]) {
            inword = true;
            hiddenWordList[i] = letter;
            var hiddenWord = hiddenWordList.join(' ');
            document.getElementById("word").innerHTML = `<h2>${hiddenWord}</h2>`;
            if (hiddenWordList.includes("_") == false) {
                gameWin();
            }
        }
    }
    if (inword == false) {
        mistake()
    }

}

function mistake() {
    document.getElementById(`heart${lives}`).style.opacity = 0;
    lives--;
        console.log(lives);
        if (lives == 0) {
            gameLose();
        }
}

function gameLose() {
    console.log("Lose");
    buttons.disabled = true;
    document.getElementById("lose").style.opacity = 1;
    document.getElementById("correctWord").innerText = `correct word is ${word}`
}

function gameWin() {
    console.log("Win");
    buttons.disabled = true;
    document.getElementById("win").style.opacity = 1;
}

document.getElementById("play-again").onclick = function() {
    window.location.reload();
}
document.getElementById("try-again").onclick = function() {
    window.location.reload();
}

setup();