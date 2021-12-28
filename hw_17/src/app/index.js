var boardWidth = 5;
var boardHeight = 5;
var bombsNumber = 10;
var fields = [];
var myBombs = [];
const messageFail = document.querySelector(".message");
const button = document.querySelector(".restart");
const root = document.getElementById("root");

const field = root.querySelector(".field");
const messageWin = document.querySelector(".message--success");

function rand(num) {
  return Math.floor(Math.random() * num);
}

function removeEvents() {
  for (var n in fields) {
    document
      .getElementById(fields[n].x + "x" + fields[n].y)
      .removeEventListener("click", revealField, true);
    if (fields[n].hasBomb == true) {
      document.getElementById(fields[n].x + "x" + fields[n].y).innerHTML =
        "<a>💣</a>";

      document
        .getElementById(fields[n].x + "x" + fields[n].y)
        .setAttribute("hasBomb", 1);
    }
  }
}

function countUndiscovered() {
  var undiscoveredCount = 0;

  for (var n in fields) {
    if (fields[n].hasBeenDiscovered == false) {
      undiscoveredCount++;
      console.log(bombsNumber);
    }
  }
  return undiscoveredCount;
}

function validateVictory() {
  if (countUndiscovered() == bombsNumber) {
    return true;
  } else {
    return false;
  }
}

function getFieldId(a, b) {
  for (var n in fields) {
    if (a == fields[n].x && b == fields[n].y) {
      return n;
    }
  }
}

function generateBoard() {
  var table = document.getElementById("table");

  var domRow, domColumn;

  table.style.border = "1px solid black";
  table.style.borderCollapse = "collapse";

  for (var i = 0; i < boardWidth; i++) {
    domRow = document.createElement("tr");

    for (var j = 0; j < boardHeight; j++) {
      domColumn = document.createElement("td");
      domRow.appendChild(domColumn);

      domColumn.style.border = "1px solid black";
      domColumn.style.width = "30px";
      domColumn.style.height = "30px";

      domColumn.setAttribute("x", i);
      domColumn.setAttribute("y", j);
      domColumn.id = i + "x" + j;
      domColumn.style.fontSize = "20px";
      domColumn.style.textAlign = "center";
      domColumn.style.backgroundColor = "lightgray";

      domColumn.addEventListener("click", revealField, true);

      fields.push({
        x: i,
        y: j,
        hasBomb: false,
        hasBeenDiscovered: false,
      });
    }

    table.appendChild(domRow);
  }
}

function generateBombs(bombsNumber) {
  var x, y;

  function validateBombPlacement(a, b) {
    for (var n in myBombs) {
      if (a == myBombs[n].x && b == myBombs[n].y) {
        const div = document.getElementById("text");

        const bombs = div.firstElementChild;

        bombs.innerHTML = `Bombs: ${bombsNumber}`;
        return false;
      }
    }
    return true;
  }

  function placeBomb() {
    x = rand(boardWidth);
    y = rand(boardHeight);

    if (validateBombPlacement(x, y) == false) {
      placeBomb();
    } else {
      myBombs.push({
        x: x,
        y: y,
        hasBomb: true,
        hasBeenDiscovered: false,
      });
      fields[getFieldId(x, y)].hasBomb = true;
    }
  }

  for (var i = 0; i < bombsNumber; i++) {
    placeBomb();
  }
}

function revealField() {
  var x = this.getAttribute("x");
  var y = this.getAttribute("y");
  x = parseInt(x, 10);
  y = parseInt(y, 10);

  var fieldId = getFieldId(x, y);

  if (fields[fieldId].hasBomb == true) {
    document.getElementById(x + "x" + y).innerHTML = "<a>💣</a>";

    this.setAttribute("hasBomb", 1);
    removeEvents();
    root.hidden = false;

    button.hidden = false;
    messageFail.classList.add("message--failed");
    messageFail.hidden = false;
  } else {
    this.innerHTML = "<a>✅</a>";
    this.setAttribute("discovered", 1);
    if (validateVictory() == true) {
      removeEvents();
      alert("Brawo! Odkryłeś wszystkie bomby!");
    }
  }
}

generateBoard();
generateBombs(bombsNumber);
