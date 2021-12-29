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

const userFabric = (function (firstName, lastName, year, month, day) {
  return {
    firstName,
    lastName,
    year,
    month,
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
    ageUser() {
      const minYear = 1900;
      const date = new Date();
      const maxYear = date.getFullYear();
      validateYear = function (input) {
        return input < minYear || input > maxYear;
      };
      const year = STDIN.number(
        `Enter your year of birthday : only numbers, min: ${minYear}, max: ${maxYear}`,
        validateYear
      );

      const minMonth = 1;
      const maxMonth = 12;
      validateMonth = function (input) {
        return input < minMonth || input > maxMonth;
      };
      const month = STDIN.number(
        `Enter your month of birthday : only numbers, min: ${minMonth}, max: ${maxMonth}`,
        validateMonth
      );

      const minDay = 1;
      const maxDay = DATA.getMaxDay(year, month);
      validateDay = function (input) {
        return input < minDay || input > maxDay;
      };
      const day = STDIN.number(
        `Enter your day of birthday : only numbers, min: ${minDay}, max: ${maxDay}`,
        validateDay
      );

      const ageUser = function (year, month, day) {
        const birthDate = new Date();
        birthDate.setFullYear(year);
        birthDate.setMonth(month - 1);
        birthDate.setDate(day);
        let age = date.getFullYear() - birthDate.getFullYear();
        let m = date.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && date.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };
      return ageUser(year, month, day);
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
  getMonthName() {
    const date = new Date();
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const mm = month[date.getMonth()];
    return mm;
  },
  //   getDateByFormat(format) {
  //     const now = new Date();

  //     switch (format) {
  //       case "yyyy-mm-dd hh:mm:ss.MMM":
  //         return this.toISOString();
  //       case "yyyy Mon dd at hh:mm":
  //         return this.toString();
  //       default:
  //         return now.toDateString();
  //     }
  //   },
  //   toISOString() {
  //     let dd = this.date.getDate();
  //     if (dd < 10) {
  //       dd = "0" + dd;
  //     }
  //     const mm = this.date.getMonth() + 1;
  //     if (mm < 10) {
  //       mm = "0" + mm;
  //     }
  //     const yy = this.date.getFullYear();

  //     let hh = this.date.getHours();
  //     if (hh < 10) {
  //       hh = "0" + hh;
  //     }

  //     let mn = this.date.getMinutes();
  //     if (mn < 10) {
  //       mn = "0" + mn;
  //     }
  //     let ss = this.date.getSeconds();
  //     if (ss < 10) {
  //       ss = "0" + ss;
  //     }
  //     let mmm = this.date.getMilliseconds();
  //     if (mmm < 100) {
  //       mmm = "0" + mmm;
  //     }

  //     const ISOString =
  //       yy + "-" + mm + "-" + dd + " " + hh + ":" + mn + ":" + ss + "." + mmm;
  //     return ISOString;
  //   },
  //   toString(date) {
  //     date = new Date();
  //     let dd = this.date.getDate();

  //     if (dd < 10) {
  //       dd = "0" + dd;
  //     }

  //     const mm = this.getMonthByText();

  //     const yy = this.date.getFullYear();

  //     let hh = this.date.getHours();
  //     if (hh < 10) {
  //       hh = "0" + hh;
  //     }

  //     let mn = this.date.getMinutes();
  //     if (mn < 10) {
  //       mn = "0" + mn;
  //     }
  //     const toString = yy + " " + mm + " " + dd + " at " + hh + ":" + mn;
  //     return toString;
  //   },

  formatDate() {
    date = new Date();
    let dd = date.getDate();
    dd < 10 ? (dd = "0" + dd) : dd;

    let mm = date.getMonth() + 1;
    mm < 10 ? (mm = "0" + mm) : mm;

    let yy = date.getFullYear() % 100;
    yy < 10 ? (yy = "0" + yy) : yy;

    let hh = date.getHours();
    hh < 10 ? (hh = "0" + hh) : hh;

    let mn = date.getMinutes();
    mn < 10 ? (mn = "0" + mn) : mn;

    const formatedDate = dd + "/" + mm + "/" + yy + " " + hh + ":" + mn + ";";
    return formatedDate;
  },
};
