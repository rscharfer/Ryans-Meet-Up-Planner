'use strict';

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
var guestInput = document.querySelector('#guestInput');
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


function ProjectEvent(name, eventType, host, startDateTime, endDateTime, guestList, location) {
    var optMessage = arguments.length <= 7 || arguments[7] === undefined ? '' : arguments[7];


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

function Account(name, email, password, birthdate, work, position, workLike) {

    this.eventOrAccount = 'Account';
    this.name = name;
    this.email = email;
    this.password = password;
    this.birthdate = birthdate;
    this.work = work;
    this.position = position;
    this.workLike = workLike;
}

//event listeners


showCreateEventForm.addEventListener('click', function () {
    createEventForm.style.display = 'block';
    image.style.display = 'none';
    eventsPage.style.display = 'none';
    registerForm.style.display = 'none';
}, false);

showRegister.addEventListener('click', function () {
    createEventForm.style.display = 'none';
    image.style.display = 'none';
    eventsPage.style.display = 'none';
    registerForm.style.display = 'block';
}, false);

showEvents.addEventListener('click', function () {
    createEventForm.style.display = 'none';
    image.style.display = 'none';
    registerForm.style.display = 'none';
    eventsPage.style.display = 'block';
    createCards();
}, false);

createAccountButton.addEventListener('click', function () {
    var name = nameInput.value;
    var email = emailInput.value;
    var password = passwordInput.value;
    var birthday = birthdayInput.value;
    var employer = employerInput.value;
    var position = positionInput.value;
    var loveJob = loveJobInput.value;
    var newAccount = new Account(name, email, password, birthday, employer, position, loveJob);
    localStorage.setItem(name, JSON.stringify(newAccount));
    console.dir(JSON.parse(localStorage.getItem(name)) instanceof Account);
}, false);

loveJobInput.addEventListener('input', function () {
    loveJobOutput.innerHTML = this.value;
}, false);

addGuestButton.addEventListener('click', function () {
    var formGuestLabel = document.querySelector('label[for="guestInput"]');
    var guestList = document.querySelector('label[for="guestInput"] ul');
    var guestName = formGuestLabel.querySelector('input').value;
    // this is to prevent an empty li from being created by Mutation Observer!!
    if (guestName === "") {
        return;
    }
    var newItem = document.createElement('li');
    newItem.innerHTML = guestName;
    guestList.appendChild(newItem);
    formGuestLabel.querySelector('input').value = '';
    guestListArray.push(guestName);
}, false);

passwordInput.addEventListener('input', function () {

    var password = this.value;
    var message = '';
    var passwordTip = document.querySelector('#passwordTip1');

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

    if (this.validity.valid == true) {
        passwordTip.style.color = "blue";
    } else {
        passwordTip.style.color = "red";
    }

    passwordTip.innerHTML = message;
});

secondPasswordInput.addEventListener('input', function () {
    var secondPasswordInput = this.value;
    var passwordInput = document.querySelector('#passwordInput');
    var password = passwordInput.value;
    var passwordTip = document.querySelector('#passwordTip2');
    var message = '';

    if (secondPasswordInput !== password) {
        message = 'The two passwords have to match.';
        this.setCustomValidity(message);
        passwordTip.style.color = "red";
    } else if (secondPasswordInput === password && passwordInput.validity.valid == false) {

        message = 'Passwords match, but neither is valid.';
        this.setCustomValidity(message);
        passwordTip.style.color = "red";
    } else {
        message = 'Passwords match!';
        this.setCustomValidity('');
        passwordTip.style.color = "blue";
    }

    passwordTip.innerHTML = message;
});

createEventButton.addEventListener('click', function () {

    if (!guestListArray.length > 0) {
        guestInput.setCustomValidity('You need at least one guest');
    } else {

        guestInput.setCustomValidity('');
    }

    if (createEventForm.checkValidity()) {

        var name = eventInput.value;
        var type = typeEventInput.value;
        var host = hostInput.value;
        var startTime = startTimeInput.value;
        var endTime = endTimeInput.value;
        var guests = guestListArray;
        var location = locationInput.value;
        var message = messageInput.value;
        var event = new ProjectEvent(name, type, host, startTime, endTime, guests, location, message);
        localStorage.setItem(name, JSON.stringify(event));
        createNewEventCard(event);
    }

    // eventInput.value = '';
    // typeEventInput.value = '';
    // hostInput.value = '';
    // startTimeInput.value = '';
    // endTimeInput.value = '';
    // guestListArray = '';
    // locationInput.value = '';
    // messageInput.value = '';

    // let guestList = document.querySelector('label[for="guestInput"] ul');
    // guestList.innerHTML = '';
    // guestListArray = [];
    // createEventForm.style.display='none';
});

function createCards() {

    var isEvents = false;

    for (var prop in localStorage) {

        // loop through every key value pair in localStorage
        try {

            // try to parse the value ... you can only parse stringified objects
            var parsedObject = JSON.parse(localStorage[prop]);

            // if the parsed object is an Event object, set isEvents to true
            if (parsedObject['eventOrAccount'] === "Event") {

                isEvents = true;
            }
        } catch (e) {

            console.log('a value that is not a stringified object is in local Storage');
        }
    }
    eventsPage.innerHTML = "";

    if (!isEvents) {
        eventsPage.innerHTML = '<h3>You need to first create an event before you can see any!</h3>';
    } else {
        for (var object in localStorage) {

            var _parsedObject = JSON.parse(localStorage[object]);

            if (_parsedObject['eventOrAccount'] === 'Event') {

                createNewEventCard(_parsedObject);
            }
        }
    }
}

function createNewEventCard(eventInfo) {
    var newCard = document.createElement('section');
    newCard.className = "card";

    // creates the HTML for a new card

    var newCardHTML = '<p class="eventName">' + eventInfo.name + '</p>';
    newCardHTML += '<p class="eventHost"><span class="header">Host:</span><span class="info">' + eventInfo.host + '</span></p>';
    newCardHTML += '<p class="eventType"><span class="header">Type of Event:</span><span class="info">' + eventInfo.eventType + '</span></p>';
    newCardHTML += '<p class="startTime"><span class="header">Start Time:</span><span class="info">' + formatTime(eventInfo.startDateTime) + '</span></p>';
    newCardHTML += '<p class="endTime"><span class="header">End Time:</span><span class="info">' + formatTime(eventInfo.endDateTime) + '</span></p>';
    newCardHTML += '<p class="location"><span class="header">Location:</span><span class="info"> ' + eventInfo.location + '</span></p>';
    newCardHTML += '<p class="whosComing"><span class="header">Who\'s Coming:</span><ul class="info">';
    for (var i = 0; i < eventInfo.guestList.length; i++) {
        newCardHTML += '<li>' + eventInfo.guestList[i] + '</li>';
    }
    newCardHTML += '</ul></p>';
    if (eventInfo.optMessage !== '') {
        newCardHTML += '<p class="message">"' + eventInfo.optMessage + '"</p>';
    }
    newCard.innerHTML = newCardHTML;
    eventsPage.appendChild(newCard);
}

// find the input elements whose parent label has a span elements

// add blur event listener

// on blur show validationMessage if it is not empty string


var dataTips = document.querySelectorAll('[data-validate-tip]');

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    var _loop = function _loop() {
        var dataTip = _step.value;


        var tipLabel = dataTip.parentNode;
        var labelsInput = tipLabel.querySelector('input');
        var labelsSpan = tipLabel.querySelector('span');

        labelsInput.addEventListener('blur', function () {

            if (this.validationMessage !== '') {
                labelsSpan.innerHTML = this.validationMessage;
            } else {
                labelsSpan.innerHTML = '';
            }
        }, false);

        labelsInput.addEventListener('input', function () {

            labelsSpan.innerHTML = '';
        }, false);
    };

    for (var _iterator = dataTips[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

guestInput.addEventListener('blur', function () {

    if (guestListArray.length == 0 && this.value == "") {

        guestInput.parentNode.querySelector('span').innerHTML = 'You need to have at least one guest.';
    } else {

        guestInput.parentNode.querySelector('span').innerHTML = '';
    }
}, false);

guestInput.addEventListener('input', function () {
    guestInput.parentNode.querySelector('span').innerHTML = '';
}, false);

guestInput.addEventListener('keydown', function (e) {

    if (e.keyCode == 13) {

        var formGuestLabel = document.querySelector('label[for="guestInput"]');
        var guestList = document.querySelector('label[for="guestInput"] ul');
        var guestName = formGuestLabel.querySelector('input').value;
        // this is to prevent an empty li from being created by Mutation Observer!!
        if (guestName === "") {
            return;
        }
        var newItem = document.createElement('li');
        newItem.innerHTML = guestName;
        guestList.appendChild(newItem);
        formGuestLabel.querySelector('input').value = '';
        guestListArray.push(guestName);
    }
}, false);

var autocomplete;

function initAutocomplete() {

    autocomplete = new google.maps.places.Autocomplete(document.getElementById('locationInput'), { types: ['geocode'] });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    // autocomplete.addListener('place_changed', fillInAddress);
}