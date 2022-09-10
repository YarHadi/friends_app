const url = 'https://randomuser.me/api/?results=30&inc=name,location,picture,dob,email,gender,phone';

let users = [];

// get users data

document.addEventListener("DOMContentLoaded", getData);

async function getData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        data.results.map((user)=> {
            users.push({
            firstName: user.name.first,
            lastName: user.name.last,
            picture: user.picture.large,
            age: user.dob.age,
            gender: user.gender,
            country: user.location.country,
            city: user.location.city,
            phone: user.phone,
            email: user.email           
            })
        });
        showData(users);
    }
    catch (error) {
        console.log(`FRIENDS ERROR: ${error}`);
        setTimeout(() => {
            location.reload() ;
        }, 2000);
    }
}



// show function

const friendsContainer = document.querySelector(".friends-container");

function showData(data){
    const userBoxes = data
    .map((user)=> 
        `<div class="person-container">
          <h1 class="person-name">${user.firstName} ${user.lastName}</h1>
          <img class="person-img" src="${user.picture}">
          <p class="person-age">${user.age}</p>
          <p class="person-email">${user.email}</p>
          <p class="person-location">${user.city} <br> ${user.country} </p>
          <p class="person-sex">${user.gender}</p>
          <p class="person-phone">${user.phone}</p>
        </div>`
    )
    .join("");
    friendsContainer.innerHTML= userBoxes;
    console.log(users);
}


