function startGame() {
  let mat = generatGrid(18, 50);
  drawSky(mat, 11, 50);
  drawGround(mat, 11, 50);
  drawClouds(mat);
  drawTrees(mat);
  drawBushes(mat);
  drawRocks(mat);
}

function generatGrid(r, wrldsz) {
  var matrix = Array.from(Array(r), () => new Array(wrldsz));
  var rows = new Array(r);
  for (let y = 0; y < matrix.length; y++) {
    let r = document.createElement(`div`);
    r.classList.add(`row`);
    rows[y] = r;
    document.body.querySelector(`#world-tabel`).appendChild(r);
    for (let x = 0; x < wrldsz; x++) {
      let cell = document.createElement(`div`);
      cell.classList.add(`block`);
      matrix[y][x] = cell;

      //   cell.textContent = `${y},${x}`;
      //   cell.style.fontSize = `10px`;
      //   cell.style.textAlign = `center`;

      r.appendChild(cell);
    }
  }
  return matrix;
}

function drawSky(matrix, skyH, wrldsz) {
  for (let y = 0; y < skyH; y++) {
    for (let x = 0; x < wrldsz; x++) {
      matrix[y][x].classList.add(`empty`);
    }
  }
}

function drawGround(matrix, skyH, wrldsz) {
  for (let x = 0; x < wrldsz; x++) {
    matrix[skyH][x].style.className = `block`;
    // matrix[skyH][x].classList.add(`block`);
    matrix[skyH][x].classList.add(`grass`);
  }

  for (let y = skyH + 1; y < matrix.length; y++) {
    for (let x = 0; x < wrldsz; x++) {
      matrix[y][x].style.className = `block`;
      matrix[y][x].classList.add(`soil`);
    }
  }
}

function drawCloudbyIndex(mat, y, x) {
  if (mat[y][x]) {
    mat[y][x].className = `block cloud`;
  }
  if (mat[y][x + 1]) {
    mat[y][x + 1].className = `block cloud`;
  }
  if (mat[y][x + 2]) {
    mat[y][x + 2].className = `block cloud`;
  }
  if (mat[y][x - 1]) {
    mat[y][x - 1].className = `block cloud`;
  }
  if (mat[y][x - 2]) {
    mat[y][x - 2].className = `block cloud`;
  }
  if (mat[y - 1][x]) {
    mat[y - 1][x].className = `block cloud`;
  }
  if (mat[y - 1][x + 1]) {
    mat[y - 1][x + 1].className = `block cloud`;
  }
  if (mat[y - 1][x - 1]) {
    mat[y - 1][x - 1].className = `block cloud`;
  }
}

function drawClouds(matrix) {
  drawCloudbyIndex(matrix, 2, 5);
  drawCloudbyIndex(matrix, 3, 15);
  drawCloudbyIndex(matrix, 7, 33);
  drawCloudbyIndex(matrix, 3, 27);
}

function drawTreebyIndex(mat, x) {
  if (mat[10][x]) mat[10][x].className = `block wood`;
  if (mat[9][x]) mat[9][x].className = `block wood`;
  if (mat[8][x]) mat[8][x].className = `block wood`;
  if (mat[7][x]) mat[7][x].className = `block green`;
  if (mat[7][x - 1]) mat[7][x - 1].className = `block green`;
  if (mat[7][x + 1]) mat[7][x + 1].className = `block green`;
  if (mat[6][x + 1]) mat[6][x + 1].className = `block green`;
  if (mat[6][x - 1]) mat[6][x - 1].className = `block green`;
  if (mat[6][x]) mat[6][x].className = `block green`;
  if (mat[5][x + 1]) mat[5][x + 1].className = `block green`;
  if (mat[5][x - 1]) mat[5][x - 1].className = `block green`;
  if (mat[5][x]) mat[5][x].className = `block green`;
}

function drawTrees(matrix) {
  drawTreebyIndex(matrix, 5);
  drawTreebyIndex(matrix, 13);
  drawTreebyIndex(matrix, 27);
}

function drawBushByIndex(mat, x) {
  if (mat[10][x]) mat[10][x].className = `block green`;
  if (mat[10][x + 1]) mat[10][x + 1].className = `block green`;
  if (mat[10][x - 1]) mat[10][x - 1].className = `block green`;
  if (mat[9][x]) mat[9][x].className = `block green`;
}

function drawBushes(mat) {
  drawBushByIndex(mat, 2);
  drawBushByIndex(mat, 16);
  drawBushByIndex(mat, 22);
  drawBushByIndex(mat, 35);
}

function drawRockByIndex(mat, x) {
  if (mat[10][x]) mat[10][x].className = `block rock`;
}

function drawRocks(mat) {
  drawRockByIndex(mat, 8);
  drawRockByIndex(mat, 11);
  drawRockByIndex(mat, 25);
  drawRockByIndex(mat, 32);
}

startGame();
