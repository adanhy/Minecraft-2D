var minedBlocks = {};
var chosenInv = null;

function restartSettings() {
  document.querySelector(`#world-tabel`).innerHTML = ``;

  document.querySelector(`#selblo`).classList = ``;

  if (document.querySelector(`.selectedt`)) {
    document.querySelector(`.selectedt`).classList.remove(`selectedt`);
  }
  minedBlocks = {};
  document.querySelector(`#inv-box`).innerHTML = ``;
}

function startGame() {
  restartSettings();
  let mat = generatGrid(17, 50);
  drawSky(mat, 11, 50);
  drawGround(mat, 11, 50);
  drawClouds(mat);
  drawTrees(mat);
  drawBushes(mat);
  drawRocks(mat);
  setEventListeners();
}

function updateInv() {
  document.querySelector(`#inv-box`).innerHTML = ``;

  Object.entries(minedBlocks).forEach((ent) => {
    let box = document.createElement("div");
    box.style.display = `flex`;
    box.style.flexDirection = `column`;
    box.style.margin = `0 2rem`;

    box.addEventListener(`click`, (e) => {
      if (document.querySelector(`.selecter-inv`)) {
        document
          .querySelector(`.selecter-inv`)
          .classList.remove(`selecter-inv`);
      }
      e.target.classList.add(`selecter-inv`);

      if (document.querySelector(`.selectedt`)) {
        document.querySelector(`.selectedt`).classList.remove(`selectedt`);
      }
      e.target.classList.add(`selecter-inv`);
    });
    const [key, value] = ent;
    if (value != 0) {
      let inv = document.createElement(`div`);
      inv.classList.add(`icon`);

      inv.classList.add(key);
      let lbl = document.createElement("label");
      lbl.textContent = `X${value}`;
      box.appendChild(inv);
      box.appendChild(lbl);
      document.querySelector(`#inv-box`).appendChild(box);
    }
  });
}

function addToInv(item, e) {
  minedBlocks[item] = minedBlocks[item] + 1 || 1;
  e.target.className = `empty block`;
  updateInv();
  console.log(minedBlocks);
}

function setEventListeners() {
  if (document.querySelector(`#start-button`)) {
    document.querySelector(`#start-button`).addEventListener(`click`, () => {
      document.querySelector(`#landing`).remove();
    });
  }

  //restart button
  document
    .querySelector(`#restart-button`)
    .addEventListener(`click`, startGame);

  let allblocks = document.querySelectorAll(`.block`);

  // last selected block
  allblocks.forEach((v) => {
    v.addEventListener(`click`, (e) => {
      document.querySelector(`#selblo`).className = e.target.className;
    });
  });

  allblocks.forEach((v) => {
    v.addEventListener(`click`, (e) => {
      console.log(e.target);

      if (
        document.querySelector(`.selectedt`) === document.querySelector(`.wand`)
      ) {
        e.target.className = `empty block`;
        console.log(`wand used`);
      }
      if (
        document.querySelector(`.selectedt`) === document.querySelector(`.axe`)
      ) {
        console.log(`axe used`);

        if (e.target.classList.contains(`wood`)) {
          addToInv(`wood`, e);
          e.target.className = `empty block`;
        }
        if (e.target.classList.contains(`green`)) {
          addToInv(`green`, e);
        }
      }
      if (
        document.querySelector(`.selectedt`) ===
        document.querySelector(`.pickaxe`)
      ) {
        console.log(`pickaxe used`);

        if (e.target.classList.contains(`rock`)) {
          addToInv(`rock`, e);
        }
      }
      if (
        document.querySelector(`.selectedt`) ===
        document.querySelector(`.shovel`)
      ) {
        console.log(`shovel used`);

        if (e.target.classList.contains(`grass`)) {
          addToInv(`grass`, e);
        }

        if (e.target.classList.contains(`soil`)) {
          addToInv(`soil`, e);
        }
      }

      if (document.querySelector(`.selecter-inv`)) {
        console.log(`trying`);
        console.log(e);
        e.target.className = document.querySelector(`.selecter-inv`).className;
        e.target.classList.remove(`selecter-inv`);

        if (
          document.querySelector(`.selecter-inv`).classList.contains(`grass`)
        ) {
          minedBlocks.grass = minedBlocks.grass - 1;
          updateInv();
        }
        if (
          document.querySelector(`.selecter-inv`).classList.contains(`rock`)
        ) {
          minedBlocks.rock = minedBlocks.rock - 1;
          updateInv();
        }
        if (
          document.querySelector(`.selecter-inv`).classList.contains(`soil`)
        ) {
          minedBlocks.soil = minedBlocks.soil - 1;
          updateInv();
        }
        if (
          document.querySelector(`.selecter-inv`).classList.contains(`green`)
        ) {
          minedBlocks.green = minedBlocks.green - 1;
          updateInv();
        }
        if (
          document.querySelector(`.selecter-inv`).classList.contains(`wood`)
        ) {
          minedBlocks.wood = minedBlocks.wood - 1;
          updateInv();
        }
      }
    });
  });

  let alltools = document.querySelectorAll(`.tool`);
  alltools.forEach((v) => {
    v.addEventListener(`click`, (e) => switchTool(e.target));
  });
}

function switchTool(chosenTool) {
  if (document.querySelector(`.selectedt`)) {
    document.querySelector(`.selectedt`).classList.remove(`selectedt`);
  }
  chosenTool.classList.add(`selectedt`);

  // if (document.querySelector(`.selecter-inv`)) {
  //   document.querySelector(`.selecter-inv`).className = `empty block`;
  // }
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
  drawCloudbyIndex(matrix, 2, 42);
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
  drawTreebyIndex(matrix, 40);
  drawTreebyIndex(matrix, 47);
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
  drawRockByIndex(mat, 44);
  drawRockByIndex(mat, 42);
  drawRockByIndex(mat, 49);
}

startGame();
