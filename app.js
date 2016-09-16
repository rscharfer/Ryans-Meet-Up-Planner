/* eslint-disable no-console */



// Inputs 


var nameInput = document.querySelector('#nameInput');
var emailInput = document.querySelector('#emailInput');
var passwordInput = document.querySelector('#passwordInput');
var confirmedPassword= document.querySelector('#passwordConfirmationInput');
var birthdayInput= document.querySelector('#birthdayInput');
var employerInput = document.querySelector('#employerInput');
var positionInput = document.querySelector('#positionInput');
var loveJobInput = document.querySelector('#loveJobInput');




var eventInput = document.querySelector('#eventInput');
var typeEventInput = document.querySelector('#typeEventInput');
var hostInput = document.querySelector('#hostInput');
var startTimeInput = document.querySelector('#startTimeInput');
var endTimeInput = document.querySelector('#endTimeInput');
var guestInput = document.querySelector('#guestInput');
var locationInput = document.querySelector('#locationInput');
var messageInput= document.querySelector('#messageInput');


// Buttons

var createEventButton = document.querySelector('#createEventButton');
var submitEventButton = document.querySelector('#addEvent');
var createAccountButton = document.querySelector('#createAccountButton');
var submitAccountButton = document.querySelector('#submitNewAccount');
var addGuestButton = document.querySelector('#addGuest');

// Displays

var greeting = document.querySelector('#greeting');
var createAccountForm = document.querySelector('#createAccountForm');
var createEventForm = document.querySelector('#createEventForm');
var displayedEvents = document.querySelector('#displayedEvents');



// Event Listeners 




createAccountButton.addEventListener('click',function(){

	createAccountForm.style.display='block';
	greeting.style.display='none';
},false);


submitAccountButton.addEventListener('click',function(e){

	e.preventDefault();
	let name = nameInput.value;
	let email = emailInput.value;
	let password = passwordInput.value;
	let birthday = birthdayInput.value;
	let employer = employerInput.value;
	let position = positionInput.value;
	let loveJob = loveJobInput.value;
	let newAccount = new Account(name,email,password,birthday,employer,position,loveJob);
	localStorage.setItem(name,JSON.stringify(newAccount));
	console.dir(JSON.parse(localStorage.getItem(name)) instanceof Account);


},false);






createEventButton.addEventListener('click',function(){

	createEventForm.style.display='block';
	greeting.style.display='none';
},false);



addGuestButton.addEventListener('click',addGuest);
passwordInput.addEventListener('input',checkPassword);
confirmedPassword.addEventListener('blur',samePassword);
submitEventButton.addEventListener('click',addEvent);






function checkforEvents(){

	for (let key in localStorage){
		let value = localStorage.getItem(key);
		value = JSON.parse(value);
		if (value instanceof Event){
			createEventDisplay(value);
		}
	}
}













var events = [];


class Event {


	

	constructor(name,eventType,host,startDateTime,endDateTime,guestList,location,optMessage=''){

		this.eventOrAccount = 'Event';
		this.name = name;
		this.eventType = eventType;
		this.host = host;
		this.startDateTime = startDateTime;
		this.endDateTime=endDateTime;
		this.guestList=guestList;
		this.location=location;
		this.optMessage = optMessage;
	}


}




class Account {


	

	constructor(name,email,password,birthdate,work,position,workLike){

		this.eventOrAccount = 'Account';
		this.name = name;
		this.email = email;
		this.password = password;
		this.birthdate = birthdate;
		this.work=work;
		this.position=position;
		this.workLike=workLike;
	
	}


}














var guestListArray = [];

function addGuest(){
	let formGuestLabel = document.querySelector('label[for="guestInput"]');
	let guestList = document.querySelector('label[for="guestInput"] ul');
	let guestName = formGuestLabel.querySelector('input').value;
	let newItem = document.createElement('li');
	newItem.innerHTML=guestName;
	guestList.appendChild(newItem);
	formGuestLabel.querySelector('input').value='';
	guestListArray.push(guestName);


}




function checkPassword(){


	let password = this.value;
	let message = '';


	if(!/[a-z]/.test(password)){
		message = ' Please add a lower case letter to the password.';
		this.setCustomValidity(message);
		
	}

	else if(!/[A-Z]/.test(password)){
		message = ' Please add a upper case letter to the password.';
		this.setCustomValidity(message);
		
	}

	else if(!/[0-9]/.test(password)){
		message = ' Please add a number to the password.';
		this.setCustomValidity(message);
		
	}

	else if(!/[&%$*?!]/.test(password)){
		message = ' Please add one of the following characters to the password: &%$*?! .';
		this.setCustomValidity(message);
		
	}

	else if(!/.{10}/.test(password)){
		message = ' The password should be at least 10 characters long.';
		this.setCustomValidity(message);
		
	}

	else{
		message='Great password!';
		this.setCustomValidity('');
	}


	let passwordTip = document.querySelector('#passwordTip1');
	passwordTip.innerHTML = message;
	console.log(this.checkValidity());
}

function samePassword(){


	let confirmedPassword = this.value;
	let passwordInput = document.querySelector('#passwordInput');
	let password = passwordInput.value;
	let passwordTip = document.querySelector('#passwordTip2');

	let message = '';





	if(confirmedPassword!==password){
		message = 'The two passwords have to match.';
		this.setCustomValidity(message);
		
	}

	else{
	
		message='Passwords match!';
		this.setCustomValidity('');
	}



	passwordTip.innerHTML = message;
}


function addEvent(){
	let name = eventInput.value;
	let type = typeEventInput.value;
	let host = hostInput.value;
	let startTime = startTimeInput.value;
	let endTime = endTimeInput.value;
	let guests = guestListArray;
	let location = locationInput.value;
	let message = messageInput.value;
	let event = new Event(name,type,host,startTime,endTime,guests,location,message);
	localStorage.setItem(name,JSON.stringify(event));
	createEventDisplay(event);
	
	eventInput.value = '';
	typeEventInput.value = '';
	hostInput.value = '';
	startTimeInput.value = '';
	endTimeInput.value = '';
	guestListArray = '';
	locationInput.value = '';
	messageInput.value = '';

	let guestList = document.querySelector('label[for="guestInput"] ul');
	guestList.innerHTML='';
	guestListArray=[];


}


function createEventDisplay(){

	let eventContainer = document.getElementById('eventContainer');
	let event1 = document.getElementById('event1');
	let newEvent = event1.cloneNode(true);
	let numberOfEvents = document.getElementsByClassName('event').length;
	newEvent.id='event'+ ++numberOfEvents;
	newEvent.style.display='block';

	eventContainer.appendChild(newEvent);
	




}







