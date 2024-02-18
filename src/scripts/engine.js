const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score")
  },
  values: {
    timeId: null,
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60
  },
  actions: {
    countDownTimerId: setInterval(countDown, 1000)

  }
}

const randomSquare = () => {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy")
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
    alert(`Game over! Your score is ${state.values.result}`)
  }
}


const init = () => {
  moveEnemy()
  addListenerHitbox()
}

init()