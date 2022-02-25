import moment from "moment"
const setWeatherIcon = weather => {
	let icon
	switch (weather) {
		case "Tornado":
			icon = require("../assets/tornado.png")
			break
		case "Clear":
			if (parseInt(moment().format("HH")) > 19)
				icon = require("../assets/moon.png")
			else icon = require("../assets/clear.png")
			break
		case "Snow":
			icon = require("../assets/snow.png")
			break
		case "Rain":
			icon = require("../assets/rain.png")
			break
		case "Clouds":
			icon = require("../assets/cloudy.png")
			break
		case "Thunderstorm":
			icon = require("../assets/thunderstorm.png")
			break
		case "Drizzle":
			icon = require("../assets/raindrop.png")
			break
		default:
			icon = require("../assets/haze.png")
			break
	}
	return icon
}
export default setWeatherIcon
