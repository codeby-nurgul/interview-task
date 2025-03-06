const grid = document.getElementById("grid");
const popup = document.getElementById("popup");

let selectedCell = null;
let soldCells = new Set();
const totalCells = 1000000;
const cellsPerRow = 1000; 
const cellSize = 20;
const bufferRows = 5; 

function loadSoldCells() {
  fetch("/api/sold-cells")
    .then((response) => response.json())
    .then((data) => {
      soldCells = new Set(data);
      renderGrid();
    })
    .catch((error) => {
      console.error("Hata:", error);
      renderGrid();
    });
}

function renderGrid() {
  const scrollTop = grid.scrollTop;
  const firstVisibleRow = Math.floor(scrollTop / cellSize);
  const lastVisibleRow =
    firstVisibleRow + Math.floor(grid.clientHeight / cellSize) + bufferRows;

  grid.innerHTML = "";

  for (
    let row = firstVisibleRow;
    row <= lastVisibleRow && row < cellsPerRow;
    row++
  ) {
    for (let col = 0; col < cellsPerRow; col++) {
      const index = row * cellsPerRow + col;
      if (index >= totalCells) break;
      createCell(index, row, col);
    }
  }
}

function createCell(index, row, col) {
  const cell = document.createElement("div");
  cell.classList.add("grid-item");
  cell.style.top = `${row * cellSize}px`;
  cell.style.left = `${col * cellSize}px`;

  if (soldCells.has(index)) {
    cell.classList.add("sold");
    cell.addEventListener("click", () => {
        alert("This cell was sold you cannot buy this again");
    })
  } else {
    cell.addEventListener("click", () => handleCellClick(cell, index));
  }

  grid.appendChild(cell);
}

function handleCellClick(cell, index) {
  if (cell.classList.contains("sold")) return;

  selectedCell = cell;
  popup.style.display = "block";
}

function purchaseCell() {
  if (selectedCell) {
    selectedCell.classList.add("sold");
    closePopup();
  }
}

function closePopup() {
  popup.style.display = "none";
  selectedCell = null;
}

grid.addEventListener("scroll", renderGrid);

loadSoldCells();
