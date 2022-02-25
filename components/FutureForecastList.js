import moment from "moment"
import React, { useEffect, useState } from "react"
import * as Location from "expo-location"
import {
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
	Image,
	ScrollView,
} from "react-native"
import { list } from "../weather.json" //demo data
import setWeatherIcon from "../utils/weatherIcon"
import { API_KEY } from "../utils/key"

const FutureForecastList = () => {
	const [forcast, setForcast] = useState(list)
	useEffect(async () => {
		let location = await Location.getCurrentPositionAsync({})
		await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${API_KEY}&units=metric`
		)
			.then(res => res.json())
			.then(data => {
				setForcast(() => {
					return data.list.filter(
						item => item.dt_txt.substring(11, 19) === "18:00:00"
					)
				})
			})
	}, [])

	return (
		<View style={styles.container}>
			<ScrollView horizontal style={styles.scrollView}>
				<FutureForecast
					day={moment.unix(forcast[1].dt).format("ddd")}
					temp={Math.round(forcast[1].main.temp)}
					weather={forcast[1].weather[0].main}
				/>
				<FutureForecast
					day={moment.unix(forcast[2].dt).format("ddd")}
					temp={Math.round(forcast[2].main.temp)}
					weather={forcast[2].weather[0].main}
				/>
				<FutureForecast
					day={moment.unix(forcast[3].dt).format("ddd")}
					temp={Math.round(forcast[3].main.temp)}
					weather={forcast[3].weather[0].main}
				/>
				<FutureForecast
					day={moment.unix(forcast[4].dt).format("ddd")}
					temp={Math.round(forcast[4].main.temp)}
					weather={forcast[4].weather[0].main}
				/>
			</ScrollView>
		</View>
	)
}

const FutureForecast = ({ day, temp, weather }) => {
	const icon = setWeatherIcon(weather)
	return (
		<TouchableOpacity style={styles.forecast}>
			<Image style={styles.logo} source={icon} />
			<Text style={styles.temp}>{temp}°C</Text>
			<Text style={styles.day}>{day}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 0.35,
	},
	scrollView: {
		padding: 10,
		marginRight: 10,
	},
	forecast: {
		marginHorizontal: 10,
		backgroundColor: "rgba(0,0,0,0.4)",
		borderRadius: 30,
		padding: 38,
		borderColor: "black",
		borderWidth: 5,
		justifyContent: "center",
	},
	temp: {
		fontSize: 50,
		color: "white",
		fontWeight: "bold",
	},
	day: {
		fontSize: 25,
		textAlign: "center",
		fontWeight: "bold",
		color: "rgb(180,180,180)",
	},
	logo: {
		alignSelf: "center",
		width: 50,
		height: 50,
	},
})

export default FutureForecastList
