document.addEventListener("DOMContentLoaded", function() {
    const timeDisplay = document.getElementById("time");
    const setAlarmButton = document.getElementById("setAlarm");
    const alarmList = document.getElementById("alarmList");

    // Update the clock every second .
    setInterval(updateClock, 1000);

    // Handle setting alarms
    setAlarmButton.addEventListener("click", setAlarm);

    // Function to set 12 hrs format and update AM or PM accordingly 
    function updateClock() {
        const now = new Date();
        const hours = now.getHours() % 12 || 12; // Convert 0 to 12
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = now.getHours() >= 12 ? "PM" : "AM";

        timeDisplay.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    }

    // Function to set an alarm
    function setAlarm() {
        const hour = document.getElementById("hour").value;
        const minute = document.getElementById("minute").value;
        const second = document.getElementById("second").value;
        const ampm = document.getElementById("ampm").value;
        const label = document.getElementById("label").value;

        if (!isValidTime(hour, minute, second)) {
            alert("Please enter valid time values.");
            return;
        }

     // to display the time in the following format  
        const alarmTime = `${hour}:${minute}:${second} ${ampm}`;
        const li = document.createElement("li");
        
        if (label) {
            li.innerHTML = `<strong>${label}:</strong> ${alarmTime}`;
        } else {
            li.textContent = alarmTime;
        }
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => {
            li.remove();
        });
        li.appendChild(deleteButton);
        alarmList.appendChild(li);

        // Clear input fields
        document.getElementById("hour").value = "";
        document.getElementById("minute").value = "";
        document.getElementById("second").value = "";
        document.getElementById("label").value = "";

        // Set a timeout to trigger the alarm
        setTimeout(() => {
            alert(`Alarm for ${label || 'Unnamed Alarm'} - ${alarmTime}`);
        }, calculateTimeToAlarm(hour, minute, second, ampm));
    }

    // Function to validate input time values
    function isValidTime(hour, minute, second) {
        return (
            hour >= 1 && hour <= 12 &&
            minute >= 0 && minute <= 59 &&
            second >= 0 && second <= 59
        );
    }

    // Function to calculate the time until the alarm should go off
    function calculateTimeToAlarm(hour, minute, second, ampm) {
        const now = new Date();
        const alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), convertHourTo24Hour(hour, ampm), minute, second, 0);
        const timeDifference = alarmTime - now;
        return timeDifference > 0 ? timeDifference : 0;
    }

    // Function to convert hour to 24-hour format
    function convertHourTo24Hour(hour, ampm) {
        if (ampm === "AM" && hour === "12") {
            return 0;
        } else if (ampm === "PM" && hour !== "12") {
            return parseInt(hour) + 12;
        } else {
            return parseInt(hour);
        }
    }
});
