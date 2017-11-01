var quizList = JSON.parse(listOfquiz);

var index = 0; //Represents each quiz view
var score = 0;
var noOfOptions = quizList[index].options.length;
var selectedRadioIndex = new Array(); //An array to preserve the selected answer from each quiz

function quizForm(){
	var radio = document.getElementById("radio");

	//Clear the current screen everytime to load the new quiz
	radio.innerHTML = '';

	//Displays the quiz question
	var quizQuestion = document.getElementById("quizQuestion");
	quizQuestion.textContent = quizList[index].question;

	//If first quiz, donot display previous button
	var previousQuestion = document.getElementById("previousQuestion");

	if(index === 0){
		previousQuestion.style.display = 'none';
	}
	else{
		previousQuestion.style.display = 'inline';
	}

	//Created the radio buttons to provide options
	for(var i=0;i<noOfOptions;i++){
		var radioInput = document.createElement('input');
		var label = document.createElement('label');

		radioInput.setAttribute("type","radio");
		radioInput.setAttribute("name","radioOptions");
		radioInput.setAttribute("value",quizList[index].options[i]);
		label.textContent = quizList[index].options[i];
		radio.appendChild(radioInput);
		radio.appendChild(label);
	}

	var radio = document.getElementsByName("radioOptions");

	//If an option was already selected keep it selected while navigating through quizzes
	var selected = selectedRadioIndex[index];

	if(selected!= null){
		radio[selected].checked = true;
	}

	$("#quiz").fadeIn("3000");
}

function checkAnswer(){
	var radio = document.getElementsByName("radioOptions");
	var noOfQuiz = quizList.length;
	
	for(var i=0;i<noOfQuiz;i++){
		var answerIndex = quizList[i].answer;

		if(selectedRadioIndex[i] === answerIndex){
			score++;
		}
	}

	
}

function previousQuestion(){
	var radio = document.getElementsByName("radioOptions");
	//Reassigning the selectedRadioIndex,incase another option is selected.
	for(var i=0;i<radio.length;i++){
		if(radio[i].checked){
			selectedRadioIndex[index] = i;
			break;
		}
	}
	index--;
	quizForm();
}

function nextQuestion(){
	var radio = document.getElementsByName("radioOptions");
	var selectedRadioCount = 0;
	var noOfQuiz = quizList.length;

	//Check if an option is selected
	for(var i=0;i<radio.length;i++){
		if(radio[i].checked){
			selectedRadioIndex[index] = i;
			selectedRadioCount++;
		}
	}
//If an option is selcted only then move to the next quiz
	if(selectedRadioCount>0){
		$("#quiz").fadeOut("3000");
		index++;

		//If last quiz display score or else display the form for next quiz
		if(index == noOfQuiz){
			checkAnswer();
			document.write("The total score you achieved is " + score);
		}
		else{

			quizForm();
		}
	}
	else{
		alert("Please select an option to proceed")
	}
}

document.getElementById("nextQuestion").addEventListener("click", nextQuestion);
document.getElementById("previousQuestion").addEventListener("click", previousQuestion);
