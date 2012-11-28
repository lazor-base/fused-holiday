/*global define:true */
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, es5:true, indent:4, maxerr:50, camelcase:false, boss:true, smarttabs:true, white:false */
define([], function() {
	"use strict";
	return {
		progress: 0,
		total: 20,
		callback:null,
		progressDiv:null,
		ready: function() {
			this.progress++;
			if(this.progressDiv === null || undefined) {
				this.progressDiv = document.getElementById("progress");
			}
			this.progressDiv.innerText = ((this.progress/this.total)*100)+"%";
			if (this.progress === this.total) {
				this.progressDiv.setAttribute("class","closed");
				this.progressDiv = null;
				this.callback();
			}
		},
		complete: function(callback) {
			this.callback = callback;
		}
	};
});