const sound = new Audio(
  "https://raw.githubusercontent.com/Xiija/TestFiles/master/Yuki%20%26%20Tako%2001.mp3"
);
sound.loop = true;
const h1 = document.getElementById("date");
const h2 = document.getElementById("clock");
const check = document.getElementById("check");
const hr = document.getElementById("alarmhrs");

const min = document.getElementById("alarmmins");

const sec = document.getElementById("alarmsecs");

const currentTime = setInterval(function () {
  const now = new Date();
  const localTime = now.toLocaleTimeString();
  const localDate = now.toLocaleDateString();

  const hours = localTime.split(":")[0];
  const minutes = localTime.split(":")[1];
  const seconds = localTime.split(":")[2];
  h1.textContent = localDate;
  h2.textContent = hours + ":" + minutes + ":" + seconds;
}, 1000);

function addZero(times) {
  return times < 10 ? "0" + times : times;
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

  hr.disabled = true;
  min.disabled = true;
  sec.disabled = true;

  const now = new Date();
  const localTime = now.toLocaleTimeString();
  const localDate = now.toLocaleDateString();
  const localDay = localDate.split(".")[0];
  const currentTime = localTime;
  const time =
    selectedHour * 60 * 60 * 1000 +
    selectedMin * 60 * 1000 +
    selectedSec * 1000 -
    (now.getHours() * 60 * 60 * 1000 +
      now.getMinutes() * 60 * 1000 +
      now.getSeconds() * 1000);
  console.log(time);

  if (check.checked) {
    let repeat = setTimeout(function rep() {
      sound.play();
      repeat = setTimeout(rep, 24 * 60 * 60 * 1000);
    }, time);
    console.log(`Alarm at: ${selectedHour} : ${selectedMin} EVERY DAY`);
  } else {
    const alarmClock = setTimeout(() => {
      sound.play();
      if (alarmClear()) {
        clearTimeout(alarmClock);
      }
    }, time);
  }

  // alarmClock = setTimeout(
  //   alarm,
  //   //   function () {
  //   //   if (alarmTime === currentTime) {
  //   //     sound.play();
  //   //   }
  //   // }
  //   24 * 60 * 60 * 1000
  // );
  console.log("currentTime:" + currentTime);
}

function alarmClear() {
  hr.disabled = false;
  min.disabled = false;
  sec.disabled = false;
  check.checked = false;
  sound.pause();
}
