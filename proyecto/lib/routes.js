FlowRouter.route("/", {
	name:"mainLayout",
	subscriptions:function(params,queryParams){
		this.register("loadImages",Meteor.subscribe('files.images.all'));
	},
	action(){
		BlazeLayout.render("mainLayout",{main:"forms"});
	}
});

FlowRouter.route("/main",{
	name : "main",
	subscriptions:function(params, queryParams)
	{
		//console.log(queryParams.);
		this.register("loadImages",Meteor.subscribe('files.images.all'));
		this.register("loadComments",Meteor.subscribe("getComments",queryParams.id));
		this.register("loadWall",Meteor.subscribe("getArticles",Meteor.userId()));
	},
	action(){
		BlazeLayout.render("mainLayout",{main:"mainWall"});
	}
});
FlowRouter.route("/aboutus", {
	name:"aboutus",
	action() {
		BlazeLayout.render("mainLayout",{ main:"about" });
	}
});

FlowRouter.route("/chat", {
	name:"chat",
	subscriptions:function(params, queryParams)
	{
		this.register("loadMsn",Meteor.subscribe("getMsn"));
		this.register("loadUsers",Meteor.subscribe("getUsers"));
	},
	action() {
		BlazeLayout.render("mainLayout",{ main:"layout" });
	}
});
FlowRouter.route("/perfil", {
	name:"perfil",
	subscriptions:function(params, queryParams)
	{
		this.register("loadMsn",Meteor.subscribe("getMsn"));
		this.register("loadUsers",Meteor.subscribe("getUsers"));
	},
	action() {
		BlazeLayout.render("mainLayout",{ main:"perfil" });
	}
});

FlowRouter.route("/principal", {
	name:"Principal",
	subscriptions:function(params, queryParams)
	{
		this.register("loadImages",Meteor.subscribe('files.images.all'));
		this.register("loadComments",Meteor.subscribe("getComments",queryParams.id));
		this.register("loadWall",Meteor.subscribe("getArticles",Meteor.userId()));
		this.register("loadUsers",Meteor.subscribe("getUsers"));
		this.register("loadMsn",Meteor.subscribe("getMsn"));
		
	},
	action() {
		BlazeLayout.render("mainLayout",{ main:"principal", });
	}
});

FlowRouter.route("/grupos", {
	name:"grupos",
	subscriptions:function(params, queryParams)
	{
	    
		this.register("loadUsers",Meteor.subscribe("getUsers"));
		this.register("loadMsn",Meteor.subscribe("getMsn"));
	},
	action() {
		BlazeLayout.render("mainLayout",{ main:"grupos" });
	}
});
