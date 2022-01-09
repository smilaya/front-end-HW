// const getUsers = (cb) => {
//   const USER = [
//     { id: 1, name: "Bob" },
//     { id: 2, name: "Sasha" },
//     { id: 3, name: "Peter" },
//   ];
//   setTimeout(() => {
//     cb(null, USER);
//   }, 2000);
// };
// const getRepos = (cb) => {
//   const REPOS = [
//     { id: 1, userId: 1, name: "JS Basics" },
//     { id: 2, userId: 1, name: "CSS Basics" },
//     { id: 1, userId: 2, name: "React" },
//   ];
//   setTimeout(() => {
//     cb(null, REPOS);
//   }, 2000);
// };

// const getAllReposofUserId = (userId, cb) => {
//   getUsers((err, users) => {
//     if (err) {
//       cb(err);
//       return;
//     }
//     const user = users.find((user) => {
//       return user.id === userId;
//     });
//     if (!user) {
//       cb(new Error("User was not found"));
//     }
//     getRepos((err, repos) => {
//       if (err) {
//         cb(err);
//         return;
//       }
//       const userRepos = repos.filter((repo) => repo.userId === user.id);
//       if (!user) {
//         cb(new Error("No repos for this User"));
//         return;
//       }

//       cb(null, userRepos);
//     });
//   });
// };
// getAllReposofUserId(1, (err, value) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(value);
//   }
// });
// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
// }

// const fakeRequestError = () => {
//   const random = getRandomIntInclusive(1, 100);
//   if (random >= 50) {
//     return new Error(`Bad Request: ${new Date()}`);
//   }
//   return null;
// };
// const request = new Promise((resolve, reject) => {
//   const err = fakeRequestError();
//   setTimeout(() => {
//     if (err) {
//       reject(err);
//     }
//     resolve(`users`);
//     reject(new Error(`Example error`));
//   }, 2000);
// });
// console.log(request);
// const resolve = (data) => console.log(data);
// const reject = (err) => console.error(err);
// request.then(resolve).catch(reject);
// request.then((data) => console.log(data)).catch((err) => console.error(err));
// request.then(console.log).catch(console.error);
// request
//   .then((data) => {
//     console.log(data);
//     return new Promise((resolve) =>
//       setTimeout(() => resolve("usersRepos"), 1000)
//     );
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.error(err));

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
// }
// const fakeRequestError = () => {
//   const random = getRandomIntInclusive(1, 100);
//   if (random >= 90) {
//     return new Error(`Bad Request: ${new Date()}`);
//   }
//   return null;
// };
// const getUsers = () => {
//   const USER = [
//     { id: 1, name: "Bob" },
//     { id: 2, name: "Sasha" },
//     { id: 3, name: "Peter" },
//   ];
//   const err = fakeRequestError();
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (err) {
//         reject(err);
//       }
//       resolve(USER);
//     }, 2000);
//   });
// };

// const getRepos = () => {
//   const REPOS = [
//     { id: 1, userId: 1, name: "JS Basics" },
//     { id: 2, userId: 1, name: "CSS Basics" },
//     { id: 1, userId: 2, name: "React" },
//   ];
//   const err = fakeRequestError();
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (err) {
//         reject(err);
//       }
//       resolve(REPOS);
//     }, 2000);
//   });
// };

// getUsers()
//   .then((users) => {
//     const user = users.find((user) => user.id === 1);

//     if (!user) {
//       throw new Error("User was not found");
//     }
//     return user;
//   })
//   .then((user) => {
//     return getRepos();
//   })
//   .then((repos) => {
//     const userRepos = repos.filter((repo) => repo.userId === 1);
//     if (userRepos.length < 1) {
//       throw new Error("No repos for this User");
//     }
//     return userRepos;
//   })
//   .then(console.log)
//   .catch(console.error);

function RANDOM(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
// симулятор ошибок
const randomizeError = () => {
  const random = RANDOM(1, 100);

  if (random > 90) {
    return new Error("Bad Request");
  }

  return null;
};

// симулятор запроса в БД в таблицу юзеров.
const getUsers = (callback) => {
  const USERS = [
    { id: 1, name: "Bob" },
    { id: 2, name: "Andy" },
    { id: 3, name: "John" },
  ];

  setTimeout(() => {
    callback(randomizeError(), USERS);
  }, 2000);
};

// симулятор запроса в БД в таблицу продуктов.
const getProducts = (callback) => {
  const PRODUCTS = [
    { id: 1, name: "iPad" },
    { id: 2, name: "Google Pixel" },
    { id: 3, name: "War and Peace" },
    { id: 4, name: "iPad" },
    { id: 5, name: "Kaizen" },
    { id: 6, name: "Sherlock Holmes" },
  ];

  setTimeout(() => {
    callback(randomizeError(), PRODUCTS);
  }, 2000);
};

// симулятор запроса в БД в таблицу заказов.
const getOrders = (callback) => {
  const ORDERS = [
    { id: 1, userId: 1, checkout: [1, 6] },
    { id: 2, userId: 1, checkout: [3] },
    { id: 3, userId: 2, checkout: [2, 4] },
  ];

  setTimeout(() => {
    callback(randomizeError(), ORDERS);
  }, 2000);
};

const getCheckoutsForUser = (userId, callback) => {
  getUsers((err, users) => {
    if (err) {
      callback(err);
      return;
    }
    const user = users.find((user) => user.id === userId);

    if (!user) {
      callback(new Error("User was not found"));
      return;
    }

    getOrders((err, orders) => {
      if (err) {
        callback(err);
        return;
      }
      const userOrder = orders.filter((order) => order.userId === user.id);
      // const orderCheckout = orders.checkout;
      if (!user) {
        callback(new Error(`User has not added any orders yet`));
        return;
      }

      getProducts((err, products) => {
        if (err) {
          callback(err);
          return;
        }
        const product = orders.map((userOrder) =>
          userOrder.checkout.map((productId) =>
            products.find((product) => product.id === productId)
          )
        );
        callback(null, product);
      });
    });
  });
};
getCheckoutsForUser(1, (err, value) => {
  if (err) {
    console.error(err);
  } else {
    console.log(value);
  }
});
