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
alert("Show stats with Alt + S!")
async function findWord() {
    // five letter word
    const response = await fetch(url);
    const data = await response.json();

    currentWord = data[Math.floor((Math.random()) * data.length)].word;
    console.log(currentWord)

}
findWord()

async function submitGuess() {
    
    if (currentGuess >= 6) {
        stats.gamesPlayed++
        stats.winRatio = Math.round((stats.score / stats.gamesPlayed) * 100)
        alert("Game Over")
        return
    }
    const currentInputs = document.querySelectorAll(
        `.guess-letter`
    )
    let guessedWord = ""
    for (let sampleGuess of currentInputs) {
        if (!sampleGuess.value) {
            alert("Not enough letters")
            return
        }
        guessedWord += sampleGuess.value.toUpperCase()
    }
    currentInputs.forEach((guess, index) => {
        const inputtedLetter = guess.value.toUpperCase()

        const box = document.querySelector(
            `#letter-${currentGuess + 1}-${index + 1}`
        )

            box.textContent = inputtedLetter

            if(currentWord[index] === inputtedLetter)
                box.classList.add("correct")
            else if (currentWord.includes(inputtedLetter))
                box.classList.add("kinda")
            else
                box.classList.add("no")

        })
       if(guessedWord === currentWord) {
        stats.score++
        stats.gamesPlayed++
        stats.winRatio = Math.round((stats.score / stats.gamesPlayed) * 100)
        alert("You win!!")
        return
       }
       
       currentGuess++
       currentInputs.forEach((guess) => {
        guess.value = ""
       })
        
    }


guessBtn.addEventListener("click", submitGuess)
document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        submitGuess()
    }

    if (e.altKey && e.key === "s") {
        alert(`
            Wins: ${stats.score}
            Games Played: ${stats.gamesPlayed}
            Win Ratio: ${stats.winRatio}%`)
    }
})




