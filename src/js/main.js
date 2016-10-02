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
var passwordInputs = document.querySelectorAll('input[type=password]');
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

// 'tips' below the required inputs, passwords and add guest have their own tips because they are more complicated
var mostTips = document.querySelectorAll('.notPasswordNotGuestTip');

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

//navigation event listeners


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

// "create account" event listeners


// when user types a new character, see what the password is missing and give correpsonding feedback

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

// when user types a new character, test to see if second password matches first password and give corresponding feedback

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

// after leaving a password field, show or hide checkmark depending on whether or not field is valid

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    var _loop = function _loop() {
        var passwordInput = _step.value;


        var passParent = passwordInput.parentNode;
        var passInput = passParent.querySelector('input');
        var checkmark = passParent.querySelector('.checkmark');

        passwordInput.addEventListener('blur', function () {

            if (passInput.validity.valid) {
                checkmark.style.opacity = 1;
            } else {
                checkmark.style.opacity = 0;
            }
        }, false);
    };

    for (var _iterator = passwordInputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
    }

    // when user moves slide, set the output to the slider's value
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

loveJobInput.addEventListener('input', function () {
    loveJobOutput.innerHTML = this.value;
}, false);

// when user clicks create account button, check to see if all of the values in the form are valid
// if so, save a new account object to local storage. Otherwise, mark the invalid fields with a message.

createAccountButton.addEventListener('click', function () {

    if (registerForm.checkValidity()) {

        var name = nameInput.value;
        var email = emailInput.value;
        var password = passwordInput.value;
        var birthday = birthdayInput.value;
        var employer = employerInput.value;
        var position = positionInput.value;
        var loveJob = loveJobInput.value;
        var newAccount = new Account(name, email, password, birthday, employer, position, loveJob);
        localStorage.setItem(name, JSON.stringify(newAccount));
    } else {

        // loop through the accountInputs
        var accountInputs = document.querySelectorAll('.accountInput');
        accountInputs.forEach(function (value) {
            // if the value is valid
            if (!value.checkValidity()) {
                var parent = value.parentNode;
                // find the tip span
                var tip = parent.querySelector('span:not(.checkmark)');
                // show the validation message
                tip.innerHTML = value.validationMessage;
            }
        });
    }
}, false);

/// create event event listeners 


// when user leaves field, if the value is the datetime-local type, 
// create a Date object out of it, and if it is before now, then 
// set validation message for both start and end input
startTimeInput.addEventListener('blur', function () {

    var inputValue = this.value;

    if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(inputValue)) {

        var year = inputValue.slice(0, 4);
        var month = inputValue.slice(5, 7);
        var day = inputValue.slice(8, 10);
        var hour = inputValue.slice(11, 13);
        var minutes = inputValue.slice(14, 16);
        var dateObject = new Date(year, month, day, hour, minutes);

        if (dateObject < new Date()) {

            startTimeInput.setCustomValidity('Events cannot start in the past.');
            endTimeInput.setCustomValidity('Events cannot start in the past.');
        } else {

            startTimeInput.setCustomValidity('');
            endTimeInput.setCustomValidity('');
        }
    }
}, false);

// if both values are the correct type, create Date objects out of them and compare them
// if the end time is before the start time, set the validation message. otherwise, clear it.
endTimeInput.addEventListener('blur', function () {

    var times = [startTimeInput.value, this.value];
    var dateObjects = [];

    if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(startTimeInput.value) && /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(endTimeInput.value)) {

        times.forEach(function (currentValue, index) {

            var year = currentValue.slice(0, 4);
            var month = currentValue.slice(5, 7);
            var day = currentValue.slice(8, 10);
            var hour = currentValue.slice(11, 13);
            var minutes = currentValue.slice(14, 16);
            var dateObject = new Date(year, month, day, hour, minutes);
            dateObjects[index] = dateObject;
        });

        if (dateObjects[1] <= dateObjects[0]) {

            endTimeInput.setCustomValidity('The end time must be later than the start time.');
        } else {
            endTimeInput.setCustomValidity('');
        }
    }
});

guestInput.addEventListener('blur', function () {

    // if you leave the field with no value in it, and without a guest already, you get the corresponding message
    if (guestListArray.length == 0 && this.value == "") {

        document.querySelector('#guestTip').innerHTML = 'You need to have at least one guest.';
        // if you leave the field with a value in it, but you havent hit the button yet
    } else if (guestListArray.length == 0 && !this.value == "") {

        document.querySelector('#guestTip').innerHTML = 'Please hit the add guest button to add guest.';

        // otherwise
    } else {

        document.querySelector('#guestTip').innerHTML = '';
    }
}, false);

guestInput.addEventListener('input', function () {
    document.querySelector('#guestTip').innerHTML = '';
}, false);

// create a li and show checkmark on pressing enter if there is a value
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
        var checkmark = formGuestLabel.querySelector('.checkmark');
        checkmark.style.opacity = 1;
        formGuestLabel.querySelector('#guestTip').innerHTML = '';
    }
}, false);

// create a li and show checkmark on click if there is a value
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
    var checkmark = formGuestLabel.querySelector('.checkmark');
    checkmark.style.opacity = 1;
    formGuestLabel.querySelector('#guestTip').innerHTML = '';
}, false);

createEventButton.addEventListener('click', function () {

    // make sure validation message is set if necessary on guest input, because it is not automatically set

    if (!guestListArray.length > 0) {
        guestInput.setCustomValidity('You need at least one guest');
    } else {

        guestInput.setCustomValidity('');
    }

    // if form is valid, create an event object on local storage and a new event card
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
    } else {
        // if the form is not valid

        // loop through the eventInputs
        var eventInputs = document.querySelectorAll('.eventInput');
        eventInputs.forEach(function (value) {
            // if the value is valid
            if (!value.checkValidity()) {
                var parent = value.parentNode;
                // find the tip span
                var tip = parent.querySelector('span:not(.checkmark)');
                // show the validation message
                tip.innerHTML = value.validationMessage;
            }
        });
    }
});

// find stringified 'Event' instances in local storage, call createNewEventCard for each 

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

// create an event card for every event in local storage
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

// when you leave the input area, if the input is not valid, hide the checkmark and write the tip into the tip area
// if valid, show check mark and no tip
// also hide tip message on input, if it showing because user tried to submit

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
    var _loop2 = function _loop2() {
        var tip = _step2.value;


        var tipLabel = tip.parentNode;
        var labelsInput = tipLabel.querySelector('input');
        //  let labelsSpan = tipLabel.querySelector('span:not(.checkmark)');
        var checkmark = tipLabel.querySelector('.checkmark');

        labelsInput.addEventListener('blur', function () {

            if (this.validationMessage !== '') {
                tip.innerHTML = this.validationMessage;
                checkmark.style.opacity = 0;
            } else {
                tip.innerHTML = '';
                checkmark.style.opacity = 1;
            }
        }, false);

        labelsInput.addEventListener('input', function () {

            tip.innerHTML = '';
        }, false);
    };

    for (var _iterator2 = mostTips[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop2();
    }

    // use Google Places API to create place autocomplete
} catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
        }
    } finally {
        if (_didIteratorError2) {
            throw _iteratorError2;
        }
    }
}

var autocomplete;

function initAutocomplete() {

    autocomplete = new google.maps.places.Autocomplete(document.getElementById('locationInput'), { types: ['geocode'] });
}

var forms = document.getElementsByTagName('form');
for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener('invalid', function (e) {
        e.preventDefault();
        //Possibly implement your own here.
    }, true);
}