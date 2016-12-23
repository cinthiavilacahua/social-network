Template.grupos.events({
    'submit form': function(e, t) {
        e.preventDefault();
        // Retrieve the input field values
        var nombre   =  event.target.ngrupo.value;



        if (nombre == "") {
            alert('El nombre no puede ser vacío');
            return false;
        }          

        GRUPOS.insert({
            nombre    : nombre

        });
           
     }
});

Template.grupos.helpers({
    cantidad : function () {
        return GRUPOS.find().count();
    },
    grupo : function () {
        return GRUPOS.find();
    }
});
