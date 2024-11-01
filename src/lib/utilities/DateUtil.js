export function formatTimestamp(timestamp) {
	const padZero = (num) => String(num).padStart(2, "0");
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = padZero(date.getMinutes());
	const second = padZero(date.getSeconds());

	return `${month}/${day}/${year} - ${hour}:${minute}:${second}`;
}
