var timer = document.getElementById("timer");
var runningTimer = false;

var loc = (document.location.href).toLowerCase();

function startTimer() {
    console.log("got click");

    if (runningTimer !== false) {
        console.log("starting timer");
        history.pushState(null, null, '#auto');
        timer.classList.add("play");
        runningTimer = window.setTimeout(
            function() {
                location.reload(true);
            }, 30000);
    } else {
        console.log("stopping timer");
        history.pushState(null, null, '');
        clearTimeout(runningTimer);
        timer.classList.remove("play");
        runningTimer = false;
    }
}

timer.addEventListener("click", startTimer());

if (loc.indexOf('#auto') > -1) {
	startTimer();
}
else
{
    clearTimeout(runningTimer);
    timer.classList.remove("play");
    runningTimer = false;
    console.log("no auto");
    timer.addEventListener("click", startTimer());
}