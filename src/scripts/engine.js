const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    modal: document.querySelector(".modal"),
    close: document.querySelector(".close"),
    message: document.querySelector(".modal-message")
  },
  values: {
    timeId: null,
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 8
  },
  actions: {
    countDownTimerId: setInterval(countDown, 1000)

  }
}

const randomSquare = () => {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy")
    square.style.backgroundColor = '#d8cec1'
  })
  
  let randomNumber = Math.floor(Math.random()*9)
  let randomSquare = state.view.squares[randomNumber]
  randomSquare.classList.add("enemy")
  state.values.hitPosition = randomSquare.id
}

const moveEnemy = () => {
  state.values.timeId = setInterval(randomSquare, state.values.gameVelocity)
}

const playSound = (audioName) => {
  let audio = new Audio("src/audios\\\hit.m4a") //had to change because it wasn't working
  audio.volume = 0.2
  audio.play()
}

const addListenerHitbox = () => {
  state.view.squares.forEach(square => {
    square.addEventListener('click', () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++
        square.style.backgroundColor = '#000'
        state.view.score.textContent = state.values.result
        state.values.hitPosition = null
        playSound()
      }
    })
  })
}

function countDown() {
  state.values.currentTime--
  state.view.timeLeft.textContent = state.values.currentTime
  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId)
    clearInterval(state.values.timeId)
    state.view.message.textContent = `Game over! Your score is ${state.values.result}`
    state.view.modal.style.display = "block"
  }
}


const init = () => {
  moveEnemy()
  addListenerHitbox()
}

state.view.close.onclick = function() {
  state.view.modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == state.view.modal) {
    state.view.modal.style.display = "none";
  }
}

init()