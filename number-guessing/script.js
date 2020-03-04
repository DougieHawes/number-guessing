const msgEl = document.getElementById('msg')

const randomNum = getRandomNumber()

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new window.SpeechRecognition()

recognition.start()

function onSpeak(e) {
    const msg = e.results[0][0].transcript

    writeMessage(msg)
    checkNumber(msg)
}

function writeMessage(msg) {
    msgEl.innerHTML = `
        <div>You Said:</div>
        <span class='box'>${msg}</div>
    `
}

function checkNumber(msg) {
    const num = +msg

    if(Number.isNaN(num)) {
        msgEl.innerHTML = '<div>That is not a valid number</div>'
        return
    }

    if(num > 100 || num < 1) {
        msgEl.innerHTML = '<div>Number must be between 1 and 100</div>'
        return
    }

    if(num === randomNum) {
        document.body.innerHTML= `
            <div class='container'>
                <h2>${num} was the correct number, well done</h2>
                <button class="play-again" id="play-again">play again</button>
            </div>
        `
    } else if (num > randomNum) {
        msgEl.innerHTML += `<div>${num} is too high go lower</div>`
    } else {
        msgEl.innerHTML += `<div>${num} is too low go higher</div>`
    }
}

function getRandomNumber() {
    return Math.ceil(Math.random() * 100)
}

recognition.addEventListener('result', onSpeak)

recognition.addEventListener('end', () => recognition.start())

document.body.addEventListener('click', (e) => {
    if(e.target.id === 'play-again') {
        window.location.reload()
    }
})