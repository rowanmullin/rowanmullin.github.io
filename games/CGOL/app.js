const rowsInput = document.getElementById('inputWidth');
const columnsInput = document.getElementById('inputHeight');
const submitButton = document.querySelector('input[type="submit"]');
const table = document.getElementById('pixelCanvas');

const ab = document.querySelector('input.actionButton');

let t = [];
let inPlay;
let columns;
let rows;

function play() {
  updateGrid();
  inPlay = setInterval(updateGrid, 500);
}

function pause() {
  clearInterval(inPlay);
  inPlay = null;
}

function flipSquare(nodeId) {
  t[nodeId] = !t[nodeId];
  const square = document.querySelector(`td[data-id="${nodeId}"]`);
  square.dataset.Alive == "0" ? square.style.backgroundColor = '#000000' :square.style.backgroundColor = '#FFFFFF'
  square.dataset.Alive = !parseInt(square.dataset.Alive)
}

function getFilledNeighbours(i, squares2) {
  let fn = 0;

  // top left
  if (squares2[i-rows-1] == 1) fn++;
  // top
  if (squares2[i - rows] == 1) fn++;
  // top right
  if (squares2[i - rows+1] == 1) fn++;
  // left
  if (squares2[i - 1] == 1) fn++;
  // right
  if (squares2[i + 1] == 1) fn++;
  // bot left
  if (squares2[i + rows - 1] == 1) fn++;
  // bot
  if (squares2[i + rows] == 1) fn++;
  // bot right
  if (squares2[i + rows + 1] == 1) fn++;

  return fn;
}

function updateGrid() {
  let t2 = [...t];

  for (let i=0;i<t.length;i++) {
    let fn = getFilledNeighbours(i, t2);

    let case1 = t2[i];
    let case2 = fn == 2;
    let case3 = fn == 3;

    if ((case1 && !(case2 || case3)) || (!case1 && case3)) flipSquare(i);
  }
}


ab.addEventListener('click', function(e) {
  e.preventDefault();
  if (inPlay) {
    e.target.value = "Start!";
    pause();
  } else {
    e.target.value = "Stop!";
    play();
  }
})

submitButton.addEventListener('click', function(e) {
  e.preventDefault();
  table.innerHTML = '';
  let i = 1;
  rows = parseInt(rowsInput.value)
  columns = parseInt(columnsInput.value)

  for (let x = 0; x < columnsInput.value; x++) {
    let tr = document.createElement('TR')
    for(let y = 0; y < rowsInput.value; y++) {
      let td = document.createElement('TD')
      td.className = 'square'
      td.style.backgroundColor = '#FFFFFF';
      td.dataset.id = i++;
      td.dataset.Alive = 0;
      tr.appendChild(td);
      t.push(0)
    }

    table.appendChild(tr);
  }
})

table.addEventListener('click', function(e) {
  if (e.target.className === 'square') flipSquare(e.target.dataset.id);
})
