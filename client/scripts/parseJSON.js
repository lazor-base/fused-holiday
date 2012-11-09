define([], function() {
	return {
		requirements: [],
		toString: function(object, type) {
			var process = function(object, attr, type) {
				var string = "";
				if (object[attr] !== undefined) {
					if (attr === "requires") {
						for (var i = 0; i < object[attr].length; i++) {
							this.requirements.push(object[attr][i]);
						}
					} else {
						if (type === "array") {

						} else {
							string += '"' + attr + '":';
						}
						if (typeof object[attr] === "string") {
							string += '"' + object[attr] + '",';
						} else if (object[attr] === null) {
							string += 'null,';
						} else if (typeof object[attr] === "object") {
							if (Array.isArray(object[attr])) {
								string += this.toString(object[attr], "array") + ",";
							} else {
								string += this.toString(object[attr], "object") + ",";
							}
						} else if (typeof object[attr] === "function") {
							string += object[attr] + ',';
						} else {
							string += object[attr] + ',';
						}
					}
				}
				return string;
			};
			if (type === "array") {
				var string = "[";
				for (var i = 0; i < object.length; i++) {
					string += process.call(this, object, i, "array");
				}
				if (string.charAt(string.length - 1) === ",") {
					string = string.slice(0, -1);
				}
				string += "]";
			} else {
				var string = "{";
				for (var attr in object) {
					string += process.call(this, object, attr, "object");
				}
				if (string.charAt(string.length - 1) === ",") {
					string = string.slice(0, -1);
				}
				string += "}";
			}
			return string;
		},
		toAMD: function(object) {
			var string = "define([";
			var data = this.toString(object);
			for (var i = 0; i < this.requirements.length; i++) {
				string += "\"" + this.requirements[i] + "\",";
			}
			if (string.charAt(string.length - 1) === ",") {
				string = string.slice(0, -1);
			}
			string += "],function(";
			for (var i = 0; i < this.requirements.length; i++) {
				string += this.requirements[i] + ",";
			}
			if (string.charAt(string.length - 1) === ",") {
				string = string.slice(0, -1);
			}
			string += "){return " + data + ";});";
			return string;
		}
	};
});