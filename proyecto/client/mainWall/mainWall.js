var comments = new ReactiveVar(false);

Template.mainWallForm.events({
	"submit #mainForm":function(e){
		e.preventDefault();
		var message = e.target.message.value
		ARTICLE.insert({msn:message,edit:false,mediaContent:"none"});
		e.target.message.value = ""
	}
});
Template.mainWallLoadMsn.helpers({
	isReady(){
		return FlowRouter.subsReady("loadWall")&&FlowRouter.subsReady("loadImages");
	},
	items(){
		return ARTICLE.find();
	}
});
Template.ArticlesView.events({
	"click #comentBtn":function(e){
		//e.preventDefault();
		comments.set(true);
	},
	"click #editBtn":function(e){
		e.preventDefault();
		ARTICLE.update({_id:this._id}, {$set:{edit:true}});
	},
	"submit #editform":function(e){
		var msn = e.target.msn.value; 
		ARTICLE.update({_id:this._id}, {$set:{edit:false,msn:msn}});
		return false;
	},
	"click #removeBtn":function(e){
		Meteor.call('remove',this._id, function (error, result){
			console.log(error+" "+result);	
		});
	}
});
Template.mainWallCommentForm.events({
	"submit #mainCommentForm ":function(e){
		e.preventDefault();
		var msn = e.target.comment.value;
		var idMsn = this._id;
		COMMENT.insert({msn:msn,idMsn:idMsn});
		e.target.comment.value = "";
	}
});
Template.ArticlesView.helpers({
	showCommets(){
		return comments.get();
	}
});
Template.mainWallCommentForm.helpers({
	ready(){
		return FlowRouter.subsReady("loadComments")&&FlowRouter.subsReady("loadUsers");	
	},
	listCommnets(){
		console.log("ENTER");
		return COMMENT.find();
	}
});