import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './perfil.html';

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});

Template.uploadForm.events({
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // multiple files were selected
      var upload = IMAGES.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          console.log('Error during upload: ' + error);
        } else {
          console.log('File "' + fileObj.name + '" successfully uploaded');
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});




Template.perfil.helpers({
  UserPerfil:function(){
    if(Accounts.user().profile.name!=undefined)
    {
      return Accounts.user().profile.name;
    }else{
      return Accounts.user().username+' '+Accounts.user().profile.fullname;
    }
  }
});
Template.perfil.events({
    "click #guardar":function(e){
        e.preventDefault();
    var r=$("#perfil").serializeObject();
    profile = PERFIL.findOne({user:Accounts.user()._id});
    console.log(r);
    if(profile!=null)
      PERFIL.update({_id:profile._id},{
        $set:r
      });
    else
      PERFIL.insert(r);
    }
});
Template.perfil.helpers({
   dataProfile(user_id){

    data = PERFIL.findOne({user:Accounts.user()._id});
    return data;
  }
});
Template.perfil.helpers({
  itemN(){
      var usuario = Accounts.users.findOne({_id:this._id});
      return usuario.username;
  },  
  usuarios:function(){
      return Meteor.users.find();
    }
});
Template.perfil.events({
  "click #btnUser":function(e){
    e.preventDefault();
    var us = Accounts.users.findOne({_id:this._id});
    console.log(us);
    CHAT.insert(us);
    
  }
});

/*Template.forms.events({
    'click #registrarID': function(e, t) {
        e.preventDefault();
        // Retrieve the input field values
        var email = $('#emailID').val(),
            firstName = $('#nombreID').val(),
            lastName = $('#apellidoID').val(),
            password = $('#passwordID').val(),
            passwordAgain = $('#repasswordID').val();

        // Trim Helper
        var trimInput = function(val) {
            return val.replace(/^\s*|\s*$/g, "");
        }
        var email = trimInput(email);

        // Check password is at least 6 chars long
        var isValidPassword = function(pwd, pwd2) {
            if (pwd === pwd2) {
                return pwd.length >= 6 ? true : false;
            } else {
                return swal({
                    title: "Passwords don't match",
                    text: "Please try again",
                    showConfirmButton: true,
                    type: "error"
                });
            }
        }

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        if (isValidPassword(password, passwordAgain)) { 
            Accounts.createUser({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password
            }, function(error) {
                if (error) {
                    return swal({
                    title: error.reason,
                    text: "Please try again",
                    showConfirmButton: true,
                    type: "error"
                });
                } else {
                    FlowRouter.go('/');
                }
            });
        }

        return false;
    }
});





/*$(function() {
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variables privadas
        var links = this.el.find('.link');
        // Evento
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    }

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el;
            $this = $(this),
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if (!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
        };
    }   

    var accordion = new Accordion($('#accordion'), false);
});
*/