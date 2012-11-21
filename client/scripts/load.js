define([], function() {
	return {
		progress: 0,
		total: 19,
		callback:null,
		progressDiv:null,
		ready: function() {
			this.progress++;
			if(this.progressDiv === null || undefined) {
				this.progressDiv = document.getElementById("progress");
			}
			this.progressDiv.innerText = ((this.progress/this.total)*100)+"%";
			if (this.progress === this.total) {
				this.progressDiv.classList.add("closed");
				this.progressDiv = null;
				this.callback();
			}
		},
		complete: function(callback) {
			this.callback = callback;
		}
	}
});