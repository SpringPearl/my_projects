function storeUserDetails(){
	var email = document.getElementById("loginEmail").value;
	var password = document.getElementById("loginPassword").value;

	localStorage.email = email;
	localStorage.password = password;

}

function onSubmitClick(){
	var email = document.getElementById("loginEmail").value;
	var password = document.getElementById("loginPassword").value;

	if(email == "" || password == ""){
		alert("Please complete the form");
	}
	else{
		storeUserDetails();
		setCookie("username",email);
		window.location = "index.html";
	}
}

document.getElementById("loginSubmit").addEventListener("click",onSubmitClick);
document.getElementById("cookieName").innerHTML = getCookieValue("username");