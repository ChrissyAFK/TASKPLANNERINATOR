// Define setTaskDate globally
function setTaskDate(date) {
    document.getElementById('taskDate').value = date;
}

// Define setTaskNum globally
function setTaskNum(taskNum) {
    document.getElementById('taskNum').value = taskNum;
}

// Run the rest of the script when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Pomodoro Timer
    function studyTimer() {
        const workDuration = 25 * 60; // 25 minutes
        const breakDuration = 5 * 60; // 5 minutes

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

    // Task creation handler
    document.getElementById('creator').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from submitting the traditional way

        const taskDate = document.getElementById('taskDate').value;
        const taskNum = document.getElementById('taskNum').value;
        const taskDescription = document.getElementById('taskDescription').value;

        if (taskDate && taskNum && taskDescription) {
            createTask(taskDate, taskNum, taskDescription);
        } else {
            console.error('Please select a date, task number, and enter a task description.');
        }
    });

    // Function to create task in the calendar
   // Function to create task in the calendar
function createTask(taskDate, taskNum, taskDescription) {
    // Find the correct table row (task number)
    const taskRow = document.getElementsByClassName(taskNum); // Select the correct task row
    console.log(taskRow);
    // Use getElementById directly
    const taskCell = taskRow["children"].getElementById(taskDate); // This will work fine since you're using getElementById

    if (taskCell) {
        taskCell.innerHTML = `${taskDescription} <input type='checkbox'>`;
    } else {
        console.error(`No cell found for date: ${taskDate} and task number: ${taskNum}`);
    }
}

});
