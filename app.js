const field = document.querySelector('.field');
const ctx = field.getContext('2d');
const submitBtn = document.querySelector('button');
field.width = 500;
field.height = 500;
const cellRes = 10;
let rows = field.height / cellRes;
let cols = field.width / cellRes;
let gen = [];
const freq = 10;
fillRect();
createLife();

submitBtn.onclick = function () {
  const fieldWidth = document.getElementById('field-width').value;
  const fieldHeight = document.getElementById('field-height').value;
  if (fieldWidth && fieldHeight) {
    field.width = fieldWidth * cellRes;
    field.height = fieldHeight * cellRes;
  }
  rows = fieldHeight;
  cols = fieldWidth;
  fillRect();
  createLife();
};

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
function start() {
  timer++;
  if (timer === freq) {
    updateGen();
    timer = 0;
  }
  requestAnimationFrame(start);
}
