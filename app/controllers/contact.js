var Alloy = require('alloy');

var win = $.win;
var view = $.web;


var init = function(){
	Ti.API.info('[contact][init]');
	refresh();
};

var refresh = function(){
	var url = Alloy.Globals.REST_PATH + 'node/5' + '.json';

	// Create a connection inside the variable xhr
	var xhr = Titanium.Network.createHTTPClient();
	
	// Open the xhr
	xhr.open("GET",url);
	
	xhr.onerror = function(err){
		handleError();
	}
	
	// When the xhr loads we do:
	xhr.onload = function() {
		// Save the status of the xhr in a variable
		// this will be used to see if we have a xhr (200) or not
		var statusCode = xhr.status;
		
		// Check if we have a xhr
		if(statusCode == 200) {
			// Save the responseText from the xhr in the response variable
			var response = xhr.responseText;
			
			// Parse (build data structure) the JSON response into an object (data)
			var data = JSON.parse(response);
			
			var bodyHtml = '<html><head><title>Sample HTML</title><link rel="stylesheet" href="styles.css" type="text/css" /></head><body><div class="webview">';
			bodyHtml = bodyHtml + '<h1>' + data.title + '</h1>' + data.body.und[0].value;
			bodyHtml = bodyHtml + '</div></body></html>';
			
			// Add bodyHtml labels to our view
			view.setHtml(bodyHtml);
			
		}
		else {
			handleError();
		}
	}
	
	xhr.send();
};

var handleError = function(){
	$.errorLabel.visible = true;
};