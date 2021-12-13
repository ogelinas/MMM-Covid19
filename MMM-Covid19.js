/* global Module */

/* Magic Mirror
 * Module: MMM-Covid19
 *
 * By Olivier Gélinas
 * MIT Licensed.
 */

Module.register("MMM-Covid19", {
	defaults: {
		header: "Covid-19",
		updateInterval: 60*60*1000,
		retryDelay: 5000,
		data_sets: [
			{'id': 'can', 'location': 'Canada', 'url': "https://api.covid19tracker.ca/reports"},
			{'id': 'qc', 'location': 'Québec', 'url': "https://api.covid19tracker.ca/reports/province/qc"},
			{'id': 'est', 'location': 'Estrie', 'url': "https://api.covid19tracker.ca/reports/regions/2405"}
		],
		display: ["cases", "fatalities", "tests", "hospitalizations", "criticals", "recoveries", "vaccinations"]
	},



	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;

		Log.info('Starting module: ' + this.name);
		this.loaded = false;

		self.getData();
		
		setInterval(function() {
			//this.sendSocketNotification('MMM-Covid19-send', urls);
			self.getData();
			self.updateDom();
		}, this.config.updateInterval);
	},

	/*
	 * getData
	 * function example return data and show it in the module wrapper
	 * get a URL request
	 *
	 */
	getData: function() {

		var data_sets = this.config.data_sets;

		data_sets.forEach(data_set => {
			this.sendSocketNotification('MMM-Covid19-send', data_set);	
		});


		// this.loaded = false;
		// this.sendSocketNotification('MMM-Covid19-config', this.config);

		// var self = this;

		// var urlApi = "https://api.covid19tracker.ca/reports/regions/2405";
		// var retry = true;

		// var dataRequest = new XMLHttpRequest();
		// dataRequest.open("GET", urlApi, true);

		// dataRequest.onreadystatechange = function() {
		// 	console.log(this.readyState);
		// 	if (this.readyState === 4) {
		// 		console.log(this.status);
		// 		if (this.status === 200) {
		// 			self.processData(JSON.parse(this.response));
		// 		} else if (this.status === 401) {
		// 			self.updateDom(self.config.animationSpeed);
		// 			Log.error(self.name, this.status);
		// 			retry = false;
		// 		} else {
		// 			Log.error(self.name, "Could not load data.");
		// 		}
		// 		if (retry) {
		// 			self.scheduleUpdate((self.loaded) ? -1 : self.config.retryDelay);
		// 		}
		// 	}
		// };
		// dataRequest.send();
	},


	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update.
	 *  If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		nextLoad = nextLoad ;
		var self = this;
		setTimeout(function() {
			self.getData();
		}, nextLoad);
	},

	getDom: function() {

		var self = this;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");

		// var header = document.createElement('header');
		// header.innerHTML = "Covid-19";
		// wrapper.appendChild(header);

		// Table
		var table = document.createElement("table");
		table.classList.add("summary");
		wrapper.appendChild(table);

		// Row
		var tr = document.createElement("tr");
		table.appendChild(tr);

		// Location
		var td = document.createElement("td");
		td.innerHTML = "";
		td.classList.add("small", "bright", "location");
		tr.appendChild(td);


		// total_cases
		if (this.config.display.includes("cases")) {
			var td = document.createElement("td");
			td.innerHTML = "Cas";
			td.classList.add("xsmall", "light", "data");
			tr.appendChild(td);
		}
		

		// total_fatalities
		if (this.config.display.includes("fatalities")) {
			var td = document.createElement("td");
			td.innerHTML = "Décès";
			td.classList.add("xsmall", "light", "data");
			tr.appendChild(td);
		}
		

		// total_tests
		if (this.config.display.includes("tests")) {
			var td = document.createElement("td");
			td.innerHTML = "Test";
			td.classList.add("xsmall", "light", "data");
			tr.appendChild(td);
		}
		

		// total_hospitalizations
		if (this.config.display.includes("hospitalizations")) {
			var td = document.createElement("td");
			td.innerHTML = "Hospi.";
			td.classList.add("xsmall", "light", "data");
			tr.appendChild(td);
		}
		

		// total_criticals
		if (this.config.display.includes("criticals")) {
			var td = document.createElement("td");
			td.innerHTML = "Critique";
			td.classList.add("xsmall", "light", "data");
			tr.appendChild(td);	
		}
		

		// total_recoveries
		if (this.config.display.includes("recoveries")) {
			var td = document.createElement("td");
			td.innerHTML = "Rétabli";
			td.classList.add("xsmall", "light", "data");
			tr.appendChild(td);
		}
		

		// total_vaccinations
		if (this.config.display.includes("vaccinations")) {
			var td = document.createElement("td");
			td.innerHTML = "Vacciné";
			td.classList.add("xsmall", "light", "data");
			tr.appendChild(td);	
		}
		



		self.config.data_sets.forEach(data_set => {
			// Row
			var tr = document.createElement("tr");
			//table.appendChild(tr);
			// tr.classList.add("total");
			tr.id = data_set.id + '_total';
			table.appendChild(tr);

			// Location
			var td = document.createElement("td");
			td.innerHTML = "";
			td.classList.add("small", "bright", "location");
			tr.appendChild(td);

			// total

			// total_cases
			if (this.config.display.includes("cases")) {
				var td = document.createElement("td");
				td.innerHTML = "";
				td.classList.add("xsmall", "bright", "data");
				tr.appendChild(td);
			}
			

			// total_fatalities
			if (this.config.display.includes("fatalities")) {
				var td = document.createElement("td");
				td.innerHTML = "";
				td.classList.add("xsmall", "bright", "data");
				tr.appendChild(td);
			}
			

			// total_tests
			if (this.config.display.includes("tests")) {
				var td = document.createElement("td");
				td.innerHTML = "";
				td.classList.add("xsmall", "bright", "data");
				tr.appendChild(td);
			}
			

			// total_hospitalizations
			if (this.config.display.includes("hospitalizations")) {
				var td = document.createElement("td");
				td.innerHTML = "";
				td.classList.add("xsmall", "bright", "data");
				tr.appendChild(td);
			}
			

			// total_criticals
			if (this.config.display.includes("criticals")) {
				var td = document.createElement("td");
				td.innerHTML = "";
				td.classList.add("xsmall", "bright", "data");
				tr.appendChild(td);
			}
			

			// total_recoveries
			if (this.config.display.includes("recoveries")) {
				var td = document.createElement("td");
				td.innerHTML = "";
				td.classList.add("xsmall", "bright", "data");
				tr.appendChild(td);
			}
			

			// total_vaccinations
			if (this.config.display.includes("vaccinations")) {
				var td = document.createElement("td");
				td.innerHTML = "";
				td.classList.add("xsmall", "bright", "data");
				tr.appendChild(td);
			}
			


			// change

			// Row
			var tr = document.createElement("tr");
			// table.appendChild(tr);
			tr.classList.add("change");
			tr.id = data_set.id + '_change';
			table.appendChild(tr);

			// Location - Date
			var td = document.createElement("td");
			td.innerHTML = "";
			td.classList.add("xsmall", "light", "location");
			tr.appendChild(td);

			// change_cases
			if (this.config.display.includes("cases")) {
				var td = document.createElement("td");
				td.innerHTML = "";
				td.classList.add("xsmall", "bright", "data");
				tr.appendChild(td);
			}
			

			// change_fatalities
			if (this.config.display.includes("fatalities")) {
				var td = document.createElement("td");
				td.innerHTML = "";
				td.classList.add("xsmall", "bright", "data");
				tr.appendChild(td);
			}
			

			// change_tests
			if (this.config.display.includes("tests")) {
				var td = document.createElement("td");
				td.innerHTML = "";
				td.classList.add("xsmall", "bright", "data");
				tr.appendChild(td);
			}
			

			// change_hospitalizations
			if (this.config.display.includes("hospitalizations")) {
				var td = document.createElement("td");
				td.innerHTML = "";
				td.classList.add("xsmall", "bright", "data");
				tr.appendChild(td);
			}
			

			// change_criticals
			if (this.config.display.includes("criticals")) {
				var td = document.createElement("td");
				td.innerHTML = "";
				td.classList.add("xsmall", "bright", "data");
				tr.appendChild(td);
			}
			

			// change_recoveries
			if (this.config.display.includes("recoveries")) {
				var td = document.createElement("td");
				td.innerHTML = "";
				td.classList.add("xsmall", "bright", "data");
				tr.appendChild(td);
			}
			

			// change_vaccinations
			if (this.config.display.includes("vaccinations")) {
				var td = document.createElement("td");
				td.innerHTML = "";
				td.classList.add("xsmall", "bright", "data");
				tr.appendChild(td);
			}
			

		});

		return wrapper;
	},

	updateRow: function(payload) {

		console.log(payload);
		
		var data = payload.covid_data.body.data[payload.covid_data.body.data.length-1];
		var previous = payload.covid_data.body.data[payload.covid_data.body.data.length-2];

		var tr = document.getElementById(payload.covid_data.data_set.id + "_total");
		
		var i = -1;

		i++;
		tr.cells[i].innerHTML = payload.covid_data.data_set.location;

		if (this.config.display.includes("cases")) {
			i++;
			tr.cells[i].innerHTML = data.total_cases;
		}

		if (this.config.display.includes("fatalities")) {
			i++;
			tr.cells[i].innerHTML = data.total_fatalities;
		}
		
		if (this.config.display.includes("tests")) {
			i++;
			tr.cells[i].innerHTML = data.total_tests;
		}
		
		if (this.config.display.includes("hospitalizations")) {
			i++;
			tr.cells[i].innerHTML = data.total_hospitalizations;
		}

		if (this.config.display.includes("criticals")) {
			i++;
			tr.cells[i].innerHTML = data.total_criticals;
		}

		if (this.config.display.includes("recoveries")) {
			i++;
			tr.cells[i].innerHTML = data.total_recoveries;
		}

		if (this.config.display.includes("vaccinations")) {
			i++;
			tr.cells[i].innerHTML = data.total_vaccinations;
		}
		


		var tr = document.getElementById(payload.covid_data.data_set.id + "_change");

		var i = -1;

		i++;
		tr.cells[i].innerHTML = data.date;


		if (this.config.display.includes("cases")) {
			// i++;
			// tr.cells[i].innerHTML = data.change_cases;

			i++;
			span = document.createElement('span');
			span.innerHTML = data.change_cases;
			if (data.change_cases > previous.change_cases) {
				span.classList.add("plus");
			} else if (data.change_cases < previous.change_cases) {
				span.classList.add("minus");
			}
			tr.cells[i].innerHTML = "";
			tr.cells[i].append(span);
		}
		
		if (this.config.display.includes("fatalities")) {
			// i++;
			// tr.cells[i].innerHTML = data.change_fatalities;

			i++;
			span = document.createElement('span');
			span.innerHTML = data.change_fatalities;
			if (data.change_fatalities > previous.change_fatalities) {
				span.classList.add("plus");
			} else if (data.change_fatalities < previous.change_fatalities) {
				span.classList.add("minus");
			}
			tr.cells[i].innerHTML = "";
			tr.cells[i].append(span);
		}
		
		if (this.config.display.includes("tests")) {
			// i++;
			// tr.cells[i].innerHTML = data.change_tests;

			i++;
			span = document.createElement('span');
			span.innerHTML = data.change_tests;
			if (data.change_tests > previous.change_tests) {
				span.classList.add("plus");
			} else if (data.change_tests < previous.change_tests) {
				span.classList.add("minus");
			}
			tr.cells[i].innerHTML = "";
			tr.cells[i].append(span);
		}
		
		if (this.config.display.includes("hospitalizations")) {
			i++;
			span = document.createElement('span');
			span.innerHTML = data.change_hospitalizations;
			if (data.change_hospitalizations > 0) {
				span.classList.add("plus");
			} else if (data.change_hospitalizations < 0) {
				span.classList.add("minus");
			}
			tr.cells[i].innerHTML = "";
			tr.cells[i].append(span);
		}
		
		if (this.config.display.includes("criticals")) {
			i++;
			span = document.createElement('span');
			span.innerHTML = data.change_criticals;
			if (data.change_criticals > 0) {
				span.classList.add("plus");
			} else if (data.change_criticals < 0) {
				span.classList.add("minus");
			}
			tr.cells[i].innerHTML = "";
			tr.cells[i].append(span);
		}
		
		if (this.config.display.includes("recoveries")) {
			i++;
			tr.cells[i].innerHTML = data.change_recoveries;
		}
		
		if (this.config.display.includes("vaccinations")) {
			i++;
			tr.cells[i].innerHTML = data.change_vaccinations;
		}
		
	},

	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
			"MMM-Covid19.css",
		];
	},

	// Load translations files
	getTranslations: function() {
		//FIXME: This can be load a one file javascript definition
		return {
			en: "translations/en.json",
			es: "translations/es.json",
			fr: "translations/fr.json",
		};
	},

	processData: function(data) {
		var self = this;
		this.dataRequest = data;
		if (this.loaded === false) { self.updateDom(self.config.animationSpeed) ; }
		this.loaded = true;

		// the data if load
		// send notification to helper
		this.sendSocketNotification("MMM-Covid19-NOTIFICATION_TEST", data);
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if(notification === "MMM-Covid19-data") {
			// set dataNotification
			console.log(Date.now());
			this.dataNotification = payload;
			this.updateRow(payload);
			//this.updateDom();
		}
	},
});
