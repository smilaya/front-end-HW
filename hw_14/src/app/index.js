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




const addUser = function (firstName, lastName, year, month, day) {
      const FIRST_NAME_MIN_LENGTH = 5;
  const FIRST_NAME_MAX_LENGTH = 20;
  const validateFirstName = (input) => {
      return input < FIRST_NAME_MIN_LENGTH || input > FIRST_NAME_MAX_LENGTH;
    },
    const minMonth = 1;
    const maxMonth = 12;
    const validateMonth = function (input) {
      return input < minMonth || input > maxMonth;
    };
    const minYear = 1900;
    const date = new Date();
    const maxYear = date.getFullYear();
    const validateYear = function (input) {
      return input < minYear || input > maxYear;
    },
    const minDay = 1;
    const maxDay = DATA.getMaxDay(year, month);
    const validateDay = function (input) {
      return input < minDay || input > maxDay;
    };
    return{
        firstName = STDIN.string(
            `Enter your first name :  min symbol: ${FIRST_NAME_MIN_LENGTH}, max symbols: ${FIRST_NAME_MAX_LENGTH}`,
            validateFirstName
          ),
          lastName = STDIN.string(
            `Enter your last name :  min symbol: ${FIRST_NAME_MIN_LENGTH}, max symbols: ${FIRST_NAME_MAX_LENGTH}`,
            validateFirstName
          ),
       
           year = STDIN.number(
            `Enter your year of birthday : only numbers, min: ${minYear}, max: ${maxYear}`,
            validateYear
          ),
           month = STDIN.number(
            `Enter your month of birthday : only numbers, min: ${minMonth}, max: ${maxMonth}`,
            validateMonth
          ),

           day = STDIN.number(
            `Enter your day of birthday : only numbers, min: ${minDay}, max: ${maxDay}`,
            validateDay
          ),
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
      

      const user = userFabric(firstName, lastName, year, month, day);
      console.log(user);