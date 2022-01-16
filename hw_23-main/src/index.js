const login = document.forms.login;
const email = login.email;
const user = document.querySelector("h2");
const root = document.querySelector("#root");
const hiddenSection = root.lastElementChild;
const section = root.firstElementChild;

const state = {};

const validation = {
  email: (value) => !"admin@example.com",
  password: (value) => !"admin",
  consent: (checked) => !checked,
};

const errors = {
  email: true,
  password: true,
  consent: true,
};

const handleEvent = (event) => {
  const { type, name, value, checked } = event.target;
  switch (type) {
    case "checkbox":
      state[name] = checked;
      break;

    default:
      state[name] = value;
      break;
  }

  errors[name] =
    name in validation ? validation[name](state[name], state) : false;

  event.currentTarget.submitBtn.disabled = Object.keys(errors).some(
    (key) => errors[key]
  );
};

const handleSubmit = (event) => {
  event.preventDefault();
  document.cookie = `email=${email.value};  max-age = ${60 * 60 * 24}`;
  showCookieValue();
};

const showCookieValue = () => {
  user.innerHTML = document.cookie;

  section.hidden = true;
  hiddenSection.hidden = false;
};
const checkACookieExist = () => {
  if (document.cookie) {
    return showCookieValue();
  }
};
checkACookieExist();

login.addEventListener("change", handleEvent);
login.addEventListener("submit", handleSubmit);
