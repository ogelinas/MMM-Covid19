/* Magic Mirror
 * Node Helper: MMM-Covid19
 *
 * By Olivier Gélinas
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
var request = require('request');
// var JSON = require('json');


module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */

	getData: function(data_set) {
		var self = this;

		console.log("Retreiving data from " + data_set.url);

		request(
			{
				'url': data_set.url,
				'method': 'GET',
			},
			function (error, response, body) {
				// console.log('error: ' + error);
				// console.log('response: ' + response.statusCode);
				// console.log('body: '+ body);
				var data = JSON.parse(body)
				var result = {"data_set": data_set, "error": error, "response": response, "body": data};
				self.sendNotification({"covid_data": result});
			}
		);
	},

	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === 'MMM-Covid19-send') {
			self.getData(payload);
		}
	},

	// Example function send notification test
	sendNotification: function(payload) {
		console.log("MMM-Covid19-data");
		this.sendSocketNotification("MMM-Covid19-data", payload);
	},
});