const field = document.querySelector('.field');
const ctx = field.getContext('2d');

field.width = 500;
field.height = 500;
const cellRes = 10;
let rows = field.height / cellRes;
let cols = field.width / cellRes;
let gen = [];
const per = 5;
fillRect();
createLife();

function fillRect() {
  ctx.clearRect(0, 0, field.width, field.height);
  ctx.fillStyle = '#113447';
  ctx.fillRect(0, 0, field.width, field.height);
}

field.onclick = function (e) {
  let x = e.offsetX;
  let y = e.offsetY;
  x = Math.floor(x / 10);
  y = Math.floor(y / 10);
  if (gen[y][x] === 0) {
    gen[y][x] = 1;
  } else {
    gen[y][x] = 0;
  }
  drawCell();
};

function createLife() {
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
        ctx.fillStyle = '#d8c943';
        ctx.fillRect(j * cellRes, i * cellRes, cellRes, cellRes);
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
  const fieldWidth = document.getElementById('field-width').value;
  const fieldHeight = document.getElementById('field-height').value;
  if (fieldWidth && fieldHeight) {
    field.width = fieldWidth * cellRes;
    field.height = fieldHeight * cellRes;
    rows = fieldHeight;
    cols = fieldWidth;
    document.getElementById('field-width').value = '';
    document.getElementById('field-height').value = '';
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
