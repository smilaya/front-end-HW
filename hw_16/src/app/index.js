const root = document.getElementById("root");
console.log(root);

const creatorEl = (el, { attribute = {}, className, children = [] } = {}) => {
  let element;

  switch (typeof el) {
    case "function":
      element = el();
      break;
    case "object":
      element = el;
      break;
    default:
      element = document.createElement(el);
  }

  if (className) {
    element.className = className;
  }
  // if (typeof attribute === "object") {
  //   for (var key in attribute) {
  //     element.setAttribute(key, attribute[key]);
  //   }
  for (const attrKey of Object.getOwnPropertyNames(attribute)) {
    element.setAttribute(attrKey, attribute[attrKey]);
  }

  for (const child of children) {
    switch (typeof child) {
      case "string":
        element.insertAdjacentHTML("afterbegin", child);
        break;

      default:
        element.append(child);
        break;
    }
  }

  return element;
};
const Header = () => {
  return creatorEl("header", { children: ["<h1>User Archive</h1>"] });
};

const Main = () => {
  return creatorEl("main", {
    children: [section_Nav(), section_Date(), section_User()],
  });
};

const section_Nav = () => {
  return creatorEl("section", {
    children: [
      creatorEl("ul", {
        children: [
          creatorEl("li", {
            children: [
              creatorEl("span", {
                children: [
                  creatorEl("a", {
                    attribute: { href: "/" },
                    children: [creatorEl(["Home"])],
                  }),
                ],
              }),
              creatorEl("span", {
                children: [
                  creatorEl("a", {
                    attribute: { href: "/about" },
                    children: [creatorEl(["About Page"])],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

const section_Date = () => {
  return creatorEl("section", {
    children: [
      creatorEl("div", {
        children: [
          creatorEl("span", {
            children: [creatorEl(getInfo.date)],
          }),
        ],
      }),
    ],
  });
};

const section_User = () => {
  return creatorEl("section", {
    children: [
      creatorEl("ul", {
        children: [
          creatorEl("li", {
            children: [
              creatorEl(`User:`, {
                children: [
                  creatorEl("span", {
                    children: [creatorEl(getInfo.firstName)],
                  }),
                  creatorEl("span", {
                    children: [creatorEl(getInfo.lastName)],
                  }),
                  creatorEl("span", {
                    children: [creatorEl(getInfo.age)],
                    children: [creatorEl([" years old"])],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

root.append(Header(), Main());
