function studyTimer() {
    const workDuration = 25 * 60;
    const breakDuration = 5 * 60; 

    let isWorkPeriod = true;
    let timeRemaining = workDuration;
    let timerInterval;

    const timerDisplay = document.getElementById('timer');

    function startTimer() {
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timeRemaining > 0) {
            timeRemaining--;
        } else {
            switchPeriod();
        }
    }

    function switchPeriod() {
        clearInterval(timerInterval);
        isWorkPeriod = !isWorkPeriod;
        timeRemaining = isWorkPeriod ? workDuration : breakDuration;
        startTimer();
    }

    startTimer();
}
document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const taskDate = document.getElementById('taskDate').value;
    const taskDescription = document.getElementById('taskDescription').value;

    createTask(taskDate, taskDescription);
});

function createTask(taskDate, taskDescription) {
    const taskElement = document.getElementById('9-28');
    taskElement.innerHTML = `<p>Date: ${taskDate}</p><p>Task: ${taskDescription}</p><input type='checkbox'>`;
}