/* eslint no-console: 0 */
/* eslint indent: 0 */
/* eslint no-mixed-spaces-and-tabs: 0 */
/* eslint quotes: 0 */





// Inputs 


var nameInput = document.querySelector('#nameInput');
var emailInput = document.querySelector('#emailInput');
var passwordInput = document.querySelector('#passwordInput');
var confirmedPassword = document.querySelector('#passwordConfirmationInput');
var birthdayInput = document.querySelector('#birthdayInput');
var employerInput = document.querySelector('#employerInput');
var positionInput = document.querySelector('#positionInput');
var loveJobInput = document.querySelector('#loveJobInput');




var eventInput = document.querySelector('#eventInput');
var typeEventInput = document.querySelector('#typeEventInput');
var hostInput = document.querySelector('#hostInput');
var startTimeInput = document.querySelector('#startTimeInput');
var endTimeInput = document.querySelector('#endTimeInput');
var locationInput = document.querySelector('#locationInput');
var messageInput = document.querySelector('#messageInput');


// Buttons

var createEventButton = document.querySelector('#createEventButton');
var submitEventButton = document.querySelector('#addEvent');
var submitAccountButton = document.querySelector('#submitNewAccount');
var addGuestButton = document.querySelector('#addGuest');
var logInLink = document.querySelector('#logInLink');
var createAccountLink = document.querySelector('#createAccountLink');

// Displays
var createAccountForm = document.querySelector('#createAccountForm');
var createEventForm = document.querySelector('#createEventForm');
var displayedEvents = document.querySelector('#displayedEvents');
var image = document.querySelector('figure');
var loveJobOutput = document.querySelector('#output');




// Event Listeners 


logInLink.addEventListener('click', function() {


    hideLandingPage();
    showEvents();

});



function flipCard() {


    if (this.className.indexOf('flipped') == -1) {
        this.className = 'cardContainer flipped';

    } else {
        this.className = 'cardContainer';
        console.log(this.className);
    }




}

// card.addEventListener('click', function() {

//     console.log('clicked');


// });


createAccountLink.addEventListener('click', function() {

    createAccountForm.style.display = 'block';




}, false);


submitAccountButton.addEventListener('click', function(e) {

    //e.preventDefault();
    let name = nameInput.value;
    let email = emailInput.value;
    let password = passwordInput.value;
    let birthday = birthdayInput.value;
    let employer = employerInput.value;
    let position = positionInput.value;
    let loveJob = loveJobInput.value;
    let newAccount = new Account(name, email, password, birthday, employer, position, loveJob);
    localStorage.setItem(name, JSON.stringify(newAccount));
    console.dir(JSON.parse(localStorage.getItem(name)) instanceof Account);


}, false);


loveJobInput.addEventListener('input', function() {
    loveJobOutput.innerHTML = this.value;
})



// createEventButton.addEventListener('click',function(){

// 	createEventForm.style.display='block';
// 	greeting.style.display='none';
// },false);



addGuestButton.addEventListener('click', addGuest);
passwordInput.addEventListener('input', checkPassword);
confirmedPassword.addEventListener('blur', samePassword);
submitEventButton.addEventListener('click', addEvent);




window.onload = checkforEvents;


function checkforEvents() {

    for (let object in localStorage) {

        let parsedObject = JSON.parse(localStorage[object]);

        if (parsedObject['eventOrAccount'] === 'Event') {


            createNewEventCard(parsedObject);
        }

        // let value = localStorage.getItem(key);
        // value = JSON.parse(value);
        // if (value instanceof Event) {
        //     createEventDisplay(value);
        // }
    }
}













var events = [];


class Event {




    constructor(name, eventType, host, startDateTime, endDateTime, guestList, location, optMessage = '') {

        this.eventOrAccount = 'Event';
        this.name = name;
        this.eventType = eventType;
        this.host = host;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.guestList = guestList;
        this.location = location;
        this.optMessage = optMessage;
    }


}




class Account {




    constructor(name, email, password, birthdate, work, position, workLike) {

        this.eventOrAccount = 'Account';
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
        this.work = work;
        this.position = position;
        this.workLike = workLike;

    }


}














var guestListArray = [];

function addGuest() {
    let formGuestLabel = document.querySelector('label[for="guestInput"]');
    let guestList = document.querySelector('label[for="guestInput"] ul');
    let guestName = formGuestLabel.querySelector('input').value;
    let newItem = document.createElement('li');
    newItem.innerHTML = guestName;
    guestList.appendChild(newItem);
    formGuestLabel.querySelector('input').value = '';
    guestListArray.push(guestName);


}




function checkPassword() {


    let password = this.value;
    let message = '';


    if (!/[a-z]/.test(password)) {
        message = ' Please add a lower case letter to the password.';
        this.setCustomValidity(message);

    } else if (!/[A-Z]/.test(password)) {
        message = ' Please add a upper case letter to the password.';
        this.setCustomValidity(message);

    } else if (!/[0-9]/.test(password)) {
        message = ' Please add a number to the password.';
        this.setCustomValidity(message);

    } else if (!/[&%$*?!]/.test(password)) {
        message = ' Please add one of the following characters: &%$*?! .';
        this.setCustomValidity(message);

    } else if (!/.{10}/.test(password)) {
        message = ' The password should be at least 10 characters long.';
        this.setCustomValidity(message);

    } else {
        message = 'Great password!';
        this.setCustomValidity('');
    }


    let passwordTip = document.querySelector('#passwordTip1');
    passwordTip.innerHTML = message;
    console.log(this.checkValidity());
}

function samePassword() {


    let confirmedPassword = this.value;
    let passwordInput = document.querySelector('#passwordInput');
    let password = passwordInput.value;
    let passwordTip = document.querySelector('#passwordTip2');

    let message = '';





    if (confirmedPassword !== password) {
        message = 'The two passwords have to match.';
        this.setCustomValidity(message);

    } else {

        message = 'Passwords match!';
        this.setCustomValidity('');
    }



    passwordTip.innerHTML = message;
}


function addEvent() {
    let name = eventInput.value;
    let type = typeEventInput.value;
    let host = hostInput.value;
    let startTime = startTimeInput.value;
    let endTime = endTimeInput.value;
    let guests = guestListArray;
    let location = locationInput.value;
    let message = messageInput.value;
    let event = new Event(name, type, host, startTime, endTime, guests, location, message);
    localStorage.setItem(name, JSON.stringify(event));
    createNewEventCard(event);

    eventInput.value = '';
    typeEventInput.value = '';
    hostInput.value = '';
    startTimeInput.value = '';
    endTimeInput.value = '';
    guestListArray = '';
    locationInput.value = '';
    messageInput.value = '';

    let guestList = document.querySelector('label[for="guestInput"] ul');
    guestList.innerHTML = '';
    guestListArray = [];


}


function showEvents() {

    let eventsContainer = document.getElementById('eventsContainer');
    eventsContainer.style.display = 'block';

}





function createNewEventCard(eventInfo) {



    let newCard = document.createElement('div');
    newCard.className = "event";

    // creates the HTML for a new card

    let newCardHTML = `<div class="cardContainer">`;
    newCardHTML += `<div class="card typeOfEvent"><h2>${eventInfo.eventType}</h2></div>`;
    newCardHTML += `<div class="card eventDetails">`;
    newCardHTML += `<span>${eventInfo.name}</span>`;
    newCardHTML += `<span>Host: ${eventInfo.host}</span><br>`;
    newCardHTML += `<span>Start: ${eventInfo.startDateTime}</span>`;
    newCardHTML += `<span>End: ${eventInfo.endDateTime}</span>`;
    newCardHTML += `<span>Location: ${eventInfo.location}</span>`;
    newCardHTML += `<span><ul>`;
    for (let i = 0; i < eventInfo.guestList.length; i++) {
        newCardHTML += `<li>${eventInfo.guestList[i]}</li>`;

    }
    newCardHTML += `</ul></span>`;
    newCardHTML += `<span id="message">${eventInfo.optMessage}</span></div>`;

    newCard.innerHTML = newCardHTML;

    // makes the card flippable

    newCard.addEventListener('click', flipCard, false);

    //adds the HTML to the already existing HTML in the events container
    let eventsContainer = document.getElementById('eventsContainer');
    eventsContainer.appendChild(newCard);

    console.log('a new event card created!');




}


function hideLandingPage() {
    image.style.display = 'none';
}
