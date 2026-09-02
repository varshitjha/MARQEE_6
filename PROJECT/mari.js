const gameArea = document.querySelector("#game-area");
const mario = document.querySelector("#mario");
const pipe = document.querySelector("#pipe");
const scoreElement = document.querySelector("#score");
const message = document.querySelector("#game-message");
const restartButton = document.querySelector("#restart-button");

const state = { marioX: 0, marioY: 0, velocityY: 0, pipeX: 0, score: 0, running: false, frameId: 0, lastTime: 0 };
const gravity = 1800;
const jumpVelocity = 900;
const pipeSpeed = 260;
const groundHeight = 42;

function resetGame() {
  cancelAnimationFrame(state.frameId);
  state.marioX = gameArea.clientWidth * 0.08;
  state.marioY = 0;
  state.velocityY = 0;
  state.pipeX = gameArea.clientWidth + 80;
  state.score = 0;
  state.running = false;
  scoreElement.textContent = "0";
  message.textContent = "Press Space, ↑, or tap to jump";
  message.hidden = false;
  render();
  message.hidden =gameArea.clientWidth + 80;
}

function render() {
  mario.style.left = `${state.marioX}px`;
  mario.style.bottom = `${groundHeight + state.marioY}px`;
  pipe.style.left = `${state.pipeX}px`;
}

function startGame() {
  if (state.running) return;
  state.running = true;
  message.hidden = true;
  state.lastTime = performance.now();
  state.frameId = requestAnimationFrame(gameLoop);
}

function jump(){
  startGame();
  if(state.marioY == 0) state.velocityY =jumpVelocity;
}

function move(direction) {
  const maxX = gameArea.clientWidth - mario.offsetWidth;
  state.marioX = Math.max(0, Math.min(maxX, state.marioX + direction * 24));
  mario.classList.toggle("flipped", direction < 0);
  render();
}

function collides() {
  const marioRect = mario.getBoundingClientRect();
  const pipeRect = pipe.getBoundingClientRect();
  return marioRect.left < pipeRect.right && marioRect.right > pipeRect.left && marioRect.top < pipeRect.bottom && marioRect.bottom > pipeRect.top;
}

function endGame() {
  state.running = false;
  message.textContent = `Game over — score: ${state.score}. Press Restart to play again.`;
  message.hidden = false;
}

function gameLoop(time) {
  if (!state.running) return;
  const delta = Math.min((time - state.lastTime) / 1000, 0.05);
  state.lastTime = time;

  state.velocityY -= gravity * delta;
  state.marioY = Math.max(0, state.marioY + state.velocityY * delta);
  if (state.marioY === 0) state.velocityY = 0;

  state.pipeX -= pipeSpeed * delta;
  if (state.pipeX < -pipe.offsetWidth) {
    state.pipeX = gameArea.clientWidth + 20;
    state.score += 1;
    scoreElement.textContent = state.score;
  }

  render();
  if (collides()) return endGame();
  state.frameId = requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (event) => {
  if ([" ", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.key)) event.preventDefault();
  if ([" ", "ArrowUp", "w", "W"].includes(event.key)) jump();
  if (["ArrowLeft", "a", "A"].includes(event.key)) move(-1);
  if (["ArrowRight", "d", "D"].includes(event.key)) move(1);
});

gameArea.addEventListener("pointerdown", jump);
restartButton.addEventListener("click", resetGame);
window.addEventListener("resize", () => { if (!state.running) resetGame(); });

resetGame();
