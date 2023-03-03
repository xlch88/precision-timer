export default class PrecisionTimer {
	count = 0;
	runTime;
	startTime;
	timeout;
	task;
	interval;
	t;

	constructor(task, interval, immediately = false) {
		this.task = task;
		this.interval = interval;

		this.startTime = performance.now();
		this.t = setTimeout(() => {
			this._run();
		}, this.interval);

		if (immediately) this._run();
	}

	async _run() {
		this.runTime = performance.now();
		++this.count;
		let time = this.runTime - (this.startTime + this.count * this.interval);

		if (typeof this.task?.then === "function") {
			await this.task();
		} else {
			this.task();
		}

		this.t = setTimeout(() => {
			this._run();
		}, this.interval - time);
	}

	cancel() {
		clearTimeout(this.t);
		this.t = null;
	}
}
