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

var currentActivity;
var pastActivities = [];

studyButton.addEventListener('click', changeStudyButton);
meditateButton.addEventListener('click', changeMeditateButton);
exerciseButton.addEventListener('click', changeExerciseButton);
startActivityButton.addEventListener('click', checkInput);
minuteInput.addEventListener('keydown', preventInvalidEntry);
secondInput.addEventListener('keydown', preventInvalidEntry);


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
    console.log(event);
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
  if (descriptionInput.value && minuteInput.value && secondInput.value) {
    createActivity();
  }
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

function createActivity() {
  hide(descWarning);
  var description = descriptionInput.value;
  var minutes = minuteInput.value;
  var seconds = secondInput.value;
  currentActivity = new Activity('study', description, minutes, seconds);
  pastActivities.push(currentActivity);
}
