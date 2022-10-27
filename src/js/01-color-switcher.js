const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}

const CHANGE_COLOR_INTERVAL = 1000;
let intervalId = null;

refs.startBtn.addEventListener('click', onStartButtonClick)
refs.stopBtn.addEventListener('click', onStopButtonClick)

function onStartButtonClick() {

    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
           }, CHANGE_COLOR_INTERVAL);

    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
}

function onStopButtonClick() {
    clearInterval(intervalId);

    refs.stopBtn.disabled = true;
    refs.startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
