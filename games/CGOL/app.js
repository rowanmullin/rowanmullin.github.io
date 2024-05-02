const rowsInput = document.getElementById('inputWidth');
const columnsInput = document.getElementById('inputHeight');
const submitButton = document.querySelector('input[type="submit"]');
const speedInput = document.querySelector('#inputSpeed');
const table = document.getElementById('pixelCanvas');
const ab = document.querySelector('input.actionButton');

let t = [];
let inPlay;
let columns;
let rows;
let speed = 0.5;

function play(s) {
  updateGrid();
  inPlay = setInterval(updateGrid, s*1000);
}

function pause() {
  clearInterval(inPlay);
  inPlay = null;
}

function flipSquare(node) {
  node.dataset.alive = !(node.dataset.alive === "true")
}

function getFilledNeighbours(i, squares) {
  let fn = 0;

  let lCase = (i % columns > 0);
  let rCase = (i % columns < columns - 1);

  // top left
  if (squares[i - columns - 1] && lCase) fn++;
  // top
  if (squares[i - columns]) fn++;
  // top right
  if (squares[i - columns + 1] && rCase) fn++;
  // left
  if (squares[i - 1] && lCase) fn++;
  // right
  if (squares[i + 1] && rCase) fn++;
  // bot left
  if (squares[i + columns - 1] && lCase) fn++;
  // bot
  if (squares[i + columns]) fn++;
  // bot right
  if (squares[i + columns + 1] && rCase) fn++;

  return fn;
}

function updateGrid() {
  let t2 = t.map( e => e.dataset.alive === "true");

  for (let i=0;i<t.length;i++) {
    let fn = getFilledNeighbours(i, t2);

    let case1 = t2[i];
    let case2 = fn == 2;
    let case3 = fn == 3;

    if ((case1 && !(case2 || case3)) || (!case1 && case3)) flipSquare(t[i]);
  }
}


ab.addEventListener('click', function(e) {
  e.preventDefault();
  updateGrid();
  if (inPlay) {
    e.target.value = "Play!";
    pause();
  } else {
    e.target.value = "Stop!";
    play(speed);
  }
})

submitButton.addEventListener('click', function(e) {
  e.preventDefault();
  table.innerHTML = '';
  let i = 1;
  rows = parseInt(rowsInput.value)
  columns = parseInt(columnsInput.value)

  for (let x = 0; x < columns; x++) {
    let tr = document.createElement('TR')
    for(let y = 0; y < rows; y++) {
      let td = document.createElement('TD')
      td.className = 'square'
      td.dataset.id = i++;
      td.dataset.alive = false;
      tr.appendChild(td);
      t.push(td)
    }

    table.appendChild(tr);
  }
})

table.addEventListener('click', function(e) {
  if (e.target.className === 'square') flipSquare(e.target);
})

speedInput.addEventListener('input', function(e) {
  if (inPlay) {
    pause();
    play(speed);
  }
})