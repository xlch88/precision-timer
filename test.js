import PrecisionTimer from './src/index.js';

new PrecisionTimer(function(){
	console.log(new Date().getTime());
}, 1000, false);

setInterval(()=>{
	let i = [];
	while(i.length < 1000000) i.push(Math.random());
}, 100);
