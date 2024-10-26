export function formatTimestamp(timestamp) {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();

	return `${month}/${day}/${year} - ${hour}:${minute}:${second}`;
}
