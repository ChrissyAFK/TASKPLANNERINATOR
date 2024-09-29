// Pomodoro Timer
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

// Set the selected date for the task creation
function setTaskDate(date) {
    document.getElementById('taskDate').value = date;
}

// Task creation handler
document.getElementById('creator').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const taskDate = document.getElementById('taskDate').value;
    const taskDescription = document.getElementById('taskDescription').value;

    if (taskDate && taskDescription) {
        createTask(taskDate, taskDescription);
    } else {
        console.error('Please select a date and enter a task description.');
    }
});

// Function to create task in the calendar
function createTask(taskDate, taskDescription) {
    const taskCell = document.getElementById(taskDate);

    if (taskCell) {
        taskCell.innerHTML = `${taskDescription} <input type='checkbox'>`;
    } else {
        console.error(`No cell found for date ID: ${taskDate}`);
    }
}
