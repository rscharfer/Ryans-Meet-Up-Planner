/* eslint no-console: 0 */
/* eslint indent: 0 */
/* eslint no-mixed-spaces-and-tabs: 0 */
/* eslint quotes: 0 */


//header
var createEvent = document.querySelector('#createEvent');
var register = document.querySelector('#createAccount');
var seeEvents = document.querySelector('#seeEvents');

// huge image
var image = document.querySelector('figure');


// new account form
var registerForm = document.querySelector('#createAccountForm');
var nameInput = document.querySelector('#nameInput');
var emailInput = document.querySelector('#emailInput');
var passwordInput = document.querySelector('#passwordInput');
var confirmedPassword = document.querySelector('#passwordConfirmationInput');
var birthdayInput = document.querySelector('#birthdayInput');
var employerInput = document.querySelector('#employerInput');
var positionInput = document.querySelector('#positionInput');
var loveJobInput = document.querySelector('#loveJobInput');
var loveJobOutput = document.querySelector('#output');
var submitAccountButton = document.querySelector('#submitNewAccount');



// new event form
var createEventForm = document.querySelector('#createEventForm');
var eventInput = document.querySelector('#eventInput');
var typeEventInput = document.querySelector('#typeEventInput');
var hostInput = document.querySelector('#hostInput');
var startTimeInput = document.querySelector('#startTimeInput');
var endTimeInput = document.querySelector('#endTimeInput');
//var guestInput = document.querySelector('#guestInput');
var addGuestButton = document.querySelector('#addGuest');
var locationInput = document.querySelector('#locationInput');
var messageInput = document.querySelector('#messageInput');
var submitEventButton = document.querySelector('#addEvent');



//event listing
var eventsPage = document.getElementById('eventsPage');





//event listeners
createEvent.addEventListener('click', function() {
    createEventForm.style.display = 'block';
    image.style.display = 'none';
    eventsPage.style.display = 'none';
    registerForm.style.display = 'none';

    


},false);


register.addEventListener('click', function() {
    createEventForm.style.display = 'none';
    image.style.display = 'none';
    eventsPage.style.display = 'none';
    registerForm.style.display = 'block';

}, false);

seeEvents.addEventListener('click',function(){
    createEventForm.style.display = 'none';
    image.style.display = 'none';
    registerForm.style.display = 'none';
    eventsPage.style.display = 'block';
    showEvents();

},false)







function showEvents() {

    eventsPage.innerHTML="";

    for (let object in localStorage) {

        let parsedObject = JSON.parse(localStorage[object]);

        if (parsedObject['eventOrAccount'] === 'Event') {


            createNewEventCard(parsedObject);
            console.dir(parsedObject)
        }

    }
}
















// Event Listeners 





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

//  createEventForm.style.display='block';
//  greeting.style.display='none';
// },false);



addGuestButton.addEventListener('click', addGuest);
passwordInput.addEventListener('input', checkPassword);
confirmedPassword.addEventListener('blur', samePassword);
submitEventButton.addEventListener('click', addEvent);





















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
    createEventForm.style.display='none';


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

    // makes the card flippable

    

    eventsPage.appendChild(newCard);

    console.log(formatTime(eventInfo.startDateTime));

   




}



function formatTime(datetime){
   
    let month = datetime.slice(5,7);

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



    return month;
}