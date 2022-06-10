const field = document.querySelector('.field');
const ctx = field.getContext('2d');
const inputWidth = document.getElementById('field-width');
const inputHeight = document.getElementById('field-height');

// colors
const dark = '#113447';
const light = '#327fa8';
const cell = '#d8c943';

const cellRes = 10;

// default measures
let rows = 50;
let cols = 50;

field.width = cols * cellRes + cols - 1;
field.height = rows * cellRes + rows - 1;
let gen = [];
const per = 5;
fillRect();
createLife();

function fillRect() {
  ctx.clearRect(0, 0, field.width, field.height);
  ctx.fillStyle = dark;
  ctx.fillRect(0, 0, field.width, field.height);
  drawHorizontalLines();
  drawVerticalLines();
}

function drawHorizontalLines() {
  for (let i = 1; i < rows; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * cellRes + i);
    ctx.lineTo(field.width, i * cellRes + i);
    ctx.strokeStyle = light;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function drawVerticalLines() {
  for (let i = 1; i < cols; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cellRes + i, 0);
    ctx.lineTo(i * cellRes + i, field.height);
    ctx.strokeStyle = light;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

field.onclick = function (e) {
  let x = e.offsetX;
  let y = e.offsetY;
  x = Math.floor((x - (Math.floor(x / 10) - 1)) / 10);
  y = Math.floor((y - (Math.floor(y / 10) - 1)) / 10);
  if (gen[y][x] === 0) {
    gen[y][x] = 1;
  } else {
    gen[y][x] = 0;
  }
  drawCell();
};

function createLife() {
  gen = [];
  for (let i = 0; i < rows; i++) {
    gen[i] = [];
    for (let j = 0; j < cols; j++) {
      gen[i][j] = 0;
    }
  }
}

function drawCell() {
  fillRect();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (gen[i][j] === 1) {
        ctx.fillStyle = cell;
        ctx.fillRect(j * cellRes + j, i * cellRes + i, cellRes, cellRes);
      }
    }
  }
}

function updateGen() {
  let nextGen = [];
  for (let i = 0; i < rows; i++) {
    nextGen[i] = [];
    for (let j = 0; j < cols; j++) {
      let neighbors = 0;
      if (gen[cu(i, rows) - 1][j] === 1) neighbors++; // check top
      if (gen[co(i, rows) + 1][j] === 1) neighbors++; // check bottom
      if (gen[i][cu(j, cols) - 1] === 1) neighbors++; // check left
      if (gen[i][co(j, cols) + 1] === 1) neighbors++; // check right
      if (gen[cu(i, rows) - 1][cu(j, cols) - 1] === 1) neighbors++; // check top left
      if (gen[cu(i, rows) - 1][co(j, cols) + 1] === 1) neighbors++; //check top fight
      if (gen[co(i, rows) + 1][cu(j, cols) - 1] === 1) neighbors++; // check bottom left
      if (gen[co(i, rows) + 1][co(j, cols) + 1] === 1) neighbors++; // check bottom right

      if (gen[i][j] === 0) {
        neighbors === 3 ? (nextGen[i][j] = 1) : (nextGen[i][j] = 0);
      } else {
        neighbors === 2 || neighbors === 3
          ? (nextGen[i][j] = 1)
          : (nextGen[i][j] = 0);
      }
    }
  }

  gen = nextGen;
  drawCell();
}

// check under edge
function cu(i, edge) {
  if (i === 0) return edge;
  else return i;
}

// check over edge
function co(i, edge) {
  if (i === edge - 1) return -1;
  else return i;
}

let timer = 0;
let req = null;
function start() {
  timer++;
  if (timer === per) {
    updateGen();
    timer = 0;
  }
  req = requestAnimationFrame(start);
}

function stop() {
  if (req) {
    cancelAnimationFrame(req);
  }
}

const submitBtn = document.querySelector('button');
const startBtn = document.querySelector('.controls__start');
const stopBtn = document.querySelector('.controls__stop');
const clearBtn = document.querySelector('.controls__clear');

function setMeasures() {
  if (inputWidth.value && inputHeight.value) {
    cols = Number(inputWidth.value);
    rows = Number(inputHeight.value);
    field.width = cols * cellRes + cols - 1;
    field.height = rows * cellRes + rows - 1;
    inputWidth.value = '';
    inputHeight.value = '';
    stop();
    fillRect();
    createLife();
  }
}

submitBtn.addEventListener('click', setMeasures);
startBtn.addEventListener('click', startGame);

function startGame() {
  startBtn.classList.remove('btn--active');
  clearBtn.classList.remove('btn--active');
  submitBtn.classList.remove('btn--active');
  stopBtn.classList.add('btn--active');
  startBtn.removeEventListener('click', startGame);
  clearBtn.removeEventListener('click', clearField);
  submitBtn.removeEventListener('click', setMeasures);
  stopBtn.addEventListener('click', stopGame);
  start();
}

function stopGame() {
  stopBtn.classList.remove('btn--active');
  startBtn.classList.add('btn--active');
  clearBtn.classList.add('btn--active');
  submitBtn.classList.add('btn--active');
  stopBtn.removeEventListener('click', stopGame);
  submitBtn.addEventListener('click', setMeasures);
  startBtn.addEventListener('click', startGame);
  clearBtn.addEventListener('click', clearField);
  stop();
}

function clearField() {
  clearBtn.classList.remove('btn--active');
  clearBtn.removeEventListener('click', clearField);
  fillRect();
  createLife();
}
