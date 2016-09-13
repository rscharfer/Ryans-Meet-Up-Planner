/* eslint-disable no-console */

var eventInput = document.querySelector('#eventInput');
var typeEventInput = document.querySelector('#typeEventInput');
var hostInput = document.querySelector('#hostInput');
var startTimeInput = document.querySelector('#startTimeInput');
var endTimeInput = document.querySelector('#endTimeInput');
var guestInput = document.querySelector('#guestInput');  // eslint-disable-line no-unused-vars
var locationInput = document.querySelector('#locationInput');
var passwordInput = document.querySelector('#passwordInput');
var confirmedPassword= document.querySelector('#passwordConfirmationInput');
var messageInput= document.querySelector('#messageInput');
var addEventButton = document.querySelector('#addEvent');


var emailInput = document.querySelector('#emailInput');

emailInput.addEventListener('input',function(){
	console.log(this.checkValidity());
}, false);


var events = [];


class Event {


	

	constructor(name,eventType,host,startDateTime,endDateTime,guestList,location,optMessage=''){

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



addEventButton.addEventListener('click',addEvent);




var addGuestButton = document.querySelector('#addGuest');

addGuestButton.addEventListener('click',addGuest);
passwordInput.addEventListener('input',checkPassword);
confirmedPassword.addEventListener('blur',samePassword);



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







