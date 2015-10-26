if(Meteor.isClient) {
    var templatesDb = new Mongo.Collection("templates");
}

angular
  .module('Whatsapp')
  .controller('formsCtrl', formsCtrl)
  .filter('inputTypeFilter', filterFunc);
 
function formsCtrl ($scope) {

	$scope.isNewTemplate =  false;

	$scope.fieldDataJson = {};

	$scope.noOfFields = 0;

	$scope.templateName = "";

	$scope.templatesData = {};

	$scope.isTemplateSelected = false;

	$scope.selectedTemplateJson = {}; 

	$scope.changeNumberOfFields = function() {
		if($scope.noOfFields > 0)
		{
			$scope.fieldDataJson = createFieldDataJson($scope.noOfFields, $scope.templateName);	
		}
	};

	$scope.createNewTemplate =  function() {
		$scope.isNewTemplate = true;
		$scope.fieldDataJson = {};
	};

	$scope.getNumberOfFields = function() {
		return $scope.fieldDataJson.metadata;
	};

	$scope.saveToDataBase = function() {
		if(Meteor.isClient)
		{
			templatesDb.insert($scope.fieldDataJson);
			$scope.templatesData = fetchDBObjects();
			$scope.cancel();
		}
	};

	$scope.removeItem = function(id) {
		console.log(id);
		templatesDb.remove(id);
		$scope.templatesData = fetchDBObjects();
	};

	$scope.cancel = function() {
		$scope.isNewTemplate =  false;
		$scope.isTemplateSelected = false;
		addData();
	};

	$scope.selectedTemplate = function(template) {
		console.log(template);
		$scope.isTemplateSelected = true;
		$scope.selectedTemplateJson = template;
	};

	$scope.checkIfDropDown = function(param) {
		return (param.toLowerCase() == "dropdown");
	};

	function createFieldDataJson(num, templateName) {
		var json = {};
		var value = [];

		for(var i=0; i<num; i++)
		{
			var fieldJson = {};
			fieldJson['fieldName'] = "";
			fieldJson['dataType'] = "1";
			fieldJson['fieldType'] = "String";
			fieldJson['lenght'] = "";

			value.push(fieldJson);
		}

		json['name'] = templateName;
		json['metadata'] = value;

		return json;
	};

	function fetchDBObjects()
	{
		return templatesDb.find().fetch();
	};

	function addData() {
		$scope.templatesData = fetchDBObjects();
	};

	

	Tracker.autorun(function(){
   		Meteor.subscribe("templates", function(){
      		//console.log(templatesDb, templatesDb.find(), templatesDb.find().fetch());
      		addData();
   		});
	});
};

function filterFunc() {
	return function(input) {
		if(input.toLowerCase() == "string")
		{
			return  "text";
		}
		else if(input.toLowerCase() == "number")
		{
			return  input.toLowerCase();
		}
		else if(input.toLowerCase() == "date")
		{
			return  input.toLowerCase();
		}
		else
		{
			return "text";
		}
		return input;
	};
};