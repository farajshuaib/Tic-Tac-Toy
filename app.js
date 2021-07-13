const X_CLASS = "cell-x";
const O_CLASS = "cell-o";

const cellElements = document.querySelectorAll("[data-cell]");
const Wining_Message = document.querySelector("[data-wining-message]");
const restart_button = document.getElementById("restart-btn");
const Modal_Overlay = document.querySelector(".wining-message");

const WINING_COMPINATION = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // coulmns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

let O_turn;

startGame();

function startGame() {
  console.log("game's start...");
  Modal_Overlay.style.display = "none";
  O_turn = false;
  cellElements.forEach((element) => {
    element.classList.remove(X_CLASS);
    element.classList.remove(O_CLASS);
    element.innerHTML = ""
    element.removeEventListener("click", handleClick);
    element.addEventListener("click", handleClick, { once: true });
  });
}

function handleClick(e) {
  const xIcon = document.createElement("img");
  xIcon.src = "/x.svg";
  const oIcon = document.createElement("img");
  oIcon.src = "/o.svg";

  const cell = e.target;
  const currentMarker = O_turn
    ? { CLASS: O_CLASS, Icon: oIcon }
    : { CLASS: X_CLASS, Icon: xIcon };
  // firsable chacking the marker ...
  placemark(cell, currentMarker);
  // check for win
  if (checkWin(currentMarker)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  }
  // switch turns
  switchTurns();
}

function placemark(cell, currentMarker) {
  cell.classList.add(currentMarker.CLASS);
  cell.appendChild(currentMarker.Icon);
}

function switchTurns() {
  O_turn = !O_turn;
}

function checkWin(currentMarker) {
  return WINING_COMPINATION.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentMarker.CLASS);
    });
  });
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}

function endGame(draw) {
  Modal_Overlay.style.display = "flex";
  if (draw) {
    Wining_Message.innerText = "Draw !";
  } else {
    Wining_Message.innerText = O_turn ? "O's Wins!" : " X's Wins!";
  }
}

restart_button.addEventListener("click", startGame);
