const url = "https://random-words-api.kushcreates.com/api?language=en&category=wordle&length=5&type=uppercase"
const guessBtn = document.querySelector("#guess-btn")
const restartBtn = document.querySelector("#restart-btn")
const guesses = document.querySelectorAll(".guess-letter")
let currentWord = ""
let currentGuess = 0
const chances = document.querySelectorAll(".chance")
let stats = {
    score: 0,
    gamesPlayed: 0,
    winRatio: 0,
    guesses: currentGuess,
}
const response = await fetch(url);
const data = await response.json();

async function findWord() {
    // five letter word

    currentWord = data[Math.floor((Math.random()) * data.length)].word;
    console.log(currentWord)

}
findWord()

async function submitGuess() {
    
    if (currentGuess >= 6) {
        alert("Game Over")
        return
    }
    let guessedWord = ""
    for (let sampleGuess of guesses) {
        guessedWord += sampleGuess.value.toUpperCase()
    }
    if (guessedWord.length !== 5) {
        alert("Not enough letters")
        return
    }
    guesses.forEach((guess, index) => {
        const inputtedLetter = guess.value.toUpperCase()
        // finds box to ACTUALLY use
        const box = document.querySelector(`#letter-${currentGuess + 1}-${index + 1}`)
        box.textContent = inputtedLetter
        if (currentWord[index] === inputtedLetter)  box.classList.add("correct");
        else if (currentWord.includes(inputtedLetter))  box.classList.add("kinda")
        else box.classList.add("no")
       
    })
    if (guessedWord === currentWord) {
        alert("You win!!")
        return
    }

    currentGuess++
    stats.guesses = currentGuess
}

guessBtn.addEventListener("click", submitGuess)
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitGuess()
})


