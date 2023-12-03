const inputObj = document.getElementById("input")
const inputDisplayObj = document.getElementById("input-display")
const restartButton = document.getElementById("restart-button")
const timerDisplay = document.getElementById("timer")

const possibleWords = ["meowww", "purrr", "meeeeow", "meoooow"]
const maxCharLength = 50

let targetString
let timeStart
let gameStarted
let gameEnded

function updateTargetString()
{
    let newString = ""
    while (true)
    {
        const choosenWord = possibleWords[Math.floor(Math.random()*possibleWords.length)]
        if (newString.length + choosenWord.length + 1 >= maxCharLength)
            break

        newString += " " + choosenWord
    }

    targetString = newString.substring(1);
}

function gameStart()
{
    gameStarted = true
    gameEnded = false
    timeStart = Date.now()
}

function endGame()
{
    gameStarted = false
    gameEnded = true

    let elapsedTime = (Date.now()-timeStart)/1000
    elapsedTime = Math.floor(elapsedTime*10)/10

    let meowsPerMin = targetString.split(" ").length / elapsedTime * 60
    meowsPerMin = Math.floor(meowsPerMin*10)/10

    timerDisplay.innerHTML = `${elapsedTime}s : Meows per min ${meowsPerMin}`
}

function correctChar(char)
{
    return `<span class="correct-char">${char}</span>`
}

function incorrectChar(char)
{
    return `<span class="incorrect-char">${char}</span>`
}

function missingChar(char)
{
    return `<span class="missing-char">${char}</span>`
}

function updateDisplay(inputValue)
{
    let displayHTML = ""
    for (let i = 0; i < Math.max(targetString.length, inputValue.length); i++)
    {
        if (i < targetString.length && i < inputValue.length)
        {
            if (targetString.charAt(i) == inputValue.charAt(i))
                displayHTML += correctChar(inputValue.charAt(i))
            else 
                displayHTML += incorrectChar(inputValue.charAt(i))
        } else if (i < targetString.length && i >= inputValue.length) {
            displayHTML += missingChar(targetString.charAt(i))
        } else {
            displayHTML += incorrectChar(inputValue.charAt(i))
        }
    }
    inputDisplayObj.innerHTML = displayHTML
}

updateTargetString()
console.log(targetString)

inputObj.oninput = (e) => {
    if (!gameStarted && !gameEnded)
        gameStart();

    inputObj.value = inputObj.value.replace("\n", " ")
    updateDisplay(inputObj.value)

    if (inputObj.value == targetString)
        endGame()
}

updateDisplay("")

function timer_update()
{
    if (gameStarted)
    {
        let elapsedTime = (Date.now()-timeStart)/1000
        elapsedTime = Math.floor(elapsedTime*10)/10
        timerDisplay.innerHTML = ""+elapsedTime+'s'
    }
    requestAnimationFrame(timer_update)
}

restartButton.onclick = () => {
    updateTargetString()
    gameStarted = false
    gameEnded = false
    inputObj.value = ""
    updateDisplay("")
}

timer_update()