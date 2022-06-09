const field = document.querySelector('.field');
const ctx = field.getContext('2d');
field.width = 500;
field.height = 500;
const cellRes = 10;
fillRect();

const submitBtn = document.querySelector('button');

submitBtn.onclick = function () {
  const fieldWidth = document.getElementById('field-width').value;
  const fieldHeight = document.getElementById('field-height').value;
  if (fieldWidth && fieldHeight) {
    field.width = fieldWidth * cellRes;
    field.height = fieldHeight * cellRes;
  }
  fillRect();
};

function fillRect() {
  ctx.clearRect(0, 0, field.width, field.height);
  ctx.fillStyle = '#113447';
  ctx.fillRect(0, 0, field.width, field.height);
}
