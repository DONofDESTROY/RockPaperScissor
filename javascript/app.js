// Some global variables
// const preventSpam = false
const image = document.querySelectorAll(".user-choice img");
const playAgain = document.querySelector("#score .replay");
const resetScore = document.querySelector("#score .reset");
let userChoice = " ";
let computerChoice = " ";
let tieScore = 0;
let computerScore = 0;
let userScore = 0;

function eventListener() {
  image[0].addEventListener("click", rock);
  image[1].addEventListener("click", paper);
  image[2].addEventListener("click", scissor);
  playAgain.addEventListener("click", replay);
  resetScore.addEventListener("click", clearStorage);
  document.addEventListener("DOMContentLoaded", getScore);
}

main();

function main() {
  // Add Listener
  eventListener();
}

function rock(e) {
  userChoice = "rock";
  e.preventDefault();
  displayUserChoice(userChoice);
  removeInput();
}

function paper(e) {
  userChoice = "paper";
  e.preventDefault();
  displayUserChoice(userChoice);
  removeInput();
}

function scissor(e) {
  userChoice = "scissor";
  e.preventDefault();
  displayUserChoice(userChoice);
  removeInput();
}

function displayUserChoice(choice) {
  const userImage = document.createElement("img");
  const imgFrame = document.querySelector("#playground #user .choice");

  if (!imgFrame.classList.contains("assigned")) {
    userImage.src = `../images/${choice}.png`;
    userImage.className = "userPick";
    imgFrame.appendChild(userImage);

    imgFrame.classList.add("assigned");
  } else {
    alert("already assigned");
  }
  generateComputer();
}

function generateComputer() {
  const randomValue = Math.floor(Math.random() * 3);
  const computerImage = document.createElement("img");
  const imgFrame = document.querySelector("#playground #computer .choice");

  if (!imgFrame.classList.contains("assigned")) {
    switch (randomValue) {
      case 0:
        computerChoice = "rock";
        break;
      case 1:
        computerChoice = "paper";
        break;
      case 2:
        computerChoice = "scissor";
        break;
    }
    computerImage.src = `../images/${computerChoice}.png`;
    computerImage.className = "computerPick";

    imgFrame.appendChild(computerImage);
    imgFrame.classList.add("assigned");
    checkWinner();
  }
}

function checkWinner() {
  if (userChoice === "rock") {
    if (computerChoice === "rock") {
      tie();
    } else if (computerChoice === "paper") {
      computerWins();
    } else {
      userWins();
    }
  } else if (userChoice === "paper") {
    if (computerChoice === "paper") {
      tie();
    } else if (computerChoice === "scissor") {
      computerWins();
    } else {
      userWins();
    }
  } else if (userChoice === "scissor") {
    if (computerChoice === "scissor") {
      tie();
    } else if (computerChoice === "rock") {
      computerWins();
    } else {
      userWins();
    }
  }
}

function userWins() {
  userScore += 1;
  assignStorage("user", userScore);
  const score = document.querySelector("#score #your .value");
  score.innerHTML = String(userScore);
}

function computerWins() {
  computerScore += 1;
  assignStorage("computer", computerScore);
  const score = document.querySelector("#score #computer .value");
  score.innerHTML = String(computerScore);
}

function tie() {
  tieScore += 1;
  assignStorage("tie", tieScore);
  const score = document.querySelector("#score #tie .value");
  score.innerHTML = String(tieScore);
}

function replay() {
  const userImgFrame = document.querySelector("#playground #user .choice");
  const userImg = document.querySelector(".userPick");
  const computerImgFrame = document.querySelector(
    "#playground #computer .choice"
  );

  const computerImg = document.querySelector(".computerPick");
  userImgFrame.removeChild(userImg);
  computerImgFrame.removeChild(computerImg);
  userImgFrame.classList.remove("assigned");
  computerImgFrame.classList.remove("assigned");
  showInput();
}

function removeInput() {
  const input = document.querySelector("#input");
  input.style.display = "none";
}

function showInput() {
  const input = document.querySelector("#input");
  input.style.display = "block";
}

function assignStorage(what, score) {
  localStorage.setItem(`${what}`, JSON.stringify(score));
}

function getScore() {
  getFromLocalStorage("computer");
  getFromLocalStorage("tie");
  getFromLocalStorage("user");

  setFromLocalStorage("computer");
  setFromLocalStorage("tie");
  setFromLocalStorage("user");
}

function getFromLocalStorage(what) {
  if (localStorage.getItem(`${what}`) === null) {
    localStorage.setItem(`${what}`, JSON.stringify(0));
  }
}

function setFromLocalStorage(what) {
  const score = document.querySelector(`#score #${what} .value`);
  score.innerHTML = localStorage.getItem(`${what}`);
}

function clearStorage() {
  localStorage.clear();
  getScore();
}
