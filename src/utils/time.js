/* version: 1.0.3 */

/* 日期格式化 */
export function dateFormat(time, format) {
	if (time == null) return '';
	if (time == '') time = 0;
	format = format || 'yyyy-MM-dd hh:mm:ss';
	const date = new Date(time);
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, '0');
	const day = String(date.getUTCDate()).padStart(2, '0');
	const hours = String(date.getUTCHours()).padStart(2, '0');
	const minutes = String(date.getUTCMinutes()).padStart(2, '0');
	const seconds = String(date.getUTCSeconds()).padStart(2, '0');
	const millisecond = String(date.getTime() % 1000).padStart(3, '0');
	return format
		.replace('yyyy', year)
		.replace('MM', month)
		.replace('dd', day)
		.replace('hh', hours)
		.replace('mm', minutes)
		.replace('ss', seconds)
		.replace('SSS', millisecond)
		.replace('SS', millisecond.substring(0, 2));
}


/* 时间格式化 */
export function timeFormat(size) {
	let hour = 0,
		minute = 0;
	if (size / 3600 >= 1) {
		hour = parseInt(size / 3600)
		size = size % 3600
	}
	if (size / 60 >= 1) {
		minute = parseInt(size / 60)
		size = size % 60
	}
	return `${hour.toString()}时 ${minute.toString()}分`
}

/* 时间格式化 */
export function timeFormat2(size) {
	let hour = 0,
		minute = 0;
	if (size / 3600 >= 1) {
		hour = parseInt(size / 3600)
		size = size % 3600
	}
	if (size / 60 >= 1) {
		minute = parseInt(size / 60)
		size = size % 60
	}
	return (hour > 0 ? `${hour.toString()}时 ` : ``) + `${minute.toString()}分`
}

/* 获取已经经过的天数 */
export function DaysElapsed(date) {
	return parseInt((new Date().getTime() - new Date(date).getTime()) / 1000 / 60 / 60 / 24)
}