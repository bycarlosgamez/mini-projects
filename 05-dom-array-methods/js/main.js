const main = document.getElementById('main');
const addUserbtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//FUNCTIONS
//Fetch random user and add money
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 500000)
    };

    addData(newUser);
}

//Add user info to data
function addData(user){
    data.push(user);

    updateDOM();
}

//Show data into the DOM
function updateDOM(providedData = data) {
    //Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(user => {
        let element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
        main.appendChild(element);
    });
}

//Format money
function formatMoney(number){
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Duuble amount of money
function dobuleMoney(){
    data = data.map((user) => {
        return {...user, money: user.money * 2}
    });

    updateDOM();
}

//Sorted user by most wealth
function sortByRichiests(){
    data.sort((a,b) => b.money - a.money);

    updateDOM();
}

//Filter millionaires
function showMillionaires(){
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

//sum the totla welath
function calculateWealth(){
    const wealth = data.reduce((a, user) => a += user.money, 0);

    formatMoney(wealth);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;

    main.appendChild(wealthEl);
}



//EVENT LISTENERS (BTN ACTIONS)
//Add new user
addUserbtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', dobuleMoney);
sortBtn.addEventListener('click', sortByRichiests);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);