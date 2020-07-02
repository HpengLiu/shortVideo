const util = {

}

util.formatUrl = (context, url) => {
	var index = url.indexOf("http");
	if (index == 0) {
		return url;
	}

	return context.$store.state.baseUrl + url;
}
util.timeago = (datetime) => { //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
	var dateTimeStamp = new Date(datetime.replace(/ /, 'T')).getTime()-8 * 60 * 60 * 1000;//这里要减去中国的时区8小时
	var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
	var hour = minute * 60; 
	var day = hour * 24;
	var week = day * 7;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime(); //获取当前时间毫秒
	var diffValue = now - dateTimeStamp; //时间差
	
	if (diffValue < 0) {
		return '刚刚';
	}
	var minC = diffValue / minute; //计算时间差的分，时，天，周，月
	var hourC = diffValue / hour;
	var dayC = diffValue / day;
	var weekC = diffValue / week;
	var monthC = diffValue / month;
	// console.log("diffValue", datetime, monthC, weekC, dayC, hourC, minC)
	var result = "2";
	if (monthC >= 1 && monthC <= 3) {
		// console.log(parseInt(monthC) + "月前" + "==================================")
		result = " " + parseInt(monthC) + "月前"
	} else if (weekC >= 1 && weekC <= 3) {
		// console.log(parseInt(weekC) + "周前" + "==================================")
		result = " " + parseInt(weekC) + "周前"
	} else if (dayC >= 1 && dayC <= 6) {
		// console.log(parseInt(dayC) + "天前" + "==================================")
		result = " " + parseInt(dayC) + "天前"
	} else if (hourC >= 1 && hourC <= 23) {
		// console.log(parseInt(hourC) + "小时前" + "==================================")
		result = " " + parseInt(hourC) + "小时前"
	} else if (minC >= 1 && minC <= 59) {
		// console.log(parseInt(minC) + "分钟前" + "==================================")
		result = " " + parseInt(minC) + "分钟前"
	} else if (diffValue >= 0 && diffValue <= minute) {
		// console.log("刚刚==================================")
		result = "刚刚"
	} else {
		var datetime = new Date();
		datetime.setTime(dateTimeStamp);
		var Nyear = datetime.getFullYear(); {}
		var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
		var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
		var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
		var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
		var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
		result = Nyear + "-" + Nmonth + "-" + Ndate
	}
	return result;
}

util.formatSize = (context) => {
	let that = context;
	plus.cache.calculate(function(size) {
		let sizeCache = parseInt(size);
		if (sizeCache == 0) {
			that.fileSizeString = "0B";
		} else if (sizeCache < 1024) {
			that.fileSizeString = sizeCache + "B";
		} else if (sizeCache < 1048576) {
			that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
		} else if (sizeCache < 1073741824) {
			that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
		} else {
			that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
		}
	});
}
util.upx2px = (upx)=>{
	return uni.upx2px(upx)
}
util.getFileExt=(filename)=>{
	let filearr = filename.split("."); 
	return filearr[filearr.length-1]
}
export default util
