var studyButton = document.querySelector('#studyButton');
var meditateButton = document.querySelector('#meditateButton');
var exerciseButton = document.querySelector('#exerciseButton');
var studyIcon = document.querySelector('#studyIcon');

studyButton.addEventListener('click', changeStudyButton);

function changeStudyButton() {
  studyButton.classList.add('study-active');
  studyIcon.src="./assets/study-active.svg";
}
