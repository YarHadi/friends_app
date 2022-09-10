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
        console.log(users);
    }
    catch (error) {
        console.log(`FRIENDS ERROR: ${error}`);
        setTimeout(() => {
            location.reload() ;
        }, 2000);
    }
}
