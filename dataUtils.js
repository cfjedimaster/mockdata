
//Defaults used for data, may move to a file later
var fNames = ["Andy","Alice","Amy","Barry","Bob","Charlie","Clarence","Clara","Danny","Delores","Erin","Frank","Gary","Gene","George","Heather","Jacob","Leah","Lisa","Lynn","Nick","Noah","Ray","Roger","Scott","Todd"];
var lNames = ["Anderson","Bearenstein","Boudreaux","Camden","Clapton","Degeneres","Hill","Moneymaker","Padgett","Rogers","Smith","Sharp","Stroz","Zelda"];
var emailDomains = ["gmail.com","aol.com","microsoft.com","apple.com","adobe.com"];
var lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

var defaults = ["name","fname","lname","age","all_age","email","ssn","tel","gps","num"];
function isDefault(s) {
	return defaults.indexOf(s) >= 0; 
}

function generateFirstName() {
	return fNames[exports.randRange(0, fNames.length-1)];
}

function generateLastName() {
	return lNames[exports.randRange(0, lNames.length-1)];
}

function generateFakeData(type) {
	if(type === "string") return "string";
	if(type === "name") return generateFirstName() + " " + generateLastName();
	if(type === "fname") return generateFirstName();
	if(type === "lname") return generateLastName();
	if(type === "age") return exports.randRange(18,75);
	if(type === "all_age") return exports.randRange(1,100);
	if(type === "email") {
		var fname = generateFirstName().toLowerCase();
		var lname = generateLastName().toLowerCase();
		var emailPrefix = fname.charAt(0) + lname;
		return emailPrefix + "@" + emailDomains[exports.randRange(0, emailDomains.length-1)];
	}
	if(type === "ssn") {
		return String(exports.randRange(1,9)) + String(exports.randRange(1,9)) + String(exports.randRange(1,9)) + "-" +
			    String(exports.randRange(1,9)) + String(exports.randRange(1,9)) + "-" + 
			    String(exports.randRange(1,9)) + String(exports.randRange(1,9)) + String(exports.randRange(1,9)) + String(exports.randRange(1,9));
	}
	if(type === "tel") {
		return "(" + String(exports.randRange(1,9)) + String(exports.randRange(1,9)) + String(exports.randRange(1,9)) + ") " +
			    String(exports.randRange(1,9)) + String(exports.randRange(1,9)) + String(exports.randRange(1,9)) + "-" + 
			    String(exports.randRange(1,9)) + String(exports.randRange(1,9)) + String(exports.randRange(1,9)) + String(exports.randRange(1,9));

	}
	if(type.indexOf("num") === 0) {
		//Support num, num:10, num:1:10
		if(type === "num") return exports.randRange(1,10);
		if(type.indexOf(":") > 0) {
			var parts = type.split(":");
			if(parts.length === 2) return exports.randRange(1,parts[1]);
			else return exports.randRange(parts[1],parts[2]);
		}
	}
	if(type.indexOf("oneof") === 0) {
		//Support oneof:male:female, ie, pick a random one
		var items = type.split(":").slice(1);
		return items[exports.randRange(0,items.length-1)];
	}
	if(type.indexOf("lorem") === 0) {
		if(type === "lorem") return lorem;
		if(type.indexOf(":") > 0) {
			var parts = type.split(":");
			var result = "";
			var count;
			if(parts.length === 2) count = parts[1];
			else count = exports.randRange(parts[1],parts[2]);
			for(var i=0; i<count; i++) result += lorem + '\n\n';
			return result;
		}
	}
	return "";
}

exports.generateNewItem = function(model) {
	var result = {};

	for(var i=0, len=model.length; i<len; i++) {
		//Based on each field prop, do something
		var field = model[i];

		if(!field.hasOwnProperty("name")) {
			field.name = "field"+i;
		}

		if(!field.hasOwnProperty("type")) {
			//if we are a default, that is our type, otherwise string
			if(isDefault(field.name)) field.type = field.name;
		}
		result[field.name] = generateFakeData(field.type);

	}

	return result;
}

exports.randRange = function(x,y) {
	x = Number(x); y = Number(y);
	return Math.floor(Math.random() * (y-x+1))+x;
}