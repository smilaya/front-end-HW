// const COOKIE = (() => {
//   "OGPC=19026101-2:; 1P_JAR=2021-11-30-18";
//   "OGPC=19026101-2:";
//   "1P_JAR=2021-11-30-18";

//   const getCookie = (name) => {
//     for (const pair of document.cookie.split(";")) {
//       const match = `${name}=`;

//       if (pair.trim().startsWith(match)) {
//         return pair.trim().slice(match.length);
//       }
//     }

//     return null;
//   };

//   const hasCookie = (name) => {
//     return Boolean(getCookie(name));
//   };

//   const setCookie = (name, value, options = {}) => {
//     let pair = name + "=" + value;

//     for (const optionKey of Object.keys(options)) {
//       pair += "; " + optionKey + "=" + options[optionKey];
//     }

//     document.cookie = pair;
//   };

//   const count = () => {
//     return document.cookie.split(";").length;
//   };

//   return {
//     getCookie,
//     hasCookie,
//     setCookie,
//     removeCookie,
//     count,
//   };
// })();

// console.log(COOKIE.getCookie("foo"));
// console.log(COOKIE.getCookie("baz"));

// console.log(COOKIE.hasCookie("foo"));
// console.log(COOKIE.hasCookie("hello"));

// COOKIE.setCookie("foo3", "bar3", { "max-age": 60 });

// console.log(COOKIE.count());

// COOKIE.removeCookie("baz");
