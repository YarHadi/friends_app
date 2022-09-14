const url =
  "https://randomuser.me/api/?results=30&inc=name,location,picture,dob,email,gender,phone";

const users = [];

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

function createUserCard(data) {
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
        <img class="person-img" src="${picture}">
        <div class="person-data">          
          <h1 class="person-name">${firstName} ${lastName}</h1>          
          <p class="person-age person-text">Age: ${age}</p>
          <p class="person-sex person-text">${gender}</p>
            <p class="person-email person-text">E-mail: ${email}</p>
            <p class="person-location person-text">City: ${city}</p>
            <p class="person-location person-text">Country: ${country}</p>
            <p class="person-phone person-text">Phone-number: ${phone}</p>

        </div>
      </div>`
    )
    .join("");
}

function showUsers(data) {
  friendsContainer.innerHTML = createUserCard(filtersCheck(data));
}

// filters check

function filtersCheck(data) {
  const sortedByAge = sortByAge(data);
  const sortedByName = sortByName(sortedByAge);
  const filteredByGender = filterByGender(sortedByName);
  const searchedByName = searchByName(filteredByGender);
  return searchedByName;
}

// sort by age

function sortByAge(data) {
  let sorted=[];
  data.map(person => sorted.push(person));
  // sorted up
  if (filterContainer.sort == "ageUp") {
    return sorted.sort(({age: a}, {age: b}) => a - b);
  }
  // sortedDown
  if (filterContainer.sort == "ageDown") {
    return sorted.sort(({age: b}, {age: a}) => a - b);
  }
  return data;
}

// sort By Name

function sortByName(data) {
  let sorted=[];
  data.map(person => sorted.push(person));
  // sorted up
  if (filterContainer.sort == "nameUp") {
    return sorted.sort(({firstName: a}, {firstName: b}) =>
      a < b ? -1 : 1
    );
  }

  // sorted Down
  if (filterContainer.sort == "nameDown") {
    return sorted.sort(({firstName: a}, {firstName: b}) =>
      a > b ? -1 : 1
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

// search by name

function searchByName(data) {
  if (filterContainer.search) {
    return data.filter((user) =>
      (user.firstName + " " + user.lastName)
        .toLowerCase()
        .includes(filterContainer.search.toLowerCase())
    );
  }
  return data;
}

//event listener

const filterContainer = document.querySelector(".filter-container");

filterContainer.addEventListener("input", ({ target }) => {
  if (target.name == "search") {
    filterContainer.search = target.value;
  }
  if (target.name == "filter") {
    filterContainer.filter = target.value;
  }
  if (target.name == "sort") {
    filterContainer.sort = target.value;
  }
  showUsers(users);
});

filterContainer.addEventListener("keyup", function (e) {
  if (e.keyCode == 13) {
    closeFilters();
  }
});

function closeFilters() {
  const filtersInput = document.querySelector(".filter-input");
  filtersInput.checked = false;
}

// reset

const resetBtn = document.getElementById("reset-button");

resetBtn.addEventListener("click", () => {
  const sorting = document.getElementsByName("sort");
  for (var i = 0; i < sorting.length; i++) {
    sorting[i].checked = false;
  }
  filterContainer.sort = "all";

  const filter = document.getElementsByName("filter");
  for (var i = 0; i < filter.length - 1; i++) {
    filter[i].checked = false;
  }
  filter[filter.length - 1].checked = true;
  filterContainer.filter = "all";

  const search = document.getElementById("searchName");
  search.value = "";
  filterContainer.search = "";
  showUsers(users);
});

