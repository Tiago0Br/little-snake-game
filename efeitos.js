let canvas = document.getElementById('snake')
let context = canvas.getContext("2d")
let box = 32
let score = 0
let snake = []
let game = setInterval(startGame, 100)

snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = 'right'

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBG() {
    context.fillStyle = "lightgreen"
    context.fillRect(0, 0, 64 * box, 64 * box)
}

function endGame() {
    clearInterval(game)
    alert(`Game Over! D:\nSua pontuação foi ${score}`)
}

function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = 'green'
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function createFood() {
    context.fillStyle = 'red'
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update)

function update(event) {
    if ((event.keyCode === 65 || event.keyCode === 37) && direction !== 'right') direction = 'left' // a
    if ((event.keyCode === 87 || event.keyCode === 38) && direction !== 'down') direction = 'up'    // w
    if ((event.keyCode === 68 || event.keyCode === 39) && direction !== 'left') direction = 'right' // d
    if ((event.keyCode === 83 || event.keyCode === 40) && direction !== 'up') direction = 'down'    // s
}

function startGame() {
    if (snake[0].x > 15 * box && direction === 'right') endGame()
    if (snake[0].x < 0 && direction === 'left') endGame()
    if (snake[0].y > 15 * box && direction === 'down') endGame()
    if (snake[0].y < 0 && direction === 'up') endGame()

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            endGame()
        }
    }

    createBG()
    createSnake()
    createFood()
    document.querySelector(".score").innerHTML = score

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (direction === 'right') snakeX += box
    if (direction === 'left')  snakeX -= box
    if (direction === 'up') snakeY -= box
    if (direction === 'down') snakeY += box

    if(snakeX !== food.x || snakeY !== food.y) {
        snake.pop()
    } else {
        score++
        food.x = Math.floor(Math.random() * 15 + 1) * box
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }


    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead)
}

