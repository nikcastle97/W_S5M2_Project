// 👉 TASK 1 - Understand the existing code 👈
function moduleProject2() {
  // 👇 WORK WORK BELOW THIS LINE 👇
  let startTime = new Date().getTime() // Record start time

  function getTimeElapsed() { // To be used at end of game to get elapsed time
    let currentTime = new Date().getTime()
    return currentTime - startTime
  }

  // Setting up the footer content
  let footer = document.querySelector('footer')
  let currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let keys = { // To easily check `event.key` on keyboard events
    space: ' ',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
    left: 'ArrowLeft',
  }

  // Helper function to grab all squares
  const getAllSquares = () => document.querySelectorAll('.square')

  // Populating the grid with rows and squares
  for (let n = 0; n < 5; n++) {
    // Creating the rows
    let row = document.createElement('div')
    document.querySelector('#grid').appendChild(row)
    row.classList.add('row')
    // Creating the squares
    for (let m = 0; m < 5; m++) {
      let square = document.createElement('div')
      square.classList.add('square')
      row.appendChild(square)
      square.addEventListener('click', () => {
        if (square.classList.contains(`targeted`)) {
        } else {
          getAllSquares().forEach(square => square.classList.remove(`targeted`))
          square.classList.add(`targeted`)
        }
      })
    }
  }
  document.querySelector('.row:nth-child(3)')
    .children[2].classList.add('targeted') // Initial square being targeted

  // Helper function to obtain 5 random indices (0-24) to put mosquitoes in
  function generateRandomIntegers() {
    let randomInts = []
    while (randomInts.length < 5) {
      let randomInt = Math.floor(Math.random() * 25)
      if (!randomInts.includes(randomInt)) {
        randomInts.push(randomInt)
      }
    }
    return randomInts
  }
  let allSquares = getAllSquares()
  generateRandomIntegers().forEach(randomInt => { // Puts live mosquitoes in 5 random squares
    let mosquito = document.createElement('img')
    mosquito.src = './mosquito.png'
    mosquito.style.transform = `rotate(${Math.floor(Math.random() * 359)}deg) scale(${Math.random() * 0.4 + 0.8})`
    mosquito.dataset.status = 'alive'
    allSquares[randomInt].appendChild(mosquito)
  })

  document.addEventListener('keydown', evt => {

    // 👉 TASK 3 - Use the arrow keys to highlight a new square 👈

    let up = evt.key === keys.up;
    let right = evt.key === keys.right;
    let down = evt.key === keys.down;
    let left = evt.key === keys.left;

    let kill = evt.key === keys.space;

    let targeted = document.querySelector(`.targeted`);

    if (up)
    {
      if (targeted.parentElement.previousElementSibling) {
        let index = Array.from(targeted.parentElement.children).indexOf(targeted);
        targeted.classList.remove(`targeted`);
        targeted.parentElement.previousElementSibling.children[index].classList.add(`targeted`)
      }
    }
    else if (right)
      {
      if (targeted.nextElementSibling) {
        targeted.classList.remove(`targeted`)
        targeted.nextElementSibling.classList.add(`targeted`)
      }
    }
    else if (down)
    {
      if (targeted.parentElement.nextElementSibling) {
        let index = Array.from(targeted.parentElement.children).indexOf(targeted);
        targeted.classList.remove(`targeted`);
        targeted.parentElement.nextElementSibling.children[index].classList.add(`targeted`)
      }
    }
    else if (left)
    {
      if (targeted.previousElementSibling) {
        targeted.classList.remove(`targeted`);
        targeted.previousElementSibling.classList.add(`targeted`)
      }
    }

    // 👉 TASK 4 - Use the space bar to exterminate a mosquito 👈

    else if (kill)
    {
      let squash = targeted.firstChild

      if (squash && squash.dataset.status === `alive`) {
        squash.dataset.status = `dead`;
        squash.parentElement.style.backgroundColor = `red`
      }

      // 👉 TASK 5 - End the game 👈

      let survivors = document.querySelectorAll(`[data-status=alive]`)
      console.log(survivors)
      if (!survivors.length) {
        let timeElapsed = getTimeElapsed()
        // console.log(timeElapsed)
        document.querySelector(`p.info`)
        .textContent = `Extermination completed in ${timeElapsed / 1000} seconds!`

        let reBtn = document.createElement(`button`)
        reBtn.textContent = `Restart`
        reBtn.addEventListener(`click`, () => {
          location.reload()
        })
        document.querySelector(`h2`).insertAdjacentElement(`beforeend`, reBtn)
      }
    }
  })
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
// ❗ DO NOT MODIFY THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject2 }
else moduleProject2()
