let gameSequence = [];
let userSequence = [];

let btns = ["yellow", "red", "green", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;
    levelUp();
  }
});
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 200);
}

function levelUp() {
  userSequence = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randbtn = document.querySelector(`.${randColor}`);
  gameSequence.push(randColor);
  console.log(gameSequence);
  gameFlash(randbtn);
}

function checkAnswer() {
  let idx = userSequence.length - 1;

  if (userSequence[idx] === gameSequence[idx]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(function () {
        userSequence = []; // 🔴 important reset
        levelUp();
      }, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! your score was <b>${level}</b>. Press any key to Restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "";
    }, 200);
    restartGame();
  }
}

function btnPress() {
  console.log(this);
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSequence.push(userColor);

  checkAnswer(userSequence.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function restartGame() {
  started = false;
  gameSequence = [];
  userSequence = [];
  level = 0;
}
