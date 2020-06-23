export default function date(unixDate) {
	const dateObject = new Date(unixDate*1000)
	const month = dateObject.getMonth() + 1
	const date = dateObject.getDate()
	const year = dateObject.getFullYear()
	const hour = dateObject.getHours() % 12
	const minutesRaw = dateObject.getMinutes()
	const minutes = minutesRaw < 10 ? `0${minutesRaw}` : minutesRaw
	const apm = dateObject.getHours() > 12 ? 'PM' : 'AM'

	return `${month}/${date}/${year}, ${hour}:${minutes} ${apm}`
}