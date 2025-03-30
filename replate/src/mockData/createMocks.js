import { faker } from '@faker-js/faker';
import fs from 'fs';

const USERS = 5;
const LOCATIONS = 3;
// the number of permissions will be this plus locations, because all locations need an admin
const PERMISSIONS = 2;
const DONATIONREQUESTS = 5;
const DONATIONS = 3;
const STOCK = 10;
const usersObj = {users: []}
const locationsObj = {locations: []}
const permissionsObj = {permissions: []}
const donationRequestsObj = {donationRequests: []}
const donationsObj = {donations: []}
const stockObj = {stock: []}

// to be used for the donation location indices cause I'm having trouble accessing them directly
const donationLocations = []

for(let i = 0; i < USERS; i++){
    const first = faker.person.firstName();
    const last = faker.person.lastName();
    usersObj.users.push({username: faker.internet.username({firstName: first, lastName: last}), email: faker.internet.email({firstName: first, lastName: last}), password: faker.internet.password()})
}

for(let j = 0; j < LOCATIONS; j++){
    locationsObj.locations.push({index: j, name: faker.company.name(), address: {streetAddress: faker.location.streetAddress(), city: faker.location.city(), state: faker.location.state(), zipCode: faker.location.zipCode()}, businessType: faker.commerce.department()})
}

for(let k = 0; k < LOCATIONS; k++){
    permissionsObj.permissions.push({user: usersObj.users[faker.number.int({min: 0, max: USERS - 1})].username, locationIndex: k, permission: "admin"})
}
for(let l = 0; l < PERMISSIONS; l++){
    // view
    let perm = "v";
    if(faker.datatype.boolean()){
        // create
        perm += "c";
    }
    if(faker.datatype.boolean()){
        // update
        perm += "u";
        if(faker.datatype.boolean()){
            // delete
            perm += "d";
        }
    }
    permissionsObj.permissions.push({user: usersObj.users[faker.number.int({min: 0, max: USERS - 1})].username, locationIndex: faker.number.int({min: 0, max: LOCATIONS - 1}), permission: perm})
}

for(let m = 0; m < DONATIONREQUESTS; m++){
    let category;
    let item;
    // meat, vegetable, fruit, spice, ingredient
    const foodType = faker.number.int({min: 0, max: 4});
    if(foodType === 0){
        item = faker.food.meat();
        category = "meat";
    }
    else if(foodType === 1){
        item = faker.food.vegetable();
        category = "vegetable";
    }
    else if(foodType === 2){
        item = faker.food.fruit();
        category = "fruit";
    }
    else if(foodType === 3){
        item = faker.food.spice();
        category = "spice";
    }
    else{
        item = faker.food.ingredient();
        category = "other";
    }
    const location = faker.number.int({min: 0, max: LOCATIONS - 1});
    donationLocations.push(location)
    donationRequestsObj.donationRequests.push({index: m, locationIndex: location, item: item, category: category, amount: faker.number.int({min:1, max:20}), dateRequested: faker.date.past(), accepted: faker.datatype.boolean()})
}

for(let n = 0; n < DONATIONS; n++){
    let rand = faker.number.int({min: 0, max: DONATIONREQUESTS - 1});
    
    donationRequestsObj.donationRequests[rand].accepted = true;
    donationsObj.donations.push({index: n, user: usersObj.users[faker.number.int({min: 0, max: USERS - 1})].username, locationIndex: donationLocations[rand], amount: faker.number.int({min: 1, max: 20}), dateDonated: faker.date.recent(), donationRequest: rand})
}

for(let p = 0; p < STOCK; p++){
    let category;
    let item;
    // meat, vegetable, fruit, spice, ingredient
    const foodType = faker.number.int({min: 0, max: 4});
    if(foodType === 0){
        item = faker.food.meat();
        category = "meat";
    }
    else if(foodType === 1){
        item = faker.food.vegetable();
        category = "vegetable";
    }
    else if(foodType === 2){
        item = faker.food.fruit();
        category = "fruit";
    }
    else if(foodType === 3){
        item = faker.food.spice();
        category = "spice";
    }
    else{
        item = faker.food.ingredient();
        category = "other";
    }
    stockObj.stock.push({locationIndex: faker.number.int({min: 0, max: LOCATIONS - 1}), item: item, category: category, amount: faker.number.int({min: 1, max: 20}), dateAdded: faker.date.recent(), expirationDate: faker.date.soon()})
}


const usersJson = JSON.stringify(usersObj, null, 2);
fs.writeFile("./src/mockData/Users.json", usersJson, e => {e ? console.log("An error occured") : console.log("Users sucessfully uploaded")})

const locationsJson = JSON.stringify(locationsObj, null, 2);
fs.writeFile("./src/mockData/Locations.json", locationsJson, e => {e ? console.log("An error occured") : console.log("Locations sucessfully uploaded")})

const permissionsJson = JSON.stringify(permissionsObj, null, 2);
fs.writeFile("./src/mockData/Permissions.json", permissionsJson, e => {e ? console.log("An error occured") : console.log("Permissions sucessfully uploaded")})

const donationRequestsJson = JSON.stringify(donationRequestsObj, null, 2);
fs.writeFile("./src/mockData/DonationRequests.json", donationRequestsJson, e => {e ? console.log("An error occured") : console.log("Donation Requests sucessfully uploaded")})

const donationsJson = JSON.stringify(donationsObj, null, 2);
console.log(donationsObj, donationsJson)
fs.writeFile("./src/mockData/Donations.json", donationsJson, e => {e ? console.log("An error occured") : console.log("Donations sucessfully uploaded")})

const stockJson = JSON.stringify(stockObj, null, 2);
console.log(stockObj, stockJson)
fs.writeFile("./src/mockData/Stock.json", stockJson, e => {e ? console.log("An error occured") : console.log("Stock sucessfully uploaded")})