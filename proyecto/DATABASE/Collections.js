import {Mongo} from "meteor/mongo";

ARTICLE = new Mongo.Collection("articles");
COMMENT = new Mongo.Collection("comments");
IMAGES = new FilesCollection({
		storagePhat: '/data/',
		downloadRoute: '/files/images',
  collectionName: 'IMAGES',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|mp4|jpg|jpeg/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  }
});


MESSAGES = new Mongo.Collection("messages",{
	transform:function(row){
		//row.username="Ditmaros";
		var user = Meteor.users.findOne({_id:row.user})
		if(!!user.profile)
		{
			row.username = user.profile.name; 
		}
		if(!!user.emails)
		{
			row.username = user.emails[0].address;
		}
		return row;
	}
});
PERFIL = new Mongo.Collection("perfil");
CHAT =  new Mongo.Collection("chat");
//Relationships = new Mongo.Collection("relationships");
//contacto =  new Mongo.Collection("contacto");
GRUPOS = new Mongo.Collection ("grupos");
COMMENT.allow({
	insert:function(userId,params){
		return !!userId;
	}
});
ARTICLE.allow({
	update:function(){
		return true;
	},
	insert:function(userId,params){
		console.log("--> ENTER ");
		return !!userId;
	}
});
MESSAGES.allow({
	insert:function(userId,params)
	{
		return !!userId;
	}
});
var articlesSchema =  new SimpleSchema({
	msn: {
		type:String
	},
	date: {
		type:Date,
		autoValue:function(){
			return new Date();
		}
	},
	user: {
		type:String,
		autoValue:function(){
			return this.userId
		}
	},
	mediaContent: {
		type:String
	},
	edit: {
		type:Boolean
	}
});
var commentSchema = new SimpleSchema({
	msn: {
		type:String,
	},
	date: {
		type:Date,
		autoValue: function(){
			return new Date();
		}
	},
	user:{
		type:String,
		autoValue:function(){
			return this.userId;
		}
	},
	idMsn:{
		type:String
	}
});
COMMENT.attachSchema(commentSchema);
ARTICLE.attachSchema(articlesSchema);
var messagesSchema = new SimpleSchema({
	msn: {
		type:String
	},
	date: {
		type:Date,
		autoValue:function() {
			return new Date();
		}
	},
	user: {
		type:String,
		autoValue:function(){
			return this.userId;
		}
	}
});
MESSAGES.attachSchema(messagesSchema);