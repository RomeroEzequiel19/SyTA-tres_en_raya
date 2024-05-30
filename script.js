document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusDisplay = document.getElementById("status");
  let gameActive = true;
  let currentPlayer = "X";
  const boardState = Array(9).fill("");

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      statusDisplay.innerHTML = `Jugador ${currentPlayer} ha ganado!`;
      gameActive = false;
      return;
    }
    if (!boardState.includes("")) {
      statusDisplay.innerHTML = "Empate!";
      gameActive = false;
      return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "O") {
      makeComputerMove();
    }
  };

  const makeMove = (index) => {
    if (boardState[index] === "" && gameActive) {
      boardState[index] = currentPlayer;
      cells[index].innerHTML = currentPlayer;
      checkWin();
    }
  };

  const makeComputerMove = () => {
    // Aquí se implementaría la lógica para que la computadora haga una jugada, por ahora se elige una celda aleatoria
    const availableCells = boardState
      .map((cell, index) => (cell === "" ? index : null))
      .filter((index) => index !== null);
    const randomCell =
      availableCells[Math.floor(Math.random() * availableCells.length)];
    makeMove(randomCell);
  };

  cells.forEach((cell) =>
    cell.addEventListener("click", () => {
      if (gameActive && currentPlayer === "X") {
        const index = cell.getAttribute("data-index");
        makeMove(index);
      }
    })
  );
});
