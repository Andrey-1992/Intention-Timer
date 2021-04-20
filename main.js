// Global Variable
var currentActivity = new Activity();

// Query Selectors
var studyButton = document.getElementById('studyButton');
var meditateButton = document.getElementById('meditateButton');
var exerciseButton = document.getElementById('exerciseButton');
var startActivityButton = document.getElementById('startActivityBtn');
var logActivityButton = document.getElementById('logActivityBtn');
var startTimerButton = document.getElementById('startTimerBtn');
var newActivityButton = document.getElementById('createActivityBtn');
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
var completedView = document.getElementById('completedView');
var timerDesc = document.getElementById('description');
var timerMin = document.getElementById('clockMinutes');
var timerSec = document.getElementById('clockSeconds');
var activityTitle = document.getElementById('activityTitle');
var cardContent = document.getElementById('cardContent');
var categoryLine = document.getElementById('line');
var activityCards = document.getElementById('activityCards');

// Event Listeners
window.addEventListener('DOMContentLoaded', displayCard);
studyButton.addEventListener('click', changeStudyButton);
meditateButton.addEventListener('click', changeMeditateButton);
exerciseButton.addEventListener('click', changeExerciseButton);
startActivityButton.addEventListener('click', checkInput);
startTimerButton.addEventListener('click', function() {
  currentActivity.startTimer();
  startTimerButton.disabled = true;
});
logActivityButton.addEventListener('click', addCard);
newActivityButton.addEventListener('click', viewNewForm);
minuteInput.addEventListener('keydown', preventInvalidEntry);
secondInput.addEventListener('keydown', preventInvalidEntry);

// Functions
function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

function selectButton(target, className, icon, imgSrc) {
  target.classList.add(className);
  icon.src=imgSrc;
}

function deselectButton(target, className, icon, imgSrc) {
  target.classList.remove(className);
  icon.src=imgSrc;
}

function changeStudyButton() {
  selectButton(studyButton, 'study-active', studyIcon, './assets/study-active.svg');
  deselectButton(meditateButton, 'meditate-active', meditateIcon, './assets/meditate.svg');
  deselectButton(exerciseButton, 'exercise-active', exerciseIcon, './assets/exercise.svg');
}

function changeMeditateButton() {
  selectButton(meditateButton, 'meditate-active', meditateIcon, './assets/meditate-active.svg');
  deselectButton(exerciseButton, 'exercise-active', exerciseIcon, './assets/exercise.svg');
  deselectButton(studyButton, 'study-active', studyIcon, './assets/study.svg');
}

function changeExerciseButton() {
  selectButton(exerciseButton, 'exercise-active', exerciseIcon, './assets/exercise-active.svg');
  deselectButton(studyButton, 'study-active', studyIcon, './assets/study.svg');
  deselectButton(meditateButton, 'meditate-active', meditateIcon, './assets/meditate.svg');
}

function preventInvalidEntry(event) {
  var invalidChars = ['-', '+', 'e'];
  if (invalidChars.includes(event.key)) {
    event.preventDefault();
  }
}

function checkInput() {
  var activeButton = studyButton.classList.contains('study-active') || meditateButton.classList.contains('meditate-active') || exerciseButton.classList.contains('exercise-active');
  var formInputs = descriptionInput.value && minuteInput.value && secondInput.value && activeButton;

  if (!descriptionInput.value) {
    show(descWarning);
  }
  if (!minuteInput.value) {
    show(minWarning);
  }
  if (!secondInput.value) {
    show(secWarning);
  }
  if (!activeButton) {
    show(btnWarning);
  }
  if (formInputs) {
    createActivity();
    resetTimerBtn();
    show(timerView);
    hide(mainView);
  }
}

function resetTimerBtn() {
  startTimerButton.innerText = 'START';
  startTimerButton.disabled = false;
  hide(logActivityButton);
}

function createActivity() {
  var activity;
  var description = descriptionInput.value;
  var minutes = minuteInput.value;
  var seconds = secondInput.value;

  if (studyButton.classList.contains('study-active')) {
    activity = studyButton.value;
  } else if (meditateButton.classList.contains('meditate-active')) {
    activity = meditateButton.value;
  } else {
    activity = exerciseButton.value;
  }

  currentActivity = new Activity(activity, description, minutes, seconds);
  currentActivity.totalSeconds = (parseInt(minuteInput.value) * 60) + parseInt(secondInput.value);

  displayUserInput();
}

function displayUserInput() {
  var categoryClass = `${currentActivity.category}-timer`;

  activityTitle.innerText = 'Current Activity';
  timerDesc.innerText = currentActivity.description;
  timerMin.innerText = currentActivity.minutes;
  timerSec.innerText = currentActivity.seconds < 10 ? '0' + currentActivity.seconds : currentActivity.seconds;

  startTimerButton.classList.add(categoryClass);
}

function updateCountdown() {
  var minutes = Math.floor(currentActivity.totalSeconds / 60);
  var seconds = (currentActivity.totalSeconds % 60);

  seconds = seconds < 10 ? '0' + seconds : seconds;
  timerMin.innerHTML = minutes;
  timerSec.innerHTML = seconds;
  currentActivity.totalSeconds--;

  if (seconds === "00" && !minutes) {
    clearInterval(currentActivity.timerId);
    startTimerBtn.innerText = "NAILED IT!";
    show(logActivityButton);
  }
}

function addCard() {
  show(completedView)
  hide(timerView)
  currentActivity.saveToStorage();
  displayCard();
  activityTitle.innerText = 'Completed Activity';
}

function displayCard() {
  if (localStorage.getItem('data')) {
    activityCards.innerHTML = '';
    var parseActivities = JSON.parse(localStorage.getItem('data'))
    for (var i = 0; i < parseActivities.length; i++) {
      activityCards.innerHTML += `
      <div class="card-content" id="cardContent">
        <div class="card-top">
          <div>
            <span class="card-text">${parseActivities[i].category}</span><br>
            ${parseActivities[i].minutes} MIN ${parseActivities[i].seconds} SECONDS<br>
          </div>
          <div class="line ${parseActivities[i].category}-line" id="line"></div>
        </div>
        <span class="card-desc">${parseActivities[i].description}</span>
      </div>
      `
    }
  }
}

function viewNewForm() {
  activityTitle.innerText = 'New Activity';
  show(mainView);
  hide(completedView);
  clearForm();
}

function clearForm() {
  descriptionInput.value = '';
  minuteInput.value = '';
  secondInput.value = '';

  startTimerButton.classList.remove('study-timer', 'meditate-timer', 'exercise-timer');
  deselectButton(studyButton, 'study-active', studyIcon, './assets/study.svg');
  deselectButton(meditateButton, 'meditate-active', meditateIcon, './assets/meditate.svg');
  deselectButton(exerciseButton, 'exercise-active', exerciseIcon, './assets/exercise.svg');
  hideWarnings();
  displayCard();
}

function hideWarnings() {
  hide(btnWarning);
  hide(descWarning);
  hide(minWarning);
  hide(secWarning);
}
