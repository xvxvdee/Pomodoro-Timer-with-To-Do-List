const TIMER = document.querySelector("#clock p");
const TIMERBAR = document.querySelector("#clockBar p");
const SESSIONS = document.querySelector("#sessions");
const SHORTBREAK = document.querySelector("#shortBreak");
const LONGBREAK = document.querySelector("#longBreak");

const UPDATE_SESSIONS = document.querySelector(
  ".InformationUpdateContainer  #numOfSessionsUpdate"
);
const UPDATE_SHORTBREAK = document.querySelector(
  ".InformationUpdateContainer #shortBreakLengthUpdate"
);
const UPDATE_LONGBREAK = document.querySelector(
  ".InformationUpdateContainer #longBreakLengthUpdate"
);
// const STARTARTICLE = document.querySelector("#startContainer");

//BUTTONS
const TUNING = document.querySelector(".buttons #updateInfo");
const START = document.querySelector(".buttons #start");

const PLAY = document.querySelector(".buttons #play");
const PAUSE = document.querySelector(".buttons #pause");
const RESET = document.querySelector(".buttons #reset");

let study_startingMinute, setupStudy;

var studyInterval, breakInterval;
let startClock = false;
let setupGo = true;

let breakClockStart = false;
let studyClockStart = true;
let setupBreak;

let goTime;

if (!startClock) {
  disableStartButton();
  disableTimerButtons();
}

// function checkInputValid
TUNING.addEventListener("click", function () {
  if (setupGo) {
    let ses = SESSIONS.value;
    let breakOne = SHORTBREAK.value;
    let breakTwo = LONGBREAK.value;

    if (ses > 0 && ses < 11) {
      SESSIONS.style.borderColor = "green";
    } else {
      SESSIONS.style.borderColor = "red";
    }

    if (breakOne >= 2 && breakOne <= 5) {
      SHORTBREAK.style.borderColor = "green";
    } else {
      SHORTBREAK.style.borderColor = "red";
    }

    if (breakTwo >= 15 && breakTwo <= 30) {
      LONGBREAK.style.borderColor = "green";
    } else {
      LONGBREAK.style.borderColor = "red";
    }

    if (
      SESSIONS.style.borderColor == "green" &&
      SHORTBREAK.style.borderColor == "green" &&
      LONGBREAK.style.borderColor == "green"
    ) {
      startClock = true;

      disableInputText();
      UPDATE_SESSIONS.innerHTML = ses;
      UPDATE_SHORTBREAK.innerHTML = breakOne;
      UPDATE_LONGBREAK.innerHTML = breakTwo;

      disableTuning();
      enableStartButton();
    } else {
      startClock = false;
    }
  } else {
    return;
  }
});


function studyTime() {
  timeBarStudyTime();
  if (
    TIMER.innerHTML == "00:00" &&
    UPDATE_SESSIONS.innerText != "0" &&
    UPDATE_SESSIONS.innerText != "-"
  ) {
    UPDATE_SESSIONS.innerHTML -= 1;
    clearInterval(studyInterval);
    TIMER.innerHTML = "--:--";
    breakClockStart = true;
    studyInterval = false;
    console.log("FINSIHED STUDY");
    goTime = pomodoro();
    return;
  } else {
    let min = Math.floor(setupStudy / 60);
    let sec = setupStudy % 60;

    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    console.log(min + ":" + sec);

    TIMER.innerHTML = min + ":" + sec;
    setupStudy--;
  }
}

function selectBreakTime() {
  if (SESSIONS.value % 5 == 0) {
    console.log("Break time divisible by 5");
    return UPDATE_LONGBREAK.innerText;
  } else {
    console.log("Break time NOT divisible by 5");
    return UPDATE_SHORTBREAK.innerText;
  }
}

function pomodoro() {
  if (UPDATE_SESSIONS.innerText == "0") {
    alert("Congrats!");
    completePomodoro();
    return;
  } else {
    TIMER.innerHTML = "--:--";
    if (breakClockStart) {
      let break_startingMinute = selectBreakTime();
      setupBreak = break_startingMinute * 60;

      console.log(setupBreak);
      console.log("Break time");

      breakInterval = setInterval(breakTime, 1000);
    } else if (studyClockStart) {
      study_startingMinute = 25;
      setupStudy = study_startingMinute * 60;
      studyInterval = setInterval(studyTime, 1000);
      console.log("Study time");
    }
  }
}

function breakTime() {
  timeBarBreakTime();
  if (
    TIMER.innerHTML == "00:00" &&
    UPDATE_SESSIONS.innerText != "0" &&
    UPDATE_SESSIONS.innerText != "-"
  ) {
    clearInterval(breakInterval);
    TIMER.innerHTML = "--:--";
    breakClockStart = false;
    studyInterval = true;
    goTime = pomodoro();
    return;
  } else {
    let min = Math.floor(setupBreak / 60);
    let sec = setupBreak % 60;

    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    console.log(min + ":" + sec);
    TIMER.innerHTML = min + ":" + sec;
    setupBreak--;
  }
}

//Disable and Enabling
function disableStartButton() {
  START.disabled = true;
  START.style.opacity = "0.5";
}

function enableStartButton() {
  START.removeAttribute("disabled");
  START.style.opacity = "1";
}

function disableTimerButtons() {
  PLAY.disabled = true;
  PLAY.style.opacity = "0.5";
  PLAY.style.boxShadow = "0 0 0";

  PAUSE.disabled = true;
  PAUSE.style.opacity = "0.5";
  PAUSE.style.boxShadow = "0 0 0";

  RESET.disabled = true;
  RESET.style.opacity = "0.5";
  RESET.style.boxShadow = "0 0 0";
}

function enableTimerButtons() {
  PLAY.removeAttribute("disabled");
  PLAY.style.opacity = "1";

  PAUSE.removeAttribute("disabled");
  PAUSE.style.opacity = "1";

  RESET.removeAttribute("disabled");
  RESET.style.opacity = "1";
}

function enableTuning() {
  TUNING.removeAttribute("disabled");
  TUNING.style.opacity = "1";
}

function disableTuning() {
  TUNING.setAttribute("disabled", "disabled");
  TUNING.style.opacity = "0.5";
}

function enableInputText() {
  SESSIONS.removeAttribute("disabled");
  SESSIONS.style.borderColor = "#dda15e";
  SESSIONS.value = "";
  SHORTBREAK.removeAttribute("disabled");
  SHORTBREAK.style.borderColor = "#dda15e";
  SHORTBREAK.value = "";
  LONGBREAK.removeAttribute("disabled");
  LONGBREAK.style.borderColor = "#dda15e";
  LONGBREAK.value = "";
}

function disableInputText() {
  SESSIONS.disabled = true;
  SHORTBREAK.disabled = true;
  LONGBREAK.disabled = true;
}

//Time Bar
function timeBarStudyTime() {
  TIMERBAR.style.backgroundColor = "green";
  TIMERBAR.innerHTML = " S T U D Y &nbspT I M E";
}

function timeBarBreakTime() {
  TIMERBAR.style.backgroundColor = "red";
  TIMERBAR.innerHTML = " B R E A K &nbspT I M E";
}

//End of cycle and Reset
function completePomodoro() {
  TIMER.innerHTML = "--:--";

  startClock = false;
  disableStartButton();
  disableTimerButtons();

  enableInputText();
  enableTuning();

  setupGo = true;
  breakClockStart = false;
  studyClockStart = true;
  goTime = 0;

  clearInterval(studyInterval);
  clearInterval(breakClockStart);

  UPDATE_SESSIONS.innerHTML = "-";
  UPDATE_LONGBREAK.innerHTML = "-";
  UPDATE_SHORTBREAK.innerHTML = "-";

  enableInputText();

  TIMERBAR.innerHTML = "-";
  TIMERBAR.style.backgroundColor = "#dda15e";
  document.getElementById("startContainer").style.transition="0.6s background-color";
  document.getElementById("startContainer").style.backgroundColor="#1f2232";

}


// Event Listeners
PLAY.addEventListener("click", function () {
  if (breakClockStart) {
    clearInterval(breakInterval);
    breakInterval = setInterval(breakTime, 1000);
  } else if (studyClockStart) {
    clearInterval(studyInterval);
    studyInterval = setInterval(studyTime, 1000);
  }
});

PAUSE.addEventListener("click", function () {
  if (breakClockStart) {
    clearInterval(breakInterval);
  } else if (studyClockStart) {
    clearInterval(studyInterval);
  }
});

RESET.addEventListener("click", function () {
  completePomodoro();
});

START.addEventListener("click", function () {
  TIMER.innerHTML = "--:--";
  setupGo = false;
  TUNING.style.opacity = "0.5";
  TUNING.style.boxShadow = "0 0 0";
  if (startClock) {
    if (TUNING.hasAttribute("disabled") && !START.hasAttribute("disabled")) {
      enableTimerButtons();
      disableStartButton();

      console.log("Start pomodoro!");
      document.getElementById("startContainer").style.transition="0.6s background-color";
      document.getElementById("startContainer").style.backgroundColor="antiquewhite";


      TIMERBAR.style.backgroundColor = "green";
      TIMERBAR.innerHTML = " S T U D Y &nbspT I M E";
      goTime = pomodoro();
    }
  }
});
