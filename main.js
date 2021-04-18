var studyButton = document.getElementById('studyButton');
var meditateButton = document.getElementById('meditateButton');
var exerciseButton = document.getElementById('exerciseButton');
var startActivityButton = document.getElementById('startActivityBtn');
var studyIcon = document.getElementById('studyIcon');
var meditateIcon = document.getElementById('meditateIcon');
var exerciseIcon = document.getElementById('exerciseIcon');
var minuteInput = document.getElementById('minuteField');
var secondInput = document.getElementById('secondField');
var descriptionInput = document.getElementById('descriptionField');
var descWarning = document.getElementById('descWarning');
var minWarning = document.getElementById('minWarning');
var secWarning = document.getElementById('secWarning');
var btnWarning = document.getElementById('btnWarning');
var mainView = document.getElementById('mainView');
var timerView = document.getElementById('timerView');
var timerDesc = document.getElementById('description');
var timerMin = document.getElementById('clockMinutes');
var timerSec = document.getElementById('clockSeconds');
var startTimerButton = document.getElementById('startTimerBtn');
var activityTitle = document.getElementById('activityTitle');
var logActivityBtn = document.getElementById('logActivityBtn');
var activityCards = document.getElementById('activityCards'); //may be able to delete this one
var noCards = document.getElementById('noCards');
var showCards = document.getElementById('showCards');
var cardContent = document.getElementById('cardContent');
var categoryLine = document.getElementById('line');
var newActivityButton = document.getElementById('createActivityBtn');

var currentActivity = new Activity();
var pastActivities = [];
var totalSeconds;
var timerId;

studyButton.addEventListener('click', changeStudyButton);
meditateButton.addEventListener('click', changeMeditateButton);
exerciseButton.addEventListener('click', changeExerciseButton);
startActivityButton.addEventListener('click', checkInput);
minuteInput.addEventListener('keydown', preventInvalidEntry);
secondInput.addEventListener('keydown', preventInvalidEntry);
startTimerButton.addEventListener('click', function() {
  currentActivity.startTimer();
  startTimerButton.disabled = true;
});
logActivityBtn.addEventListener('click', addCard);
newActivityButton.addEventListener('click',newActivityView);


function changeStudyButton() {
  studyButton.classList.add('study-active');
  studyIcon.src='./assets/study-active.svg';
  meditateButton.classList.remove('meditate-active');
  meditateIcon.src='./assets/meditate.svg';
  exerciseButton.classList.remove('exercise-active');
  exerciseIcon.src='./assets/exercise.svg';
}

function changeMeditateButton() {
  meditateButton.classList.add('meditate-active');
  meditateIcon.src='./assets/meditate-active.svg';
  exerciseButton.classList.remove('exercise-active');
  exerciseIcon.src='./assets/exercise.svg';
  studyButton.classList.remove('study-active');
  studyIcon.src='./assets/study.svg';
}

function changeExerciseButton() {
  exerciseButton.classList.add('exercise-active');
  exerciseIcon.src='./assets/exercise-active.svg';
  meditateButton.classList.remove('meditate-active');
  meditateIcon.src='./assets/meditate.svg';
  studyButton.classList.remove('study-active');
  studyIcon.src='./assets/study.svg';
}

function preventInvalidEntry(event) {
  var invalidChars = ['-', '+', 'e'];
  if (invalidChars.includes(event.key)) {
    event.preventDefault();
  }
}

function checkInput() {
  if (!descriptionInput.value) {
    show(descWarning);
  }
  if (!minuteInput.value) {
    show(minWarning);
  }
  if (!secondInput.value) {
    show(secWarning);
  }
  if (!studyIcon.value || !meditateIcon.value || !exerciseIcon.value) {
    show(btnWarning);
  }

  var activeButton = studyButton.classList.contains('study-active') || meditateButton.classList.contains('meditate-active') || exerciseButton.classList.contains('exercise-active');

  if (descriptionInput.value && minuteInput.value && secondInput.value && activeButton) {
    createActivity();
    show(timerView);
    hide(mainView);
  }
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

function createActivity() {
  var activity;
  if (studyButton.classList.contains('study-active')) {
    activity = studyButton.value;
  } else if (meditateButton.classList.contains('meditate-active')) {
    activity = meditateButton.value;
  } else {
    activity = exerciseButton.value;
  }
  var description = descriptionInput.value;
  var minutes = minuteInput.value;
  var seconds = secondInput.value;
  currentActivity = new Activity(activity, description, minutes, seconds);
  totalSeconds = (parseInt(minuteInput.value) * 60) + parseInt(secondInput.value);
  displayUserInput();
}

function displayUserInput() {
  activityTitle.innerText = 'Current Activity';
  timerDesc.innerText = currentActivity.description;
  timerMin.innerText = currentActivity.minutes;
  timerSec.innerText = currentActivity.seconds < 10 ? '0' + currentActivity.seconds : currentActivity.seconds;
  if (currentActivity.category === 'study') {
    startTimerButton.classList.add('study-timer');
  } else if (currentActivity.category === 'meditate') {
    startTimerButton.classList.add('meditate-timer');
  } else {
    startTimerButton.classList.add('exercise-timer');
  }
}

function updateCountdown() {
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;
  timerMin.innerHTML = minutes;
  timerSec.innerHTML = seconds;
  totalSeconds--;


  if (seconds === "00" && minutes === 0) {
    clearInterval(timerId);
    startTimerBtn.innerText = "NAILED IT!";
    show(logActivityBtn);
  }
}

function addCard() {
  show(completedView)
  hide(timerView)
  hide(noCards)
  show(showCards)
  currentActivity.saveToStorage();
  displayCard();
}

function displayCard() {
  cardContent.innerHTML = '';
  for (var i = 0; i < pastActivities.length; i++) {
      cardContent.innerHTML += `
        <span class="card-text">${pastActivities[i].category}</span><br>
          ${pastActivities[i].minutes} MIN ${pastActivities[i].seconds} SECONDS<br>
          <span style="font-size: 12px;">${pastActivities[i].description}</span>
     `
     if (pastActivities[i].category === 'study') {
       categoryLine.classList.add('study-line');
     } else if (pastActivities[i].category === 'meditate') {
       categoryLine.classList.add('meditate-line');
     } else {
       categoryLine.classList.add('exercise-line');
     }
  }
}

function newActivityView() {
  show(mainView);
  hide(completedView);
  clearForm();
}

function clearForm() {
  // descriptionInput.value = '';
  // minuteInput.value = '';
  // secondInput.value = '';
  // studyIcon.value = '';
  // meditateIcon.value = '';
  // exerciseIcon.value = '';
  window.location.reload();
}
