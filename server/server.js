
if(Meteor.isServer) {
    Meteor.startup(function () {
      	var templatesDb = new Meteor.Collection("templates");
        Meteor.publish("templates", function () {
          return templatesDb.find();
        });
    });
    
}