// Initialize all the necessary variables
let timerInterval;
let isRunning = false; // For toggling purpose of the start/stop button
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

// Target and cache the three elements on the screen
const display = document.getElementById("stopwatch-display");
const startStopToggleButton = document.getElementById("toggle-button");
const resetButton = document.getElementById("reset-button");

// This function controls the stopwatch display
function updateDisplay() {
  milliseconds++;
  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  const displayedHours = String(hours).padStart(2, "0");
  const displayedMinutes = String(minutes).padStart(2, "0");
  const displayedSeconds = String(seconds).padStart(2, "0");
  const displayedMilliseconds = String(milliseconds).padStart(2, "0");

  display.textContent = `${displayedHours}:${displayedMinutes}:${displayedSeconds}:${displayedMilliseconds}`;
}

// This function controls the start operation of the stopwatch
function startStopwatch() {
  isRunning = true;
  if (!timerInterval) {
    // This prevents multiple intervals from running
    timerInterval = setInterval(updateDisplay, 10); // This updates every 10 milliseconds which in turn updates every other time division through the updateDisplay callback as appropriate.
    startStopToggleButton.textContent = "Stop";
  }
}

// This function controls the stop operation of the stopwatch
function stopStopwatch() {
  isRunning = false;
  clearInterval(timerInterval);
  timerInterval = null; // Reset the interval ID
  startStopToggleButton.textContent = "Start";
}

// This function controls the reset operation of the stopwatch
function resetStopwatch() {
  isRunning = false;
  clearInterval(timerInterval);
  timerInterval = null;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  display.textContent = "00:00:00";
  startStopToggleButton.textContent = "Start";
}

// Event listeners for acting when the Start/Stop and Reset buttons are clicked.
startStopToggleButton.addEventListener("click", () => {
  if (isRunning) {
    stopStopwatch();
  } else {
    startStopwatch();
  }
});

resetButton.addEventListener("click", resetStopwatch);
