var checkEmail = new ReactiveVar(false);
Template.suscripcionForm.helpers({
	checkEmail(){
		return checkEmail.get();
	}
})
/*Template.suscripcionForm.events({
	'keydown #email': function (e) {
		var correo = e.target.value;
		Meteor.call('checkEmail',correo, 
			function (error, result){
				if(result.value){
					checkEmail.set({value.result.value,text:correo});
				}
			 
		});
	
})  */