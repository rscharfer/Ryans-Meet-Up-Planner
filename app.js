/* eslint no-console: 0 */
/* eslint indent: 0 */
/* eslint no-mixed-spaces-and-tabs: 0 */
/* eslint quotes: 0 */


//header
var showCreateEventForm = document.querySelector('#createEvent');
var showRegister = document.querySelector('#createAccount');
var showEvents = document.querySelector('#showEvents');

// huge image
var image = document.querySelector('figure');


// new account form
var registerForm = document.querySelector('#createAccountForm');
var nameInput = document.querySelector('#nameInput');
var emailInput = document.querySelector('#emailInput');
var passwordInput = document.querySelector('#passwordInput');
var secondPasswordInput = document.querySelector('#secondPasswordInput');
var birthdayInput = document.querySelector('#birthdayInput');
var employerInput = document.querySelector('#employerInput');
var positionInput = document.querySelector('#positionInput');
var loveJobInput = document.querySelector('#loveJobInput');
var loveJobOutput = document.querySelector('#output');
var createAccountButton = document.querySelector('#createAccountButton');



// new event form
var createEventForm = document.querySelector('#createEventForm');
var eventInput = document.querySelector('#eventInput');
var typeEventInput = document.querySelector('#typeEventInput');
var hostInput = document.querySelector('#hostInput');
var startTimeInput = document.querySelector('#startTimeInput');
var endTimeInput = document.querySelector('#endTimeInput');
var addGuestButton = document.querySelector('#addGuest');
var locationInput = document.querySelector('#locationInput');
var messageInput = document.querySelector('#messageInput');
var createEventButton = document.querySelector('#addEvent');
var guestListArray = [];






//event listing
var eventsPage = document.getElementById('eventsPage');


// constructors
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



//event listeners


showCreateEventForm.addEventListener('click', function() {
    createEventForm.style.display = 'block';
    image.style.display = 'none';
    eventsPage.style.display = 'none';
    registerForm.style.display = 'none';
}, false);


showRegister.addEventListener('click', function() {
    createEventForm.style.display = 'none';
    image.style.display = 'none';
    eventsPage.style.display = 'none';
    registerForm.style.display = 'block';
}, false);


showEvents.addEventListener('click',function(){
    createEventForm.style.display = 'none';
    image.style.display = 'none';
    registerForm.style.display = 'none';
    eventsPage.style.display = 'block';
    createCards();
}, false);


createAccountButton.addEventListener('click', function() {
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
},false);



addGuestButton.addEventListener('click', function(){
    let formGuestLabel = document.querySelector('label[for="guestInput"]');
    let guestList = document.querySelector('label[for="guestInput"] ul');
    let guestName = formGuestLabel.querySelector('input').value;
    let newItem = document.createElement('li');
    newItem.innerHTML = guestName;
    guestList.appendChild(newItem);
    formGuestLabel.querySelector('input').value = '';
    guestListArray.push(guestName);
},false);



passwordInput.addEventListener('input', function(){
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
});


secondPasswordInput.addEventListener('blur', function(){
    let secondPasswordInput = this.value;
    let passwordInput = document.querySelector('#passwordInput');
    let password = passwordInput.value;
    let passwordTip = document.querySelector('#passwordTip2');
    let message = '';

    if (secondPasswordInput !== password) {
        message = 'The two passwords have to match.';
        this.setCustomValidity(message);

    } else {
        message = 'Passwords match!';
        this.setCustomValidity('');
    }

    passwordTip.innerHTML = message;
});


createEventButton.addEventListener('click', function(){
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
    createEventForm.style.display='none';
});


function createCards() {
    eventsPage.innerHTML="";

    for (let object in localStorage) {
        
        let parsedObject = JSON.parse(localStorage[object]);

        if (parsedObject['eventOrAccount'] === 'Event') {
            
            createNewEventCard(parsedObject);
          
        }

    }
}


function createNewEventCard(eventInfo) {
    let newCard = document.createElement('section');
    newCard.className = "card";

    // creates the HTML for a new card

    let newCardHTML = `<p class="eventName">${eventInfo.name}</p>`;
    newCardHTML += `<p class="eventHost"><span class="header">Host:</span><span class="info">${eventInfo.host}</span></p>`;
    newCardHTML += `<p class="startTime"><span class="header">Start Time:</span><span class="info">${eventInfo.startDateTime}</span></p>`;
    newCardHTML += `<p class="endTime"><span class="header">End Time:</span><span class="info">${eventInfo.endDateTime}</span></p>`;
    newCardHTML += `<p class="location"><span class="header">Location:</span><span class="info"> ${eventInfo.location}</span></p>`;
    newCardHTML += `<p class="whosComing"><span class="header">Who's Coming:</span><ul class="info">`;
    for (let i = 0; i < eventInfo.guestList.length; i++) {
        newCardHTML += `<li>${eventInfo.guestList[i]}</li>`;

    }
    newCardHTML += `</ul></p>`;
    newCardHTML += `<p class="message">"${eventInfo.optMessage}"</p>`;
    newCard.innerHTML = newCardHTML;
    eventsPage.appendChild(newCard);
}



function formatTime(datetime){

    let result='';
   
    let month = datetime.slice(5,7);

    let hour = datetime.slice(11,13);

    switch(month){

        case '01':
        month = 'January';
        break;

        case '02':
        month = 'February';
        break;

        case '03':
        month = 'March';
        break;

        case '04':
        month = 'April';
        break;

        case '05':
        month = 'May';
        break;

        case '06':
        month = 'June';
        break;

        case '07':
        month = 'July';
        break;

        case '08':
        month = 'August';
        break;

        case '09':
        month = 'September';
        break;

        case '10':
        month = 'October';
        break;

        case '11':
        month = 'November';
        break;

        case '12':
        month = 'December';
        break;

}

    result = `${month} ${datetime.slice(8,10)}, ${datetime.slice(0,4)}`;

    return result;
}