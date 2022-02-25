import React from "react"
import { StyleSheet, View, Text, Image } from "react-native"

const SunTime = ({ sunrise, sunset }) => {
	return (
		<View style={styles.container}>
			<View style={styles.view}>
				<Image
					style={styles.image}
					source={require("../assets/1.png")}
				/>
				<Text style={styles.time}>{sunrise}</Text>
			</View>
			<View style={styles.view}>
				<Image
					style={styles.image}
					source={require("../assets/2.png")}
				/>
				<Text style={styles.time}>{sunset}</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		flexDirection: "row",
	},
	view: {
		alignItems: "center",
		marginHorizontal: 20,
	},
	image: {
		width: 70,
		height: 70,
	},
	time: {
		textShadowColor: "rgb(0, 0, 0)",
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
		textAlign: "center",
		fontSize: 40,
		color: "white",
	},
})

export default SunTime
