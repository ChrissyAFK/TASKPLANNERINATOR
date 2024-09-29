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
    function createTask(taskDate, taskNum, taskDescription) {
        const taskRow = document.querySelector(`.${taskNum}`); 
        if (!taskRow) {
            console.error(`No row found for task number: ${taskNum}`);
            return;
        }

        const taskCell = taskRow.querySelector(`[id='${taskDate}']`); 
        if (!taskCell) {
            console.error(`No cell found for date: ${taskDate} and task number: ${taskNum}`);
            return;
        }

        taskCell.innerHTML = ''; 
        const taskList = document.createElement('ul');
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `${taskDescription} <input type='checkbox'>`;
        taskList.appendChild(taskItem);
        taskCell.appendChild(taskList);
    }
});
