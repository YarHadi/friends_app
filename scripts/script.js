const url =
  "https://randomuser.me/api/?results=30&inc=name,location,picture,dob,email,gender,phone";

let users = [];

// get users data

document.addEventListener("DOMContentLoaded", getData);

async function getData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    data.results.map((user) => {
      users.push({
        firstName: user.name.first,
        lastName: user.name.last,
        picture: user.picture.large,
        age: user.dob.age,
        gender: user.gender,
        country: user.location.country,
        city: user.location.city,
        phone: user.phone,
        email: user.email,
      });
    });
    showUsers(users);
  } catch (error) {
    console.log(error);
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
}

// show function

const friendsContainer = document.querySelector(".friends-container");

function prepareToShow(data) {
  return data
    .map(
      ({
        firstName,
        lastName,
        picture,
        age,
        email,
        city,
        country,
        gender,
        phone,
      }) =>
        `<div class="person-container">
          <h1 class="person-name">${firstName} ${lastName}</h1>
          <img class="person-img" src="${picture}">
          <p class="person-age">${age}</p>
          <p class="person-email">${email}</p>
          <p class="person-location">${city} <br> ${country} </p>
          <p class="person-sex">${gender}</p>
          <p class="person-phone">${phone}</p>
        </div>`
    )
    .join("");
}

function showUsers(data) {
  friendsContainer.innerHTML = prepareToShow(filtersCheck(data));
}

// filters check

function filtersCheck(data) {
  const sortedByAge = sortByAge(data);
  const sortedByName = sortByName(sortedByAge);
  const filteredByGender = filterByGender(sortedByName);
  return filteredByGender;
}

// sort by age

function sortByAge(data) {
  // sorted up
  if (filterContainer.sort == "ageUp") {
    return data.sort((a, b) => a.age - b.age);
  }
  // sortedDown
  if (filterContainer.sort == "ageDown") {
    return data.sort((b, a) => a.age - b.age);
  }

  return data;
}

// sort By Name

function sortByName(data) {
  // sorted up
  if (filterContainer.sort == "nameUp") {
    return data.sort((userA, userB) =>
      userA.firstName < userB.firstName ? -1 : 1
    );
  }

  // sorted Down
  if (filterContainer.sort == "nameDown") {
    return data.sort((userA, userB) =>
      userA.firstName > userB.firstName ? -1 : 1
    );
  }
  return data;
}

// filter by gender

function filterByGender(data) {
  // filtered male

  if (filterContainer.filter == "male") {
    return data.filter((user) => user.gender == "male");
  }

  //filtered female
  if (filterContainer.filter == "female") {
    return data.filter((user) => user.gender == "female");
  }

  return data;
}

//event listener

const filterContainer = document.querySelector(".filter-container");

filterContainer.addEventListener("input", ({ target }) => {
  if (target.name == "filter") {
    filterContainer.filter = target.value;
  }
  if (target.name == "sort") {
    filterContainer.sort = target.value;
  }
  console.log(target.name);
  showUsers(users);
});
