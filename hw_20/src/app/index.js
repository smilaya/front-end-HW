const sound = new Audio(
  "https://raw.githubusercontent.com/Xiija/TestFiles/master/Yuki%20%26%20Tako%2001.mp3"
);
sound.loop = true;
const h1 = document.getElementById("date");
const h2 = document.getElementById("clock");
const check = document.getElementById("check");

const currentTime = setInterval(function () {
  const date = new Date();
  const localTime = date.toLocaleTimeString();
  const localDate = date.toLocaleDateString();

  const hours = localTime.split(":")[0];
  const minutes = localTime.split(":")[1];
  const seconds = localTime.split(":")[2];
  h1.textContent = localDate;
  h2.textContent = hours + ":" + minutes + ":" + seconds;
}, 1000);

function addZero(time) {
  return time < 10 ? "0" + time : time;
}

function hoursMenu() {
  const select = document.getElementById("alarmhrs");
  const hrs = 24;

  for (i = 0; i <= hrs; i++) {
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}
hoursMenu();

function minMenu() {
  const select = document.getElementById("alarmmins");
  const min = 59;

  for (i = 0; i <= min; i++) {
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}
minMenu();

function secMenu() {
  const select = document.getElementById("alarmsecs");
  const sec = 59;

  for (i = 0; i <= sec; i++) {
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}
secMenu();

function alarmSet() {
  const hr = document.getElementById("alarmhrs");

  const min = document.getElementById("alarmmins");

  const sec = document.getElementById("alarmsecs");

  const selectedHour = hr.options[hr.selectedIndex].value;
  const selectedMin = min.options[min.selectedIndex].value;
  const selectedSec = sec.options[sec.selectedIndex].value;

  const alarmTime =
    addZero(selectedHour) +
    ":" +
    addZero(selectedMin) +
    ":" +
    addZero(selectedSec);
  console.log("alarmTime:" + alarmTime);

  document.getElementById("alarmhrs").disabled = true;
  document.getElementById("alarmmins").disabled = true;
  document.getElementById("alarmsecs").disabled = true;

  setTimeout(function () {
    const date = new Date();
    const localTime = date.toLocaleTimeString();
    const localDate = date.toLocaleDateString();
    const localDay = localDate.split(".")[0];
    const currentTime = localTime;

    if (alarmTime == currentTime) {
      sound.play();
    }
    if (check.checked) {
      console.log(`Alarm at: ${selectedHour} : ${selectedMin} EVERY DAY`);

      repeat();
    }
  }, 1000);
  const repeat = setInterval(function () {
    if (alarmTime == currentTime) {
      sound.play();
    }
  }, 24 * 60 * 60 * 1000);
  console.log("currentTime:" + currentTime);
}

function alarmClear() {
  document.getElementById("alarmhrs").disabled = false;
  document.getElementById("alarmmins").disabled = false;
  document.getElementById("alarmsecs").disabled = false;
  document.getElementById("check").checked = false;
  sound.pause();
}
