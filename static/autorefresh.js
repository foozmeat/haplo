var timer = document.getElementById("timer");
var a = document.getElementById("a");
var b = document.getElementById("b");
var runningTimer = "";
var timerID = 0; 
var timerDuration = 30; // In seconds

a.style.setProperty("animation-duration", (timerDuration/2 + "s"));
a.style.setProperty("animation-delay", (timerDuration/2 + "s"));
b.style.setProperty("animation-duration", (timerDuration/2 + "s"));

var loc = (document.location.href).toLowerCase();

function startTimer() {
        console.log("Refreshing page in " + timerDuration + " seconds.");
        history.pushState(null, null, '#auto');
        timer.classList.add("play");
        runningTimer = true;
        timerID = window.setTimeout(
            function() {
                runningTimer = false;
                location.reload(true);
            }, (timerDuration * 1000));
}

function stopTimer() {
        console.log("Auto-refreshing cancelled.");
        history.pushState(null, null, ' ');
        timer.classList.remove("play");
        clearTimeout(timerID);
        runningTimer = false;
}

function checkTimer() {
    if (runningTimer === true) {
        stopTimer();
    }
    else {
        startTimer();
    }
}

if (loc.indexOf('#auto') > -1) {
	checkTimer();
}
else
{
    runningTimer = false;
}

timer.addEventListener("click", checkTimer);
