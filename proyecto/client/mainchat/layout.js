Template.layout.helpers({
	isUserLogin(){
		return !!Accounts.userId();
	},
	ready(){
		return FlowRouter.subsReady("loadMsn")&&FlowRouter.subsReady("loadUsers");
	},
	msnList(){
		return MESSAGES.find({});
	},
});
Template.layout.events({
	"submit .chatSendMessages":function(event)
	{
		event.preventDefault();
		var message = event.target.msn.value;
		MESSAGES.insert({msn:message,date:new Date()});
		event.target.msn.value="";
	}
})