const basicForm = document.forms.signUp;

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
const handleFocus = (event) => {
  console.log("FOCUSED!");
};
const handleBlur = (event) => {
  event.currentTarget.submitBtn.disabled = !state.consent;
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
  console.log(event.type);

  console.log("state", state);
};

basicForm.addEventListener("change", handleEvent);
// basicForm.addEventListener("focusin", handleFocus);

basicForm.addEventListener("focusout", handleBlur);

basicForm.addEventListener("submit", handleSubmit);

// const sbBtn = document.querySelector("#submitBtn");

// sbBtn.addEventListener("click", () => {
//   basicForm.requestSubmit();
// });

function submtBtn() {
  var tr = "<tr>";
  tr +=
    " <td>" +
    "email:" +
    " " +
    document.getElementsByName("email")[0].value +
    "</td>";
  tr +=
    "<td>" +
    "password:" +
    " " +
    document.getElementsByName("password")[0].value +
    "</td>";

  var table = document.getElementsByTagName("table")[0];

  table.innerHTML = table.innerHTML + tr;
  console.log(tr);
  return false;
}

// const rstBtn = document.querySelector('#resetBtn');

// rstBtn.addEventListener('click', () => {
// 	basicForm.reset();
// });

//  function Complete(){
//  var szStr="";
//  szStr="Имя: " + frm.name.value +
//  "\nФамилия: " + frm.family.value +
//  "\nE-mail: " + frm.email.value;
//  alert(szStr);
//  };

//  function CheckEMail(eml){
//  if (eml != " ")
//  {
//  if (eml.indexOf("@") == -1)
//  {
//  alert(`Внимание!\nЭлектронный адрес указан с
// ошибкой`);
//  }
//  }
//  }

//  <FORM NAME="frm">
//  <TABLE>
//  <TR>
//  <TD><B>Имя:</B></TD>
//  <TD><INPUT NAME="name" TYPE="text" SIZE="15"
//  onFocus="comment.innerHTML='Введите ваше имя';">
//  </TD>
//  <TD rowspan="4" valign="top"><div id="comment">
//  Пожалуйста, заполните анкету</div></TD>
//  </TR>
//  <TR>
//  <TD><B>Фамилия:</B></TD>
//  <TD><INPUT NAME="family" TYPE="text" SIZE="15"
//  onFocus="comment.innerHTML='Введите вашу фамилию';">
//  </TD>
//  </TR>
//  <TR>
//  <TD><B>E-mail:</B></TD>
//  <TD><INPUT NAME="email" TYPE="text" SIZE="20"
//  onFocus="comment.innerHTML='Введите адрес вашей
// электронной почты';"
//  onChange="CheckEMail(this.value);"></TD>
//  </TR>
//  <TR>
//  <TD>&nbsp;</TD>
//  <TD><INPUT VALUE="Показать" TYPE="button"
//  onClick="Complete();"></TD>
//  </TR>
//  </TABLE>
//  </FORM>
//  <SCRIPT LANGUAGE="JavaScript">
//  <!--
//  document.frm.name.focus();
// 18
//  //-->
//  </SCRIPT>
