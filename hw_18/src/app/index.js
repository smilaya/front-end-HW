const basicForm = document.forms.signUp;
const output = document.getElementById("output");

const state = {};

const validation = {
  email: (value) => !value.includes("@"),
  password: (value) => value.length < 9 || value.length > 24,
  passwordConfirm: (value, rest) => rest.password !== value,

  consent: (checked) => !checked,
};

const errors = {
  email: true,
  password: true,
  passwordConfirm: true,

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

  output.innerHTML =
    "email:" +
    document.getElementsByName("email")[0].value +
    " ;" +
    "password:" +
    document.getElementsByName("password")[0].value;
};

basicForm.addEventListener("change", handleEvent);

basicForm.addEventListener("submit", handleSubmit);
