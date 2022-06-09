const field = document.querySelector('.field');
const ctx = field.getContext('2d');
field.width = 500;
field.height = 500;
const cellRes = 10;
let rows = field.height / cellRes;
let cols = field.width / cellRes;
let gen = [];
fillRect();
createLife();

const submitBtn = document.querySelector('button');

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
