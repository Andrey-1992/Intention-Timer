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


studyButton.addEventListener('click', changeStudyButton);
meditateButton.addEventListener('click', changeMeditateButton);
exerciseButton.addEventListener('click', changeExerciseButton);
startActivityButton.addEventListener('click', checkInput);
minuteInput.addEventListener('keydown', preventInvalidEntry);
secondInput.addEventListener('keydown', preventInvalidEntry);


function changeStudyButton() {
  studyButton.classList.add('study-active');
  studyIcon.src='./assets/study-active.svg';
}

function changeMeditateButton() {
  meditateButton.classList.add('meditate-active');
  meditateIcon.src='./assets/meditate-active.svg';
}

function changeExerciseButton() {
  exerciseButton.classList.add('exercise-active');
  exerciseIcon.src='./assets/exercise-active.svg';
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
    descWarning.classList.remove('hidden');
  }
  if (!minuteInput.value) {
    minWarning.classList.remove('hidden');
  }
  if (!secondInput.value) {
    secWarning.classList.remove('hidden');
  }
}
