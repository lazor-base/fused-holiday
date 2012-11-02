define(["json!../data/actions.json"], function(actions) {
	var controlsHTML = "";
	for (var attr in actions) {
		var newOption = "<tr>";
		for (var type in actions[attr]) {
			if (type === "name") {
				newOption += "<td><span>" + actions[attr][type] + "</span></td>";
			} else {
				newOption += "<td><input class='controls ' data-control='"+attr+"' data-type='"+type+"' value='" + actions[attr][type] + "' placeholder='" + actions[attr][type] + "'></td>";
			}
		}
		newOption += "</tr>";
		controlsHTML += newOption;
	}
	return {
		inputs: controlsHTML,
		actions: actions
	}
})