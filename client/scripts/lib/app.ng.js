
angular.bootstrap = (function() {
    var originalBootstrap = angular.bootstrap;


    return function (a, b, c) {

    	if(angular.isbootstraped == undefined)
    	{
    		angular.isbootstraped = true;	
    	}

    	if(angular.isbootstraped)
    	{
        	originalBootstrap(a, b, c);
        	angular.isbootstraped = false;
    	}
    }
})();

Meteor.startup(function ()
{
      angular.bootstrap(document, ['Whatsapp']);
});

angular.module('Whatsapp', ['angular-meteor','ionic'])

.run(['$ionicPlatform',function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}])