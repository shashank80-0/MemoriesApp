function validateForm(){
	console.log("Validation has started");
	let emailId = $('#email-id').val();
	let password = $('#password').val();

	if(isEmpty(emailId)){
		alert("Please enter Email Address!");
		return false;
	}
	else if(isEmpty(password)){
		alert("Please enter Password");
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