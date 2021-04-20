class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.totalSeconds;
    this.completed = false;
    this.id = Date.now();
  }
  startTimer() {
    timerId = setInterval(updateCountdown, 1000);
  }
  markComplete() {
    this.completed = true;
  }
  saveToStorage() {
    if (!localStorage.getItem('data')) {
    localStorage.setItem('data', '[]');
    }
    var localStorageData = JSON.parse(localStorage.getItem('data'))
    localStorageData.push(currentActivity);
    localStorage.setItem('data', JSON.stringify(localStorageData));
  }
}
