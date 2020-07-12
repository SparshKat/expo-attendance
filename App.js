import React, { useState, useEffect, Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, Button, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default class App extends Component {
	state = {
		condition: "1",
		studentsData: []
		// password: 'iusdfba',
		// isPasswordHidden: true,
		// toggleText: "sbekfjkjse",
	}

	//   constructor(props: Props) { 
	// 		super(props); 
	// 		this.state = { 
	// 		  password: '', 
	// 		  isPasswordHidden: true, 
	// 		  toggleText: 'Show', 
	// 		}; 
	// 	} 
	// const [isShowingCamera, setIsShowingCamera] = useState("1");
	askForPermission = async () => {
		const permissionResult = await Permissions.askAsync(Permissions.CAMERA)
		if (permissionResult.status !== 'granted') {
			Alert.alert('no permissions to access camera!', [{ text: 'ok' }])
			return false
		}
		return true
	}

	justHere = async () => {
		console.log("HELLLOOO");
		setIsShowingCamera("1");
		// fetch('http://0b0a76c4214a.ngrok.io/api/test')
		// 	.then(res => console.log(res))
		// 	.catch(err => console.log("Here :" + err))
	}

	takeImage = async () => {
		// make sure that we have the permission
		
		// setTimeout( ()=> {
		// 	this.setState({
		// 		condition: "3"
		// 	})
		// },4000);
		// setIsShowingCamera("2");
		const hasPermission = await this.askForPermission()
		if (!hasPermission) {
			return
		} else {
			// launch the camera with the following settings
			let image = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [3, 3],
				quality: 0.3,
				base64: false,
			})
			
			// make sure a image was taken:
			if (!image.cancelled) {
				this.setState({
					condition: "2"
				})
				fetch('http://269f15da2405.in.ngrok.io/api/test', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'image/jpg',
					},
					// send our base64 string as POST request
					// body: JSON.stringify({
					// 	imgsource: image.base64,
					// }),
					body: image
				})
					.then(res => {
						var newEl = JSON.parse(JSON.stringify(res))
						console.log(newEl);
						// console.log(newEl._bodyBlob._data);
						// console.log(newEl._bodyInit._data);
						// console.log();
						// console.log(JSON.parse(JSON.stringify(res.body)));

						this.setState({
							condition: "3"
						})
						console.log("Succes : " + res);
					})
					.catch(err => {
						console.log("error occured : " + err);
					})
			}
		}
	}

	render() {
		// return (
		// 	<View style={styles.container}>
		// 		<Button title="Take a photo" onPress={this.takeImage} />
		// 		{/* <Button title="Click me" onPress={justHere} /> */}
		// 	</View>
		// )
		if (this.state.condition === "1") {
			return (
				<View style={styles.container}>
					<Button title="Take a photo" onPress={this.takeImage} />
					{/* <Button title="Click me" onPress={justHere} /> */}
				</View>
			)
		} else if (this.state.condition === "2") {
			return (
				<View style={[styles.container, styles.horizontal]}>
					{/* <ActivityIndicator /> */}
					<ActivityIndicator size="large" />
					{/* <ActivityIndicator size="small" color="#0000ff" />
					<ActivityIndicator size="large" color="#00ff00" /> */}
				</View>
			)
		} else {
			return (
				<View style={styles.container}>
					{/* <Button title="Take a photo" onPress={takeImage} /> */}
					<Button title="Click me" onPress={this.justHere} />
				</View>
			)

		}

	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	horizontal: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10
	}
})