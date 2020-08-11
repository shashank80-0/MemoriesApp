function validateForm(){
	let emailId = $('#email-id').val();
	let password = $('#password').val();
	let confirmPassword = $('#confirm-password').val();

	if(isEmpty(emailId)){
		alert("Please enter Email Address!");
		return false;
	}
	else if(isEmpty(password)){
		alert("Please enter Password");
		return false;
	}
	else if(isEmpty(confirmPassword)){
		alert("Please confirm Password");
		return false;
	}
	else if(confirmPassword != password){
		alert("Passwords do not match");
		return false;
	}

}

function isEmpty(value){
	if(value=='' || value == null){
		return true;
	}
	else
		return false;
}