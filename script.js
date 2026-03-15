// script.js
let minutes = 0,
  seconds = 0,
  milliseconds = 0;
let timer;
let isRunning = false;

const displayMin = document.getElementById("minutes");
const displaySec = document.getElementById("seconds");
const displayMilisec = document.getElementById("milliseconds");
const lapsList = document.getElementById("lapsList");

// Buttons
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(updateTime, 10);
    toggleButtons(true);
  }
});

pauseBtn.addEventListener("click", () => {
  isRunning = false;
  clearInterval(timer);
  toggleButtons(false);
});

resetBtn.addEventListener("click", () => {
  isRunning = false;
  clearInterval(timer);
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  updateDisplay();
  lapsList.innerHTML = "";
  toggleButtons(false);
});

lapBtn.addEventListener("click", () => {
  const li = document.createElement("li");
  li.innerHTML = `<span>Lap ${lapsList.children.length + 1}</span> 
                    <span>${format(minutes)}:${format(seconds)}:${format(
    milliseconds
  )}</span>`;
  lapsList.prepend(li);
});

function updateTime() {
  milliseconds++;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  updateDisplay();
}

function updateDisplay() {
  displayMin.innerText = format(minutes);
  displaySec.innerText = format(seconds);
  displayMilisec.innerText = format(milliseconds);
}

function format(unit) {
  return unit < 10 ? "0" + unit : unit;
}

function toggleButtons(running) {
  startBtn.disabled = running;
  pauseBtn.disabled = !running;
  lapBtn.disabled = !running;
}
