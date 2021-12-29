const FIRST_NAME_MIN_LENGTH = 5;
const FIRST_NAME_MAX_LENGTH = 20;
const validateFirstName = (input) => {
  return input < FIRST_NAME_MIN_LENGTH || input > FIRST_NAME_MAX_LENGTH;
};
const getInfo = {
  firstName() {
    return STDIN.string(
      `Enter your first name :  min symbol: ${FIRST_NAME_MIN_LENGTH}, max symbols: ${FIRST_NAME_MAX_LENGTH}`,
      validateFirstName
    );
  },

  lastName() {
    return STDIN.string(
      `Enter your last name :  min symbol: ${FIRST_NAME_MIN_LENGTH}, max symbols: ${FIRST_NAME_MAX_LENGTH}`,
      validateFirstName
    );
  },
  age() {
    return userFabric.ageUser();
  },
  date() {
    return DATA.formatDate();
  },
};
class Timestamp {
  constructor() {
    this.date = new Date();
  }
  toISOString() {
    let dd = this.date.getDate();
    if (dd < 10) {
      dd = "0" + dd;
    }
    const mm = this.date.getMonth() + 1;
    if (mm < 10) {
      mm = "0" + mm;
    }
    const yy = this.date.getFullYear();

    let hh = this.date.getHours();
    if (hh < 10) {
      hh = "0" + hh;
    }

    let mn = this.date.getMinutes();
    if (mn < 10) {
      mn = "0" + mn;
    }
    let ss = this.date.getSeconds();
    if (ss < 10) {
      ss = "0" + ss;
    }
    let mmm = this.date.getMilliseconds();
    if (mmm < 100) {
      mmm = "0" + mmm;
    }

    const ISOString =
      yy + "-" + mm + "-" + dd + " " + hh + ":" + mn + ":" + ss + "." + mmm;
    return ISOString;
  }
  toString() {
    let dd = this.date.getDate();

    if (dd < 10) {
      dd = "0" + dd;
    }

    const mm = DATA.getMonthName();

    const yy = this.date.getFullYear();

    let hh = this.date.getHours();
    if (hh < 10) {
      hh = "0" + hh;
    }

    let mn = this.date.getMinutes();
    if (mn < 10) {
      mn = "0" + mn;
    }
    const toString = yy + " " + mm + " " + dd + " at " + hh + ":" + mn;
    return toString;
  }
}
let time = new Timestamp();

class App {
  constructor() {
    this.list = document.querySelector(".list");
    this.timestamp = document.querySelector(".timestamp");
  }

  render() {
    for (const listItem of this.list.children) {
      listItem.classList.add("list__item--ready");
      for (const item of listItem.children) {
        const datafield = item.dataset.field;
        if (datafield in getInfo) {
          item.innerHTML = getInfo[datafield]();
        }
      }
    }
    this.update();
  }

  update() {
    this.timestamp.innerHTML = time.toString();
    this.timestamp.setAttribute("datetime", time.toISOString());
  }
}

let app = new App();
app.render();
