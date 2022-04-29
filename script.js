const CellsElements = document.querySelectorAll("[data-cell]");
const boardElement = document.querySelector("[data-board]");
const winningMessage = document.querySelector("[data-winning-message]");
const winningMessageText = document.querySelector(
  "[data-winning-message-text]"
);
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn = false;

const winningombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startgame = () => {
  for (const cell of CellsElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleclick);
    cell.addEventListener("click", handleclick, { once: true }); /// o once serve para ser clicado apenas uma vez 
  }

  isCircleTurn = false;

  boardElement.classList.add("x");
  setBoardhoverClass();
  winningMessage.classList.remove("show-winning-message");
};


/// Função do fim do jogo 
const endgame = (isDraw) => {
  if (isDraw) {
    winningMessageText.innerText = "Empate!";
  } else {
    winningMessageText.innerText = isCircleTurn ? "O Venceu!" : "X Venceu!";
  }

  winningMessage.classList.add("show-winning-message");
};


/// Função que checa a vitória
const checkForWin = (currentPlayer) => {
  return winningombinations.some((combinantion) => {
    return combinantion.every((index) => {
      return CellsElements[index].classList.contains(currentPlayer);
    });
  });
};


/// Função que checa o fim do jogo 
const checkForDraw = () => {
  return [...CellsElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};


/// Função que adiciona a classe x ou circle conforme a vez do jogador 
const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};


// Adicionar a classe no board conforme a vez do simbolo
const setBoardhoverClass = () => {
  boardElement.classList.remove("circle");
  boardElement.classList.remove("x");

  if (isCircleTurn) {
    boardElement.classList.add("circle");
  } else {
    boardElement.classList.add("x");
  }
};


/// Função que troca a vez do jogador 
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;

  setBoardhoverClass();
};

const handleclick = (e) => {
  // Colocar a marca (x ou circulo)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  //Verificar vitória

  const isWin = checkForWin(classToAdd);

  //verificar por empate
  const isDraw = checkForDraw();

  if (isWin) {
    endgame(false);
  } else if (isDraw) {
    endgame(true);
  } else {
    // mudar o simbolo
    swapTurns();
  }
};
startgame();


restartButton.addEventListener("click", startgame);
