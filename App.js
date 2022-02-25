import {
	StyleSheet,
	StatusBar,
	Text,
	View,
	SafeAreaView,
	ImageBackground,
	Image,
} from "react-native"
import moment from "moment"
import { useEffect, useState } from "react"
import * as Location from "expo-location"
import SunTime from "./components/SunTime"
import FutureForecastList from "./components/FutureForecastList"
import setWeatherIcon from "./utils/weatherIcon"
import { API_KEY } from "./utils/key"

const App = () => {
	const [weather, setWeather] = useState({
		temp: 0,
		city: "",
		sunTime: {
			sunrise: "",
			sunset: "",
		},
		weather: "clear",
	})
	const [icon, setIcon] = useState(require("./assets/cloud.png"))
	const [location, setLocation] = useState(null)

	let h = parseInt(moment().format("HH"))
	let image = require("./assets/morning.jpg")
	if (h > 19 || h <= 5) image = require("./assets/night.jpg")
	else if (h > 5 && h <= 11) image = require("./assets/morning.jpg")
	else if (h > 11 && h <= 16) image = require("./assets/afternoon.jpg")
	else image = require("./assets/evening.jpg")

	const getTemp = async (lat, lon) => {
		if (weather.city === "") {
			await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
			)
				.then(res => res.json())
				.then(data => {
					setWeather({
						temp: data.main.temp,
						city: data.name,
						sunTime: {
							sunrise: moment
								.unix(parseInt(data.sys.sunrise))
								.format("HH:mm"),
							sunset: moment
								.unix(parseInt(data.sys.sunset))
								.format("HH:mm"),
						},
						weather: data.weather[0].main,
					})
					setIcon(() => {
						return setWeatherIcon(data.weather[0].main)
					})
				})
		}
	}

	useEffect(async () => {
		let { status } = await Location.requestForegroundPermissionsAsync()
		if (status !== "granted") {
			return
		}
		let location = await Location.getCurrentPositionAsync({})
		setLocation(location)
	}, [])
	if (location) {
		getTemp(location.coords.latitude, location.coords.longitude)
	}

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				style={styles.image}
				source={image}
				resizeMode="cover"
			>
				<StatusBar barStyle="light-content" />
				<View style={styles.internalContainer}>
					<View style={styles.tempContainer}>
						<Image style={styles.logo} source={icon} />
						<Text style={styles.city}>{weather.weather}</Text>
						<Text style={styles.temp}>
							{Math.round(weather.temp)}°C
						</Text>
						<Text style={styles.city}>{weather.city}</Text>
					</View>
					<SunTime
						sunrise={weather.sunTime.sunrise}
						sunset={weather.sunTime.sunset}
					/>
				</View>
				<FutureForecastList />
			</ImageBackground>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		flex: 1,
	},
	internalContainer: {
		backgroundColor: "rgba(0,0,0,0.4)",
		flex: 0.63,
		margin: 20,
		borderRadius: 20,
		borderColor: "black",
		borderWidth: 5,
	},
	city: {
		textShadowColor: "rgb(0, 0, 0)",
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 25,
		color: "rgb(180,180,180)",
	},
	tempContainer: {
		flex: 0.9,
	},
	temp: {
		textShadowColor: "rgb(0, 0, 0)",
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
		fontWeight: "100",
		textAlign: "center",
		fontSize: 90,
		color: "white",
	},
	logo: {
		margin: 10,
		alignSelf: "center",
		width: 80,
		height: 80,
	},
})
export default App
