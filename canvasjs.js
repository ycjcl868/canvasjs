/*
 * CanvasJS v1.2.3 - http://canvasjs.com/
 * Copyright 2013 fenopix
 * 
 * CanvasJS follows Dual Licensing Model as mentioned below. 
 * 
 * ---------------------Free for Non-Commercial Use--------------------
 * 
 * For non-commercial purposes you can use the software for free under Creative Commons Attribution-NonCommercial 3.0 License. Refer to the following link for further details on the same.
 *     http://creativecommons.org/licenses/by-nc/3.0/deed.en_US
 * 
 * ---------------------Commercial License--------------------
 * Unless a commercial license has been purchased, you can use this product for evaluation purposes only. Please refer to the following link for further details 
 *     http://canvasjs.com/
 * 
 */

(function(){
	'use strict';
	/*jshint -W058,quotmark:false */

	var isDebugMode = false;

	//Default values for all Chart Elements that can be set by the user. CanvasJSObject.setOptions looks into this while setting the default/user-defined values.
	var defaultOptions = {
		Chart: {
			width: 500,
			height: 400,
			zoomEnabled: false,
			backgroundColor: "white",
			theme: "theme1",
			animationEnabled: true,
			colorSet: "colorSet1",
			culture: "en",
			creditHref: "http://canvasjs.com/",
			creditText: "CanvasJS.com"
		},

		CultureInfo: {
			decimalSeparator: ".",
			digitGroupSeparator: ",",
			zoomText: "Zoom",
			panText: "Pan",
			resetText: "Reset",
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		},

		Title: {
			padding: 0,
			text: null,
			verticalAlign: "top",//top, center, bottom
			horizontalAlign: "center",//left, center, right
			fontSize: 20,//in pixels
			fontFamily: "Calibri",
			fontWeight: "normal", //normal, bold, bolder, lighter,
			fontColor: "black",
			fontStyle: "normal", // normal, italic, oblique

			borderThickness: 0,
			borderColor: "black",
			cornerRadius: 0,
			backgroundColor: null,
			margin: 5
			//toolTipContent: null//string - To be implemented (TBI)
		},
		DataSeries: {
			name: null,
			dataPoints: null,
			label: "",
			bevelEnabled: false,

			cursor: null,

			indexLabel: "",
			indexLabelPlacement: "outside",  //inside, outside       
			indexLabelOrientation: "horizontal",
			indexLabelFontColor: "black",
			indexLabelFontSize: 12,
			indexLabelFontStyle: "normal", //   italic ,oblique, normal 
			indexLabelFontFamily: "Arial", // fx: Arial Verdana "Courier New" Serif
			indexLabelFontWeight: "normal", // bold ,bolder, lighter, normal
			indexLabelBackgroundColor: null,
			indexLabelLineColor: "#808080",
			indexLabelLineThickness: 1,

			lineThickness: 2,

			color: null,

			startAngle: 0,

			type: "column", //line, column, bar, area, scatter stackedColumn, stackedBar, stackedArea, stackedColumn100, stackedBar100, stackedArea100, pie, doughnut
			xValueType: "number", //number, dateTime
			axisYType: "primary",

			xValueFormatString: null,
			yValueFormatString: null,

			showInLegend: null,
			legendMarkerType: null,
			legendMarkerColor: null,
			legendText: null,

			markerType: "circle", //none, circle, square, cross, triangle, line
			markerColor: null,
			markerSize: null,
			markerBorderColor: null,
			markerBorderThickness: null,
			//animationEnabled: true,
			mouseover: null,
			mouseout: null,
			mousemove: null,
			click: null,
			toolTipContent: null
		},

		Axis: {
			minimum: null, //Minimum value to be shown on the Axis
			maximum: null, //Minimum value to be shown on the Axis
			interval: null, // Interval for tick marks and grid lines
			intervalType: null, //number, millisecond, second, minute, hour, day, month, year

			title: null, // string
			titleFontColor: "black",
			titleFontSize: 20,
			titleFontFamily: "arial",
			titleFontWeight: "normal",
			titleFontStyle: "normal",

			labelAngle: 0,
			labelFontFamily: "arial",
			labelFontColor: "black",
			labelFontSize: 12,
			labelFontWeight: "normal",
			labelFontStyle: "normal",

			prefix: "",
			suffix: "",

			includeZero: true, //Applies only for axisY. Ignored in axisX.

			tickLength: 5,
			tickColor: "black",
			tickThickness: 1,

			lineColor: "black",
			lineThickness: 1,

			gridColor: "A0A0A0",
			gridThickness: 0,

			interlacedColor: null,

			valueFormatString: null,

			margin: 2
		},

		Legend: {
			name: null,
			borderThickness: 0,
			borderColor: "black",
			cornerRadius: 0,
			verticalAlign: "center",
			horizontalAlign: "right",
			//dockInsidePlotArea: false,

			fontSize: 14,//in pixels
			fontFamily: "Calibri",
			fontWeight: "normal", //normal, bold, bolder, lighter,
			fontColor: "black",
			fontStyle: "normal" // normal, italic, oblique
		},

		ToolTip: {
			enabled: true,
			borderColor: null,
			shared: false,
			animationEnabled: true,
			content: null
		},

		//Private
		TextBlock: {
			x: 0,
			y: 0,
			width: null,//read only
			height: null,//read only
			maxWidth: null,
			maxHeight: null,
			padding: 0,
			angle: 0,
			text: "",
			horizontalAlign: "center",//left, center, right
			fontSize: 12,//in pixels
			fontFamily: "Calibri",
			fontWeight: "normal", //normal, bold, bolder, lighter,
			fontColor: "black",
			fontStyle: "normal", // normal, italic, oblique

			borderThickness: 0,
			borderColor: "black",
			cornerRadius: 0,
			backgroundColor: null,
			textBaseline: "top"
		}
	};

	//#region Cultures

	var cultures = {
		"en": {
			//Derives from the default options
		}//,
		//"es": {
		//    decimalSeparator: ",",
		//    digitGroupSeparator: ".",
		//    zoomText: "zoom",
		//    panText: "pan",
		//    resetText: "reset",
		//    days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
		//}
	};

	//#endregion Cultures

	//#region Themes

	var colorSets = {

		"colorSet1": [
			"#369EAD",
			"#C24642",
			"#7F6084",
			//"#96C412",
			"#86B402",
			"#A2D1CF",
			//"#D8C641",
			"#C8B631",
			"#6DBCEB",
			//"#4A4946",
			"#52514E",
			"#4F81BC",
			"#A064A1",
			"#F79647"
		],
		"colorSet2": [
			"#4F81BC",
			"#C0504E",
			"#9BBB58",
			"#23BFAA",
			//"#FAA586",
			"#8064A1",
			"#4AACC5",
			"#F79647"
			//"#FFC000",
			//"#7F6084"
		],
		"colorSet3": [
			"#8CA1BC",
			"#36845C",
			"#017E82",
			"#8CB9D0",
			"#708C98",
			"#94838D",
			"#F08891",
			"#0366A7",
			"#008276",
			"#EE7757",
			"#E5BA3A",
			"#F2990B",
			"#03557B",
			"#782970"
		]//,
		//"colorSet4": [
		//    "#3698C5",
		//    "#009B8D",
		//    "#F1D691",
		//    "#F8B90C",
		//    "#0081B8",
		//    "#5B5A96",
		//    "#ACBDD1",
		//    "#88A891",
		//    "#39969D",
		//    "#AECEDD",
		//    "#A0B2BC",
		//    "#BBAEB7",
		//    "#A0C65F",
		//    "#EEA6AA",
		//    "#3798C5"
		//],
		//"colorSet5": [
		//    "#88ADBF",
		//    "#84C336",
		//    "#7B91C3",
		//    "#4661EE",
		//    "#EC5657",
		//    "#1BCDD1",
		//    "#8FAABB",
		//    "#B08BEB",
		//    "#3EA0DD",
		//    "#F5A52A",
		//    "#23BFAA",
		//    "#FAA586",
		//    "#EB8CC6"
		//]

	};

	var themes =
	{
		"theme1": {
			Chart: {
				colorSet: colorSets[0]
			},
			Title: {
				fontFamily: "Calibri, Optima, Candara, Verdana, Geneva, sans-serif", fontSize: 33,
				fontColor: "#3A3A3A",
				fontWeight: "bold",
				verticalAlign: "top",
				margin: 10
			},
			Axis: {
				titleFontSize: 26,
				//titleFontColor: "rgb(98,98,98)",
				titleFontColor: "#666666",
				//titleFontFamily: "arial black",
				//titleFontFamily: "Verdana, Geneva, Calibri, sans-serif",
				titleFontFamily: "Calibri, Optima, Candara, Verdana, Geneva, sans-serif",
				//titleFontWeight: "bold",

				//labelFontFamily: "Times New Roman, Times, serif",
				labelFontFamily: "Calibri, Optima, Candara, Verdana, Geneva, sans-serif",
				//labelFontFamily: "Helvetica Neue, Helvetica",
				labelFontSize: 18,
				labelFontColor: "grey",
				//labelFontWeight: "bold",
				tickColor: "#BBBBBB",
				tickThickness: 2,
				gridThickness: 2,
				gridColor: "#BBBBBB",
				lineThickness: 2,
				lineColor: "#BBBBBB"
			},
			Legend: {
				verticalAlign: "bottom",
				horizontalAlign: "center",
				fontFamily: "monospace, sans-serif,arial black"
			},
			DataSeries: {
				//bevelEnabled: true,
				indexLabelFontColor: "grey",
				//indexLabelFontFamily: "Trebuchet MS, monospace, Courier New, Courier",
				indexLabelFontFamily: "Calibri, Optima, Candara, Verdana, Geneva, sans-serif",
				//indexLabelFontWeight: "bold",
				indexLabelFontSize: 18,
				indexLabelLineColor: "lightgrey",
				indexLabelLineThickness: 2
			}
		},

		"theme2": {
			Chart: {
				colorSet: "colorSet2"
			},
			Title: {
				fontFamily: "impact, charcoal, arial black, sans-serif", fontSize: 32,//fontColor: "rgb(58,58,58)",
				fontColor: "#333333",
				//fontFamily: "arial black", fontSize: 30,//fontColor: "rgb(58,58,58)",
				//fontFamily: "arial black",
				//fontFamily: "Helvetica Neue, Helvetica", fontSize: 35,// fontColor: "rgb(58,58,58)",
				//fontWeight: "bold",
				verticalAlign: "top",
				margin: 10
			},
			Axis: {
				titleFontSize: 22,
				titleFontColor: "rgb(98,98,98)",
				//titleFontFamily: "arial black",
				titleFontFamily: "monospace, sans-serif,arial black",
				titleFontWeight: "bold",


				labelFontFamily: "monospace, Courier New, Courier",
				//labelFontFamily: "Helvetica Neue, Helvetica",
				labelFontSize: 16,
				labelFontColor: "grey",
				labelFontWeight: "bold",
				tickColor: "grey",
				tickThickness: 2,
				gridThickness: 2,
				gridColor: "grey",
				lineThickness: 0
			},
			Legend: {
				verticalAlign: "bottom",
				horizontalAlign: "center",
				fontFamily: "monospace, sans-serif,arial black"
			},
			DataSeries: {
				indexLabelFontColor: "grey",
				//indexLabelFontFamily: "Trebuchet MS, monospace, Courier New, Courier",
				indexLabelFontFamily: "Courier New, Courier, monospace",
				indexLabelFontWeight: "bold",
				indexLabelFontSize: 18,
				indexLabelLineColor: "lightgrey",
				indexLabelLineThickness: 2
			}
		},

		"theme3": {
			Chart: {
				colorSet: "colorSet1"
			},
			Title: {
				//fontFamily: "impact, charcoal, arial black, sans-serif", fontSize: 30,//fontColor: "rgb(58,58,58)",
				//fontFamily: "arial black", fontSize: 30,//fontColor: "rgb(58,58,58)",
				//fontFamily: "arial black",
				fontFamily: "Candara, Optima, Trebuchet MS, Helvetica Neue, Helvetica, Trebuchet MS, serif", fontSize: 32,
				//fontFamily: "Palatino Linotype, Book Antiqua, Palatino, serif", fontSize: 30,
				//fontFamily: "Lucida Sans Unicode, Lucida Grande, Trebuchet MS, sans-serif", fontSize: 30,
				//fontColor: "rgb(68,78,58)",
				fontColor: "#3A3A3A",
				fontWeight: "bold",
				verticalAlign: "top",
				margin: 10
			},
			Axis: {
				titleFontSize: 22,
				titleFontColor: "rgb(98,98,98)",
				//titleFontFamily: "arial black",
				titleFontFamily: "Verdana, Geneva, Calibri, sans-serif",
				//titleFontWeight: "bold",

				//labelFontFamily: "Times New Roman, Times, serif",
				labelFontFamily: "Calibri, Optima, Candara, Verdana, Geneva, sans-serif",
				//labelFontFamily: "Helvetica Neue, Helvetica",
				labelFontSize: 18,
				labelFontColor: "grey",
				//labelFontWeight: "bold",
				tickColor: "grey",
				tickThickness: 2,
				gridThickness: 2,
				gridColor: "grey",
				lineThickness: 2,
				lineColor: "grey"
			},
			Legend: {
				verticalAlign: "bottom",
				horizontalAlign: "center",
				fontFamily: "monospace, sans-serif,arial black"
			},
			DataSeries: {
				bevelEnabled: true,
				indexLabelFontColor: "grey",
				//indexLabelFontFamily: "Trebuchet MS, monospace, Courier New, Courier",
				indexLabelFontFamily: "Candara, Optima, Calibri, Verdana, Geneva, sans-serif",
				//indexLabelFontWeight: "bold",
				indexLabelFontSize: 18,
				indexLabelLineColor: "lightgrey",
				indexLabelLineThickness: 2
			}
		}
	};

	//#endregion Themes

	var constants = {
		numberDuration: 1,
		yearDuration: 1000 * 60 * 60 * 24 * 364,
		monthDuration: 1000 * 60 * 60 * 24 * 30,
		weekDuration: 1000 * 60 * 60 * 24 * 7,
		dayDuration: 1000 * 60 * 60 * 24,
		hourDuration: 1000 * 60 * 60,
		minuteDuration: 1000 * 60,
		secondDuration: 1000,
		millisecondDuration: 1,

		dayOfWeekFromInt: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	};

	//#region Static Methods

	function extend(Child, Parent){
		Child.prototype = inherit(Parent.prototype);
		Child.prototype.constructor = Child;
		Child.parent = Parent.prototype;
	}

	function inherit(proto){
		function F(){
		}

		F.prototype = proto;
		return new F();
	}

	function addToDateTime(dateTime, num, type){

		if (type === "millisecond")
			dateTime.setMilliseconds(dateTime.getMilliseconds() + 1 * num);
		else if (type === "second")
			dateTime.setSeconds(dateTime.getSeconds() + 1 * num);
		else if (type === "minute")
			dateTime.setMinutes(dateTime.getMinutes() + 1 * num);
		else if (type === "hour")
			dateTime.setHours(dateTime.getHours() + 1 * num);
		else if (type === "day")
			dateTime.setDate(dateTime.getDate() + 1 * num);
		else if (type === "week")
			dateTime.setDate(dateTime.getDate() + 7 * num);
		else if (type === "month")
			dateTime.setMonth(dateTime.getMonth() + 1 * num);
		else if (type === "year")
			dateTime.setFullYear(dateTime.getFullYear() + 1 * num);

		return dateTime;
	}

	function convertToNumber(num, type){
		return constants[type + "Duration"] * num;
	}

	function pad(value, length){
		var isNegative = false;
		if (value < 0){
			isNegative = true;
			value *= -1;
		}

		value = "" + value;
		length = !length ? 1 : length;

		while (value.length < length) value = "0" + value;

		return isNegative ? "-" + value : value;
	}

	function trimString(str){
		str = str.replace(/^\s\s*/, '');
		var ws = /\s/,
			i = str.length;
		while (ws.test(str.charAt(--i))){
		}
		return str.slice(0, i + 1);
	}

	function extendCtx(context){
		context.roundRect = function(x, y, width, height, radius, borderThickness, backgroundColor, borderColor){
			///<signature>
			///<summary>Creates a rounded rectangle with given fill/stroke parameters</summary>
			///<param name="x" type="number">x value</param>
			///<param name="y" type="number">y value</param>
			///<param name="width" type="number">Border Width</param>
			///<param name="height" type="number">Border Height</param>
			///<param name="radius" type="number">Border CornerRadius</param>
			///<param name="borderThickness" type="number">Border Thickess</param>
			///<param name="backgroundColor" type="number">Background Color</param>
			///<param name="borderColor" type="number">Border Color</param>
			///</signature>

			if (backgroundColor){
				this.fillStyle = backgroundColor;
			}

			if (borderColor){
				this.strokeStyle = borderColor;
			}

			if (typeof radius === "undefined"){
				radius = 5;
			}

			this.lineWidth = borderThickness;

			this.beginPath();
			this.moveTo(x + radius, y);
			this.lineTo(x + width - radius, y);
			this.quadraticCurveTo(x + width, y, x + width, y + radius);
			this.lineTo(x + width, y + height - radius);
			this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
			this.lineTo(x + radius, y + height);
			this.quadraticCurveTo(x, y + height, x, y + height - radius);
			this.lineTo(x, y + radius);
			this.quadraticCurveTo(x, y, x + radius, y);
			this.closePath();

			if (backgroundColor){
				this.fill();
			}

			if (borderColor && borderThickness > 0){
				this.stroke();
			}
		};
	}

	function compareDataPointX(dataPoint1, dataPoint2){
		return dataPoint1.x - dataPoint2.x;
	}

	function intToHexColorString(num){
		var r = ((num & 0xFF0000) >> 16).toString(16);
		var g = ((num & 0x00FF00) >> 8).toString(16);
		var b = ((num & 0x0000FF) >> 0).toString(16);

		r = r.length < 2 ? "0" + r : r;
		g = g.length < 2 ? "0" + g : g;
		b = b.length < 2 ? "0" + b : b;

		return "#" + r + g + b;
	}

	function RGBToInt(r, g, b){
		var num = (r << 16) | (g << 8) | (b);

		return num;
	}

	function intToRGB(num){
		var rgb = [];
		var r = ((num & 0xFF0000) >> 16);
		var g = ((num & 0x00FF00) >> 8);
		var b = ((num & 0x0000FF) >> 0);

		//r = r.length < 2 ? "0" + r : r;
		//g = g.length < 2 ? "0" + g : g;
		//b = b.length < 2 ? "0" + b : b;

		rgb[0] = r;
		rgb[1] = g;
		rgb[2] = b;

		return rgb;
	}

	//#region formatting functions/methods
	var dateFormat = (function(){
		var reg = /D{1,4}|M{1,4}|Y{1,4}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|f{1,3}|t{1,2}|T{1,2}|K|z{1,3}|"[^"]*"|'[^']*'/g;

		var defDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var defShortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

		var defMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var defShortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
		var timezoneClip = /[^-+\dA-Z]/g;

		return function(dt, formatString, cultureInfo){

			var days = cultureInfo ? cultureInfo.days : defDays;
			var months = cultureInfo ? cultureInfo.months : defMonths;

			var shortDays = cultureInfo ? cultureInfo.shortDays : defShortDays;
			var shortMonths = cultureInfo ? cultureInfo.shortMonths : defShortMonths;

			var result = "";
			var utc = false;

			dt = dt && dt.getTime ? dt : dt ? new Date(dt) : new Date();
			if (isNaN(dt)) throw new SyntaxError("invalid date");

			if (formatString.slice(0, 4) == "UTC:"){
				formatString = formatString.slice(4);
				utc = true;
			}

			var pre = utc ? "getUTC" : "get";
			var date = dt[pre + "Date"]();
			var day = dt[pre + "Day"]();
			var month = dt[pre + "Month"]();
			var year = dt[pre + "FullYear"]();
			var hours = dt[pre + "Hours"]();
			var minutes = dt[pre + "Minutes"]();
			var seconds = dt[pre + "Seconds"]();
			var milliseconds = dt[pre + "Milliseconds"]();
			var offset = utc ? 0 : dt.getTimezoneOffset();

			result = formatString.replace(reg, function(key){

				switch (key){

					case "D":
						return date;
					case "DD":
						return pad(date, 2);
					case "DDD":
						return shortDays[day];
					case "DDDD":
						return days[day];


					case "M":
						return month + 1;
					case "MM":
						return pad(month + 1, 2);
					case "MMM":
						return shortMonths[month];
					case "MMMM":
						return months[month];


					case "Y":
						return parseInt(String(year).slice(-2), 10);
					case "YY":
						return pad(String(year).slice(-2), 2);
					case "YYY":
						return pad(String(year).slice(-3), 3);
					case "YYYY":
						return pad(year, 4);


					case "h":
						return hours % 12 || 12;
					case "hh":
						return pad(hours % 12 || 12, 2);


					case "H":
						return hours;
					case "HH":
						return pad(hours, 2);

					case "m":
						return minutes;
					case "mm":
						return pad(minutes, 2);


					case "s":
						return seconds;
					case "ss":
						return pad(seconds, 2);

					case "f":
						return String(milliseconds).slice(0, 1);
					case "ff":
						return pad(String(milliseconds).slice(0, 2), 2);
					case "fff":
						return pad(String(milliseconds).slice(0, 3), 3);


					case "t":
						return hours < 12 ? "a" : "p";
					case "tt":
						return hours < 12 ? "am" : "pm";
					case "T":
						return hours < 12 ? "A" : "P";
					case "TT":
						return hours < 12 ? "AM" : "PM";


					case "K":
						return utc ? "UTC" : (String(dt).match(timezone) || [""]).pop().replace(timezoneClip, ""); // Time Zone;
					case "z":
						return (offset > 0 ? "-" : "+") + Math.floor(Math.abs(offset) / 60); // Hour Offset from UTC without padding
					case "zz":
						return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60), 2); // Hour Offset from UTC with padding
					case "zzz":
						return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60), 2) + pad(Math.abs(offset) % 60, 2); // Hour and Minute Offset from UTC with padding

					default:
						return key.slice(1, key.length - 1);

				}
			});

			return result;
		};
	}());


	var numberFormat = function(v, fs, cultureInfo){
		v = Number(v);
		var isNegative = v < 0 ? true : false;
		if (isNegative) v *= -1;

		var decimalSeparator = cultureInfo ? cultureInfo.decimalSeparator : ".";
		var digitGroupSeparator = cultureInfo ? cultureInfo.digitGroupSeparator : ",";

		var vString = "";
		fs = String(fs);
		var multiplier = 1;
		var result = "";
		var match;

		var decimalPosition = -1;
		var fsBeforeDecimal = [];
		var fsAfterDecimal = [];
		var noPhBeforeDecimal = 0; // Number of Placeholders before Decimal
		var noPhAfterDecimal = 0; // Number of Placeholders after Decimal
		var noComma = 0;
		var isScientificNotation = false;
		var exponent = 0;

		var matches = fs.match(/"[^"]*"|'[^']*'|[eE][+-]*[0]+|[,]+[.]|‰|./g);
		//window.console.log(matches + " = " + matches.length);

		for (var i = 0; matches && i < matches.length; i++){
			match = matches[i];

			if (match === "." && decimalPosition < 0){
				decimalPosition = i;
				continue;
			} else if (match === "%"){
				multiplier *= 100;
			} else if (match === "‰"){
				multiplier *= 1000;
				continue;
			} else if (match[0] === "," && match[match.length - 1] === "."){
				multiplier /= Math.pow(1000, match.length - 1);
				decimalPosition = i + match.length - 1;
				continue;
			} else if ((match[0] === "E" || match[0] === "e") && match[match.length - 1] === "0"){
				isScientificNotation = true;
			}

			if (decimalPosition < 0){
				fsBeforeDecimal.push(match);
				if (match === "#" || match === "0")
					noPhBeforeDecimal++;
				else if (match === ",")
					noComma++;
			}
			else {
				fsAfterDecimal.push(match);
				if (match === "#" || match === "0")
					noPhAfterDecimal++;
			}
		}

		if (isScientificNotation){
			var integer = Math.floor(v);
			exponent = (integer === 0 ? "" : String(integer)).length - noPhBeforeDecimal;
			multiplier /= Math.pow(10, exponent);
		}

		v *= multiplier;

		if (decimalPosition < 0)
			decimalPosition = i;

		vString = v.toFixed(noPhAfterDecimal);
		var split = vString.split(".");
		//window.console.log(split);
		var vStringBeforeDecimal = (split[0] + "").split("");
		var vStringAfterDecimal = (split[1] + "").split("");

		if (vStringBeforeDecimal && vStringBeforeDecimal[0] === "0")
			vStringBeforeDecimal.shift();

		//window.console.log(fsBeforeDecimal + "<---------->" + fsAfterDecimal + " &        " + vStringBeforeDecimal + "<---------->" + vStringAfterDecimal);

		var noPhProcessed = 0;
		var noDigitsAdded = 0;
		var noCommaAdded = 0;
		var commaDistance = 0;
		var distanceFromLastComma = 0;

		var replacer = function($0){
			return pad(exponent, $0.length);
		};

		while (fsBeforeDecimal.length > 0){
			match = fsBeforeDecimal.pop();

			if (match === "#" || match === "0"){
				noPhProcessed++;

				if (noPhProcessed === noPhBeforeDecimal){
					var digits = vStringBeforeDecimal;
					vStringBeforeDecimal = [];

					if (match === "0"){
						//var totalDigits = result.match(/[0-9]/g).length;
						var toPad = noPhBeforeDecimal - noDigitsAdded - (digits ? digits.length : 0);

						while (toPad > 0){
							digits.unshift("0");
							toPad--;
						}
					}

					while (digits.length > 0){
						result = digits.pop() + result;
						distanceFromLastComma++;

						if (distanceFromLastComma % commaDistance === 0 && noCommaAdded === noComma && digits.length > 0)
							result = digitGroupSeparator + result;
					}

					if (isNegative)
						result = "-" + result;

				} else {
					if (vStringBeforeDecimal.length > 0){
						result = vStringBeforeDecimal.pop() + result;
						noDigitsAdded++;
						distanceFromLastComma++;
					}
					else if (match === "0"){
						result = "0" + result;
						noDigitsAdded++;
						distanceFromLastComma++;
					}

					if (distanceFromLastComma % commaDistance === 0 && noCommaAdded === noComma && vStringBeforeDecimal.length > 0)
						result = digitGroupSeparator + result;
				}


			} else if ((match[0] === "E" || match[0] === "e") && match[match.length - 1] === "0" && /[eE][+-]*[0]+/.test(match)){
				if (exponent < 0)
					match = match.replace("+", "").replace("-", "");
				else
					match = match.replace("-", "");

				result += match.replace(/[0]+/, replacer);


			} else {
				if (match === ","){
					noCommaAdded++;
					commaDistance = distanceFromLastComma;
					distanceFromLastComma = 0;

					if (vStringBeforeDecimal.length > 0)
						result = digitGroupSeparator + result;
				} else if (match.length > 1 && ((match[0] === "\"" && match[match.length - 1] === "\"") || (match[0] === "'" && match[match.length - 1] === "'"))){
					result = match.slice(1, match.length - 1) + result;
				}
				else
					result = match + result;
			}
		}

		var charCount = 0;

		while (fsAfterDecimal.length > 0){
			match = fsAfterDecimal.shift();

			if (match === "#" || match === "0"){
				if (vStringAfterDecimal.length > 0 && Number(vStringAfterDecimal.join("")) !== 0){
					result += (charCount++ === 0 ? decimalSeparator : "") + vStringAfterDecimal.shift();
				}
				else if (match === "0"){
					result += (charCount++ === 0 ? decimalSeparator : "") + "0";
				}
			} else if (match.length > 1 && ((match[0] === "\"" && match[match.length - 1] === "\"") || (match[0] === "'" && match[match.length - 1] === "'"))){
				result += (charCount++ === 0 ? decimalSeparator : "") + match.slice(1, match.length - 1);
			} else if ((match[0] === "E" || match[0] === "e") && match[match.length - 1] === "0" && /[eE][+-]*[0]+/.test(match)){
				match = (exponent < 0) ? match.replace("+", "").replace("-", "") : match = match.replace("-", "");
				result += match.replace(/[0]+/, replacer);
			} else {
				result += (charCount++ === 0 ? decimalSeparator : "") + match;
			}
		}

		//window.console.log(result);
		return result;
	};

	//#endregion formatting functions/methods

	function getObjectId(x, y, ctx){
		var pixels = ctx.getImageData(x, y, 2, 2).data;
		var isObject = true;

		for (var i = 0; i < 4; i++){

			if (pixels[i] !== pixels[i + 4] | pixels[i] !== pixels[i + 8] | pixels[i] !== pixels[i + 12]){
				isObject = false;
				break;
			}
		}

		if (isObject){
			return RGBToInt(pixels[0], pixels[1], pixels[2]);
		} else {
			return 0;
		}

		//window.console.log(pixels);
	}

	//extracts mouse coordinates from the event parameters
	var getMouseCoordinates = function(ev){
		var x = 0;
		var y = 0;

		if (!ev) ev = window.event;

		if (ev.offsetX || ev.offsetX === 0){
			x = ev.offsetX;
			y = ev.offsetY;
		} else if (ev.layerX || ev.layerX === 0){ // Firefox
			x = ev.layerX;
			y = ev.layerY;
		}
		else {
			x = ev.pageX - ev.target.offsetLeft;
			y = ev.pageY - ev.target.offsetTop;
		}

		return { x: x, y: y };
	};

	function getFontString(prefix, object, fallbackObject){
		var fontString = "";

		var fontStyleString = prefix ? prefix + "FontStyle" : "fontStyle";
		var fontWeightString = prefix ? prefix + "FontWeight" : "fontWeight";
		var fontSizeString = prefix ? prefix + "FontSize" : "fontSize";
		var fontFamilyString = prefix ? prefix + "FontFamily" : "fontFamily";

		fontString += object[fontStyleString] ? object[fontStyleString] + " " : fallbackObject && fallbackObject[fontStyleString] ? fallbackObject[fontStyleString] + " " : "";
		fontString += object[fontWeightString] ? object[fontWeightString] + " " : fallbackObject && fallbackObject[fontWeightString] ? fallbackObject[fontWeightString] + " " : "";
		fontString += object[fontSizeString] ? object[fontSizeString] + "px " : fallbackObject && fallbackObject[fontSizeString] ? fallbackObject[fontSizeString] + "px " : "";
		fontString += object[fontFamilyString] ? object[fontFamilyString] + " " : fallbackObject && fallbackObject[fontFamilyString] ? fallbackObject[fontFamilyString] + " " : "";

		return fontString;
	}

	function getProperty(propertyName, object, fallbackObject){

		var value = propertyName in object ? object[propertyName] : fallbackObject[propertyName];

		return value;
	}


	//#endregion Static Methods

	//#region Class Definitions

	//#region Class CanvasJSObject
	function CanvasJSObject(defaultsKey, options, theme){
		this._defaultsKey = defaultsKey;

		var currentTheme = {};

		if (theme && themes[theme] && themes[theme][defaultsKey])
			currentTheme = themes[theme][defaultsKey];

		this._options = options ? options : {};
		this.setOptions(this._options, currentTheme);
	}

	CanvasJSObject.prototype.setOptions = function(options, currentTheme){
		var prop, defaults;

		if (!defaultOptions[this._defaultsKey]){
			isDebugMode && window.console && console.log("defaults not set");
		}
		else {
			defaults = defaultOptions[this._defaultsKey];

			for (prop in defaults){
				if (defaults.hasOwnProperty(prop)){
					if (options && prop in options)
						this[prop] = options[prop];
					else if (currentTheme && prop in currentTheme)
						this[prop] = currentTheme[prop];
					else this[prop] = defaults[prop];
					//if (typeof this[prop] === "function") {
					//    alert("function");
					//    this[prop] = this[prop]();
					//}
				}
			}
		}

		return this;
	};

	//Stores values in _oldOptions so that it can be tracked for any changes
	CanvasJSObject.prototype.trackChanges = function(option){
		if (!this._options._oldOptions)
			this._options._oldOptions = {};

		this._options._oldOptions[option] = this._options[option];
	};

	CanvasJSObject.prototype.isBeingTracked = function(option){
		if (!this._options._oldOptions)
			this._options._oldOptions = {};

		if (this._options._oldOptions[option])
			return true;
		else
			return false;
	};

	CanvasJSObject.prototype.hasOptionChanged = function(option){
		if (!this._options._oldOptions)
			this._options._oldOptions = {};

		//if (!this._options._oldOptions[option])
		//    this._options._oldOptions[option] = null;

		return this._options._oldOptions[option] !== this._options[option];
	};
	//#endregion Class CanvasJSObject

	//#region Class Chart
	function Chart(containerId, options, externalReference){
		Chart.parent.constructor.call(this, "Chart", options, options.theme ? options.theme : "theme1");
		Chart.externalReference = externalReference;

		var that = this;


		this._objectsInitialized = false;
		this.ctx = null;
		this.overlaidCanvasCtx = null;
		this._indexLabels = [];
		this._panTimerId = 0;
		this._lastTouchEventType = "";
		this.panEnabled = false;
		this._defaultCursor = "default";
		//this._maxZIndex = 0;

		this._container = typeof containerId === 'object' && containerId ? containerId : document.getElementById(containerId);

		if (!this._container)
			return;

		var width = 0;
		var height = 0;

		if (this._options.width)
			width = this.width;
		else
			width = this._container.clientWidth > 0 ? this._container.clientWidth : this.width;

		if (this._options.height)
			height = this.height;
		else
			height = this._container.clientHeight > 0 ? this._container.clientHeight : this.height;

		this.width = width;
		this.height = height;

		this._canvasJSContainer = document.createElement("div");
		this._canvasJSContainer.style.position = "relative";
		this._container.appendChild(this._canvasJSContainer);


		this.canvas = document.createElement("canvas");
		this.canvas.width = width;
		this.canvas.height = height;
		this.canvas.style.background = this.backgroundColor;
		//this.canvas.style.cursor = "pointer";
		//this.canvas.style.borderColor = "black";
		//this.canvas.style.borderWidth = "1px";
		//this.canvas.style.borderStyle = "solid";
		this.canvas.style.position = "absolute";
		this._canvasJSContainer.appendChild(this.canvas);


		this.overlaidCanvas = document.createElement("canvas");
		this.overlaidCanvas.width = width;
		this.overlaidCanvas.height = height;
		//this.overlaidCanvas.style.background = this.backgroundColor;
		//this.overlaidCanvas.style.borderColor = "black";
		//this.overlaidCanvas.style.borderWidth = "1px";
		//this.overlaidCanvas.style.borderStyle = "solid";
		this.overlaidCanvas.style.position = "absolute";
		this._canvasJSContainer.appendChild(this.overlaidCanvas);

		this._eventManager = new EventManager(this);


		this._toolBar = document.createElement("div");
		this._toolBar.style.position = "absolute";
		this._toolBar.style.top = "0px";
		this._toolBar.style.right = "0px";
		this._canvasJSContainer.appendChild(this._toolBar);

		if (this.zoomEnabled){
			this._zoomButton = document.createElement("button");
			this._zoomButton.appendChild(document.createTextNode("Pan"));
			this._toolBar.appendChild(this._zoomButton);
			this._zoomButton.addEventListener("click", function(){
				if (that.zoomEnabled){
					that.zoomEnabled = false;
					that.panEnabled = true;

					that._zoomButton.innerHTML = that._cultureInfo.zoomText;

					that._defaultCursor = "move";
					that.overlaidCanvas.style.cursor = that._defaultCursor;
				} else {
					that.zoomEnabled = true;
					that.panEnabled = false;

					that._zoomButton.innerHTML = that._cultureInfo.panText;

					that._defaultCursor = "default";
					that.overlaidCanvas.style.cursor = that._defaultCursor;
				}
				that.render();
			}, false);


			//this._panButton = document.createElement("button");
			//this._panButton.appendChild(document.createTextNode("Pan"));
			//this._toolBar.appendChild(this._panButton);
			//this._panButton.addEventListener("click", function () {
			//    that.zoomEnabled = false;
			//    that.panEnabled = true;
			//    that.render();
			//}, false);
		}

		if (this.zoomEnabled){

			this._resetButton = document.createElement("button");
			this._resetButton.appendChild(document.createTextNode("Reset"));
			this._toolBar.appendChild(this._resetButton);

			if (this._options.zoomEnabled){
				this.zoomEnabled = true;
				this.panEnabled = false;
			} else {
				this.zoomEnabled = false;
				this.panEnabled = false;
			}

			this.overlaidCanvas.style.cursor = that._defaultCursor;

			this._resetButton.addEventListener("click", function(){

				that._toolTip.hide();

				if (that.zoomEnabled || that.panEnabled){
					that.zoomEnabled = true;
					that.panEnabled = false;
					that._zoomButton.innerHTML = that._cultureInfo.panText;

					that._defaultCursor = "default";
					that.overlaidCanvas.style.cursor = that._defaultCursor;
				} else {
					that.zoomEnabled = false;
					that.panEnabled = false;
				}

				if (that._options.axisX && that._options.axisX.minimum)
					that.sessionVariables.axisX.internalMinimum = that._options.axisX.minimum;
				else
					that.sessionVariables.axisX.internalMinimum = null;

				if (that._options.axisX && that._options.axisX.maximum)
					that.sessionVariables.axisX.internalMaximum = that._options.axisX.maximum;
				else
					that.sessionVariables.axisX.internalMaximum = null;

				that.resetOverlayedCanvas();

				that.render();
			}, false);
		}

		this.addResizeListener(window);

		this._toolBar.style.display = "none";

		this.bounds = { x1: 0, y1: 0, x2: this.canvas.width, y2: this.canvas.height };

//		var that = this;

		if (this.canvas.getContext){
			this.ctx = this.canvas.getContext("2d");
			this.ctx.textBaseline = "top";

			this.overlaidCanvasCtx = this.overlaidCanvas.getContext("2d");
			this.overlaidCanvasCtx.textBaseline = "top";

			extendCtx(this.ctx);

			this.overlaidCanvas.addEventListener('click', function(e){
				that._mouseEventHandler(e);
			}, false);

			this.overlaidCanvas.addEventListener('mousemove', function(e){
				that._mouseEventHandler(e);
			}, false);

			this.overlaidCanvas.addEventListener('mouseup', function(e){
				that._mouseEventHandler(e);
			}, false);

			this.overlaidCanvas.addEventListener('mousedown', function(e){
				that._mouseEventHandler(e);
			}, false);

			this.overlaidCanvas.addEventListener('mouseout', function(e){
				that._mouseEventHandler(e);
			}, false);


			this.overlaidCanvas.addEventListener(window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart", function(e){
				that._touchEventHandler(e);
			}, false);

			this.overlaidCanvas.addEventListener(window.navigator.msPointerEnabled ? "MSPointerMove" : 'touchmove', function(e){
				that._touchEventHandler(e);
			}, false);

			this.overlaidCanvas.addEventListener(window.navigator.msPointerEnabled ? "MSPointerUp" : 'touchend', function(e){
				that._touchEventHandler(e);
			}, false);

			this.overlaidCanvas.addEventListener(window.navigator.msPointerEnabled ? "MSPointerCancel" : 'touchcancel', function(e){
				that._touchEventHandler(e);
			}, false);

		}

		this._toolTip = new ToolTip(this, this._options.toolTip, this.theme);

		this.layoutManager = new LayoutManager(this.canvas);
		this.data = null;
		this.axisX = null;
		this.axisY = null;
		this.axisY2 = null;
		this.renderCount = 0;

		if (this.creditText && this.creditHref){
			this._creditLink = document.createElement("a");
			this._creditLink.setAttribute("style", "outline:none;margin:0px;position:absolute;right:3px;top:" + (height - 14) + "px;color:dimgrey;text-decoration:none;font-size:10px;font-family:Lucida Grande, Lucida Sans Unicode, Arial, sans-serif");

			this._creditLink.setAttribute("tabIndex", -1);
			this._creditLink.setAttribute("href", this.creditHref);
			this._creditLink.innerHTML = this.creditText;
			this._creditLink.setAttribute("target", "_blank");

			//this._creditLink.style.


			//var creditLinkString = "<a style='' href='" + (this.creditHref.indexOf("http://") === 0 ? this.creditHref : "http://" + this.creditHref) + "'>" + this.creditHref + "</a>";
			//var xmlDoc;


			//if (window.DOMParser) {
			//    var parser = new DOMParser();
			//    xmlDoc = parser.parseFromString(creditLinkString, "text/xml");
			//    this._creditLink = xmlDoc.firstChild;
			//}
			//else // Internet Explorer
			//{
			//    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			//    xmlDoc.async = false;
			//    xmlDoc.loadXML(creditLinkString);
			//    this._creditLink = xmlDoc.firstChild;
			//}
			this._canvasJSContainer.appendChild(this._creditLink);
		}


		this.sessionVariables = {
			axisX: {
				internalMinimum: null,
				internalMaximum: null
			},
			axisY: {
				internalMinimum: null,
				internalMaximum: null
			},
			axisY2: {
				internalMinimum: null,
				internalMaximum: null
			}
		};

		return this;
	}

	extend(Chart, CanvasJSObject);

	Chart.prototype.addResizeListener = function(win){
		win || (win = window);

		win.addEventListener("resize", this.resize.bind(this));
	};

	Chart.prototype.resize = function(){
		//this._container.addEventListener("DOMSubtreeModified", function () {
		var width = 0;
		var height = 0;
		var that = this;

		if (that._options.width)
			width = that.width;
		else
			width = that._container.clientWidth > 0 ? that._container.clientWidth : that.width;

		if (that._options.height)
			height = that.height;
		else
			height = that._container.clientHeight > 0 ? that._container.clientHeight : that.height;

		if (that.canvas.width !== width || that.canvas.height !== height){
			that.renderCount--;

			that.canvas.width = width;
			that.canvas.height = height;

			that.overlaidCanvas.width = width;
			that.overlaidCanvas.height = height;

			that.render();
		}
	};

	// initialize chart objects
	Chart.prototype._initialize = function(){
		///<signature>
		///<summary>Initializes Chart objects/state. Creates DataSeries class instance for each DataSeries provided by ther user. Sets the Axis Type based on the user data</summary>
		///</signature>
		//this.ctx.canvas.width = this.ctx.canvas.width;

		this._selectedColorSet = typeof (colorSets[this.colorSet]) !== "undefined" ? colorSets[this.colorSet] : colorSets["colorSet1"];

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.beginPath();

		this.axisX = null;
		this.axisY = null;
		this.axisY2 = null;
		this._indexLabels = [];

		this._events = [];
		if (this._eventManager)
			this._eventManager.reset();

		this.plotInfo = {
			//xMin: Infinity, xMax: -Infinity,
			//yMin: Infinity, yMax: -Infinity,
			//viewPortXMin: Infinity, viewPortXMax: -Infinity,
			//viewPortYMin: Infinity, viewPortYMax: -Infinity,
			//xMinDiff: Infinity,
			axisPlacement: null,
			axisXValueType: null,
			plotTypes: []//array of plotType: {type:"", axisYType: "primary", dataSeriesIndexes:[]}
		};

		this.layoutManager.reset();

		this._cultureInfo = new CultureInfo(this, this._options.culture);

		this.data = [];
		var dataSeriesIndex = 0;

		for (var series = 0; series < this._options.data.length; series++){
			//for (series in this._options.data) {

			dataSeriesIndex++;

			if (!(!this._options.data[series].type || this._options.data[series].type in supportedChartTypes))
				continue;

			var dataSeries = new DataSeries(this, this._options.data[series], this.theme, dataSeriesIndex - 1, ++this._eventManager.lastObjectId);
			if (dataSeries.name === null)
				dataSeries.name = "DataSeries " + (dataSeriesIndex);

			if (dataSeries.color === null){
				if (this._options.data.length > 1){
					dataSeries._colorSet = [this._selectedColorSet[dataSeries.index % this._selectedColorSet.length]];
					dataSeries.color = this._selectedColorSet[dataSeries.index % this._selectedColorSet.length];
				} else {
					if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "splineArea" || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100"){
						dataSeries._colorSet = [this._selectedColorSet[0]];
					}
					else
						dataSeries._colorSet = this._selectedColorSet;
				}
			} else {
				dataSeries._colorSet = dataSeries.color.split(";");
			}

			if (dataSeries.markerSize === null){
				if (((dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline") && dataSeries.dataPoints.length < this.canvas.width / 16) || dataSeries.type === "scatter"){
					//if (dataSeries.type === "line") {
					dataSeries.markerSize = 8;
				}
			}

			if (dataSeries.type === "bubble" || dataSeries.type === "scatter"){
				dataSeries.dataPoints.sort(compareDataPointX);
			}

			//if (dataSeries.markerBorderThickness === null && dataSeries.type === "scatter") {
			//    dataSeries.markerBorderThickness = 2;
			//}

			//if (dataSeries.markerType === null) {
			//    if (dataSeries.type === "line" & dataSeries.dataPoints.length < 500) {
			//        dataSeries.markerType = "circle";
			//    }
			//}

			this.data.push(dataSeries);

			var seriesAxisPlacement = dataSeries.axisPlacement;

			//if (isDebugMode && window.console)
			//    window.console.log(dataSeries.type);

			var errorMessage;

			if (seriesAxisPlacement === "normal"){

				if (this.plotInfo.axisPlacement === "xySwapped"){
					errorMessage = "You cannot combine \"" + dataSeries.type + "\" with bar chart";
				} else if (this.plotInfo.axisPlacement === "none"){
					errorMessage = "You cannot combine \"" + dataSeries.type + "\" with pie chart";
				} else if (this.plotInfo.axisPlacement === null)
					this.plotInfo.axisPlacement = "normal";
			}
			else if (seriesAxisPlacement === "xySwapped"){

				if (this.plotInfo.axisPlacement === "normal"){
					errorMessage = "You cannot combine \"" + dataSeries.type + "\" with line, area, column or pie chart";
				} else if (this.plotInfo.axisPlacement === "none"){
					errorMessage = "You cannot combine \"" + dataSeries.type + "\" with pie chart";
				} else if (this.plotInfo.axisPlacement === null)
					this.plotInfo.axisPlacement = "xySwapped";
			}
			else if (seriesAxisPlacement == "none"){

				if (this.plotInfo.axisPlacement === "normal"){
					errorMessage = "You cannot combine \"" + dataSeries.type + "\" with line, area, column or bar chart";
				} else if (this.plotInfo.axisPlacement === "xySwapped"){
					errorMessage = "You cannot combine \"" + dataSeries.type + "\" with bar chart";
				} else if (this.plotInfo.axisPlacement === null)
					this.plotInfo.axisPlacement = "none";
			}

			if (errorMessage && window.console){
				window.console.log(errorMessage);
				return;
			}
		}

		//if (isDebugMode && window.console) {
		//    window.console.log("xMin: " + this.plotInfo.viewPortXMin + "; xMax: " + this.plotInfo.viewPortXMax + "; yMin: " + this.plotInfo.yMin + "; yMax: " + this.plotInfo.yMax);
		//}

		this._objectsInitialized = true;
	};

	/*"line", "stepLine", "spline", "column", "area", "splineArea", "bar", "bubble", "scatter",
	 "stackedColumn", "stackedColumn100", "stackedBar", "stackedBar100",
	 "stackedArea", "stackedArea100",
	 "pie", "doughnut"
	 */

	var supportedChartTypes = {};


	Chart.prototype.render = function(){
		//var dt = Date.now();

		this._initialize();

		//Create Primary and Secondary axis and assign them to the series
		for (var i = 0; i < this.data.length; i++){

			if (this.plotInfo.axisPlacement === "normal" || this.plotInfo.axisPlacement === "xySwapped"){
				if (!this.data[i].axisYType || this.data[i].axisYType === "primary"){
					if (!this.axisY){

						if (this.plotInfo.axisPlacement === "normal"){
							this.axisY = new Axis(this, this._options.axisY, "axisY", "left");
						}
						else if (this.plotInfo.axisPlacement === "xySwapped"){
							this.axisY = new Axis(this, this._options.axisY, "axisY", "bottom");
						}
					}
					this.data[i].axisY = this.axisY;
				}
				else if (this.data[i].axisYType === "secondary"){
					if (!this.axisY2){
						if (this.plotInfo.axisPlacement === "normal"){
							this.axisY2 = new Axis(this, this._options.axisY2, "axisY", "right");
						}
						else if (this.plotInfo.axisPlacement === "xySwapped"){
							this.axisY2 = new Axis(this, this._options.axisY2, "axisY", "top");
						}
					}
					this.data[i].axisY = this.axisY2;
				}

				if (!this.axisX){
					if (this.plotInfo.axisPlacement === "normal"){
						this.axisX = new Axis(this, this._options.axisX, "axisX", "bottom");
					} else if (this.plotInfo.axisPlacement === "xySwapped"){
						this.axisX = new Axis(this, this._options.axisX, "axisX", "left");
					}
				}

				this.data[i].axisX = this.axisX;
			}
		}

		this._processData();// Categorises the dataSeries and calculates min, max and other values

		if (this._options.title){
			this._title = new Title(this, this._options.title);
			this._title.render();
		}

		this.legend = new Legend(this, this._options.legend, this.theme);
		for (i = 0; i < this.data.length; i++){
			if (this.data[i].showInLegend)
				this.legend.dataSeries.push(this.data[i]);
		}
		this.legend.render();

		//TBI: Revisit and check if the functionality is enough.
		if (this.plotInfo.axisPlacement === "normal" || this.plotInfo.axisPlacement === "xySwapped"){
			Axis.setLayoutAndRender(this.axisX, this.axisY, this.axisY2, this.plotInfo.axisPlacement, this.layoutManager.getFreeSpace());
		}
		else if (this.plotInfo.axisPlacement !== "none"){
			return;
		}

		for (i = 0; i < this.plotInfo.plotTypes.length; i++){
			var plotType = this.plotInfo.plotTypes[i];

			for (var j = 0; j < plotType.plotUnits.length; j++){

				var plotUnit = plotType.plotUnits[j];

				if (supportedChartTypes[plotUnit.type] in this){
					this[supportedChartTypes[plotUnit.type]].call(this, plotUnit);
				}
				else {
					window.console.log('No known chart type for ' + plotUnit.type);
				}
			}
		}

		if (this._indexLabels.length > 0)
			this.renderIndexLabels();

		this.attachPlotAreaEventHandlers();

		if (!this.zoomEnabled && !this.panEnabled && this._toolBar.style.display !== "none"){
			this._toolBar.style.display = "none";
		}

		this._toolTip._updateToolTip();

		this.renderCount++;

		//if (window.console) {
		//    window.console.log(new Date().getTime() - dt);
		//}

		if (isDebugMode){

			var that = this;
			setTimeout(function(){
				var ghostCanvasCopy = document.getElementById("ghostCanvasCopy");

				if (ghostCanvasCopy){
					//console.log(ghostCanvasCopy.clientWidth);

					var ghostCanvasCopyCtx = ghostCanvasCopy.getContext("2d");

					//ghostCanvasCopyCtx.scale(1, 1);
					//var imageData = this._eventManager.ghostCtx.getImageData(0, 0, this._container.clientWidth, this._container.clientHeight);
					//this._eventManager.ghostCtx.drawImage(this._eventManager.ghostCanvas, 0, 0);
					//this.ctx.drawImage(this._eventManager.ghostCanvas, 0, 0);
					ghostCanvasCopyCtx.drawImage(that._eventManager.ghostCanvas, 0, 0);
				}
			}, 2000);
		}
	};

	Chart.prototype.attachPlotAreaEventHandlers = function(){

		//this._toolBar.style.display = "inline";

		this.attachEvent({
			context: this,
			chart: this,
			mousedown: this._plotAreaMouseDown,
			mouseup: this._plotAreaMouseUp,
			mousemove: this._plotAreaMouseMove,
			//cursor: this.zoomEnabled ? "col-resize" : "move",
			//cursor: this.panEnabled ? "move" : "default",
			capture: true,
			bounds: this.getPlotArea()
		});

	};

	Chart.prototype.categoriseDataSeries = function(){
		var dataSeries = "",
			j,
			plotType,
			i;

		for (i = 0; i < this.data.length; i++){
			dataSeries = this.data[i];

			if (!dataSeries.dataPoints || dataSeries.dataPoints.length === 0)
				continue;

			if (dataSeries.type in supportedChartTypes){

				var plotTypeExists = false;

				var plotUnit = null;
				var plotUnitExists = false;

				for (j = 0; j < this.plotInfo.plotTypes.length; j++){
					if (this.plotInfo.plotTypes[j].type === dataSeries.type){
						plotTypeExists = true;
						plotType = this.plotInfo.plotTypes[j];
						break;
					}
				}

				if (!plotTypeExists){
					plotType = {
						type: dataSeries.type,
						totalDataSeries: 0,
						plotUnits: []
					};
					this.plotInfo.plotTypes.push(plotType);
				}

				for (j = 0; j < plotType.plotUnits.length; j++){
					if (plotType.plotUnits[j].axisYType === dataSeries.axisYType){
						plotUnitExists = true;
						plotUnit = plotType.plotUnits[j];
						break;
					}
				}

				if (!plotUnitExists){
					plotUnit = {
						type: dataSeries.type,
						previousDataSeriesCount: 0, //to be set next
						index: plotType.plotUnits.length,
						plotType: plotType,
						axisYType: dataSeries.axisYType,
						axisY: dataSeries.axisYType === "primary" ? this.axisY : this.axisY2,
						axisX: this.axisX,
						dataSeriesIndexes: [] //index of dataSeries
					};

					plotType.plotUnits.push(plotUnit);
				}

				plotType.totalDataSeries++;

				plotUnit.dataSeriesIndexes.push(i);
			}
		}

		for (i = 0; i < this.plotInfo.plotTypes.length; i++){
			plotType = this.plotInfo.plotTypes[i];
			var previousDataSeriesCount = 0;

			for (j = 0; j < plotType.plotUnits.length; j++){

				plotType.plotUnits[j].previousDataSeriesCount = previousDataSeriesCount;

				previousDataSeriesCount += plotType.plotUnits[j].dataSeriesIndexes.length;
			}
		}
	};

	Chart.prototype.assignIdToDataPoints = function(){

		for (var i = 0; i < this.data.length; i++){
			var dataSeries = this.data[i];

			var length = dataSeries.dataPoints.length;

			for (var j = 0; j < length; j++){
				dataSeries.dataPointIds[j] = ++this._eventManager.lastObjectId;
			}
		}
	};

	Chart.prototype._processData = function(){
		this.assignIdToDataPoints();
		this.categoriseDataSeries();

		for (var i = 0; i < this.plotInfo.plotTypes.length; i++){
			var plotType = this.plotInfo.plotTypes[i];

			for (var j = 0; j < plotType.plotUnits.length; j++){

				var plotUnit = plotType.plotUnits[j];

				if (plotUnit.type === "line" || plotUnit.type === "stepLine" || plotUnit.type === "spline" || plotUnit.type === "column" || plotUnit.type === "area" || plotUnit.type === "splineArea" || plotUnit.type === "bar" || plotUnit.type === "bubble" || plotUnit.type === "scatter")
					this._processMultiseriesPlotUnit(plotUnit);
				else if (plotUnit.type === "stackedColumn" || plotUnit.type === "stackedBar" || plotUnit.type === "stackedArea")
					this._processStackedPlotUnit(plotUnit);
				else if (plotUnit.type === "stackedColumn100" || plotUnit.type === "stackedBar100" || plotUnit.type === "stackedArea100")
					this._processStacked100PlotUnit(plotUnit);
			}
		}

	};

	Chart.prototype._processMultiseriesPlotUnit = function(plotUnit){
		if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
			return;

		var axisYDataInfo = plotUnit.axisY.dataInfo;
		var axisXDataInfo = plotUnit.axisX.dataInfo;
		var dataPointX, dataPointY;
		var isDateTime = false;
		var plotAreaXMin;
		var plotAreaXMax;

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++){
			var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
			var i = 0;
			var isFirstDPInViewPort = false;
			var isLastDPInViewPort = false;

			if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped"){

				plotAreaXMin = this.sessionVariables.axisX.internalMinimum ? this.sessionVariables.axisX.internalMinimum : (this._options.axisX && this._options.axisX.minimum) ? this._options.axisX.minimum : -Infinity;
				plotAreaXMax = this.sessionVariables.axisX.internalMaximum ? this.sessionVariables.axisX.internalMaximum : (this._options.axisX && this._options.axisX.maximum) ? this._options.axisX.maximum : Infinity;
			}


			if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime"){
				isDateTime = true;
			}

			for (i = 0; i < dataSeries.dataPoints.length; i++){

				if (typeof dataSeries.dataPoints[i].x === "undefined"){
					dataSeries.dataPoints[i].x = i;
				}

				if (dataSeries.dataPoints[i].x.getTime){
					isDateTime = true;
					dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
				}
				else
					dataPointX = dataSeries.dataPoints[i].x;

				dataPointY = dataSeries.dataPoints[i].y;


				if (dataPointX < axisXDataInfo.min)
					axisXDataInfo.min = dataPointX;
				if (dataPointX > axisXDataInfo.max)
					axisXDataInfo.max = dataPointX;

				if (dataPointY < axisYDataInfo.min)
					axisYDataInfo.min = dataPointY;

				if (dataPointY > axisYDataInfo.max)
					axisYDataInfo.max = dataPointY;


				if (i > 0){
					var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
					xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

					if (axisXDataInfo.minDiff > xDiff && xDiff !== 0){
						axisXDataInfo.minDiff = xDiff;
					}
				}

				// This section makes sure that partially visible dataPoints are included in the begining
				if (dataPointX < plotAreaXMin && !isFirstDPInViewPort){
					continue;
				} else if (!isFirstDPInViewPort){
					isFirstDPInViewPort = true;

					if (i > 0){
						i -= 2;
						continue;
					}
				}

				// This section makes sure that partially visible dataPoints are included at the end
				if (dataPointX > plotAreaXMax && !isLastDPInViewPort){
					isLastDPInViewPort = true;
				} else if (dataPointX > plotAreaXMax && isLastDPInViewPort){
					continue;
				}

				if (dataSeries.dataPoints[i].label)
					plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;


				if (dataPointX < axisXDataInfo.viewPortMin)
					axisXDataInfo.viewPortMin = dataPointX;
				if (dataPointX > axisXDataInfo.viewPortMax)
					axisXDataInfo.viewPortMax = dataPointX;

				if (dataPointY < axisYDataInfo.viewPortMin)
					axisYDataInfo.viewPortMin = dataPointY;
				if (dataPointY > axisYDataInfo.viewPortMax)
					axisYDataInfo.viewPortMax = dataPointY;
			}

			this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
		}

		//this.dataPoints.sort(compareDataPointX);
		//this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });
	};

	Chart.prototype._processStackedPlotUnit = function(plotUnit){
		var ySum;
		if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
			return;

		var axisYDataInfo = plotUnit.axisY.dataInfo;
		var axisXDataInfo = plotUnit.axisX.dataInfo;

		var dataPointX, dataPointY;
		var isDateTime = false;

		var dataPointYPositiveSums = [];
		var dataPointYNegativeSums = [];

		var plotAreaXMin;
		var plotAreaXMax;

		var j, i;

		for (j = 0; j < plotUnit.dataSeriesIndexes.length; j++){
			var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
			var isFirstDPInViewPort = false;
			var isLastDPInViewPort = false;

			if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped"){

				plotAreaXMin = this.sessionVariables.axisX.internalMinimum ? this.sessionVariables.axisX.internalMinimum : (this._options.axisX && this._options.axisX.minimum) ? this._options.axisX.minimum : -Infinity;
				plotAreaXMax = this.sessionVariables.axisX.internalMaximum ? this.sessionVariables.axisX.internalMaximum : (this._options.axisX && this._options.axisX.maximum) ? this._options.axisX.maximum : Infinity;
			}


			for (i = 0; i < dataSeries.dataPoints.length; i++){

				// Requird when no x values are provided 
				if (typeof dataSeries.dataPoints[i].x === "undefined"){
					dataSeries.dataPoints[i].x = i;
				}

				if (dataSeries.dataPoints[i].x.getTime){
					isDateTime = true;
					dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
				}
				else {
					dataPointX = dataSeries.dataPoints[i].x;
				}

				dataPointY = dataSeries.dataPoints[i].y;


				if (dataPointX < axisXDataInfo.min)
					axisXDataInfo.min = dataPointX;
				if (dataPointX > axisXDataInfo.max)
					axisXDataInfo.max = dataPointX;

				if (i > 0){
					var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
					xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

					if (axisXDataInfo.minDiff > xDiff && xDiff !== 0){
						axisXDataInfo.minDiff = xDiff;
					}
				}

				// This section makes sure that partially visible dataPoints are included in the begining
				if (dataPointX < plotAreaXMin && !isFirstDPInViewPort){
					continue;
				} else if (!isFirstDPInViewPort){
					isFirstDPInViewPort = true;

					if (i > 0){
						i -= 2;
						continue;
					}
				}

				// This section makes sure that partially visible dataPoints are included at the end
				if (dataPointX > plotAreaXMax && !isLastDPInViewPort){
					isLastDPInViewPort = true;
				} else if (dataPointX > plotAreaXMax && isLastDPInViewPort){
					continue;
				}


				if (dataSeries.dataPoints[i].label)
					plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;

				if (dataPointX < axisXDataInfo.viewPortMin)
					axisXDataInfo.viewPortMin = dataPointX;
				if (dataPointX > axisXDataInfo.viewPortMax)
					axisXDataInfo.viewPortMax = dataPointX;

				if (dataPointY >= 0){
					if (dataPointYPositiveSums[dataPointX])
						dataPointYPositiveSums[dataPointX] += dataPointY;
					else
						dataPointYPositiveSums[dataPointX] = dataPointY;
				} else {
					if (dataPointYNegativeSums[dataPointX])
						dataPointYNegativeSums[dataPointX] += dataPointY;
					else
						dataPointYNegativeSums[dataPointX] = dataPointY;
				}
			}

			this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
		}

		for (i in dataPointYPositiveSums){

			if (isNaN(i)){
				continue;
			}
			ySum = dataPointYPositiveSums[i];

			if (ySum < axisYDataInfo.min)
				axisYDataInfo.min = ySum;

			if (ySum > axisYDataInfo.max)
				axisYDataInfo.max = ySum;

			if (i < axisXDataInfo.viewPortMin || i > axisXDataInfo.viewPortMax)
				continue;

			if (ySum < axisYDataInfo.viewPortMin)
				axisYDataInfo.viewPortMin = ySum;
			if (ySum > axisYDataInfo.viewPortMax)
				axisYDataInfo.viewPortMax = ySum;
		}

		for (i in dataPointYNegativeSums){

			if (isNaN(i)){
				continue;
			}

			ySum = dataPointYNegativeSums[i];

			if (ySum < axisYDataInfo.min)
				axisYDataInfo.min = ySum;

			if (ySum > axisYDataInfo.max)
				axisYDataInfo.max = ySum;

			if (i < axisXDataInfo.viewPortMin || i > axisXDataInfo.viewPortMax)
				continue;

			if (ySum < axisYDataInfo.viewPortMin)
				axisYDataInfo.viewPortMin = ySum;
			if (ySum > axisYDataInfo.viewPortMax)
				axisYDataInfo.viewPortMax = ySum;
		}


		//this.dataPoints.sort(compareDataPointX);
		//this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });

		//window.console.log("viewPortYMin: " + plotInfo.viewPortYMin + "; viewPortYMax: " + plotInfo.viewPortYMax);
	};

	Chart.prototype._processStacked100PlotUnit = function(plotUnit){
		var plotAreaXMin;
		var plotAreaXMax;
		if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
			return;

		var axisYDataInfo = plotUnit.axisY.dataInfo;
		var axisXDataInfo = plotUnit.axisX.dataInfo;

		var dataPointX, dataPointY;
		var isDateTime = false;
		var containsPositiveY = false;
		var containsNegativeY = false;

		var dataPointYSums = [];

		for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++){
			var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
			var i = 0;
			var isFirstDPInViewPort = false;
			var isLastDPInViewPort = false;

			if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped"){

				plotAreaXMin = this.sessionVariables.axisX.internalMinimum ? this.sessionVariables.axisX.internalMinimum : (this._options.axisX && this._options.axisX.minimum) ? this._options.axisX.minimum : -Infinity;
				plotAreaXMax = this.sessionVariables.axisX.internalMaximum ? this.sessionVariables.axisX.internalMaximum : (this._options.axisX && this._options.axisX.maximum) ? this._options.axisX.maximum : Infinity;
			}


			if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime"){
				isDateTime = true;
			}

			for (i = 0; i < dataSeries.dataPoints.length; i++){

				// Requird when no x values are provided 
				if (typeof dataSeries.dataPoints[i].x === "undefined"){
					dataSeries.dataPoints[i].x = i;
				}

				if (dataSeries.dataPoints[i].x.getTime){
					isDateTime = true;
					dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
				}
				else
					dataPointX = dataSeries.dataPoints[i].x;

				dataPointY = dataSeries.dataPoints[i].y;


				if (dataPointX < axisXDataInfo.min)
					axisXDataInfo.min = dataPointX;
				if (dataPointX > axisXDataInfo.max)
					axisXDataInfo.max = dataPointX;

				if (i > 0){
					var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
					xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

					if (axisXDataInfo.minDiff > xDiff && xDiff !== 0){
						axisXDataInfo.minDiff = xDiff;
					}
				}

				// This section makes sure that partially visible dataPoints are included in the begining
				if (dataPointX < plotAreaXMin && !isFirstDPInViewPort){
					continue;
				} else if (!isFirstDPInViewPort){
					isFirstDPInViewPort = true;

					if (i > 0){
						i -= 2;
						continue;
					}
				}

				// This section makes sure that partially visible dataPoints are included at the end
				if (dataPointX > plotAreaXMax && !isLastDPInViewPort){
					isLastDPInViewPort = true;
				} else if (dataPointX > plotAreaXMax && isLastDPInViewPort){
					continue;
				}

				if (dataSeries.dataPoints[i].label)
					plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;

				if (dataPointX < axisXDataInfo.viewPortMin)
					axisXDataInfo.viewPortMin = dataPointX;
				if (dataPointX > axisXDataInfo.viewPortMax)
					axisXDataInfo.viewPortMax = dataPointX;

				if (dataPointY >= 0){
					containsPositiveY = true;
				} else {
					containsNegativeY = true;
				}

				if (dataPointYSums[dataPointX])
					dataPointYSums[dataPointX] += Math.abs(dataPointY);
				else
					dataPointYSums[dataPointX] = Math.abs(dataPointY);
			}

			this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
		}


		if (containsPositiveY && !containsNegativeY){
			axisYDataInfo.max = 99;
			axisYDataInfo.min = 1;
		} else if (containsPositiveY && containsNegativeY){
			axisYDataInfo.max = 99;
			axisYDataInfo.min = -99;
		} else if (!containsPositiveY && containsNegativeY){
			axisYDataInfo.max = -1;
			axisYDataInfo.min = -99;
		}

		axisYDataInfo.viewPortMin = axisYDataInfo.min;
		axisYDataInfo.viewPortMax = axisYDataInfo.max;

		plotUnit.dataPointYSums = dataPointYSums;

		//this.dataPoints.sort(compareDataPointX);
		//this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });

		//window.console.log("viewPortYMin: " + plotInfo.viewPortYMin + "; viewPortYMax: " + plotInfo.viewPortYMax);
	};


	/// <summary>Calculates Font Size based on standardSize and Chart Size</summary>
	/// <param name="standardSize" type="Number">Standard font size for a Chart with min(width,height) = 400px</param>
	/// <returns type="Number">The area.</returns>
	Chart.prototype.getAutoFontSize = function(standardSize){

		var fontSizeScaleFactor = standardSize / 400;

		return Math.min(this.canvas.width, this.canvas.height) * fontSizeScaleFactor;
	};

	//#region Events

	Chart.prototype.resetOverlayedCanvas = function(){
		var width = this.overlaidCanvas.width;
		this.overlaidCanvas.width = 0;
		this.overlaidCanvas.width = width;
	};

	Chart.prototype.attachEvent = function(param){
		this._events.push(param);
	};

	Chart.prototype._touchEventHandler = function(ev){
		if (!ev.changedTouches)
			return;

		var mouseEvents = [];
		var touches = ev.changedTouches;
		var first = touches ? touches[0] : ev;

		switch (ev.type){
			case "touchstart":
			case "MSPointerDown":
				mouseEvents = ["mousemove", "mousedown"];
				break;
			case "touchmove":
			case "MSPointerMove":
				mouseEvents = ["mousemove"];
				break;
			case "touchend":
			case "MSPointerUp":
				mouseEvents = (this._lastTouchEventType === "touchstart" || this._lastTouchEventType === "MSPointerDown") ? ["mouseup", "click"] : ["mouseup"];
				break;
			default:
				return;
		}

		this._lastTouchEventType = ev.type;

		for (var i = 0; i < mouseEvents.length; i++){

			var type = mouseEvents[i];
			var simulatedEvent = document.createEvent("MouseEvent");
			simulatedEvent.initMouseEvent(type, true, true, window, 1,
				first.screenX, first.screenY,
				first.clientX, first.clientY, false,
				false, false, false, 0/*left*/, null);

			first.target.dispatchEvent(simulatedEvent);

			if (ev.preventManipulation){
				//alert("preventManipulation");
				ev.preventManipulation();
			}

			if (ev.preventDefault){
				//alert("preventDefault");
				ev.preventDefault();
			}
		}
	};

	Chart.prototype._mouseEventHandler = function(ev){
		// stop panning and zooming so we can draw
		if (ev.preventManipulation){
			//alert("preventManipulation");
			ev.preventManipulation();
		}

		// we are handling this event
		if (ev.preventDefault){
			//alert("preventDefault");
			ev.preventDefault();
		}

		//console.log(ev.type);

		var xy = getMouseCoordinates(ev);
		var type = ev.type;
		var eventParam;
		var rightclick;

		if (!ev) ev = window.event;
		if (ev.which) rightclick = (ev.which == 3);
		else if (ev.button) rightclick = (ev.button == 2);

		//window.console.log(type + " --> x: " + xy.x + "; y:" + xy.y);

		//if (type === "mouseout") {
		//    this._toolTip.hide();
		//}

		if (isDebugMode && window.console){
			window.console.log(type + " --> x: " + xy.x + "; y:" + xy.y);
			if (rightclick)
				window.console.log(ev.which);

			if (type === "mouseup")
				window.console.log("mouseup");
		}

		if (rightclick)
			return;

		//if (this.plotInfo.axisPlacement === "xySwapped") {
		//    //var temp = xy.x;
		//    //xy.x = xy.y;
		//    //xy.y = temp;
		//    xy = {x: xy.y, y: xy.x};
		//}

		if (Chart.capturedEventParam){
			eventParam = Chart.capturedEventParam;

			if (type === "mouseup"){
				Chart.capturedEventParam = null;

				if (eventParam.chart.overlaidCanvas.releaseCapture)
					eventParam.chart.overlaidCanvas.releaseCapture();
				else
					document.body.removeEventListener("mouseup", eventParam.chart._mouseEventHandler, false);

			}

			if (eventParam.hasOwnProperty(type))
				eventParam[type].call(eventParam.context, xy.x, xy.y);


		}
		else if (this._events){

			for (var i = 0; i < this._events.length; i++){
				if (!this._events[i].hasOwnProperty(type))
					continue;

				eventParam = this._events[i];
				var bounds = eventParam.bounds;

				if (xy.x >= bounds.x1 && xy.x <= bounds.x2 && xy.y >= bounds.y1 && xy.y <= bounds.y2){
					eventParam[type].call(eventParam.context, xy.x, xy.y);

					if (type === "mousedown" && eventParam.capture === true){
						Chart.capturedEventParam = eventParam;

						if (this.overlaidCanvas.setCapture)
							this.overlaidCanvas.setCapture();
						else {
							document.body.addEventListener("mouseup", this._mouseEventHandler, false);
						}
					} else if (type === "mouseup"){
						if (eventParam.chart.overlaidCanvas.releaseCapture)
							eventParam.chart.overlaidCanvas.releaseCapture();
						else
							document.body.removeEventListener("mouseup", this._mouseEventHandler, false);
					}

					break;
				}
				else
					eventParam = null;
			}

			//if (eventParam && eventParam.cursor) {
			//    ev.target.style.cursor = eventParam.cursor;
			//}
			//else
			//    ev.target.style.cursor = "default";

			//eventParam = 
		}

		if (this._toolTip && this._toolTip.enabled){

			var plotArea = this.getPlotArea();

			if (xy.x < plotArea.x1 || xy.x > plotArea.x2 || xy.y < plotArea.y1 || xy.y > plotArea.y2)
				this._toolTip.hide();
		}


		if ((!this.isDrag || !this.zoomEnabled) && this._eventManager){
			this._eventManager.mouseEventHandler(ev);
			//this._updateToolTip(ev.x, ev.y);            
		}

		//if (this._toolTip.enabled)
		//    this._toolTip.mouseMoveHandler(ev.x, ev.y);
	};

	Chart.prototype._plotAreaMouseDown = function(x, y){
		this.isDrag = true;

		if (this.plotInfo.axisPlacement !== "none"){
			this.dragStartPoint = { x: x, y: y, xMinimum: this.axisX.minimum, xMaximum: this.axisX.maximum };
		} else {
			this.dragStartPoint = { x: x, y: y };
		}

	};

	Chart.prototype._plotAreaMouseUp = function(x, y){

		var maxX;
		var minX;
		var selectedRegion;
		if (this.plotInfo.axisPlacement === "normal" || this.plotInfo.axisPlacement === "xySwapped"){
			if (this.isDrag){

				var dragDelta = 0;
				var dragValue = 0;
				var axisXProps = this.axisX.lineCoordinates;

				if (this.plotInfo.axisPlacement === "xySwapped"){
					dragDelta = y - this.dragStartPoint.y;
					dragValue = Math.abs(this.axisX.maximum - this.axisX.minimum) / axisXProps.height * dragDelta;
				}
				else {
					dragDelta = this.dragStartPoint.x - x;
					dragValue = Math.abs(this.axisX.maximum - this.axisX.minimum) / axisXProps.width * dragDelta;
				}

				if (Math.abs(dragDelta) > 2){
					if (this.panEnabled){

						var reRender = false;
						var overFlow = 0;

						//If the user has panned beyond the minimum/maximum value of axisX, then take it back to minimum/maximum.
						if (this.axisX.sessionVariables.internalMinimum < this.axisX._absoluteMinimum){

							overFlow = this.axisX._absoluteMinimum - this.axisX.sessionVariables.internalMinimum;

							this.axisX.sessionVariables.internalMinimum += overFlow;
							this.axisX.sessionVariables.internalMaximum += overFlow;
							reRender = true;
						} else if (this.axisX.sessionVariables.internalMaximum > this.axisX._absoluteMaximum){

							overFlow = this.axisX.sessionVariables.internalMaximum - this.axisX._absoluteMaximum;
							this.axisX.sessionVariables.internalMaximum -= overFlow;
							this.axisX.sessionVariables.internalMinimum -= overFlow;

							reRender = true;
						}
						//}


						this.overlaidCanvas.style.cursor = this._defaultCursor;


						if (reRender)
							this.render();

					} else if (this.zoomEnabled){

						this.resetOverlayedCanvas();

						//alert("mouse UP");
						if (!this.dragStartPoint)
							return;

						if (this.plotInfo.axisPlacement === "xySwapped"){
							//In Pixels
							selectedRegion = { y1: Math.min(this.dragStartPoint.y, y), y2: Math.max(this.dragStartPoint.y, y) };

							if (Math.abs(selectedRegion.y1 - selectedRegion.y2) > 1){
								axisXProps = this.axisX.lineCoordinates;

								minX = this.axisX.maximum - (this.axisX.maximum - this.axisX.minimum) / axisXProps.height * (selectedRegion.y2 - axisXProps.y1);
								maxX = this.axisX.maximum - (this.axisX.maximum - this.axisX.minimum) / axisXProps.height * (selectedRegion.y1 - axisXProps.y1);

								minX = Math.max(minX, this.axisX.dataInfo.min);
								maxX = Math.min(maxX, this.axisX.dataInfo.max);

								if (Math.abs((maxX - minX) / this.axisX.dataInfo.minDiff) >= 4 / 500 * this.canvas.height){

									this.axisX.sessionVariables.internalMinimum = minX;
									this.axisX.sessionVariables.internalMaximum = maxX;

									this.render();
								}
							}
						} else if (this.plotInfo.axisPlacement === "normal"){
							selectedRegion = { x1: Math.min(this.dragStartPoint.x, x), x2: Math.max(this.dragStartPoint.x, x) };

							if (Math.abs(selectedRegion.x1 - selectedRegion.x2) > 1){
								axisXProps = this.axisX.lineCoordinates;

								minX = (this.axisX.maximum - this.axisX.minimum) / axisXProps.width * (selectedRegion.x1 - axisXProps.x1) + this.axisX.minimum;
								maxX = (this.axisX.maximum - this.axisX.minimum) / axisXProps.width * (selectedRegion.x2 - axisXProps.x1) + this.axisX.minimum;

								minX = Math.max(minX, this.axisX.dataInfo.min);
								maxX = Math.min(maxX, this.axisX.dataInfo.max);

								if (Math.abs((maxX - minX) / this.axisX.dataInfo.minDiff) >= 5 / 500 * this.canvas.width){

									this.axisX.sessionVariables.internalMinimum = minX;
									this.axisX.sessionVariables.internalMaximum = maxX;

									this.render();
								}
							}
						}
					}

					if (this.zoomEnabled && this._toolBar.style.display === "none"){
						this._toolBar.style.display = "inline";
						this._zoomButton.innerHTML = this._cultureInfo.panText;
						this._resetButton.innerHTML = this._cultureInfo.resetText;
					}
				}
			}

		}

		this.isDrag = false;

		//this.dragStartPoint = null;
	};

	Chart.prototype._plotAreaMouseMove = function(x, y){
		if (this.isDrag && this.plotInfo.axisPlacement !== "none"){

			var dragDelta = 0;
			var dragValue = 0;
			var axisXProps = this.axisX.lineCoordinates;

			if (this.plotInfo.axisPlacement === "xySwapped"){
				dragDelta = y - this.dragStartPoint.y;
				dragValue = Math.abs(this.axisX.maximum - this.axisX.minimum) / axisXProps.height * dragDelta;
			}
			else {
				dragDelta = this.dragStartPoint.x - x;
				dragValue = Math.abs(this.axisX.maximum - this.axisX.minimum) / axisXProps.width * dragDelta;
			}

			if (Math.abs(dragDelta) > 2 && Math.abs(dragDelta) < 8 && (this.panEnabled || this.zoomEnabled)){
				this._toolTip.hide();
			} else if (this._toolTip.enabled && !this.panEnabled && !this.zoomEnabled){
				this._toolTip.mouseMoveHandler(x, y);
			}

			if (Math.abs(dragDelta) > 2 && (this.panEnabled || this.zoomEnabled)){
				if (this.panEnabled){

					this.axisX.sessionVariables.internalMinimum = this.dragStartPoint.xMinimum + dragValue;
					this.axisX.sessionVariables.internalMaximum = this.dragStartPoint.xMaximum + dragValue;

					var overFlow = 0;

					// This is to stop the user from dragging chart beyond some limit (this.axisX._absoluteMinimum - this.axisX.interval)
					if (this.axisX.sessionVariables.internalMinimum < this.axisX._absoluteMinimum - convertToNumber(this.axisX.interval, this.axisX.intervalType)){

						overFlow = (this.axisX._absoluteMinimum - convertToNumber(this.axisX.interval, this.axisX.intervalType)) - this.axisX.sessionVariables.internalMinimum;
						this.axisX.sessionVariables.internalMinimum += overFlow;
						this.axisX.sessionVariables.internalMaximum += overFlow;
					} else if (this.axisX.sessionVariables.internalMaximum > this.axisX._absoluteMaximum + convertToNumber(this.axisX.interval, this.axisX.intervalType)){
						overFlow = this.axisX.sessionVariables.internalMaximum - (this.axisX._absoluteMaximum + convertToNumber(this.axisX.interval, this.axisX.intervalType));
						this.axisX.sessionVariables.internalMaximum -= overFlow;
						this.axisX.sessionVariables.internalMinimum -= overFlow;
					}

					//this.dragStartPoint.x = x;

					//this.render();
					var that = this;

					clearTimeout(this._panTimerId);
					this._panTimerId = setTimeout(function(){
						that.render();
					}, 0);

				} else if (this.zoomEnabled){
					var plotAreaBounds = this.getPlotArea();

					this.resetOverlayedCanvas();

					var alpha = this.overlaidCanvasCtx.globalAlpha;

					this.overlaidCanvasCtx.globalAlpha = 0.7;
					this.overlaidCanvasCtx.fillStyle = "#A0ABB8";

					if (this.plotInfo.axisPlacement === "xySwapped"){
						this.overlaidCanvasCtx.fillRect(plotAreaBounds.x1, this.dragStartPoint.y, plotAreaBounds.x2 - plotAreaBounds.x1, y - this.dragStartPoint.y);
					}
					else if (this.plotInfo.axisPlacement === "normal"){
						this.overlaidCanvasCtx.fillRect(this.dragStartPoint.x, plotAreaBounds.y1, x - this.dragStartPoint.x, plotAreaBounds.y2 - plotAreaBounds.y1);
					}

					this.overlaidCanvasCtx.globalAlpha = alpha;
				}
			}

			//if (dragDelta > 5) {
			//    this._toolTip.hide();
			//    return;
			//} else if (this._toolTip.enabled)
			//    this._toolTip.mouseMoveHandler(x, y);

		} else if (this._toolTip.enabled)
			this._toolTip.mouseMoveHandler(x, y);
	};

	//#endregion Events

	Chart.prototype.getPlotArea = function(){
		var x1, x2, y1, y2;

		var yAxis = this.axisY ? this.axisY : this.axisY2;

		if (this.axisX && yAxis){
			x1 = this.axisX.lineCoordinates.x1 < this.axisX.lineCoordinates.x2 ? this.axisX.lineCoordinates.x1 : yAxis.lineCoordinates.x1;
			y1 = (this.axisX.lineCoordinates.y1 < yAxis.lineCoordinates.y1 ? this.axisX.lineCoordinates.y1 : yAxis.lineCoordinates.y1);

			x2 = (this.axisX.lineCoordinates.x2 > yAxis.lineCoordinates.x2 ? this.axisX.lineCoordinates.x2 : yAxis.lineCoordinates.x2);
			y2 = this.axisX.lineCoordinates.y2 > this.axisX.lineCoordinates.y1 ? this.axisX.lineCoordinates.y2 : yAxis.lineCoordinates.y2;
		} else {
			return this.layoutManager.getFreeSpace();
		}


		return { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };
	};

	Chart.prototype.getPixelCoordinatesOnPlotArea = function(x, y){
		return { x: this.axisX.getPixelCoordinatesOnAxis(x).x, y: this.axisY.getPixelCoordinatesOnAxis(y).y };
		//return { x: 5, y: 10 };
	};

	//#region Render Methods

	Chart.prototype.renderIndexLabels = function(){

		this.ctx.textBaseline = "middle";
		var plotArea = this.getPlotArea();

		for (var i = 0; i < this._indexLabels.length; i++){

			var indexLabel = this._indexLabels[i];

			var x, y, angle;

			this.ctx.fillStyle = getProperty("indexLabelFontColor", indexLabel.dataPoint, indexLabel.dataSeries);
			this.ctx.font = getFontString("indexLabel", indexLabel.dataPoint, indexLabel.dataSeries);
			var indexLabelText = this.replaceKeywordsWithValue(getProperty("indexLabel", indexLabel.dataPoint, indexLabel.dataSeries), indexLabel.dataPoint, indexLabel.dataSeries);
			var textSize = { width: this.ctx.measureText(indexLabelText).width, height: getProperty("indexLabelFontSize", indexLabel.dataPoint, indexLabel.dataSeries) };
			var placement = getProperty("indexLabelPlacement", indexLabel.dataPoint, indexLabel.dataSeries);
			var orientation = getProperty("indexLabelOrientation", indexLabel.dataPoint, indexLabel.dataSeries);
			angle = 0;

			var yMinLimit = 0;
			var yMaxLimit = 0;
			var xMinLimit = 0;
			var xMaxLimit = 0;

			//So that indexLabel is skipped once the point is outside of plotArea
			if (indexLabel.point.x < plotArea.x1 || indexLabel.point.x > plotArea.x2 || indexLabel.point.y < plotArea.y1 || indexLabel.point.y > plotArea.y2)
				continue;

			if (indexLabel.chartType === "column" || indexLabel.chartType === "stackedColumn" || indexLabel.chartType === "stackedColumn100" || indexLabel.chartType === "bar" || indexLabel.chartType === "stackedBar" || indexLabel.chartType === "stackedBar100"){

				// not used:
				//var width = Math.abs(indexLabel.bounds.x1, indexLabel.bounds.x2);
				//var height = Math.abs(indexLabel.bounds.y1, indexLabel.bounds.y2);

				if (this.plotInfo.axisPlacement === "normal"){

					if (placement === "outside"){

						yMinLimit = plotArea.y1;
						yMaxLimit = plotArea.y2;

					} else if (placement === "inside"){

						yMinLimit = indexLabel.bounds.y1;
						yMaxLimit = indexLabel.bounds.y2;

					}

					if (orientation === "horizontal"){
						x = indexLabel.point.x - textSize.width / 2;

						if (indexLabel.dataPoint.y >= 0)
							y = Math.min((Math.max(indexLabel.point.y - textSize.height / 2 - 5, yMinLimit + textSize.height / 2 + 5)), yMaxLimit - textSize.height / 2 - 5);
						else
							y = Math.max((Math.min(indexLabel.point.y + textSize.height / 2 + 5, yMaxLimit - textSize.height / 2)), yMinLimit + textSize.height / 2 + 5);
					}
					else if (orientation === "vertical"){
						x = indexLabel.point.x;
						if (indexLabel.dataPoint.y >= 0)
							y = Math.min(Math.max(indexLabel.point.y - 5, yMinLimit + textSize.width + 5), yMaxLimit);
						else
							y = Math.max(Math.min(indexLabel.point.y + textSize.width + 5, yMaxLimit - 5), yMinLimit);

						angle = -90;
					}

				} else if (this.plotInfo.axisPlacement === "xySwapped"){

					if (placement === "outside"){

						xMinLimit = plotArea.x1;
						xMaxLimit = plotArea.x2;

					} else if (placement === "inside"){

						xMinLimit = indexLabel.bounds.x1;
						xMaxLimit = indexLabel.bounds.x2;

					}

					if (orientation === "horizontal"){
						y = indexLabel.point.y;

						if (indexLabel.dataPoint.y >= 0)
							x = Math.max((Math.min(indexLabel.point.x + 5, xMaxLimit - textSize.width)), xMinLimit);
						else
							x = Math.min((Math.max(indexLabel.point.x - textSize.width - 5, xMinLimit)), xMaxLimit);
					}
					else if (orientation === "vertical"){
						y = indexLabel.point.y + textSize.width / 2;

						if (indexLabel.dataPoint.y >= 0)
							x = Math.max(Math.min(indexLabel.point.x + textSize.height / 2 + 5, xMaxLimit - textSize.height / 2), xMinLimit);
						else
							x = Math.min(Math.max(indexLabel.point.x - textSize.height / 2 - 5, xMinLimit + textSize.height / 2), xMaxLimit + textSize.height / 2);

						angle = -90;
					}

				}

			} else {

				if (orientation === "horizontal"){

					x = indexLabel.point.x - textSize.width / 2;

					if (indexLabel.dataPoint.y >= 0)
						y = Math.max(indexLabel.point.y - textSize.height / 2 - 5, plotArea.y1 + textSize.height / 2);
					else
						y = Math.min(indexLabel.point.y + textSize.height / 2 + 5, plotArea.y2 - textSize.height / 2);

				} else if (orientation === "vertical"){

					x = indexLabel.point.x;

					if (indexLabel.dataPoint.y >= 0)
						y = Math.max(indexLabel.point.y - 5, plotArea.y1 + textSize.width);
					else
						y = Math.min(indexLabel.point.y + textSize.width + 5, plotArea.y2);

					angle = -90;
				}

			}

			this.ctx.save();

			this.ctx.translate(x, y);
			this.ctx.rotate(Math.PI / 180 * angle);

			this.ctx.fillText(indexLabelText, 0, 0);

			this.ctx.restore();
		}
	};


	function getBezierPoints(points, tension){
		var bezierPoints = [];

		for (var i = 0; i < points.length; i++){

			if (i === 0){
				bezierPoints.push(points[0]);
				continue;
			}

			var i1, i2, pointIndex;

			pointIndex = i - 1;
			i1 = pointIndex === 0 ? 0 : pointIndex - 1;
			i2 = pointIndex === points.length - 1 ? pointIndex : pointIndex + 1;

			var drv1 = { x: (points[i2].x - points[i1].x) / tension, y: (points[i2].y - points[i1].y) / tension };
			var cp1 = { x: points[pointIndex].x + drv1.x / 3, y: points[pointIndex].y + drv1.y / 3 };
			bezierPoints[bezierPoints.length] = cp1;


			pointIndex = i;
			i1 = pointIndex === 0 ? 0 : pointIndex - 1;
			i2 = pointIndex === points.length - 1 ? pointIndex : pointIndex + 1;

			var drv2 = { x: (points[i2].x - points[i1].x) / tension, y: (points[i2].y - points[i1].y) / tension };
			var cp2 = { x: points[pointIndex].x - drv2.x / 3, y: points[pointIndex].y - drv2.y / 3 };
			bezierPoints[bezierPoints.length] = cp2;

			bezierPoints[bezierPoints.length] = points[i];
		}

		return bezierPoints;
	}


	var drawRect = function(ctx, x1, y1, x2, y2, color, top, bottom, left, right){
		//alert("top"+ top + "bottom" + bottom + " lt" + left+ "rt" + right )
		var grd;
		var a1 = x1, a2 = x2, b1 = y1, b2 = y2;
		//var edgeY, edgeX;
		var bevelDepth = (x2 - x1 > 15 && y2 - y1 > 15) ? 8 : 0.35 * Math.min((x2 - x1), (y2 - y1));
		//alert(a1 + "" + a2);
		var color2 = "rgba(255, 255, 255, .4)";
		var color3 = "rgba(255, 255, 255, 0.1)";
		//color1 = "rgba(" + r + "," + g + ", " + b + ",1)";
		var color1 = color;

		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.save();
		ctx.fillStyle = color1;
		//  ctx.moveTo(x1, y1);
		ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
		ctx.restore();
		//   ctx.beginPath();
		if (top === true){
			// alert(x1 + "" + x2 + " " + bevelDepth);
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x1 + bevelDepth, y1 + bevelDepth);
			ctx.lineTo(x2 - bevelDepth, y1 + bevelDepth);
			ctx.lineTo(x2, y1);
			ctx.closePath();
			grd = ctx.createLinearGradient((x2 + x1) / 2, b1 + bevelDepth, (x2 + x1) / 2, b1);
			grd.addColorStop(0, color1);
			grd.addColorStop(1, color2);
			ctx.fillStyle = grd;
			ctx.fill();
			//              ctx.stroke();
			ctx.restore();
		}


		if (bottom === true){
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(x1, y2);
			ctx.lineTo(x1 + bevelDepth, y2 - bevelDepth);
			ctx.lineTo(x2 - bevelDepth, y2 - bevelDepth);
			ctx.lineTo(x2, y2);
			ctx.closePath();
			grd = ctx.createLinearGradient((x2 + x1) / 2, b2 - bevelDepth, (x2 + x1) / 2, b2);
			grd.addColorStop(0, color1);
			grd.addColorStop(1, color2);
			ctx.fillStyle = grd;
			//       ctx.stroke();
			ctx.fill();
			ctx.restore();
		}

		if (left === true){
			//   alert(x1)
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x1 + bevelDepth, y1 + bevelDepth);
			ctx.lineTo(x1 + bevelDepth, y2 - bevelDepth);
			ctx.lineTo(x1, y2);
			ctx.closePath();
			grd = ctx.createLinearGradient(a1 + bevelDepth, (y2 + y1) / 2, a1, (y2 + y1) / 2);
			grd.addColorStop(0, color1);
			grd.addColorStop(1, color3);
			ctx.fillStyle = grd;
			ctx.fill();
			//     ctx.stroke();
			ctx.restore();
		}


		if (right === true){
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(x2, y1);
			ctx.lineTo(x2 - bevelDepth, y1 + bevelDepth);
			ctx.lineTo(x2 - bevelDepth, y2 - bevelDepth);
			ctx.lineTo(x2, y2);
			grd = ctx.createLinearGradient(a2 - bevelDepth, (y2 + y1) / 2, a2, (y2 + y1) / 2);
			grd.addColorStop(0, color1);
			grd.addColorStop(1, color3);
			ctx.fillStyle = grd;
			grd.addColorStop(0, color1);
			grd.addColorStop(1, color3);
			ctx.fillStyle = grd;
			ctx.fill();
			ctx.closePath();
			//          ctx.stroke();
			ctx.restore();
		}
		//
	};

	//#region pieChart

	var drawSegment = function(ctx, center, radius, color, type, theta1, theta2){


		ctx.save();

		if (type === "pie"){
			ctx.beginPath();
			ctx.moveTo(center.x, center.y);
			ctx.arc(center.x, center.y, radius, theta1, theta2, false);
			ctx.fillStyle = color;
			ctx.strokeStyle = "white";
			ctx.lineWidth = 2;
			//    ctx.shadowOffsetX = 2;
			//    ctx.shadowOffsetY = 1;
			//     ctx.shadowBlur = 2;
			//    ctx.shadowColor = '#BFBFBF';
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
		else if (type === "doughnut"){
			var widthPercentage = 0.60;

			ctx.beginPath();
			//ctx.moveTo(center.x, center.y);
			ctx.arc(center.x, center.y, radius, theta1, theta2, false);
			ctx.arc(center.x, center.y, widthPercentage * radius, theta2, theta1, true);
			ctx.closePath();
			ctx.fillStyle = color;
			ctx.strokeStyle = "white";
			ctx.lineWidth = 2;
			// shadow properties
			//     ctx.shadowOffsetX = 1;
			//    ctx.shadowOffsetY = 1;
			//     ctx.shadowBlur = 1;
			//    ctx.shadowColor = '#BFBFBF';  //grey shadow
			ctx.stroke();
			ctx.fill();
		}

		ctx.restore();
	};


	Chart.prototype.requestAnimFrame = (function(){
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback){
				window.setTimeout(callback, 1000 / 60);
			};
	}());

	//#endregion Class Chart

	//#region Class LayoutManager
	function LayoutManager(canvas){

		this._topOccupied = 0;
		this._bottomOccupied = 0;
		this._leftOccupied = 0;
		this._rightOccupied = 0;
		this.canvas = canvas;
	}

	LayoutManager.prototype.registerSpace = function(position, size){
		if (position === "top"){
			this._topOccupied += size.height;
		}
		else if (position === "bottom"){
			this._bottomOccupied += size.height;
		} else if (position === "left"){
			this._leftOccupied += size.width; // this is width when seen upright/vertically
		} else if (position === "right"){
			this._rightOccupied += size.width;// this is width when seen upright/vertically
		}
	};

	LayoutManager.prototype.unRegisterSpace = function(position, size){
		if (position === "top"){
			this._topOccupied -= size.height;
		}
		else if (position === "bottom"){
			this._bottomOccupied -= size.height;
		} else if (position === "left"){
			this._leftOccupied -= size.width;// this is width when seen upright/vertically
		} else if (position === "right"){
			this._rightOccupied -= size.width;// this is width when seen upright/vertically
		}
	};

	LayoutManager.prototype.getFreeSpace = function(){
		///<signature>
		///<summary>Returns available free space {x1:number, y1:number, x2:number, y2:number}</summary>
		///</signature>

		return {
			x1: this._leftOccupied,
			y1: this._topOccupied,
			x2: this.canvas.width - this._rightOccupied,
			y2: this.canvas.height - this._bottomOccupied,
			width: (this.canvas.width - this._rightOccupied) - this._leftOccupied,
			height: (this.canvas.height - this._bottomOccupied) - this._topOccupied
		};
	};

	LayoutManager.prototype.reset = function(){
		this._topOccupied = 0;
		this._bottomOccupied = 3;//so that there is enough padding in the bottom.
		this._leftOccupied = 0;
		this._rightOccupied = 0;
	};
	//#endregion Class LayoutManager

	//#region Class TextBlock
	function TextBlock(ctx, options){
		TextBlock.parent.constructor.call(this, "TextBlock", options);

		this.ctx = ctx;
		this._isDirty = true;
		this._wrappedText = null;
	}

	extend(TextBlock, CanvasJSObject);
	TextBlock.prototype.render = function(preserveContext){
		if (preserveContext)
			this.ctx.save();

		var font = this.ctx.font;
		this.ctx.textBaseline = this.textBaseline;

		if (this._isDirty)
			this.measureText(this.ctx);

		this.ctx.translate(this.x, this.y);
		this.ctx.font = this._getFontString();

		this.ctx.rotate(Math.PI / 180 * this.angle);

		var textLeft = 0;
		//var textTop = this.textBaseline === "middle" ? this.fontSize / 2 + this.padding : this.padding;
		var textTop = this.padding;
		var line = null;

		if ((this.borderThickness > 0 && this.borderColor) || this.backgroundColor){
			this.ctx.roundRect(0, 0, this.width, this.height, this.cornerRadius, this.borderThickness, this.backgroundColor, this.borderColor);

			if (this.textBaseline === "middle")
				textTop += this.fontSize / 2;
		}

		this.ctx.fillStyle = this.fontColor;

		for (var i = 0; i < this._wrappedText.lines.length; i++){

			line = this._wrappedText.lines[i];
			if (this.horizontalAlign === "right")
				textLeft = this.width - line.width - this.padding;
			else if (this.horizontalAlign === "left")
				textLeft = this.padding;
			else if (this.horizontalAlign === "center")
				textLeft = (this.width - this.padding * 2) / 2 - line.width / 2 + this.padding;

			this.ctx.fillText(line.text, textLeft, textTop);

			textTop += line.height;
		}

		this.ctx.font = font;

		if (preserveContext)
			this.ctx.restore();
	};

	TextBlock.prototype.setText = function(text){
		this.text = text;
		this._isDirty = true;
		this._wrappedText = null;
	};

	TextBlock.prototype.measureText = function(){
		if (this.maxWidth === null){
			throw ("Please set maxWidth and height for TextBlock");
		}

		this._wrapText(this.ctx);
		this._isDirty = false;

		return { width: this.width, height: this.height };
	};

	TextBlock.prototype._wrapText = function wrapText(){
		//this.ctx.save();
		var text = '' + trimString(this.text);
		var lines = [];
		var font = this.ctx.font; // Save the current Font
		var height = 0;
		var width = 0;

		this.ctx.font = this._getFontString();

		while (text.length > 0){

			var newLine = text;
			var newLineWidth = 0;
			var approxTextLength = 0;
			var maxWidth = this.maxWidth - this.padding * 2;
			var maxHeight = this.maxHeight - this.padding * 2;

			while (true){
				newLineWidth = this.ctx.measureText(newLine).width;
				approxTextLength = 0;
				var index = 0;

				if (newLineWidth > maxWidth){

					approxTextLength = (newLine.length) / newLineWidth * maxWidth;
					var tempLength = Math.max(Math.min(Math.ceil(approxTextLength), newLine.length - 1), 0);

					index = newLine.lastIndexOf(" ", tempLength, newLine.length - 1);

					if (index >= 0){
						newLine = trimString(text.slice(0, index));
					} else {
						newLine = trimString(text.slice(0, tempLength - 1));
					}

				}
				else {
					lines.push({ text: newLine, width: newLineWidth, height: this.fontSize });

					width = Math.max(width, newLineWidth);
					height += this.fontSize;
					text = trimString(text.slice(newLine.length, text.length));
					break;
				}
			}

			if (maxHeight && height > maxHeight - this.fontSize && text.length > 0){
				var line = lines.pop();

				//var maskLength = Math.min(line.text.length, 3);
				//line.text = trimString(line.text.substr(0, line.text.length - maskLength)) + "...";

				lines.push(line);
				break;
			}
		}

		this._wrappedText = { lines: lines, width: width, height: height };
		this.width = width + this.padding * 2;
		this.height = height + this.padding * 2;

		this.ctx.font = font; // Restore the font
	};

	TextBlock.prototype._getFontString = function(){
		return this.fontStyle + " " + this.fontWeight + " " + this.fontSize + "px " + this.fontFamily;
	};

	//#endregion Class TextBlock

	//#region Class Title

	function Title(chart, options){
		Title.parent.constructor.call(this, "Title", options, chart.theme);

		this.chart = chart;
		this.canvas = chart.canvas;
		this.ctx = this.chart.ctx;


		if (typeof (this._options.fontSize) === "undefined"){

			this.fontSize = this.chart.getAutoFontSize(this.fontSize);

			//window.console.log("Chart Title fontSize: " + this.fontSize);
		}

		this.width = null; //read only
		this.height = null; //read only
		this.bounds = { x1: null, y1: null, x2: null, y2: null };
	}

	extend(Title, CanvasJSObject);
	Title.prototype.render = function(){

		if (!this.text)
			return;

		var freespace = this.chart.layoutManager.getFreeSpace();
		var left = 0;
		var top = 0;
		var angle = 0;
		var maxWidth = 0;
		var maxHeight = 0;

		var textBlockHorizontalAlign;
		var position;

		if (this.verticalAlign === "top" || this.verticalAlign === "bottom"){
			maxWidth = freespace.width - this.margin * 2;
			maxHeight = freespace.height * 0.5 - this.margin * 2;
			angle = 0;
		}
		else if (this.verticalAlign === "center"){

			if (this.horizontalAlign === "left" || this.horizontalAlign === "right"){
				maxWidth = freespace.height - this.margin * 2;
				maxHeight = freespace.width * 0.5 - this.margin * 2;
			} else if (this.horizontalAlign === "center"){
				maxWidth = freespace.width - this.margin * 2;
				maxHeight = freespace.height * 0.5 - this.margin * 2;
			}
		}

		var textBlock = new TextBlock(this.ctx, {
			fontSize: this.fontSize, fontFamily: this.fontFamily, fontColor: this.fontColor,
			fontStyle: this.fontStyle, fontWeight: this.fontWeight,
			horizontalAlign: this.horizontalAlign, verticalAlign: this.verticalAlign,
			borderColor: this.borderColor, borderThickness: this.borderThickness,
			backgroundColor: this.backgroundColor,
			maxWidth: maxWidth, maxHeight: maxHeight,
			cornerRadius: this.cornerRadius,
			text: this.text,
			padding: this.padding,
			textBaseline: (this.borderColor && this.borderThickness > 0) ? "middle" : "top"
		});

		var textBlockSize = textBlock.measureText();

		if (this.verticalAlign === "top" || this.verticalAlign === "bottom"){

			if (this.verticalAlign === "top"){
				top = this.margin;
				position = "top";
			}
			else if (this.verticalAlign === "bottom"){
				top = freespace.y2 - this.margin - textBlockSize.height;
				position = "bottom";
			}

			if (this.horizontalAlign === "left"){
				left = freespace.x1 + this.margin;
			}
			else if (this.horizontalAlign === "center"){
				left = freespace.x1 + (maxWidth / 2 - textBlockSize.width / 2) + this.margin;
			}
			else if (this.horizontalAlign === "right"){
				left = freespace.x2 - this.margin - textBlockSize.width;
			}

			textBlockHorizontalAlign = this.horizontalAlign;

			this.width = textBlockSize.width;
			this.height = textBlockSize.height;
		}
		else if (this.verticalAlign === "center"){

			if (this.horizontalAlign === "left"){

				left = freespace.x1 + this.margin;
				top = freespace.y2 - this.margin - (maxWidth / 2 - textBlockSize.width / 2);
				angle = -90;

				position = "left";
				this.width = textBlockSize.height;
				this.height = textBlockSize.width;
			}
			else if (this.horizontalAlign === "right"){
				left = freespace.x2 - this.margin;
				top = freespace.y1 + this.margin + (maxWidth / 2 - textBlockSize.width / 2);
				angle = 90;

				position = "right";
				this.width = textBlockSize.height;
				this.height = textBlockSize.width;
			}
			else if (this.horizontalAlign === "center"){
				top = freespace.y1 + (freespace.height / 2 - textBlockSize.height / 2);
				left = freespace.x1 + (freespace.width / 2 - textBlockSize.width / 2);

				position = "center";
				this.width = textBlockSize.width;
				this.height = textBlockSize.height;
			}

			textBlockHorizontalAlign = "center";
		}

		textBlock.x = left;
		textBlock.y = top;
		textBlock.angle = angle;
		textBlock.horizontalAlign = textBlockHorizontalAlign;
		textBlock.render(true);

		this.chart.layoutManager.registerSpace(position, { width: this.width + this.margin * 2, height: this.height + this.margin * 2 });

		this.bounds = { x1: left, y1: top, x2: left + this.width, y2: top + this.height };

		this.ctx.textBaseline = "top";
	};


	//#endregion Class Title

	//#region Legend

	//TBI: Implement Markes for Legend
	function Legend(chart, options, theme){
		Legend.parent.constructor.call(this, "Legend", options, theme);

		this.chart = chart;
		this.canvas = chart.canvas;
		this.ctx = this.chart.ctx;

		this.width = 0,
			//this.fontSize = 12,
			this.height = 0,
			this.orientation = null,
			this.horizontalSpacing = 10;
		this.dataSeries = [];
		this.bounds = { x1: null, y1: null, x2: null, y2: null };
	}

	extend(Legend, CanvasJSObject);

	Legend.prototype.render = function(){
		var row;
		var markerSize;
		var freeSpace = this.chart.layoutManager.getFreeSpace();
		var position = null;
		var top = 0;
		var left = 0;
		var maxWidth = 0;
		var maxHeight = 0;
		//var entryMargin = 5;

		var entries = [];
		var rows = [];

		var entry;

		if (typeof (this._options.fontSize) === "undefined"){

			this.fontSize = this.chart.getAutoFontSize(this.fontSize);

			//window.console.log("fontSize: " + this.fontSize);
		}

		//this.ctx.font = getFontString("", this, null);
		//this.ctx.fontColor = this.fontColor;

		if (this.verticalAlign === "top" || this.verticalAlign === "bottom"){
			this.orientation = "horizontal";
			position = this.verticalAlign;
			maxWidth = freeSpace.width * 0.9;
			maxHeight = freeSpace.height * 0.5;
		}
		else if (this.verticalAlign === "center"){
			this.orientation = "vertical";
			position = this.horizontalAlign;

			maxWidth = freeSpace.width * 0.5;
			maxHeight = freeSpace.height * 0.9;
		}

		for (var i = 0; i < this.dataSeries.length; i++){
			var dataSeries = this.dataSeries[i];

			var markerType = dataSeries.legendMarkerType ? dataSeries.legendMarkerType : (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "scatter" || dataSeries.type === "bubble") && dataSeries.markerType ? dataSeries.markerType : DataSeries.getDefaultLegendMarker(dataSeries.type);
			var legendText = dataSeries.legendText ? dataSeries.legendText : dataSeries.name;
			var markerColor = dataSeries.legendMarkerColor ? dataSeries.legendMarkerColor : dataSeries.markerColor ? dataSeries.markerColor : dataSeries._colorSet[0];
			markerSize = (!dataSeries.markerSize && (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline")) ? 0 : this.fontSize * 0.7;
			//var lineColor = dataSeries._colorSet[0];

			if (dataSeries.type !== "pie" && dataSeries.type !== "doughnut"){
				entry = { markerType: markerType, markerColor: markerColor, text: legendText, textBlock: null, chartType: dataSeries.type, markerSize: markerSize, lineColor: dataSeries._colorSet[0] };

				entries.push(entry);
			} else {
				for (var dataPointIndex = 0; dataPointIndex < dataSeries.dataPoints.length; dataPointIndex++){

					var dataPoint = dataSeries.dataPoints[dataPointIndex];

					markerType = dataPoint.legendMarkerType ? dataPoint.legendMarkerType : dataSeries.legendMarkerType ? dataSeries.legendMarkerType : DataSeries.getDefaultLegendMarker(dataSeries.type);
					legendText = dataPoint.legendText ? dataPoint.legendText : dataSeries.legendText ? dataSeries.legendText : dataPoint.name ? dataPoint.name : "DataPoint: " + (dataPointIndex + 1);
					markerColor = dataPoint.markerColor ? dataPoint.markerColor : dataSeries.markerColor ? dataSeries.markerColor : dataPoint.color ? dataPoint.color : dataSeries.color ? dataSeries.color : dataSeries._colorSet[dataPointIndex % dataSeries._colorSet.length];
					markerSize = ((dataPoint.markerSize === 0 || (dataSeries.markerSize === 0 && !dataPoint.markerSize)) && (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline")) ? 0 : this.fontSize * 0.7;

					entry = { markerType: markerType, markerColor: markerColor, text: legendText, textBlock: null, chartType: dataSeries.type, markerSize: markerSize };

					entries.push(entry);
				}
			}

			entry = null;
		}


		// Find out the required width and height of Legend and position the entries relative to the container
		if (entries.length > 0){
			row = null;
			var rowIndex = 0; // required for vertical orientation
			for (i = 0; i < entries.length; i++){
				entry = entries[i];

				if (this.orientation === "horizontal"){
					entry.textBlock = new TextBlock(this.ctx, {
						x: 0,
						y: 0,//TBI
						maxWidth: maxWidth,
						maxHeight: this.fontSize, //TBI: FontSize
						angle: 0,
						text: entry.text,
						horizontalAlign: "left",//left, center, right
						fontSize: this.fontSize,//in pixels
						fontFamily: this.fontFamily,
						fontWeight: this.fontWeight, //normal, bold, bolder, lighter,
						fontColor: this.fontColor,
						fontStyle: this.fontStyle, // normal, italic, oblique
						textBaseline: "top"
					});
					entry.textBlock.measureText();


					if (!row || row.width + entry.textBlock.width + (row.width === 0 ? 0 : this.horizontalSpacing) > maxWidth){
						row = { entries: [], width: 0 };
						rows.push(row);
						this.height = rows.length * (this.fontSize + 5);
					}

					entry.textBlock.x = row.width + (row.width === 0 ? 0 : this.horizontalSpacing);
					entry.textBlock.y = 0;

					row.width += entry.textBlock.width + (this.fontSize + 5) + (row.width === 0 ? 0 : this.horizontalSpacing);
					row.entries.push(entry);

					this.width = Math.max(row.width, this.width);

				} else {
					if (this.height + this.fontSize < maxHeight){
						row = { entries: [], width: 0 };
						rows.push(row);
						this.height = rows.length * (this.fontSize);
					} else {
						row = rows[rowIndex];
						rowIndex = (rowIndex + 1) % rows.length;
					}

					entry.textBlock = new TextBlock(this.ctx, {
						x: 0,
						y: 0,//TBI
						maxWidth: maxWidth,
						maxHeight: this.fontSize, //TBI: FontSize
						angle: 0,
						text: entry.text,
						horizontalAlign: "left",//left, center, right
						fontSize: this.fontSize,//in pixels
						fontFamily: this.fontFamily,
						fontWeight: this.fontWeight, //normal, bold, bolder, lighter,
						fontColor: this.fontColor,
						fontStyle: this.fontStyle, // normal, italic, oblique
						textBaseline: "top"
					});

					entry.textBlock.measureText();

					entry.textBlock.x = row.width + (row.width === 0 ? 0 : this.horizontalSpacing); // relative to the row
					entry.textBlock.y = 0; // relative to the row

					row.width += entry.textBlock.width + (this.fontSize + 5) + (row.width === 0 ? 0 : this.horizontalSpacing);
					row.entries.push(entry);

					this.width = Math.max(row.width, this.width);
				}
			}

			this.height = rows.length * (this.fontSize);

		}

		if (this.verticalAlign === "top"){
			if (this.horizontalAlign === "left")
				left = freeSpace.x1 + 2;
			else if (this.horizontalAlign === "right")
				left = freeSpace.x2 - this.width - 2;
			else
				left = freeSpace.x1 + freeSpace.width / 2 - this.width / 2;

			top = freeSpace.y1;
		} else if (this.verticalAlign === "center"){
			if (this.horizontalAlign === "left")
				left = freeSpace.x1 + 2;
			else if (this.horizontalAlign === "right")
				left = freeSpace.x2 - this.width - 2;
			else
				left = freeSpace.x1 + freeSpace.width / 2 - this.width / 2;

			top = freeSpace.y1 + freeSpace.height / 2 - this.height / 2;
		} else if (this.verticalAlign === "bottom"){
			if (this.horizontalAlign === "left")
				left = freeSpace.x1 + 2;
			else if (this.horizontalAlign === "right")
				left = freeSpace.x2 - this.width - 2;
			else
				left = freeSpace.x1 + freeSpace.width / 2 - this.width / 2;


			top = freeSpace.y2 - this.height - 5;
		}

		for (i = 0; i < rows.length; i++){
			row = rows[i];
			for (var entryIndex = 0; entryIndex < row.entries.length; entryIndex++){
				entry = row.entries[entryIndex];

				var legendX = entry.textBlock.x + left;
				var legendY = top + (i * this.fontSize);

				if (entry.chartType === "line" || entry.chartType === "stepLine" || entry.chartType === "spline"){
					this.ctx.strokeStyle = entry.lineColor;
					this.ctx.lineWidth = Math.ceil(this.fontSize / 8);
					this.ctx.beginPath();
					this.ctx.moveTo(legendX - 2, legendY + this.fontSize / 2);
					this.ctx.lineTo(legendX + 2 + this.fontSize, legendY + this.fontSize / 2);
					this.ctx.stroke();
				}

				RenderHelper.drawMarker(legendX + this.fontSize / 2, legendY + this.fontSize / 2, this.ctx, entry.markerType, markerSize, entry.markerColor, null, 0);

				entry.textBlock.x = legendX + this.fontSize + 5;
				entry.textBlock.y = legendY;
				entry.textBlock.render(true);
			}
		}

		//this.ctx.strokeStyle = "red";
		//this.ctx.rect(left, top, this.width, this.height);
		//this.ctx.stroke();


		this.chart.layoutManager.registerSpace(position, { width: this.width, height: this.height + 5 + 5 });

		this.bounds = { x1: left, y1: top, x2: left + this.width, y2: top + this.height };
	};

	//#endregion Legend

	//#region Class PlotArea
	function PlotArea(chart, options){
		PlotArea.parent.constructor.call(this, options);

		this.chart = chart;
		this.canvas = chart.canvas;
		this.ctx = this.chart.ctx;
	}

	extend(PlotArea, CanvasJSObject);

	PlotArea.prototype.render = function(){
		var freeSpace = this.chart.layoutManager.getFreeSpace();

		this.ctx.fillStyle = "red";
		this.ctx.fillRect(freeSpace.x1, freeSpace.y1, freeSpace.x2, freeSpace.y2);
	};
	//#endregion Class PlotArea

	//#region DataSeries

	function DataSeries(chart, options, theme, index, id){
		DataSeries.parent.constructor.call(this, "DataSeries", options, theme);

		this.chart = chart;
		this.canvas = chart.canvas;
		this._ctx = chart.canvas.ctx;
		this.index = index;
		this.noDataPointsInPlotArea = 0;
		this.id = id;
		this.dataPointIds = [];

		this.axisX = null;
		this.axisY = null;

		this.axisPlacement = this.getDefaultAxisPlacement();
	}

	extend(DataSeries, CanvasJSObject);

	//Static Method that returns the axisPlacement for a given ChartType. Returns one of "normal", "xySwapped", "none"
	DataSeries.prototype.getDefaultAxisPlacement = function(){

		//type = this.type.toLowerCase();
		var type = this.type;

		if (type === "column" || type === "line" || type === "stepLine" || type === "spline" || type === "area" || type === "splineArea" || type === "stackedColumn" || type === "stackedLine" || type === "bubble" || type === "scatter" || type === "stackedArea" || type === "stackedColumn100" || type === "stackedLine100" || type === "stackedArea100"){
			return "normal";
		}
		else if (type === "bar" || type === "stackedBar" || type === "stackedBar100"){

			return "xySwapped";
		}
		else if (type === "pie" || type === "doughnut"){
			return "none";
		} else {
			window.console.log("Unknown Chart Type: " + type);
			return null;
		}
	};

	DataSeries.getDefaultLegendMarker = function(type){

		//type = type.toLowerCase();

		if (type === "column" || type === "stackedColumn" || type === "stackedLine" || type === "bar" || type === "stackedBar" || type === "stackedBar100" || type === "bubble" || type === "scatter" || type === "stackedColumn100" || type === "stackedLine100"){
			return "square";
		}
		else if (type === "line" || type === "stepLine" || type === "spline" || type === "pie" || type === "doughnut"){
			return "circle";
		} else if (type === "area" || type === "splineArea" || type === "stackedArea" || type === "stackedArea100"){
			return "triangle";
		} else {
			window.console.log("Unknown Chart Type: " + type);
			return null;
		}
	};

	//Finds dataPoint with the given x value. If findClosest is set, finds dataPoint with closest x value.
	//Returns searchResult object if found, else returns null
	DataSeries.prototype.findDataPointByX = function(x, findClosest){

		var searchStart = 0;
		var searchEnd = this.dataPoints.length;
		var midPoint;
		var searchResult = { dataPoint: null, distance: Infinity, index: NaN };
		var steps = 0;
		var dataPoint = null;

		while (searchStart < searchEnd){
			steps++;

			midPoint = (searchStart + searchEnd) / 2 << 0;
			dataPoint = this.dataPoints[midPoint];

			var distance = Math.abs(dataPoint.x - x);

			if (distance < searchResult.distance){
				searchResult.dataPoint = dataPoint;
				searchResult.distance = distance;
				searchResult.index = midPoint;
			}

			if (dataPoint.x < x)
				searchStart = midPoint + 1;
			else if (dataPoint.x > x)
				searchEnd = midPoint;
			else {
				searchResult.dataPoint = dataPoint;
				searchResult.distance = distance;
				searchResult.index = midPoint;

				break;
			}
		}


		if (!findClosest && searchResult.dataPoint.x === x)
			return searchResult;
		else if (findClosest && searchResult.dataPoint !== null)
			return searchResult;
		else
			return null;
	};

	DataSeries.prototype.getMarkerProperties = function(index, x, y, ctx){
		var dataPoints = this.dataPoints;
		var dataSeries = this;

		var markerColor = dataPoints[index].markerColor ? dataPoints[index].markerColor : dataSeries.markerColor ? dataSeries.markerColor : dataPoints[index].color ? dataPoints[index].color : dataSeries.color ? dataSeries.color : dataSeries._colorSet[index % dataSeries._colorSet.length];
		var markerBorderColor = dataPoints[index].markerBorderColor ? dataPoints[index].markerBorderColor : dataSeries.markerBorderColor ? dataSeries.markerBorderColor : markerColor;
		var markerBorderThickness = dataPoints[index].markerBorderThickness ? dataPoints[index].markerBorderThickness : dataSeries.markerBorderThickness ? dataSeries.markerBorderThickness : 1;
		var markerType = dataPoints[index].markerType ? dataPoints[index].markerType : dataSeries.markerType;
		var markerSize = dataPoints[index].markerSize ? dataPoints[index].markerSize : dataSeries.markerSize;


		return {
			x: x, y: y, ctx: ctx,
			type: markerType,
			size: markerSize,
			color: markerColor,
			borderColor: markerBorderColor,
			borderThickness: markerBorderThickness
		};
	};
	//#endregion DataSeries

	//#region Axis

	function Axis(chart, options, type, position){
		Axis.parent.constructor.call(this, "Axis", options, chart.theme);

		this.chart = chart;
		this.canvas = chart.canvas;
		this.ctx = chart.ctx;
		this.maxWidth = 0;
		this.maxHeight = 0;
		this.intervalStartPosition = 0;
		this.labels = [];

		//Processed information about the data that gets plotted against this axis
		this.dataInfo = {
			min: Infinity,
			max: -Infinity,
			viewPortMin: Infinity,
			viewPortMax: -Infinity,
			minDiff: Infinity // Used only in case of axisX
		};

		if (type === "axisX"){
			this.sessionVariables = this.chart.sessionVariables[type];

			if (!this._options.interval)
				this.intervalType = null;
		} else {
			if (position === "left" || position === "top")
				this.sessionVariables = this.chart.sessionVariables["axisY"];
			else {
				this.sessionVariables = this.chart.sessionVariables["axisY2"];
			}
		}


		if (typeof (this._options.titleFontSize) === "undefined"){

			this.titleFontSize = this.chart.getAutoFontSize(this.titleFontSize);

			//window.console.log("titleFontSize: " + this.titleFontSize);
		}

		if (typeof (this._options.labelFontSize) === "undefined"){

			this.labelFontSize = this.chart.getAutoFontSize(this.labelFontSize);

			//window.console.log("labelFontSize: " + this.labelFontSize);

		}

		//Axis Type : axisX, axisY
		this.type = type;
		if (!options || typeof (options.gridThickness) === "undefined")
			this.gridThickness = type === "axisX" ? 0 : 1;

		this._labels = null;
		this._position = position;

		this.lineCoordinates = { x1: null, y1: null, x2: null, y2: null, width: null };//{x1:, y1:, x2:, y2:, width:}
		//
		this.labelAngle = ((this.labelAngle % 360) + 360) % 360;

		if (this.labelAngle > 90 && this.labelAngle <= 270)
			this.labelAngle -= 180;
		else if (this.labelAngle > 180 && this.labelAngle <= 270)
			this.labelAngle -= 180;
		else if (this.labelAngle > 270 && this.labelAngle <= 360)
			this.labelAngle -= 360;

		this._titleTextBlock = null;
		this._absoluteMinimum = null;// Used to determine boundaries while Zooming/Panning
		this._absoluteMaximum = null;// Used to determine boundaries while Zooming/Panning

		if (this.hasOptionChanged("minimum"))
			this.sessionVariables.internalMinimum = this.minimum;

		if (this.hasOptionChanged("maximum"))
			this.sessionVariables.internalMaximum = this.maximum;

		this.trackChanges("minimum");
		this.trackChanges("maximum");
	}

	extend(Axis, CanvasJSObject);

	Axis.prototype.createLabels = function(){
		var text;
		var textBlock;
		var i = 0;
		var endPoint;

		if (this.type === "axisX" && this.chart.plotInfo.axisXValueType === "dateTime"){
			endPoint = addToDateTime(new Date(this.maximum), this.interval, this.intervalType);

			for (i = this.intervalStartPosition; i < endPoint; addToDateTime(i, this.interval, this.intervalType)){

				//var text = dateFormat(i, this.valueFormatString);
				text = this.type === "axisX" && this.labels[i] ? this.labels[i] : dateFormat(i, this.valueFormatString, this.chart._cultureInfo);

				textBlock = new TextBlock(this.ctx, {
					x: 0,
					y: 0,
					maxWidth: this.maxHeight,
					maxHeight: this.labelFontSize,
					angle: this.labelAngle,
					text: this.prefix + text + this.suffix,
					horizontalAlign: "left",//left, center, right
					fontSize: this.labelFontSize,//in pixels
					fontFamily: this.labelFontFamily,
					fontWeight: this.labelFontWeight, //normal, bold, bolder, lighter,
					fontColor: this.labelFontColor,
					fontStyle: this.labelFontStyle, // normal, italic, oblique
					textBaseline: "middle"
				});

				this._labels.push({ position: i.getTime(), textBlock: textBlock, effectiveHeight: null });
			}

		}
		else {
			endPoint = this.maximum;

			//if ((Math.floor(this.interval) < this.interval && !this._options.interval) || true) {

			//Check if it should be rendered as a category axis. If yes, then ceil the interval
			if (this.labels && this.labels.length){
				var tempInterval = Math.ceil(this.interval);
				var tempStartPoint = Math.ceil(this.intervalStartPosition);
				var hasAllLabels = false;
				for (i = tempStartPoint; i < this.maximum; i += tempInterval){
					if (this.labels[i]){
						hasAllLabels = true;
					} else {
						hasAllLabels = false;
						break;
					}
				}

				if (hasAllLabels){
					this.interval = tempInterval;
					this.intervalStartPosition = tempStartPoint;
				}
			}

			for (i = this.intervalStartPosition; i <= endPoint; i += this.interval){

				text = this.type === "axisX" && this.labels[i] ? this.labels[i] : numberFormat(i, this.valueFormatString, this.chart._cultureInfo);

				textBlock = new TextBlock(this.ctx, {
					x: 0,
					y: 0,
					maxWidth: this.maxHeight,
					maxHeight: this.labelFontSize,
					angle: this.labelAngle,
					text: this.prefix + text + this.suffix,
					horizontalAlign: "left",//left, center, right
					fontSize: this.labelFontSize,//in pixels
					fontFamily: this.labelFontFamily,
					fontWeight: this.labelFontWeight, //normal, bold, bolder, lighter,
					fontColor: this.labelFontColor,
					fontStyle: this.labelFontStyle, // normal, italic, oblique
					textBaseline: "middle",
					borderThickness: 0
				});

				this._labels.push({ position: i, textBlock: textBlock, effectiveHeight: null });
			}
		}
	};

	Axis.prototype.createLabelsAndCalculateWidth = function(){

		var maxLabelEffectiveWidth = 0;
		this._labels = [];

		if (this._position === "left" || this._position === "right"){

			this.createLabels();

			for (var i = 0; i < this._labels.length; i++){

				var textBlock = this._labels[i].textBlock;

				var size = textBlock.measureText();

				//var hypotenuse = Math.sqrt(Math.pow(size.height / 2, 2) + Math.pow(size.width, 2));
				//labelEffectiveWidth = hypotenuse * Math.cos(Math.abs(Math.PI / 180 * this.labelAngle) - Math.abs(Math.acos(size.width / hypotenuse)));

				var labelEffectiveWidth = (this.labelAngle === 0) ?
					size.width : (size.width * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))) + (size.height / 2 * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)));

				if (maxLabelEffectiveWidth < labelEffectiveWidth)
					maxLabelEffectiveWidth = labelEffectiveWidth;

				this._labels[i].effectiveWidth = labelEffectiveWidth;
			}
		}

		//if (isDebugMode && window.console) {
		//    window.console.log(this.type + " --- axisWidth : " + (maxLabelEffectiveWidth + this.tickLength));
		//}

		var titleHeight = this.title ? this.titleFontSize + 5 : 0;

		return titleHeight + maxLabelEffectiveWidth + this.tickLength + 10;
	};

	Axis.prototype.createLabelsAndCalculateHeight = function(){
		var maxLabelEffectiveHeight = 0;
		this._labels = [];
		var textBlock;
		var i = 0;

		this.createLabels();

		if (this._position === "bottom" || this._position === "top"){

			for (i = 0; i < this._labels.length; i++){

				textBlock = this._labels[i].textBlock;

				var size = textBlock.measureText();
				//var diagonal = Math.sqrt(Math.pow(size.height, 2) + Math.pow(size.width, 2));

				//var hypotenuse = Math.sqrt(Math.pow(size.height / 2, 2) + Math.pow(size.width, 2));
				//var labelEffectiveHeight = hypotenuse * Math.cos(Math.PI / 2 - (Math.abs(Math.PI / 180 * this.labelAngle) + Math.abs(Math.acos(size.width / hypotenuse))));

				var labelEffectiveHeight = 0;

				if (this.labelAngle === 0)
					labelEffectiveHeight = size.height;
				else
					labelEffectiveHeight = (size.width * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle))) + (size.height / 2 * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)));

				if (maxLabelEffectiveHeight < labelEffectiveHeight)
					maxLabelEffectiveHeight = labelEffectiveHeight;

				this._labels[i].effectiveHeight = labelEffectiveHeight;
			}
		}

		var titleHeight = this.title ? this.titleFontSize + 5 : 0;

		return titleHeight + maxLabelEffectiveHeight + this.tickLength;
	};

	//Static Method that co-ordinates between axisX, axisY and renders them
	Axis.setLayoutAndRender = function(axisX, axisY, axisY2, axisPlacement, freeSpace){
		var plotArea;
		var x1, y1, x2, y2;
		var chart = axisX.chart;
		var ctx = chart.ctx;

		axisX.calculateAxisParameters();

		if (axisY)
			axisY.calculateAxisParameters();

		if (axisY2)
			axisY2.calculateAxisParameters();

		if (axisY && axisY2 && typeof (axisY._options.maximum) === "undefined" && typeof (axisY._options.minimum) === "undefined" && typeof (axisY._options.interval) === "undefined" && typeof (axisY2._options.maximum) === "undefined" && typeof (axisY2._options.minimum) === "undefined" && typeof (axisY2._options.interval) === "undefined"){

			var noTicksY = (axisY.maximum - axisY.minimum) / axisY.interval;

			var noTicksY2 = (axisY2.maximum - axisY2.minimum) / axisY2.interval;

			if (noTicksY > noTicksY2){
				axisY2.maximum = axisY2.interval * noTicksY + axisY2.minimum;
			} else if (noTicksY2 > noTicksY){
				axisY.maximum = axisY.interval * noTicksY2 + axisY.minimum;
			}
		}

		var axisYlineThickness = axisY ? axisY.lineThickness ? axisY.lineThickness : 0 : 0;
		var axisY2lineThickness = axisY2 ? axisY2.lineThickness ? axisY2.lineThickness : 0 : 0;

		var axisYGridThickness = axisY ? axisY.gridThickness ? axisY.gridThickness : 0 : 0;
		var axisY2GridThickness = axisY2 ? axisY2.gridThickness ? axisY2.gridThickness : 0 : 0;

		var axisYMargin = axisY ? axisY.margin : 0;
		//var axisY2Margin = axisY ? axisY.margin : 0;

		if (axisPlacement === "normal"){

			var axisYWidth = axisY ? axisY.createLabelsAndCalculateWidth() : 0;
			var axisY2Width = axisY2 ? axisY2.createLabelsAndCalculateWidth() : 0;

			var axisXHeight = axisX.createLabelsAndCalculateHeight();

			// Position axisX based on the available free space, Margin and its height
			//x1 = freeSpace.x1 + axisYWidth + axisYMargin + axisYlineThickness / 2;
			x1 = freeSpace.x1 + axisYWidth + axisYMargin;
			y1 = freeSpace.y2 - axisXHeight - axisX.margin;
			x2 = freeSpace.x2 - axisY2Width > axisX.chart.canvas.width - 10 ? axisX.chart.canvas.width - 10 : freeSpace.x2 - axisY2Width;
			y2 = freeSpace.y2 - axisX.margin;

			axisX.lineCoordinates = { x1: x1, y1: y1, x2: x2, y2: y1, width: Math.abs(x2 - x1) };

			axisX.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };

			//axisX.ctx.rect(axisX.boundingRect.x1, axisX.boundingRect.y1, axisX.boundingRect.width, axisX.boundingRect.height);
			//axisX.ctx.stroke();

			// Position axisY based on the available free space, Margin and its height
			if (axisY){
				x1 = freeSpace.x1 + axisY.margin;
				y1 = freeSpace.y1 < 10 ? 10 : freeSpace.y1;
				x2 = freeSpace.x1 + axisYWidth + axisY.margin;
				//y2 = freeSpace.y2 - axisXHeight - axisX.margin - axisX.lineThickness / 2;
				y2 = freeSpace.y2 - axisXHeight - axisX.margin;

				axisY.lineCoordinates = { x1: x2, y1: y1, x2: x2, y2: y2, height: Math.abs(y2 - y1) };

				axisY.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };
			}

			//axisY.ctx.rect(axisY.boundingRect.x1, axisY.boundingRect.y1, axisY.boundingRect.width, axisY.boundingRect.height);
			//axisY.ctx.stroke();

			// Position axisY2 based on the available free space, Margin and its height
			if (axisY2){
				x1 = axisX.lineCoordinates.x2;
				y1 = freeSpace.y1 < 10 ? 10 : freeSpace.y1;
				x2 = x1 + axisY2Width + axisY2.margin;
				//y2 = freeSpace.y2 - axisXHeight - axisX.margin - axisX.lineThickness / 2;
				y2 = freeSpace.y2 - axisXHeight - axisX.margin;

				axisY2.lineCoordinates = { x1: x1, y1: y1, x2: x1, y2: y2, height: Math.abs(y2 - y1) };

				axisY2.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };
			}

			ctx.save();

			ctx.rect(axisX.boundingRect.x1 - 40, axisX.boundingRect.y1, axisX.boundingRect.width + 80, axisX.boundingRect.height);
			ctx.clip();

			axisX.renderLabelsTicksAndTitle();
			ctx.restore();

			if (axisY)
				axisY.renderLabelsTicksAndTitle();

			if (axisY2)
				axisY2.renderLabelsTicksAndTitle();


			plotArea = axisX.chart.getPlotArea();

			ctx.save();


			ctx.rect(plotArea.x1,
				plotArea.y1 - Math.max(axisY2GridThickness, axisYGridThickness) / 2,
				Math.abs(plotArea.x2 - plotArea.x1),
				Math.abs(plotArea.y2 - plotArea.y1 + Math.max(axisY2GridThickness, axisYGridThickness) / 2 + Math.max(axisY2GridThickness, axisYGridThickness, axisX.lineThickness) / 2));

			//ctx.rect(plotArea.x1 - axisYlineThickness / 2,
			//    plotArea.y1 - Math.max(axisY2GridThickness, axisYGridThickness) / 2,
			//    Math.abs(plotArea.x2 - plotArea.x1 + Math.max(axisYlineThickness + axisX.gridThickness) / 2 + Math.max(axisY2lineThickness, axisX.gridThickness) / 2),
			//    Math.abs(plotArea.y2 - plotArea.y1 + Math.max(axisY2GridThickness, axisYGridThickness, axisX.lineThickness)));

			ctx.clip();

			axisX.calculateValueToPixelConvertionParameters();

			if (axisY)
				axisY.calculateValueToPixelConvertionParameters();

			if (axisY2)
				axisY2.calculateValueToPixelConvertionParameters();

			axisX.renderInterlacedColors();

			if (axisY)
				axisY.renderInterlacedColors();

			if (axisY2)
				axisY2.renderInterlacedColors();

			ctx.restore();


			axisX.renderGrid();

			if (axisY)
				axisY.renderGrid();

			if (axisY2)
				axisY2.renderGrid();


			axisX.renderAxisLine();

			if (axisY)
				axisY.renderAxisLine();

			if (axisY2)
				axisY2.renderAxisLine();
		}
		else {

			var axisYHeight = axisY ? axisY.createLabelsAndCalculateHeight() : 0;
			var axisY2Height = axisY2 ? axisY2.createLabelsAndCalculateHeight() : 0;

			var axisXWidth = axisX.createLabelsAndCalculateWidth();

			// Position axisY based on the available free space, Margin and its height
			if (axisY){
				x1 = freeSpace.x1 + axisXWidth + axisX.margin + axisX.lineThickness / 2;
				y1 = freeSpace.y2 - axisYHeight - axisY.margin;
				x2 = freeSpace.x2 > axisY.chart.canvas.width - 10 ? axisY.chart.canvas.width - 10 : freeSpace.x2;
				y2 = freeSpace.y2 - axisY.margin;

				axisY.lineCoordinates = { x1: x1, y1: y1, x2: x2, y2: y1, width: Math.abs(x2 - x1) };

				axisY.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: axisYHeight };
			}

			// Position axisY based on the available free space, Margin and its height
			if (axisY2){
				x1 = freeSpace.x1 + axisXWidth + axisX.margin + axisX.lineThickness / 2;
				y1 = freeSpace.y1 + axisY2.margin;
				x2 = freeSpace.x2 > axisY2.chart.canvas.width - 10 ? axisY2.chart.canvas.width - 10 : freeSpace.x2;
				y2 = freeSpace.y1 + axisY2.margin + axisY2Height;

				axisY2.lineCoordinates = { x1: x1, y1: y2, x2: x2, y2: y2, width: Math.abs(x2 - x1) };
				axisY2.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: axisY2Height };
			}

			//axisY.ctx.rect(axisY.boundingRect.x1, axisY.boundingRect.y1, axisY.boundingRect.width, axisY.boundingRect.height);
			//axisY.ctx.stroke();

			// Position axisX based on the available free space, Margin and its height
			x1 = freeSpace.x1 + axisX.margin;
			y1 = freeSpace.y1 + axisY2Height + axisY2lineThickness / 2 < 10 ? 10 : freeSpace.y1 + axisY2Height + axisY2lineThickness / 2;
			x2 = freeSpace.x1 + axisXWidth + axisX.margin;
			y2 = freeSpace.y2 - axisYHeight - axisYMargin - axisYlineThickness / 2;


			axisX.lineCoordinates = { x1: x2, y1: y1, x2: x2, y2: y2, height: Math.abs(y2 - y1) };

			axisX.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };

			//axisX.ctx.rect(axisX.boundingRect.x1, axisX.boundingRect.y1, axisX.boundingRect.width, axisX.boundingRect.height);
			//axisX.ctx.stroke();

			ctx.save();

			//ctx.rect(axisY.boundingRect.x1 - 30, axisY.boundingRect.y1, axisY.boundingRect.width + 60, axisY.boundingRect.height);
			//ctx.clip();

			if (axisY)
				axisY.renderLabelsTicksAndTitle();

			if (axisY2)
				axisY2.renderLabelsTicksAndTitle();

			//ctx.restore();

			axisX.renderLabelsTicksAndTitle();


			//plotArea = axisX.chart.getPlotArea();

			ctx.save();
			ctx.rect(plotArea.x1 - Math.max(axisX.lineThickness, axisYGridThickness, axisY2GridThickness) / 2,
				plotArea.y1,
				Math.abs(plotArea.x2 - plotArea.x1 + Math.max(axisX.lineThickness, axisYGridThickness, axisY2GridThickness) / 2 + Math.max(axisYGridThickness, axisY2GridThickness) / 2),
				Math.abs(plotArea.y2 - plotArea.y1));

			ctx.clip();

			axisX.calculateValueToPixelConvertionParameters();

			if (axisY)
				axisY.calculateValueToPixelConvertionParameters();
			if (axisY2)
				axisY2.calculateValueToPixelConvertionParameters();

			axisX.renderInterlacedColors();

			if (axisY)
				axisY.renderInterlacedColors();
			if (axisY2)
				axisY2.renderInterlacedColors();

			ctx.restore();


			axisX.renderGrid();


			if (axisY)
				axisY.renderGrid();

			if (axisY2)
				axisY2.renderGrid();


			axisX.renderAxisLine();

			if (axisY)
				axisY.renderAxisLine();

			if (axisY2)
				axisY2.renderAxisLine();
		}

	};

	Axis.prototype.renderLabelsTicksAndTitle = function(){

		var i;
		var width;
		var label;
		var skipLabels = false;
		var totalLabelWidth = 0;
		var thresholdRatio = 0.9;
		var labelCount = 0;
		var xy;


		if (this.labelAngle !== 0 && this.labelAngle !== 360)
			thresholdRatio = 1.2;

		if (this._position === "bottom" || this._position === "top"){
			for (i = 0; i < this._labels.length; i++){
				label = this._labels[i];
				if (label.position < this.minimum)
					continue;

				width = label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) + label.textBlock.height * Math.sin(Math.PI / 180 * this.labelAngle);

				totalLabelWidth += width;
			}

			if (totalLabelWidth > this.lineCoordinates.width * thresholdRatio){
				skipLabels = true;
			}
		}
		if (this._position === "left" || this._position === "right"){
			for (i = 0; i < this._labels.length; i++){
				label = this._labels[i];
				if (label.position < this.minimum)
					continue;

				width = label.textBlock.height * Math.cos(Math.PI / 180 * this.labelAngle) + label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle);

				totalLabelWidth += width;
			}

			if (totalLabelWidth > this.lineCoordinates.height * thresholdRatio){
				skipLabels = true;
			}
		}

		if (this._position === "bottom"){
			i = 0;

			//shrink the axis if the last label is going outside the chart
			//if (this.labelangle >= 0 && this.chart.rendercount === 0 && true) {
			//    var lastlabel = this._labels[this._labels.length - 1];

			//    if (lastlabel) {
			//        var lastlabelx = this.getpixelcoordinatesonaxis(lastlabel.position).x;
			//        var size = { width: lastlabel.textblock.width, height: lastlabel.textblock.height };

			//        if (this.labelangle > 0) {
			//            var hypotenuse = math.sqrt(math.pow(size.height / 2, 2) + math.pow(size.width, 2));
			//            var labeleffectivewidth = hypotenuse * math.cos(math.abs(math.pi / 180 * this.labelangle) - math.abs(math.acos(size.width / hypotenuse)));
			//        } else {
			//            var labeleffectivewidth = lastlabel.textblock.width / 2;
			//        }

			//        var shift = (lastlabelx + labeleffectivewidth - this.canvas.width);
			//        if (shift > 0) {
			//            var newwidth = (lastlabelx - shift - this.linecoordinates.x1) / math.abs(lastlabel.position - this.minimum) * math.abs(this.maximum - this.minimum);

			//            this.lineCoordinates.x2 = this.lineCoordinates.x1 + newWidth;
			//            this.lineCoordinates.width = newWidth;
			//        }
			//    }
			//}

			this.ctx.lineWidth = this.tickThickness;
			this.ctx.strokeStyle = this.tickColor;


			for (i = 0; i < this._labels.length; i++){

				label = this._labels[i];
				if (label.position < this.minimum || label.position > this.maximum)
					continue;

				xy = this.getPixelCoordinatesOnAxis(label.position);

				if (this.tickThickness){
					this.ctx.beginPath();
					this.ctx.moveTo(xy.x << 0, xy.y << 0);
					this.ctx.lineTo(xy.x << 0, xy.y + this.tickLength << 0);
					this.ctx.stroke();
				}

				if (skipLabels && labelCount++ % 2 !== 0)
					continue;

				if (label.textBlock.angle === 0){
					xy.x -= label.textBlock.width / 2;
					xy.y += this.tickLength + label.textBlock.height / 2;
				} else {
					xy.x -= (this.labelAngle < 0 ? (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) : 0);
					xy.y += this.tickLength + Math.abs((this.labelAngle < 0 ? label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) : 0));
				}
				label.textBlock.x = xy.x;
				label.textBlock.y = xy.y;

				label.textBlock.render(true);
			}

			if (this.title){

				this._titleTextBlock = new TextBlock(this.ctx, {
					x: this.lineCoordinates.x1,// This is recalculated again
					y: this.boundingRect.y2 - this.titleFontSize - 5,
					maxWidth: this.lineCoordinates.width,
					maxHeight: this.titleFontSize,
					angle: 0,
					text: this.title,
					horizontalAlign: "center",//left, center, right
					fontSize: this.titleFontSize,//in pixels
					fontFamily: this.titleFontFamily,
					fontWeight: this.titleFontWeight, //normal, bold, bolder, lighter,
					fontColor: this.titleFontColor,
					fontStyle: this.titleFontStyle, // normal, italic, oblique
					textBaseline: "top"
				});

				this._titleTextBlock.measureText();
				this._titleTextBlock.x = this.lineCoordinates.x1 + this.lineCoordinates.width / 2 - this._titleTextBlock.width / 2;
				this._titleTextBlock.render(true);
			}
		} else if (this._position === "top"){
			i = 0;

			//Shrink the Axis if the last Label is going outside the Chart
			//if (this.labelAngle >= 0 && this.chart.renderCount === 0 && false) {
			//    var lastLabel = this._labels[this._labels.length - 1];

			//    if (lastLabel) {
			//        var lastLabelX = this.getPixelCoordinatesOnAxis(lastLabel.position).x;
			//        var size = { width: lastLabel.textBlock.width, height: lastLabel.textBlock.height };

			//        if (this.labelAngle > 0) {
			//            var hypotenuse = Math.sqrt(Math.pow(size.height / 2, 2) + Math.pow(size.width, 2));
			//            var labelEffectiveWidth = hypotenuse * Math.cos(Math.abs(Math.PI / 180 * this.labelAngle) - Math.abs(Math.acos(size.width / hypotenuse)));
			//        } else {
			//            var labelEffectiveWidth = lastLabel.textBlock.width / 2;
			//        }

			//        var shift = (lastLabelX + labelEffectiveWidth - this.canvas.width);
			//        if (shift > 0) {
			//            var newWidth = (lastLabelX - shift - this.lineCoordinates.x1) / Math.abs(lastLabel.position - this.minimum) * Math.abs(this.maximum - this.minimum);

			//            this.lineCoordinates.x2 = this.lineCoordinates.x1 + newWidth;
			//            this.lineCoordinates.width = newWidth;
			//        }
			//    }
			//}

			this.ctx.lineWidth = this.tickThickness;
			this.ctx.strokeStyle = this.tickColor;

			for (i = 0; i < this._labels.length; i++){
				label = this._labels[i];
				if (label.position < this.minimum || label.position > this.maximum)
					continue;

				xy = this.getPixelCoordinatesOnAxis(label.position);

				if (this.tickThickness){
					this.ctx.beginPath();
					this.ctx.moveTo(xy.x << 0, xy.y << 0);
					this.ctx.lineTo(xy.x << 0, xy.y - this.tickLength << 0);
					this.ctx.stroke();
				}

				if (skipLabels && labelCount++ % 2 !== 0)
					continue;

				if (label.textBlock.angle === 0){
					xy.x -= label.textBlock.width / 2;
					xy.y -= this.tickLength + label.textBlock.height / 2;
				} else {
					xy.x -= (this.labelAngle > 0 ? (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) : 0);
					xy.y -= this.tickLength + Math.abs((this.labelAngle > 0 ? label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) + 5 : 5));
				}
				label.textBlock.x = xy.x;
				label.textBlock.y = xy.y;

				label.textBlock.render(true);
			}

			if (this.title){

				this._titleTextBlock = new TextBlock(this.ctx, {
					x: this.lineCoordinates.x1,// This is recalculated again
					y: this.boundingRect.y1,
					maxWidth: this.lineCoordinates.width,
					maxHeight: this.titleFontSize,
					angle: 0,
					text: this.title,
					horizontalAlign: "center",//left, center, right
					fontSize: this.titleFontSize,//in pixels
					fontFamily: this.titleFontFamily,
					fontWeight: this.titleFontWeight, //normal, bold, bolder, lighter,
					fontColor: this.titleFontColor,
					fontStyle: this.titleFontStyle, // normal, italic, oblique
					textBaseline: "top"
				});

				this._titleTextBlock.measureText();
				this._titleTextBlock.x = this.lineCoordinates.x1 + this.lineCoordinates.width / 2 - this._titleTextBlock.width / 2;
				this._titleTextBlock.render(true);
			}
		} else if (this._position === "left"){
			this.ctx.lineWidth = this.tickThickness;
			this.ctx.strokeStyle = this.tickColor;

			//var label;
			//var xy;
			for (i = 0; i < this._labels.length; i++){
				label = this._labels[i];
				if (label.position < this.minimum || label.position > this.maximum)
					continue;

				xy = this.getPixelCoordinatesOnAxis(label.position);

				if (this.tickThickness){
					this.ctx.beginPath();
					this.ctx.moveTo(xy.x << 0, xy.y << 0);
					this.ctx.lineTo(xy.x - this.tickLength << 0, xy.y << 0);
					this.ctx.stroke();
				}

				if (skipLabels && labelCount++ % 2 !== 0)
					continue;

				label.textBlock.x = xy.x - (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) - this.tickLength - 5;
				label.textBlock.y = xy.y - (label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle));
				label.textBlock.render(true);
			}

			if (this.title){

				this._titleTextBlock = new TextBlock(this.ctx, {
					x: this.boundingRect.x1 + 5,
					y: this.lineCoordinates.y2,
					maxWidth: this.lineCoordinates.height,
					maxHeight: this.titleFontSize,
					angle: -90,
					text: this.title,
					horizontalAlign: "center",//left, center, right
					fontSize: this.titleFontSize,//in pixels
					fontFamily: this.titleFontFamily,
					fontWeight: this.titleFontWeight, //normal, bold, bolder, lighter,
					fontColor: this.titleFontColor,
					fontStyle: this.titleFontStyle, // normal, italic, oblique
					textBaseline: "top"
				});

				this._titleTextBlock.measureText();
				this._titleTextBlock.y = (this.lineCoordinates.height / 2 + this._titleTextBlock.width / 2 + this.lineCoordinates.y1);
				this._titleTextBlock.render(true);

			}
		} else if (this._position === "right"){
			this.ctx.lineWidth = this.tickThickness;
			this.ctx.strokeStyle = this.tickColor;

			//var label;
			//var xy;

			for (i = 0; i < this._labels.length; i++){
				label = this._labels[i];
				if (label.position < this.minimum || label.position > this.maximum)
					continue;

				xy = this.getPixelCoordinatesOnAxis(label.position);

				if (this.tickThickness){
					this.ctx.beginPath();
					this.ctx.moveTo(xy.x << 0, xy.y << 0);
					this.ctx.lineTo(xy.x + this.tickLength << 0, xy.y << 0);
					this.ctx.stroke();
				}

				if (skipLabels && labelCount++ % 2 !== 0)
					continue;

				label.textBlock.x = xy.x + this.tickLength + 5;
				//label.textBlock.y = xy.y - (label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle));
				label.textBlock.y = xy.y;
				label.textBlock.render(true);
			}

			if (this.title){

				this._titleTextBlock = new TextBlock(this.ctx, {
					x: this.boundingRect.x2 - 5,
					y: this.lineCoordinates.y2,
					maxWidth: this.lineCoordinates.height,
					maxHeight: this.titleFontSize,
					angle: 90,
					text: this.title,
					horizontalAlign: "center",//left, center, right
					fontSize: this.titleFontSize,//in pixels
					fontFamily: this.titleFontFamily,
					fontWeight: this.titleFontWeight, //normal, bold, bolder, lighter,
					fontColor: this.titleFontColor,
					fontStyle: this.titleFontStyle, // normal, italic, oblique
					textBaseline: "top"
				});

				this._titleTextBlock.measureText();
				this._titleTextBlock.y = (this.lineCoordinates.height / 2 - this._titleTextBlock.width / 2 + this.lineCoordinates.y1);
				this._titleTextBlock.render(true);

			}
		}
	};

	Axis.prototype.renderInterlacedColors = function(){

		//return;
		var i = 0;

		var interlacedGridStartPoint;
		var interlacedGridEndPoint;
		var plotAreaCoordinates = this.chart.getPlotArea();
		if ((this._position === "bottom" || this._position === "top") && this.interlacedColor){

			this.ctx.fillStyle = this.interlacedColor;

			for (i = 0; i < this._labels.length; i += 2){
				interlacedGridStartPoint = this.getPixelCoordinatesOnAxis(this._labels[i].position);

				if (i + 1 >= this._labels.length)
					interlacedGridEndPoint = this.getPixelCoordinatesOnAxis(this.maximum);
				else
					interlacedGridEndPoint = this.getPixelCoordinatesOnAxis(this._labels[i + 1].position);

				this.ctx.fillRect(interlacedGridStartPoint.x, plotAreaCoordinates.y1, Math.abs(interlacedGridEndPoint.x - interlacedGridStartPoint.x), Math.abs(plotAreaCoordinates.y1 - plotAreaCoordinates.y2));
			}

		} else if ((this._position === "left" || this._position === "right") && this.interlacedColor){

			this.ctx.fillStyle = this.interlacedColor;

			for (i = 0; i < this._labels.length; i += 2){
				interlacedGridEndPoint = this.getPixelCoordinatesOnAxis(this._labels[i].position);

				if (i + 1 >= this._labels.length)
					interlacedGridStartPoint = this.getPixelCoordinatesOnAxis(this.maximum);
				else
					interlacedGridStartPoint = this.getPixelCoordinatesOnAxis(this._labels[i + 1].position);

				this.ctx.fillRect(plotAreaCoordinates.x1, interlacedGridStartPoint.y, Math.abs(plotAreaCoordinates.x1 - plotAreaCoordinates.x2), Math.abs(interlacedGridStartPoint.y - interlacedGridEndPoint.y));
			}
			//throw "123";
		}
	};

	Axis.prototype.renderGrid = function(){
		var xy, i;
		var plotAreaCoordinates = this.chart.getPlotArea();

		//return;

		if (this._position === "bottom" || this._position === "top"){

			if (this.gridThickness && this.gridThickness > 0){
				this.ctx.lineWidth = this.gridThickness;
				this.ctx.strokeStyle = this.gridColor;

				this.ctx.beginPath();
				for (i = 0; i < this._labels.length; i++){

					if (this._labels[i].position < this.minimum || this._labels[i].position > this.maximum)
						continue;

					xy = this.getPixelCoordinatesOnAxis(this._labels[i].position);

					this.ctx.moveTo(xy.x << 0, plotAreaCoordinates.y1 << 0);
					this.ctx.lineTo(xy.x << 0, plotAreaCoordinates.y2 << 0);
					this.ctx.stroke();

				}
			}

		}
		else if (this._position === "left" || this._position === "right"){

			if (this.gridThickness && this.gridThickness > 0){
				this.ctx.lineWidth = this.gridThickness;
				this.ctx.strokeStyle = this.gridColor;

				this.ctx.beginPath();
				for (i = 0; i < this._labels.length; i++){

					if (this._labels[i].position < this.minimum || this._labels[i].position > this.maximum)
						continue;

					xy = this.getPixelCoordinatesOnAxis(this._labels[i].position);

					this.ctx.moveTo(plotAreaCoordinates.x1 << 0, xy.y << 0);
					this.ctx.lineTo(plotAreaCoordinates.x2 << 0, xy.y << 0);
					this.ctx.stroke();
				}
			}

		}
	};

	Axis.prototype.renderAxisLine = function(){
		if (this._position === "bottom" || this._position === "top"){
			if (this.lineThickness){
				this.ctx.lineWidth = this.lineThickness;
				this.ctx.strokeStyle = this.lineColor ? this.lineColor : "black";

				this.ctx.beginPath();
				this.ctx.moveTo(this.lineCoordinates.x1, this.lineCoordinates.y1);
				this.ctx.lineTo(this.lineCoordinates.x2, this.lineCoordinates.y2);
				this.ctx.stroke();
			}

		} else if (this._position === "left" || this._position === "right"){
			if (this.lineThickness){
				this.ctx.lineWidth = this.lineThickness;
				this.ctx.strokeStyle = this.lineColor;

				this.ctx.beginPath();
				this.ctx.moveTo(this.lineCoordinates.x1, this.lineCoordinates.y1);
				this.ctx.lineTo(this.lineCoordinates.x2, this.lineCoordinates.y2);
				this.ctx.stroke();
			}

		}
	};

	Axis.prototype.getPixelCoordinatesOnAxis = function(value){
		var pixelPerUnit;
		var xy = {};
		var width = this.lineCoordinates.width;
		var height = this.lineCoordinates.height;

		if (this._position === "bottom" || this._position === "top"){
			pixelPerUnit = width / Math.abs(this.maximum - this.minimum);

			xy.x = this.lineCoordinates.x1 + (pixelPerUnit * (value - this.minimum));
			xy.y = this.lineCoordinates.y1;
		}
		if (this._position === "left" || this._position === "right"){
			pixelPerUnit = height / Math.abs(this.maximum - this.minimum);

			xy.y = this.lineCoordinates.y2 - (pixelPerUnit * (value - this.minimum));
			xy.x = this.lineCoordinates.x2;
		}

		return xy;
	};

	Axis.prototype.calculateValueToPixelConvertionParameters = function(/*value*/){
		//var xy = {};
		var convertionParameters = { pixelPerUnit: null, minimum: null, reference: null };

		var width = this.lineCoordinates.width;
		var height = this.lineCoordinates.height;

		convertionParameters.minimum = this.minimum;

		if (this._position === "bottom" || this._position === "top"){
			convertionParameters.pixelPerUnit = width / Math.abs(this.maximum - this.minimum);
			convertionParameters.reference = this.lineCoordinates.x1;

			//xy.x = this.lineCoordinates.x1 + (pixelPerUnit * (value - this.minimum));
			//xy.y = this.lineCoordinates.y1;
		}
		if (this._position === "left" || this._position === "right"){
			convertionParameters.pixelPerUnit = -1 * height / Math.abs(this.maximum - this.minimum);
			convertionParameters.reference = this.lineCoordinates.y2;

			//xy.y = this.lineCoordinates.y2 + (pixelPerUnit * (value - this.minimum));
			//xy.x = this.lineCoordinates.x2;
		}


		this.convertionParameters = convertionParameters;
	};

	Axis.prototype.calculateAxisParameters = function(){

		var freeSpace = this.chart.layoutManager.getFreeSpace();
		//var availableWidth = 0;
		//var availableHeight = 0;

		if (this._position === "bottom" || this._position === "top"){
			this.maxWidth = freeSpace.width;
			this.maxHeight = freeSpace.height;
		} else {
			this.maxWidth = freeSpace.height;
			this.maxHeight = freeSpace.width;
		}

		var noTicks = this.type === "axisX" ? (this.maxWidth < 500 ? 8 : Math.max(6, Math.floor(this.maxWidth / 62))) : Math.floor(this.maxWidth / 40);
		//var noTicks = 8;
		var min, max;
		var minDiff;
		var range;

		if (this.type === "axisX"){
			min = (this.sessionVariables.internalMinimum !== null) ? this.sessionVariables.internalMinimum : this.dataInfo.viewPortMin;
			max = (this.sessionVariables.internalMaximum !== null) ? this.sessionVariables.internalMaximum : this.dataInfo.viewPortMax;

			if (max - min === 0){
				//max += 1;
				max += 0.5;
				min -= 0.5;
			}

			if (this.dataInfo.minDiff !== Infinity)
				minDiff = this.dataInfo.minDiff;
			else
				minDiff = 1;

		} else if (this.type === "axisY"){

			min = typeof (this._options.minimum) === "undefined" ? this.dataInfo.viewPortMin : this._options.minimum;
			max = typeof (this._options.maximum) === "undefined" ? this.dataInfo.viewPortMax : this._options.maximum;

			// When there is only a single dataPoint or when all dapoints have same Y Value
			if (max - min === 0){
				max += 5;
				min -= 5;
			}
			else {
				//var scaleFactor = Math.abs(max - min) * .01;
				if (max !== 0)
					max += Math.abs(0.005);
				if (min !== 0)
					min -= Math.abs(0.005);
			}


			//Apply includeZero
			if (this.includeZero && typeof (this._options.minimum) === "undefined"){
				if (min > 0)
					min = 0;
			}
			if (this.includeZero && typeof (this._options.maximum) === "undefined"){
				if (max < 0)
					max = 0;
			}
		}

		if (this.type === "axisX" && this.chart.plotInfo.axisXValueType === "dateTime"){

			range = max - min;

			if (!this.intervalType){

				if (range / (1 * 1) <= noTicks){
					this.interval = 1;
					this.intervalType = "millisecond";
				} else if (range / (1 * 2) <= noTicks){
					this.interval = 2;
					this.intervalType = "millisecond";
				} else if (range / (1 * 5) <= noTicks){
					this.interval = 5;
					this.intervalType = "millisecond";
				} else if (range / (1 * 10) <= noTicks){
					this.interval = 10;
					this.intervalType = "millisecond";
				} else if (range / (1 * 20) <= noTicks){
					this.interval = 20;
					this.intervalType = "millisecond";
				} else if (range / (1 * 50) <= noTicks){
					this.interval = 50;
					this.intervalType = "millisecond";
				} else if (range / (1 * 100) <= noTicks){
					this.interval = 100;
					this.intervalType = "millisecond";
				} else if (range / (1 * 200) <= noTicks){
					this.interval = 200;
					this.intervalType = "millisecond";
				} else if (range / (1 * 250) <= noTicks){
					this.interval = 250;
					this.intervalType = "millisecond";
				} else if (range / (1 * 300) <= noTicks){
					this.interval = 300;
					this.intervalType = "millisecond";
				} else if (range / (1 * 400) <= noTicks){
					this.interval = 400;
					this.intervalType = "millisecond";
				} else if (range / (1 * 500) <= noTicks){
					this.interval = 500;
					this.intervalType = "millisecond";
				} else if (range / (constants.secondDuration * 1) <= noTicks){
					this.interval = 1;
					this.intervalType = "second";
				} else if (range / (constants.secondDuration * 2) <= noTicks){
					this.interval = 2;
					this.intervalType = "second";
				} else if (range / (constants.secondDuration * 5) <= noTicks){
					this.interval = 5;
					this.intervalType = "second";
				} else if (range / (constants.secondDuration * 10) <= noTicks){
					this.interval = 10;
					this.intervalType = "second";
				} else if (range / (constants.secondDuration * 15) <= noTicks){
					this.interval = 15;
					this.intervalType = "second";
				} else if (range / (constants.secondDuration * 20) <= noTicks){
					this.interval = 20;
					this.intervalType = "second";
				} else if (range / (constants.secondDuration * 30) <= noTicks){
					this.interval = 30;
					this.intervalType = "second";
				} else if (range / (constants.minuteDuration * 1) <= noTicks){
					this.interval = 1;
					this.intervalType = "minute";
				} else if (range / (constants.minuteDuration * 2) <= noTicks){
					this.interval = 2;
					this.intervalType = "minute";
				} else if (range / (constants.minuteDuration * 5) <= noTicks){
					this.interval = 5;
					this.intervalType = "minute";
				} else if (range / (constants.minuteDuration * 10) <= noTicks){
					this.interval = 10;
					this.intervalType = "minute";
				} else if (range / (constants.minuteDuration * 15) <= noTicks){
					this.interval = 15;
					this.intervalType = "minute";
				} else if (range / (constants.minuteDuration * 20) <= noTicks){
					this.interval = 20;
					this.intervalType = "minute";
				} else if (range / (constants.minuteDuration * 30) <= noTicks){
					this.interval = 30;
					this.intervalType = "minute";
				} else if (range / (constants.hourDuration * 1) <= noTicks){
					this.interval = 1;
					this.intervalType = "hour";
				} else if (range / (constants.hourDuration * 2) <= noTicks){
					this.interval = 2;
					this.intervalType = "hour";
				} else if (range / (constants.hourDuration * 3) <= noTicks){
					this.interval = 3;
					this.intervalType = "hour";
				} else if (range / (constants.hourDuration * 6) <= noTicks){
					this.interval = 6;
					this.intervalType = "hour";
				} else if (range / (constants.dayDuration * 1) <= noTicks){
					this.interval = 1;
					this.intervalType = "day";
				} else if (range / (constants.dayDuration * 2) <= noTicks){
					this.interval = 2;
					this.intervalType = "day";
				} else if (range / (constants.dayDuration * 4) <= noTicks){
					this.interval = 4;
					this.intervalType = "day";
				} else if (range / (constants.weekDuration * 1) <= noTicks){
					this.interval = 1;
					this.intervalType = "week";
				} else if (range / (constants.weekDuration * 2) <= noTicks){
					this.interval = 2;
					this.intervalType = "week";
				} else if (range / (constants.weekDuration * 3) <= noTicks){
					this.interval = 3;
					this.intervalType = "week";
				} else if (range / (constants.monthDuration * 1) <= noTicks){
					this.interval = 1;
					this.intervalType = "month";
				} else if (range / (constants.monthDuration * 2) <= noTicks){
					this.interval = 2;
					this.intervalType = "month";
				} else if (range / (constants.monthDuration * 3) <= noTicks){
					this.interval = 3;
					this.intervalType = "month";
				} else if (range / (constants.monthDuration * 6) <= noTicks){
					this.interval = 6;
					this.intervalType = "month";
				} else if (range / (constants.yearDuration * 1) <= noTicks){
					this.interval = 1;
					this.intervalType = "year";
				} else if (range / (constants.yearDuration * 2) <= noTicks){
					this.interval = 2;
					this.intervalType = "year";
				} else if (range / (constants.yearDuration * 4) <= noTicks){
					this.interval = 4;
					this.intervalType = "year";
				} else {
					this.interval = Math.floor(Axis.getNiceNumber(range / (noTicks - 1), true) / constants.yearDuration);
					this.intervalType = "year";
				}

			}

			if (this.sessionVariables.internalMinimum !== null)
				this.minimum = this.sessionVariables.internalMinimum;
			else {
				this.minimum = min - minDiff / 2;
			}

			if (this.sessionVariables.internalMaximum)
				this.maximum = this.sessionVariables.internalMaximum;
			else
				this.maximum = max + minDiff / 2;

			if (!this.valueFormatString){
				if (this.intervalType === "year"){
					this.valueFormatString = "YYYY";
				} else if (this.intervalType === "month"){
					this.valueFormatString = "MMM YYYY";
				} else if (this.intervalType === "week"){
					this.valueFormatString = "MMM DD YYYY";
				} else if (this.intervalType === "day"){
					this.valueFormatString = "MMM DD YYYY";
				} else if (this.intervalType === "hour"){
					this.valueFormatString = "hh:mm TT";
				} else if (this.intervalType === "minute"){
					this.valueFormatString = "hh:mm TT";
				} else if (this.intervalType === "second"){
					this.valueFormatString = "hh:mm:ss TT";
				} else if (this.intervalType === "millisecond"){
					this.valueFormatString = "fff'ms'";
				}
			}

			this.intervalStartPosition = this.getLabelStartPoint(new Date(this.minimum), this.intervalType, this.interval);

		} else {

			this.intervalType = "number";

			range = Axis.getNiceNumber(max - min, false);

			if (this._options && this._options.interval)
				this.interval = this._options.interval;
			else {
				this.interval = Axis.getNiceNumber(range / (noTicks - 1), true);
			}

			if (this.sessionVariables.internalMinimum !== null)
				this.minimum = this.sessionVariables.internalMinimum;
			else
				this.minimum = Math.floor(min / this.interval) * this.interval;

			if (this.sessionVariables.internalMaximum !== null)
				this.maximum = this.sessionVariables.internalMaximum;
			else
				this.maximum = Math.ceil(max / this.interval) * this.interval;

			//var nfrac = Math.max(-Math.floor(Math.log(d)/Math.LN10), 0); //number of fractional digits to show

			if (this.type === "axisX"){
				if (this.sessionVariables.internalMinimum === null){
					this.minimum = min - minDiff / 2;
				}
				if (!this.sessionVariables.internalMaximum){

					this.maximum = max + minDiff / 2;
				}

				this.intervalStartPosition = Math.floor((this.minimum + this.interval) / this.interval) * this.interval;
			} else if (this.type === "axisY"){
				this.intervalStartPosition = this.minimum;
				//Apply includeZero
				//if (!(this._options && this._options.minimum) && this.includeZero) {
				//if (this.includeZero) {
				//    if (this.minimum > 0)
				//        this.minimum = 0;
				//}

				////if (!(this._options && this._options.maximum) && this.includeZero) {
				//if (this.includeZero) {
				//    if (this.maximum < 0)
				//        this.maximum = 0;
				//}
			}


		}

		if (this.type === "axisX"){
			this._absoluteMinimum = this._options && typeof (this._options.minimum) !== "undefined" ? this._options.minimum : this.dataInfo.min - minDiff / 2;
			this._absoluteMaximum = this._options && typeof (this._options.maximum) !== "undefined" ? this._options.maximum : this.dataInfo.max + minDiff / 2;
		}

		//Set valueFormatString
		if (!this.valueFormatString){
			this.valueFormatString = "#,##0.##";

			range = Math.abs(this.maximum - this.minimum);

			if (range < 1){
				var numberOfDecimals = Math.floor(Math.abs(Math.log(range) / Math.LN10)) + 2;

				if (numberOfDecimals > 2){
					for (var i = 0; i < numberOfDecimals - 2; i++)
						this.valueFormatString += "#";
				}
			}

		}

		//if (isDebugMode && window.console) {
		//    window.console.log(this.type + ": Min = " + this.minimum);
		//    window.console.log(this.type + ": Max = " + this.maximum);
		//    window.console.log(this.type + ": Interval = " + this.interval);
		//}
	};

	Axis.prototype._getFontString = function(){
		return this.labelFontStyle + " " + this.labelFontWeight + " " + this.labelFontSize + "px " + this.labelFontFamily;
	};

	Axis.getNiceNumber = function(x, round){

		var exp = Math.floor(Math.log(x) / Math.LN10);
		var f = x / Math.pow(10, exp);
		var nf;

		if (round){
			if (f < 1.5)
				nf = 1;
			else if (f < 3)
				nf = 2;
			else if (f < 7)
				nf = 5;
			else
				nf = 10;
		}
		else {
			if (f <= 1)
				nf = 1;
			else if (f <= 2)
				nf = 2;
			else if (f <= 5)
				nf = 5;
			else nf = 10;
		}

		return nf * Math.pow(10, exp);
	};

	Axis.prototype.getLabelStartPoint = function(){

		var intervalInMilliseconds = convertToNumber(this.interval, this.intervalType);
		var minimum = Math.floor((this.minimum) / intervalInMilliseconds) * intervalInMilliseconds;
		var dateTime = new Date(minimum);

		if (this.intervalType === "millisecond"){
			//millisecond = dateTime.getMilliSecond();
			//millisecond = Math.floor((millisecond + this.interval) / this.interval) * this.interval;
		}
		else if (this.intervalType === "second"){
			if (dateTime.getMilliseconds() > 0){
				dateTime.setSeconds(dateTime.getSeconds() + 1);
				dateTime.setMilliseconds(0);
			}
		}
		else if (this.intervalType === "minute"){
			if (dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0){
				dateTime.setMinutes(dateTime.getMinutes() + 1);
				dateTime.setSeconds(0);
				dateTime.setMilliseconds(0);
			}
		}
		else if (this.intervalType === "hour"){
			if (dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0){
				dateTime.setHours(dateTime.getHours() + 1);
				dateTime.setMinutes(0);
				dateTime.setSeconds(0);
				dateTime.setMilliseconds(0);
			}
		}
		else if (this.intervalType === "day"){
			if (dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0){
				dateTime.setDate(dateTime.getDate() + 1);
				dateTime.setHours(0);
				dateTime.setMinutes(0);
				dateTime.setSeconds(0);
				dateTime.setMilliseconds(0);
			}
		}
		else if (this.intervalType === "week"){
			if (dateTime.getDay() > 0 || dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0){
				dateTime.setDate(dateTime.getDate() + (7 - dateTime.getDay()));
				dateTime.setHours(0);
				dateTime.setMinutes(0);
				dateTime.setSeconds(0);
				dateTime.setMilliseconds(0);
			}
		}
		else if (this.intervalType === "month"){
			if (dateTime.getDate() > 1 || dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0){
				dateTime.setMonth(dateTime.getMonth() + 1);
				dateTime.setDate(1);
				dateTime.setHours(0);
				dateTime.setMinutes(0);
				dateTime.setSeconds(0);
				dateTime.setMilliseconds(0);
			}
		}
		else if (this.intervalType === "year"){
			if (dateTime.getMonth() > 0 || dateTime.getDate() > 1 || dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0){
				dateTime.setFullYear(dateTime.getFullYear() + 1);
				dateTime.setMonth(0);
				dateTime.setDate(1);
				dateTime.setHours(0);
				dateTime.setMinutes(0);
				dateTime.setSeconds(0);
				dateTime.setMilliseconds(0);
			}
		}

		return dateTime;
	};

	//#endregion Axis

	//#region ToolTip

	function ToolTip(chart, options, theme){
		ToolTip.parent.constructor.call(this, "ToolTip", options, theme);

		this.chart = chart;
		this.canvas = chart.canvas;
		this.ctx = this.chart.ctx;
		this.currentSeriesIndex = -1;
		this.currentDataPointIndex = -1;
		this._timerId = 0;
		this._prevX = NaN;
		this._prevY = NaN;

		this._initialize();
	}

	extend(ToolTip, CanvasJSObject);

	ToolTip.prototype._initialize = function(){

		if (this.enabled){
			this.container = document.createElement("div");
			this.container.style.height = "auto";
			this.container.style.position = "absolute";
			this.container.style.boxShadow = "1px 1px 2px 2px rgba(0,0,0,0.1)";
			this.container.style.zIndex = "1000";
			//this.container.style.pointerEvents = "none";
			this.container.style.display = "none";
			//this.container.style.whiteSpace = "no-wrap";

			var toolTipHtml = "<div style=\" width: auto;";
			toolTipHtml += "height: auto;";
			toolTipHtml += "min-width: 50px;";
			toolTipHtml += "line-height: 20px;";
			toolTipHtml += "padding: 5px;";
			toolTipHtml += "font-family: Calibri, Arial, Georgia, serif;";
			toolTipHtml += "font-weight: 400;";
			toolTipHtml += "font-style: italic;";
			toolTipHtml += "font-size: 14px;";
			toolTipHtml += "color: #000000;";
			toolTipHtml += "text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);";
			toolTipHtml += "text-align: left;";
			toolTipHtml += "border: 2px solid gray;";
			toolTipHtml += "background: rgba(255,255,255,.9);";
			toolTipHtml += "text-indent: 0px;";
			toolTipHtml += "white-space: nowrap;";
			//toolTipHtml += "pointer-events:none;";
			toolTipHtml += "border-radius: 10px;";
			//toolTipHtml += "opacity: 0;";

			toolTipHtml += "} \"> Sample Tooltip</div>";

			this.container.innerHTML = toolTipHtml;
			this.contentDiv = this.container.firstChild;


			this.container.style.borderRadius = this.contentDiv.style.borderRadius;
			this.chart._canvasJSContainer.appendChild(this.container);
		}
	};

	ToolTip.prototype.mouseMoveHandler = function(x, y){
		//window.console.log("x: " + x + "; " + "y: " + y);
		var that = this;

		clearTimeout(this._timerId);
		this._timerId = setTimeout(function(){
			that._updateToolTip(x, y);
		}, 5);
	};

	ToolTip.prototype._updateToolTip = function(mouseX, mouseY){
		var entry;
		var toolTipLeft;
		if (!this.enabled)
			return;

		if (typeof (mouseX) === "undefined" || typeof (mouseY) === "undefined"){
			if (isNaN(this._prevX) || isNaN(this._prevY))
				return;
			else {
				mouseX = this._prevX;
				mouseY = this._prevY;
			}
		} else {
			this._prevX = mouseX;
			this._prevY = mouseY;
		}


		var dataPoint = null;
		var dataSeries = null;
		//var toolTipContent = "";
		var entries = [];
		//var toolTipRight;
		var toolTipBottom;
		var x = 0;

		if (this.shared && this.chart.plotInfo.axisPlacement !== "none"){
			// && this.chart.plotInfo.axisPlacement !== "none"
			if (this.chart.plotInfo.axisPlacement === "xySwapped"){
				x = (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.height * ((this.chart.axisX.lineCoordinates.y2 - mouseY)) + this.chart.axisX.minimum;
			}
			else {
				x = (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.width * (mouseX - this.chart.axisX.lineCoordinates.x1) + this.chart.axisX.minimum;
			}

			var nearbyEntries = [];

			for (var i = 0; i < this.chart.data.length; i++){
				entry = {};

				entry = this.chart.data[i].findDataPointByX(x, true);

				if (entry && entry.index >= 0){
					entry.dataSeries = this.chart.data[i];

					nearbyEntries.push(entry);
				}
			}

			if (nearbyEntries.length === 0)
				return;

			nearbyEntries.sort(function(entry1, entry2){
				return entry1.distance - entry2.distance;
			});

			var closest = nearbyEntries[0];

			for (i = 0; i < nearbyEntries.length; i++){

				if (nearbyEntries[i].dataPoint.x.valueOf() === closest.dataPoint.x.valueOf())
					entries.push(nearbyEntries[i]);
			}

			nearbyEntries = null;

		} else {

			var id = getObjectId(mouseX, mouseY, this.chart._eventManager.ghostCtx);
			if (id > 0 && typeof this.chart._eventManager.objectMap[id] !== "undefined"){//DataPoint/DataSeries event
				var eventObject = this.chart._eventManager.objectMap[id];

				//if (this.currentSeriesIndex === eventObject.dataSeriesIndex && this.currentDataPointIndex === eventObject.dataPointIndex)
				//  return;
				//else {
				this.currentSeriesIndex = eventObject.dataSeriesIndex;
				this.currentDataPointIndex = eventObject.dataPointIndex >= 0 ? eventObject.dataPointIndex : -1;
				//}

				//window.console.log("id: " + id + "; hex: " + intToHexColorString(id));
			} else
				this.currentDataPointIndex = -1;


			if (this.currentSeriesIndex >= 0){

				dataSeries = this.chart.data[this.currentSeriesIndex];

				entry = {};

				if (this.currentDataPointIndex >= 0){
					dataPoint = dataSeries.dataPoints[this.currentDataPointIndex];

					entry.dataSeries = dataSeries;
					entry.dataPoint = dataPoint;
					entry.index = this.currentDataPointIndex;
					entry.distance = Math.abs(dataPoint.x - x);
				} else if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "splineArea" || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100"){
					x = (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.width * (mouseX - this.chart.axisX.lineCoordinates.x1) + this.chart.axisX.minimum.valueOf();

					entry = dataSeries.findDataPointByX(x, true);
					entry.dataSeries = dataSeries;
					this.currentDataPointIndex = entry.index;
					dataPoint = entry.dataPoint;
				} else {
					//this.hide();
					return;
				}

				entries.push(entry);
			}
		}


		if (entries.length > 0){

			this.highlightObjects(entries);


			var toolTipInnerHtml = "";

			toolTipInnerHtml = this.getToolTipInnerHTML({ entries: entries });

			this.contentDiv.innerHTML = toolTipInnerHtml;

			this.contentDiv.innerHTML = toolTipInnerHtml;

			var previouslyHidden = false;
			if (this.container.style.display === "none"){
				previouslyHidden = true;
				this.container.style.display = "block";
			}

			this.contentDiv.style.borderRightColor = this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.borderColor ? this.borderColor : entries[0].dataPoint.color ? entries[0].dataPoint.color : entries[0].dataSeries.color ? entries[0].dataSeries.color : entries[0].dataSeries._colorSet[entries[0].index % entries[0].dataSeries._colorSet.length];

			//var toolTipContent = dataSeries.toolTipContent ? dataSeries.toolTipContent : dataPoint.toolTipContent ? dataPoint.toolTipContent : "<strong>{x}</strong><br/><strong style='\"'color:{color};'\"'>{name}</strong>,&nbsp;&nbsp;<strong>y</strong>:{y}";

			//var toolTipInnerHtml = " x: " + (this.chart.plotInfo.axisXValueType === "dateTime" ? dateFormat(searchResult.dataPoint.x, this.chart.axisX.valueFormatString) : numberFormat(searchResult.dataPoint.x, this.chart.axisX.valueFormatString)) + ", y: " + numberFormat(searchResult.dataPoint.y, "#,###0.##");
			if (entries[0].dataSeries.type === "pie" || entries[0].dataSeries.type === "doughnut" || entries[0].dataSeries.type === "bar" || entries[0].dataSeries.type === "stackedBar" || entries[0].dataSeries.type === "stackedBar100"){
				//toolTipRight = mouseX - 10;
				toolTipLeft = mouseX - 10 - this.container.clientWidth;
			} else {
				//toolTipRight = (((this.chart.axisX.lineCoordinates.width / Math.abs(this.chart.axisX.maximum - this.chart.axisX.minimum)) * Math.abs(entries[0].dataPoint.x - this.chart.axisX.minimum)) + this.chart.axisX.lineCoordinates.x1 + 0.5) << 0;
				toolTipLeft = (((this.chart.axisX.lineCoordinates.width / Math.abs(this.chart.axisX.maximum - this.chart.axisX.minimum)) * Math.abs(entries[0].dataPoint.x - this.chart.axisX.minimum)) + this.chart.axisX.lineCoordinates.x1 + 0.5) - this.container.clientWidth << 0;
			}

			//toolTipRight = (toolTipRight - 10 - this.container.clientWidth) > 0 ? (this.chart.canvas.width - toolTipRight + 10) + "px" : (this.chart.canvas.width - toolTipRight + (toolTipRight - 10 - this.container.clientWidth)) + "px";
			//toolTipRight = (toolTipRight - 10 - this.container.clientWidth) > 0 ? (this.chart.canvas.width - toolTipRight + 10) + "px" : (this.chart.canvas.width - toolTipRight + (toolTipRight - 10 - this.container.clientWidth)) + "px";
			toolTipLeft = toolTipLeft > 0 ? toolTipLeft + "px" : toolTipLeft + this.container.clientWidth + 20 + "px";


			if (entries.length === 1 && !this.shared && (entries[0].dataSeries.type === "line" || entries[0].dataSeries.type === "stepLine" || entries[0].dataSeries.type === "spline" || entries[0].dataSeries.type === "area" || entries[0].dataSeries.type === "splineArea" || entries[0].dataSeries.type === "stackedArea" || entries[0].dataSeries.type === "stackedArea100")){
				toolTipBottom = (entries[0].dataSeries.axisY.lineCoordinates.y2 - entries[0].dataSeries.axisY.lineCoordinates.height / Math.abs(entries[0].dataSeries.axisY.maximum - entries[0].dataSeries.axisY.minimum) * Math.abs(entries[0].dataPoint.y - entries[0].dataSeries.axisY.minimum) + 0.5) << 0;
			} else if (entries[0].dataSeries.type === "bar" || entries[0].dataSeries.type === "stackedBar" || entries[0].dataSeries.type === "stackedBar100"){
				toolTipBottom = (entries[0].dataSeries.axisX.lineCoordinates.y2 - entries[0].dataSeries.axisX.lineCoordinates.height / Math.abs(entries[0].dataSeries.axisX.maximum - entries[0].dataSeries.axisX.minimum) * Math.abs(entries[0].dataPoint.x - entries[0].dataSeries.axisX.minimum) + 0.5) << 0;
			}
			else {
				toolTipBottom = mouseY;
			}

			toolTipBottom = (-toolTipBottom + 10);

			if (toolTipBottom + this.container.clientHeight + 5 > 0){
				toolTipBottom -= toolTipBottom + this.container.clientHeight + 5 - 0;
			}

			toolTipBottom += "px";

			//this.container.style.right = toolTipRight;
			this.container.style.left = toolTipLeft;
			this.container.style.bottom = toolTipBottom;

			if (!this.animationEnabled || previouslyHidden){
				this.disableAnimation();
			}
			else
				this.enableAnimation();

			//if (isDebugMode)
			//  console.log("searchX: " + x + " x: " + searchResult.dataPoint.x + "; y: " + searchResult.dataPoint.y + "; distance: " + searchResult.distance + "; steps: " + steps);
		}
	};

	ToolTip.prototype.highlightObjects = function(entries){

		var markerProps;
		if (!this.enabled)
			return;

		//this.chart.overlaidCanvasCtx.clearRect(0, 0, this.chart.overlaidCanvas.width, this.chart.overlaidCanvas.height);
		var overlaidCanvasCtx = this.chart.overlaidCanvasCtx;
		this.chart.resetOverlayedCanvas();

		var plotArea = this.chart.getPlotArea();
		overlaidCanvasCtx.beginPath();
		overlaidCanvasCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
		overlaidCanvasCtx.clip();


		for (var i = 0; i < entries.length; i++){

			var entry = entries[i];

			var eventObject = this.chart._eventManager.objectMap[entry.dataSeries.dataPointIds[entry.index]];

			if (!eventObject || !eventObject.objectType || eventObject.objectType !== "dataPoint")
				continue;

			var dataSeries = this.chart.data[eventObject.dataSeriesIndex];
			//var dataPoint = this.chart.data[eventObject.dataPointIndex];
			var index = eventObject.dataPointIndex;

			if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "scatter" || dataSeries.type === "area" || dataSeries.type === "splineArea" || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100"){
				markerProps = dataSeries.getMarkerProperties(index, eventObject.x1, eventObject.y1, this.chart.overlaidCanvasCtx);
				markerProps.size = Math.max(markerProps.size * 1.5 << 0, 10);
				//markerProps.borderColor = "red";
				//markerProps.borderThickness = 2;
				//overlaidCanvasCtx.globalAlpha = .8;
				RenderHelper.drawMarkers([markerProps]);
				//overlaidCanvasCtx.globalAlpha = .8;
			} else if (dataSeries.type === "bubble"){
				markerProps = dataSeries.getMarkerProperties(index, eventObject.x1, eventObject.y1, this.chart.overlaidCanvasCtx);
				markerProps.size = eventObject.size;
				markerProps.color = "white";
				markerProps.borderColor = "white";
				//markerProps.borderThickness = 2;
				overlaidCanvasCtx.globalAlpha = 0.3;
				RenderHelper.drawMarkers([markerProps]);
				overlaidCanvasCtx.globalAlpha = 1;
			} else if (dataSeries.type === "column" || dataSeries.type === "stackedColumn" || dataSeries.type === "stackedColumn100" || dataSeries.type === "bar" || dataSeries.type === "stackedBar" || dataSeries.type === "stackedBar100"){
				overlaidCanvasCtx.globalAlpha = 0.3;
				drawRect(overlaidCanvasCtx, eventObject.x1, eventObject.y1, eventObject.x2, eventObject.y2, "white", false, false, false, false);
				overlaidCanvasCtx.globalAlpha = 1;
			}
			else if (dataSeries.type === "pie" || dataSeries.type === "doughnut"){
				overlaidCanvasCtx.globalAlpha = 0.3;
				drawSegment(overlaidCanvasCtx, eventObject.center, eventObject.radius, "white", dataSeries.type, eventObject.startAngle, eventObject.endAngle);
				overlaidCanvasCtx.globalAlpha = 1;
			}
			continue;
		}

		overlaidCanvasCtx.globalAlpha = 1;
		overlaidCanvasCtx.restore();
		return;


		//var idRGB = intToRGB(id);

		//var ghostImageData = this.chart._eventManager.ghostCtx.getImageData(0, 0, this.chart._eventManager.ghostCanvas.width, this.chart._eventManager.ghostCanvas.height);
		//var ghostPixels = ghostImageData.data;
		//var length = ghostPixels.length;

		////this.chart.overlaidCanvasCtx.clearRect(0, 0, this.chart.overlaidCanvas.width, this.chart.overlaidCanvas.height);
		//var width = this.chart.overlaidCanvas.width;
		//this.chart.overlaidCanvas.width = 0;
		//this.chart.overlaidCanvas.width = width;

		//var overlayImageData = this.chart.overlaidCanvasCtx.getImageData(0, 0, this.chart.canvas.width, this.chart.canvas.height);
		//var overlayPixels = overlayImageData.data;
		////console.log(ghostImageData.width);

		//for (var i = 0; i < length; i += 4) {
		//    if (ghostPixels[i] === idRGB[0] && ghostPixels[i + 1] === idRGB[1] && ghostPixels[i + 2] === idRGB[2] && ghostPixels[i + 4] === idRGB[0] && ghostPixels[i + 5] === idRGB[1] && ghostPixels[i + 6] === idRGB[2]) {
		//        //ghostPixels[i + 3] = 0;
		//        //overlayPixels[i + 0] = overlayPixels[i + 1] = overlayPixels[i + 2] = 255;
		//        overlayPixels[i + 0] = overlayPixels[i + 1] = overlayPixels[i + 2] = 255;
		//        //overlayPixels[i + 0] = 255;
		//        overlayPixels[i + 3] = 0x33;
		//    } else {
		//        overlayPixels[i + 3] = 0;
		//    }
		//}

		//this.chart.overlaidCanvasCtx.putImageData(overlayImageData, 0, 0);

	};

	ToolTip.prototype.getToolTipInnerHTML = function(e){
		var entries = e.entries;
		var toolTipInnerHtml = "";
		var dataSeries = null;
		var dataPoint = null;
		var index = 0;
		//var color = null;
		var toolTipContent = "";

		var isToolTipDefinedInData = true;
		for (var i = 0; i < entries.length; i++){
			if (entries[i].dataSeries.toolTipContent || entries[i].dataPoint.toolTipContent){
				isToolTipDefinedInData = false;
				break;
			}
		}

		if (isToolTipDefinedInData && this.content && typeof (this.content) === "function"){

			toolTipInnerHtml = this.content({ entries: entries });

		} else {

			if (entries.length > 1){

				for (i = 0; i < entries.length; i++){
					dataSeries = entries[i].dataSeries;
					dataPoint = entries[i].dataPoint;
					index = entries[i].index;

					toolTipContent = "";

					if (i === 0 && isToolTipDefinedInData && !this.content){
						toolTipContent += typeof (this.chart.axisX.labels[dataPoint.x]) !== "undefined" ? this.chart.axisX.labels[dataPoint.x] : "{x}";
						toolTipContent += "</br>";
					}

					if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "splineArea" || dataSeries.type === "column" || dataSeries.type === "bar" || dataSeries.type === "scatter" || dataSeries.type === "stackedColumn" || dataSeries.type === "stackedColumn100" || dataSeries.type === "stackedBar" || dataSeries.type === "stackedBar100" || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100"){
						toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style=\"color:{color};\">{name}:</span>&nbsp;&nbsp;{y}";
					} else if (dataSeries.type === "bubble"){
						toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style=\"color:{color};'\">{name}:</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}";
					} else if (dataSeries.type === "pie" || dataSeries.type === "doughnut"){
						toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "&nbsp;&nbsp;{y}";
					}

					toolTipInnerHtml += this.chart.replaceKeywordsWithValue(toolTipContent, dataPoint, dataSeries, index);

					if (i < entries.length - 1)
						toolTipInnerHtml += "</br>";
				}
			} else {

				dataSeries = entries[0].dataSeries;
				dataPoint = entries[0].dataPoint;
				index = entries[0].index;

				//color = dataPoint.color ? dataPoint.color : dataSeries.color ? dataSeries.color : dataSeries._colorSet[index % dataSeries._colorSet.length];

				if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "splineArea" || dataSeries.type === "column" || dataSeries.type === "bar" || dataSeries.type === "scatter" || dataSeries.type === "stackedColumn" || dataSeries.type === "stackedColumn100" || dataSeries.type === "stackedBar" || dataSeries.type === "stackedBar100" || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100"){
					toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style=\"color:{color};\">" + (dataPoint.label ? "{label}" : "{x}") + " :</span>&nbsp;&nbsp;{y}";
				} else if (dataSeries.type === "bubble"){
					toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style=\"color:{color};\">" + (dataPoint.label ? "{label}" : "{x}") + ":</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}";
				} else if (dataSeries.type === "pie" || dataSeries.type === "doughnut"){
					toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : (dataPoint.name ? "{name}:&nbsp;&nbsp;" : dataPoint.label ? "{label}:&nbsp;&nbsp;" : "") + "{y}";
				}

				toolTipInnerHtml += this.chart.replaceKeywordsWithValue(toolTipContent, dataPoint, dataSeries, index);
			}
		}

		return toolTipInnerHtml;
	};

	ToolTip.prototype.enableAnimation = function(){
		if (this.container.style.WebkitTransition)
			return;

		//this.container.style.WebkitTransition = "right .2s ease-out, bottom .2s ease-out";
		//this.container.style.MozTransition = "right .2s ease-out, bottom .2s ease-out";
		//this.container.style.MsTransition = "right .2s ease-out, bottom .2s ease-out";
		//this.container.style.transition = "right .2s ease-out, bottom .2s ease-out";
		this.container.style.WebkitTransition = "left .2s ease-out, bottom .2s ease-out";
		this.container.style.MozTransition = "left .2s ease-out, bottom .2s ease-out";
		this.container.style.MsTransition = "left .2s ease-out, bottom .2s ease-out";
		this.container.style.transition = "left .2s ease-out, bottom .2s ease-out";
	};

	ToolTip.prototype.disableAnimation = function(){
		if (!this.container.style.WebkitTransition)
			return;

		this.container.style.WebkitTransition = "";
		this.container.style.MozTransition = "";
		this.container.style.MsTransition = "";
		this.container.style.transition = "";
	};

	ToolTip.prototype.hide = function(){
		if (!this.enabled)
			return;

		this.container.style.display = "none";
		this.currentSeriesIndex = -1;
		this._prevX = NaN;
		this._prevY = NaN;
		//this.chart.overlaidCanvasCtx.clearRect(0, 0, this.chart.overlaidCanvas.width, this.chart.overlaidCanvas.height);
		this.chart.resetOverlayedCanvas();
	};

	Chart.prototype.replaceKeywordsWithValue = function(str, dp, ds, index){
		var regex = /\{\s*[a-zA-Z]+\s*\}|"[^"]*"|'[^']*'/g;
		var chart = this;

		var fcn = function($0){
			if (($0[0] === "\"" && $0[$0.length - 1] === "\"") || ($0[0] === "\'" && $0[$0.length - 1] === "\'"))
				return $0.slice(1, $0.length - 1);

			var key = trimString($0.slice(1, $0.length - 1));
			var obj = null;

			if (key === "color"){
				return dp.color ? dp.color : ds.color ? ds.color : ds._colorSet[index % ds._colorSet.length];
			}

			if (dp.hasOwnProperty(key))
				obj = dp;
			else if (ds.hasOwnProperty(key))
				obj = ds;
			else return "";

			if (key === "x"){
				if (chart.axisX && chart.plotInfo.axisXValueType === "dateTime")
					return dateFormat(obj[key], dp.xValueFormatString ? dp.xValueFormatString : ds.xValueFormatString ? ds.xValueFormatString : chart.axisX && chart.axisX.valueFormatString ? chart.axisX.valueFormatString : "DD MMM YY", chart._cultureInfo);
				else
					return numberFormat(obj[key], dp.xValueFormatString ? dp.xValueFormatString : ds.xValueFormatString ? ds.xValueFormatString : "#,##0.########", chart._cultureInfo);
			} else if (key === "y")
				return numberFormat(obj[key], dp.yValueFormatString ? dp.yValueFormatString : ds.yValueFormatString ? ds.yValueFormatString : "#,##0.########", chart._cultureInfo);
			else
				return obj[key];
		};

		return str.replace(regex, fcn);
	};


	//#endregion ToolTip

	//#region Event Manager

	function EventManager(chart){
		this.chart = chart;
		this.lastObjectId = 0;
		//var that = this;
		this.objectMap = [];
		this.rectangularRegionEventSubscriptions = [];
		this.previousDataPointEventObject = null;
		//this.previousDataSeriesEventObject = null;

		this.ghostCanvas = document.createElement("canvas");
		this.ghostCanvas.width = this.chart.canvas.width;
		this.ghostCanvas.height = this.chart.canvas.height;

		this.ghostCtx = this.ghostCanvas.getContext("2d");

		//var eventHandler = function(ev){
		//	that.mouseEventHandler.call(that, ev);
		//};

		//this.chart.canvas.addEventListener("mouseover", eventHandler);
		//this.chart.canvas.addEventListener("mousemove", eventHandler);
		//this.chart.canvas.addEventListener("mouseout", eventHandler);
		//this.chart.canvas.addEventListener("click", eventHandler);
	}

	EventManager.prototype.reset = function(){
		this.lastObjectId = 0;
		this.objectMap = [];
		this.rectangularRegionEventSubscriptions = [];
		this.previousDataPointEventObject = null;

		//this.ghostCanvas.width = this.chart.canvas.width;
		//this.ghostCanvas.height = this.chart.canvas.height;
		this.ghostCtx.clearRect(0, 0, this.ghostCanvas.width, this.ghostCanvas.height);
		this.ghostCtx.beginPath();
	};

	EventManager.prototype.getNewObjectTrackingId = function(){
		return ++this.lastObjectId;
	};

	EventManager.prototype.mouseEventHandler = function(ev){

		if (ev.type !== "mousemove" && ev.type !== "click")
			return;

		var eventObject = null;
		var dataSeries = null;
		var dataPoint = null;
		var dataPointIndex = -1;
		var mouseOutPreviousDataPoint = false;
		var mouseOutPreviousDataSeries = false;

		var xy = getMouseCoordinates(ev);

		//console.log(ev.type);

		var imageData = this.ghostCtx.getImageData(xy.x, xy.y, 1, 1);
		var pix = imageData.data;

		if (pix[3] > 240){//DataPoint/DataSeries event
			var id = RGBToInt(pix[0], pix[1], pix[2]);
			if (typeof this.objectMap[id] !== "undefined" && (this.objectMap[id].objectType === "dataPoint")){
				eventObject = this.objectMap[id];
				dataSeries = this.chart.data[eventObject.dataSeriesIndex];
				dataPoint = dataSeries.dataPoints[eventObject.dataPointIndex];
				dataPointIndex = eventObject.dataPointIndex;

				//var logString = xy.x.toString() + ", " + xy.y.toString() + " RGB:" + pix[0].toString() + ", " + pix[1].toString() + ", " + pix[2].toString() + ", " + pix[3].toString()
				//    + " hex: " + intToHexColorString(id) + " dataPoint: [" + dataPoint.x.toString() + ", " + dataPoint.y.toString() + ", " + dataPoint.hexColor + "]";

				//if (this.previousDataPointEventObject) {
				//    logString += "  ds: " + this.previousDataPointEventObject.dataSeriesIndex + " dp: " + this.previousDataPointEventObject.dataPointIndex;
				//}
				//console.log(logString);

				if (this.previousDataPointEventObject === null || this.previousDataPointEventObject.dataSeriesIndex !== eventObject.dataSeriesIndex || this.previousDataPointEventObject.dataPointIndex !== eventObject.dataPointIndex){

					if (this.previousDataPointEventObject){
						mouseOutPreviousDataPoint = true;
					}

					if (dataPoint.mouseover){

						dataPoint.mouseover.call(dataPoint, { x: xy.x, y: xy.y, dataPoint: dataPoint, dataSeries: dataSeries, dataPointIndex: dataPointIndex });
					}

					if (dataSeries.mouseover && (this.previousDataPointEventObject === null || this.previousDataPointEventObject.dataSeriesIndex !== eventObject.dataSeriesIndex)){

						if (dataSeries.mouseover)
							dataSeries.mouseover.call(dataSeries, { x: xy.x, y: xy.y, dataPoint: dataPoint, dataSeries: dataSeries, dataPointIndex: dataPointIndex });

						if (this.previousDataPointEventObject)
							mouseOutPreviousDataSeries = true;
					}
				}


				if (ev.type === "mousemove"){
					if (dataPoint.cursor){
						ev.target.style.cursor = dataPoint.cursor;
					} else if (dataSeries.cursor){
						ev.target.style.cursor = dataSeries.cursor;
					}

					if (dataPoint.mousemove)
						dataPoint.mousemove.call(dataPoint, { x: xy.x, y: xy.y, dataPoint: dataPoint, dataSeries: dataSeries, dataPointIndex: dataPointIndex });

					if (dataSeries.mousemove)
						dataSeries.mousemove.call(dataSeries, { x: xy.x, y: xy.y, dataPoint: dataPoint, dataSeries: dataSeries, dataPointIndex: dataPointIndex });

				} else if (ev.type === "click"){

					var distanceTravelled = Math.sqrt(Math.pow(this.chart.dragStartPoint.x - xy.x, 2) + Math.pow(this.chart.dragStartPoint.y - xy.y, 2));
					if (distanceTravelled < 5){

						if (dataPoint.click)
							dataPoint.click.call(dataPoint, { x: xy.x, y: xy.y, dataPoint: dataPoint, dataSeries: dataSeries, dataPointIndex: dataPointIndex });

						if (dataSeries.click)
							dataSeries.click.call(dataSeries, { x: xy.x, y: xy.y, dataPoint: dataPoint, dataSeries: dataSeries, dataPointIndex: dataPointIndex });

						if (this.chart.pieDoughnutClickHandler){
							this.chart.pieDoughnutClickHandler.call(dataSeries, { x: xy.x, y: xy.y, dataPoint: dataPoint, dataSeries: dataSeries, dataPointIndex: dataPointIndex });
						}
					}

				}

			} else if (this.previousDataPointEventObject){
				mouseOutPreviousDataPoint = true;
				mouseOutPreviousDataSeries = true;
			}
		} else if (this.previousDataPointEventObject){
			mouseOutPreviousDataPoint = true;
			mouseOutPreviousDataSeries = true;
		}


		if (mouseOutPreviousDataPoint || mouseOutPreviousDataSeries){

			ev.target.style.cursor = this.chart._defaultCursor;

			var previousDataSeries = this.chart.data[this.previousDataPointEventObject.dataSeriesIndex];
			var previousDataPoint = previousDataSeries.dataPoints[this.previousDataPointEventObject.dataPointIndex];
			var previousDataPointIndex = this.previousDataPointEventObject.dataPointIndex;

			if (mouseOutPreviousDataPoint && previousDataPoint.mouseout)
				previousDataPoint.mouseout.call(previousDataPoint, { x: xy.x, y: xy.y, dataPoint: previousDataPoint, dataSeries: previousDataSeries, dataPointIndex: previousDataPointIndex });

			if (mouseOutPreviousDataSeries && previousDataSeries.mouseout)
				previousDataSeries.mouseout.call(previousDataSeries, { x: xy.x, y: xy.y, dataPoint: previousDataPoint, dataSeries: previousDataSeries, dataPointIndex: previousDataPointIndex });
		}

		this.previousDataPointEventObject = eventObject;
	};


	//#endregion Event Manager

	//#region Class CultureInfo

	function CultureInfo(chart, culture){

		var cultureInfo;

		if (culture && cultures[culture])
			cultureInfo = cultures[culture];


		Title.parent.constructor.call(this, "CultureInfo", cultureInfo, chart.theme);

		this.chart = chart;
		this.canvas = chart.canvas;
		this.ctx = this.chart.ctx;
	}

	extend(CultureInfo, CanvasJSObject);

	//#endregion Class CultureInfo

	//#region Render Helper

	var RenderHelper = {
		drawMarker: function(x, y, ctx, markerType, markerSize, markerColor, markerBorderColor, markerBorderThickness){

			if (!ctx)
				return;

			var alpha = 1;

			ctx.fillStyle = markerColor ? markerColor : "#000000";
			ctx.strokeStyle = markerBorderColor ? markerBorderColor : "#000000";
			ctx.lineWidth = markerBorderThickness ? markerBorderThickness : 0;


			if (markerType === "circle"){

				//ctx.moveTo(x, y);
				ctx.beginPath();
				//return;

				ctx.arc(x, y, markerSize / 2, 0, 360, false);

				if (markerColor)
					ctx.fill();

				if (markerBorderThickness){

					if (!markerBorderColor){
						alpha = ctx.globalAlpha;
						ctx.globalAlpha = 0.15;
						ctx.strokeStyle = "black";
						ctx.stroke();
						ctx.globalAlpha = alpha;
					} else
						ctx.stroke();

				}
			}
			else if (markerType === "square"){

				//ctx.moveTo(x - markerSize / 2, y - markerSize / 2);
				ctx.beginPath();
				ctx.rect(x - markerSize / 2, y - markerSize / 2, markerSize, markerSize);

				if (markerColor)
					ctx.fill();

				if (markerBorderThickness){

					if (!markerBorderColor){
						alpha = ctx.globalAlpha;
						ctx.globalAlpha = 0.15;
						ctx.strokeStyle = "black";
						ctx.stroke();
						ctx.globalAlpha = alpha;
					} else
						ctx.stroke();

				}
			} else if (markerType === "triangle"){

				ctx.beginPath();
				ctx.moveTo(x - markerSize / 2, y + markerSize / 2);
				ctx.lineTo(x + markerSize / 2, y + markerSize / 2);
				ctx.lineTo(x, y - markerSize / 2);
				ctx.closePath();

				if (markerColor)
					ctx.fill();

				if (markerBorderThickness){

					if (!markerBorderColor){
						alpha = ctx.globalAlpha;
						ctx.globalAlpha = 0.15;
						ctx.strokeStyle = "black";
						ctx.stroke();
						ctx.globalAlpha = alpha;
					} else
						ctx.stroke();

				}
			} else if (markerType === "cross"){

				ctx.strokeStyle = markerColor;
				markerBorderThickness = markerSize / 4;
				ctx.lineWidth = markerBorderThickness;

				ctx.beginPath();
				ctx.moveTo(x - markerSize / 2, y - markerSize / 2);
				ctx.lineTo(x + markerSize / 2, y + markerSize / 2);
				ctx.stroke();

				ctx.moveTo(x + markerSize / 2, y - markerSize / 2);
				ctx.lineTo(x - markerSize / 2, y + markerSize / 2);
				ctx.stroke();

			}


		},
		drawMarkers: function(markers){
			for (var i = 0; i < markers.length; i++){
				var marker = markers[i];

				RenderHelper.drawMarker(marker.x, marker.y, marker.ctx, marker.type, marker.size, marker.color, marker.borderColor, marker.borderThickness);
			}
		}
	};

	//#endregion Render Helper

	//#endregion Class Definitions

	//#region Public API
	var CanvasJS = {

		Chart: function(containerId, options){
			var _chart = new Chart(containerId, options, this);

			this.render = function(){
				_chart.render();
			};

			this.addResizeListener = function(win){
				_chart.addResizeListener(win || window);
			};

			this.resize = function(){
				_chart.resize.call(_chart);
			};

			this.options = _chart._options;
		},
		addColorSet: function(name, colorSet){
			colorSets[name] = colorSet;
		},
		addCultureInfo: function(name, cultureInfo){
			cultures[name] = cultureInfo;
		},

		// common helpers
		intToHexColorString: intToHexColorString,
		RenderHelper: RenderHelper,
		getBezierPoints: getBezierPoints,

		registerChart: function(type, renderer, processor){
			// public api for registering a chart, accepts type, renderer and processor functions.
			var renderName = type,
				processorName;

			renderName = renderName[0].toUpperCase() + renderName.slice(1);
			renderName = 'render' + renderName;
			supportedChartTypes[type] = renderName;
			processorName = '_process' + renderName;

			Chart.prototype[renderName] = renderer;
			processor && (Chart.prototype[processorName] = processor);
		}
	};

	CanvasJS.Chart.version = "1.2.3";

	// wrap up
	if (typeof define === 'function' && define.amd){
		// returns an empty module
		define(function(){
			return CanvasJS;
		});
	}
	else {
		this.CanvasJS = CanvasJS;
	}

}.call(this));