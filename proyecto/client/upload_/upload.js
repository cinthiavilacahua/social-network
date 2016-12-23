 var LinkIMG = new ReactiveVar(false);
 var idIMG = "";
 Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
   stado(){
    return LinkIMG.get()
  },
  LINKIMG:function(){
    if(idIMG!=""){
      return IMAGES.findOne(idIMG);
    }
    return "";
  },
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});
Template.IMAGELIST.helpers({
 
  isReady(){
    return FlowRouter.subsReady("loadImages");
  },
  IMG:function(){
    var listImages = new Array();
    var collectionImages = IMAGES.find().fetch();
    _.each(collectionImages,function(images){
      listImages.push(IMAGES.findOne({_id:images._id}))
    });
    return listImages;
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
          alert('Error during upload: ' + error);
        } else {
          idIMG = fileObj._id;
          console.log(idIMG);
          var link = IMAGES.findOne(idIMG).link()
          imgHtml = "<img src='"+link+"'/>"
          var content = $("#input").val();
          content+=imgHtml;
          $("#input").val(content);
          LinkIMG.set(true);  
          //alert('File "' + fileObj.name + '" successfully uploaded');
        }
        template.currentUpload.set(false);
      });
      upload.start();
    }
  }
});