const STDIN = (function () {
  const runValidation = (callback, value) => {
    return typeof callback === "function" ? callback(value) : !value;
  };

  return {
    number(message, validate) {
      let input;
      do {
        input = +prompt(message);
      } while (input !== input || runValidation(validate, input));

      return input;
    },
    string(message, validate) {
      let input;
      do {
        input = prompt(message);
      } while (runValidation(validate, input));

      return input;
    },
  };
})();
const DATA = {
  getMaxDay(year, month) {
    return new Date(year, month, 0).getDate();
  },

  isLeapYear(year) {
    return this.getMaxDay(year, 2).getDate() === 29;
  },
};

const userFabric = function (firstName, lastName, year, month, day) {
  return {
    firstName,
    lastName,
    year,
    month, // 1...12
    day,
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    },

    set fullName(value) {
      const firstName = value.split(" ")[0];
      const lastName = value.split(" ")[1];

      if (firstName) {
        this.firstName = firstName;
      }

      if (lastName) {
        this.lastName = lastName;
      }
    },

    get age() {
      const month = this.month - 1;

      const now = new Date();

      const originBirthDay = new Date(this.year, month, this.day);
      const birthDay = new Date(now.getFullYear(), month, this.day);

      const fullAge = birthDay.getFullYear() - originBirthDay.getFullYear();

      if (now > birthDay) {
        return fullAge;
      } else {
        return fullAge - 1;
      }
    },
  };
};

function addUser() {
  const entries = [];

  const FIRST_NAME_MIN_LENGTH = 5;
  const FIRST_NAME_MAX_LENGTH = 20;

  const validateFirstName = (input) => {
    return input < FIRST_NAME_MIN_LENGTH || input > FIRST_NAME_MAX_LENGTH;
  };
  const firstName = STDIN.string(
    `Enter your first name :  min symbol: ${FIRST_NAME_MIN_LENGTH}, max symbols: ${FIRST_NAME_MAX_LENGTH}`,
    validateFirstName
  );

  const lastName = STDIN.string(
    `Enter your last name :  min symbol: ${FIRST_NAME_MIN_LENGTH}, max symbols: ${FIRST_NAME_MAX_LENGTH}`,
    validateFirstName
  );
  const minYear = 1900;
  const date = new Date();
  const maxYear = date.getFullYear();
  const validateYear = function (input) {
    return input < minYear || input > maxYear;
  };
  const year = STDIN.number(
    `Enter your year of birthday : only numbers, min: ${minYear}, max: ${maxYear}`,
    validateYear
  );

  const minMonth = 1;
  const maxMonth = 12;
  const validateMonth = function (input) {
    return input < minMonth || input > maxMonth;
  };
  const month = STDIN.number(
    `Enter your month of birthday : only numbers, min: ${minMonth}, max: ${maxMonth}`,
    validateMonth
  );

  const minDay = 1;
  const maxDay = DATA.getMaxDay(year, month);
  const validateDay = function (input) {
    return input < minDay || input > maxDay;
  };
  const day = STDIN.number(
    `Enter your day of birthday : only numbers, min: ${minDay}, max: ${maxDay}`,
    validateDay
  );

  const user = userFabric(firstName, lastName, year, month, day);
  console.log(user);
  entries.push(user);
  var string =
    "<section> <div><span>date</span></div></section><section>  <div>    <ul>      <li>        User: <span>firstName</span> <span>lastName</span> -        <span>age</span> years old; </li> </ul> </div></section>";

  var messages = [];

  var div = document.createElement("div");
  div.innerHTML = string;
  var spans = div.getElementsByTagName("span");
  for (var span = 0; span < spans.length; span++) {
    messages.push(spans[span].innerHTML);
  }
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    if (message === "firstName") {
      document.getElementsByTagName("span").value = user.firstName;
    } else {
      continue;
    }
    console.log(message);
  }

  console.log(messages);
}
addUser();
