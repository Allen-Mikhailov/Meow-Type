const inputObj = document.getElementById("input")
const inputDisplayObj = document.getElementById("input-display")

const possibleWords = ["meowww", "purrr", "meeeeow", "meoooow"]
const maxCharLength = 50

let targetString

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

function correctChar(char)
{
    return `<span style="color: green">${char}</span>`
}

function incorrectChar(char)
{
    return `<span style="color: red">${char}</span>`
}

function missingChar(char)
{
    return `<span style="color: grey">${char}</span>`
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
        }
    }
    inputDisplayObj.innerHTML = displayHTML
}

updateTargetString()
console.log(targetString)

inputObj.oninput = (e) => {
    updateDisplay(inputObj.value)
}

updateDisplay("")