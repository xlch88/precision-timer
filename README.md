# Precision Timer
使用 performance.now() 计算时差实现的高精度定时器。

# 作用
在使用setInterval时，执行时间会随着运行时间产生偏移，如：
```javascript
setInterval(function(){
	console.log(new Date().getTime());
}, 1000);

setInterval(()=>{
	let i = [];
	while(i.length < 1000000) i.push(Math.random());
}, 100);
```
输出：
```text
1677839092868
1677839093868
1677839094868
1677839095868
1677839096868
1677839097869
1677839098870
1677839099870
1677839100871
1677839101872
...
1677839106873
1677839107874
1677839108875
1677839109876
```
可以看到，执行时间会随着运行时间产生偏移，这是因为setInterval的执行时间不是固定的，而是随着运行时间的增加而增加，这样就会导致执行时间的偏移。

这个库使用了performance.now()来动态计算时差，并进行弥补。

performance.now()是一个高精度的时间戳，它的精度是毫秒级别的，所以可以用来计算时差，从而实现一个高精度的定时器。
```javascript
import PrecisionTimer from 'precision-timer';

const pt = new PrecisionTimer(function(){
	console.log(new Date().getTime());
}, 1000, false);

setInterval(()=>{
	let i = [];
	while(i.length < 1000000) i.push(Math.random());
}, 100);
```
输出：
```text
1677838760801
1677838761803
1677838762801
1677838763801
1677838764801
1677838765801
1677838766803
1677838767801
1677838768801
...
1677838781801
1677838782801
1677838783801
```

# 局限
- 因为下一次执行的弥补时间是根据上一次任务所需时间得出的，所以所执行的任务所需时间必须相对平均。
- 任务最长执行时间不能超过所设定的时间间隔，否则会导致当前任务被跳过。
- 这仍然是相对准确的，并不能做到100%精确，但是在一定程度上可以保证任务的执行时间不会偏移。目前没有比这更好的办法。