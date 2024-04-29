const rowsInput = document.getElementById('inputWidth');
const columnsInput = document.getElementById('inputHeight');
const submitButton = document.querySelector('input[type="submit"]');
const table = document.getElementById('pixelCanvas');

submitButton.addEventListener('click', function(e) {
  e.preventDefault();
  table.innerHTML = '';

  for (let x = 0; x < columnsInput.value; x++) {
    let tr = document.createElement('TR')
    for(let y = 0; y < rowsInput.value; y++) {
      let td = document.createElement('TD')
      td.className = 'square'
      td.style.backgroundColor = '#FFFFFF';
      tr.appendChild(td);
    }

    table.appendChild(tr);
  }
})

table.addEventListener('click', function(e) {
  if (e.target.className === 'square') {
    if (e.target.style.backgroundColor === 'rgb(255, 255, 255)') e.target.style.backgroundColor = '#000000';
    else e.target.style.backgroundColor = '#FFFFFF';
  }
})
