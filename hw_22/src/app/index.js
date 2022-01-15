const btn = document.getElementById("btn");
const input = document.getElementById("input");
const ul = document.getElementById("ul");
const url = new URL("https://jsonplaceholder.typicode.com/users/1/todos");

const request = (method, url, body) => {
  const headers = new Headers({
    "Content-type": "application/json; charset=UTF-8",
  });

  return fetch(url, {
    method,
    body: body ? JSON.stringify(body) : body,
    headers,
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    let data;

    if (response.headers.get("content-type").includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return data;
  });
};

const getAll = async () => {
  try {
    const data = await request("GET", url);
    for (const element of data) {
      if (element.id <= 10) {
        newItem(element);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
const newItem = (data) => {
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "Delete";
  delBtn.addEventListener("click", deleteBTN);
  const li = document.createElement("li");
  li.innerHTML = data.title;
  ul.append(li);
  li.append(delBtn);
};

const sendPost = async () => {
  try {
    const data = await request("POST", url, {
      fakeId: new Date().valueOf(),
      title: input.value,
      completed: false,
    });
    newItem(data);

    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
getAll();

const deleteBTN = async (event) => {
  try {
    const id = "1";
    const url = new URL(`https://jsonplaceholder.typicode.com/todos/${id}`);

    const data = await request("DELETE", url);
    const deleteEl = event.target;
    console.log(data);
    deleteEl.parentElement.remove();
  } catch (error) {
    console.error(error);
  }
};
btn.addEventListener("click", sendPost);
