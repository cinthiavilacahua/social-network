Template.principal.helpers({
            
   isUserLogin(){
		return !!Accounts.userId();
	},
	ready(){
		return FlowRouter.subsReady("loadUsers");
	},
	getUser(){
		return Meteor.user.find();
	},
	'foundUser': function() {

    return Session.get('foundUser');

    }
 
    
});
Template.principal.events({ 

  'submit form': function(event) {

    var searchUser = event.target.searchUser.value;

 

    var foundUser = Meteor.call('findUser', searchUser, function(err, res) {

      if (res) Session.set('foundUser', res);

    });

    return false;

  },
  
  'click #follow': function() {

    Meteor.call('followUser', Session.get('foundUser').username);

  }
       
       

});

Template.principal.helpers({
  itemN(){
      var usuario = Accounts.users.findOne({_id:this._id});
      return usuario.username+' '+usuario.principal.fullname+' '+'g3';
  },  
  usuarios:function(){
      return Meteor.users.find();
  }
});
Template.principal.events({
	"click #verPerfil":function(e){
	e.preventDefault();
	var usuario = Accounts.users.findOne({_id:this._id});
    console.log(usuario);
    //AMIGOS.insert(usuario);
	}
});


/*{{# each usuarios}}

   <div>
       {{username}}
       {{status.online}}
    </div>						        
    
{{/ each}}*/


/*Template.layout.helpers({
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






var comments = new ReactiveVar(false);

Template.mainWallForm.events({
	"submit #mainForm":function(e){
		e.preventDefault();
		var message = e.target.message.value
		ARTICLE.insert({msn:message});
		e.target.message.value = ""
	}
});
Template.mainWallLoadMsn.helpers({
	isReady(){
		return FlowRouter.subsReady("loadWall");
	},
	items(){
		return ARTICLE.find();
	}
});
Template.ArticlesView.events({
	"click #comentBtn":function(e){
		//e.preventDefault();
		comments.set(true);
	}
});
Template.mainWallCommentForm.events({
	"submit #mainCommentForm":function(e){
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
		return FlowRouter.subsReady("loadComments");	
	},
	listCommnets(){
		console.log("ENTER");
		return COMMENT.find();
	}
});*/