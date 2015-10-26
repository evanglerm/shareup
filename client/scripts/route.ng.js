angular
.module('Whatsapp')
.config(config);

function config($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'client/templates/tabs.ng.html'
	})
	.state('tab.forms', {
		url: '/forms',
		views: {
			'tab-forms': {
				templateUrl: 'client/templates/forms.ng.html',
				controller: 'formsCtrl'
			}
		}
	})
	.state('tab.chats', {
		url: '/chats',
		views: {
			'tab-chats': {
				templateUrl: 'client/templates/chats.ng.html'
			}
		}
	})
	.state('tab.contacts', {
		url: '/contacts',
		views: {
			'tab-contacts': {
				templateUrl: 'client/templates/contacts.ng.html'
			}
		}
	})
	.state('tab.settings', {
		url: '/settings',
		views: {
			'tab-settings': {
				templateUrl: 'client/templates/settings.ng.html',
				controller: 'settingsCtrl'
			}
		}
	});

	$urlRouterProvider.otherwise('tab/forms');
}