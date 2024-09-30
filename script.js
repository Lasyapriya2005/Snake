const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake = [{ x: 8 * box, y: 8 * box }];
let direction = "RIGHT";
let coin = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
};
let score = 0;

let snakeImg = new Image();
let coinImg = new Image();

snakeImg.src =
  "https://searchengineland.com/wp-content/seloads/2017/09/snake-game-600x600.png"; // You will need to provide the image file for snake
coinImg.src =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR2hraiiEyrRje8pDZwEn2X9_1ls3cKQxI4SU55LfhWEnR_CC1dXo6gaKy0ICcPmlfIPM&usqp=CAU"; // You will need to provide the image file for coin

document.addEventListener("keydown", directionHandler);

function directionHandler(event) {
  if (event.key === "ArrowUp" && direction !== "DOWN") {
    direction = "UP";
  } else if (event.key === "ArrowDown" && direction !== "UP") {
    direction = "DOWN";
  } else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (event.key === "ArrowRight" && direction !== "LEFT") {
    direction = "RIGHT";
  }
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  for (let i = 0; i < snake.length; i++) {
    ctx.drawImage(snakeImg, snake[i].x, snake[i].y, box, box);
  }

  // Draw the coin
  ctx.drawImage(coinImg, coin.x, coin.y, box, box);

  // Move the snake
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "UP") snakeY -= box;
  if (direction === "DOWN") snakeY += box;
  if (direction === "LEFT") snakeX -= box;
  if (direction === "RIGHT") snakeX += box;

  // Check if the snake eats the coin
  if (snakeX === coin.x && snakeY === coin.y) {
    score++;
    coin = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
    snake.pop();
  }

  // Add new head
  let newHead = { x: snakeX, y: snakeY };
  snake.unshift(newHead);

  // Check for collisions with the walls or the snake's own body
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("Game Over! Your score: " + score);
  }

  // Display score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, box, box);
}

function collision(head, snake) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

let game = setInterval(drawGame, 100);
