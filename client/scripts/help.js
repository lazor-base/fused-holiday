define([], function() {
	var help = function(item) {
		return {
			contains: function(content) {
				return item.indexOf(content) > -1;
			},
			round: function(number) {
				var num = Math.round(number / 32) - 1;
				if (num < 0) {
					num = 0;
				}
				return num;
			}
		};
	};
});