import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	Meteor.publish("getMsn",function(){
		return MESSAGES.find();
	});
	Meteor.publish("getUsers",function(){
		return Meteor.users.find();
	});
	Meteor.publish("getArticles",function(id){
		return ARTICLE.find({user:id});
	});
	Meteor.publish("getComments",function(idArticle){
		return COMMENT.find({idMsn:idArticle});
	});
  Meteor.publish('files.images.all', function() {
    return IMAGES.find().cursor;
  });
  Meteor.methods({
  	remove: function (id) {
  		return ARTICLE.remove(id,function(err){
  			if(err){
  				console.log("Error"+err);
  				return false;
  			}
  			return true;
  		});
  	},
  	"checkEmail": function(email){
  		var exp = /^[_a-z0-9]+(-[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/
  		var ok = exp.exec(email);
  		if(!OK){
  			return {error:"El correo esta mal escrito"}
  		}
  		//if
  	}
  });
});


