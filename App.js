import React from 'react'
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default function App() {
	const askForPermission = async () => {
		const permissionResult = await Permissions.askAsync(Permissions.CAMERA)
		if (permissionResult.status !== 'granted') {
			Alert.alert('no permissions to access camera!', [{ text: 'ok' }])
			return false
		}
		return true
	}

	// justHere = async () => {
	// 	fetch('http://0b0a76c4214a.ngrok.io/api/test')
	// 	.then(res => console.log(res))
	// 	.catch(err => console.log("Here :" + err))
	// }

	takeImage = async () => {
		// make sure that we have the permission
		const hasPermission = await askForPermission()
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

				fetch('http://0b0a76c4214a.ngrok.io/api/test', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'image/jpg',
					},
					// send our base64 string as POST request
					// body: JSON.stringify({
					// 	imgsource: image.base64,
					// }),
					body : image
				})
				.then(res => {
					console.log("Succes : " + JSON.parse(res));
				})
				.catch(err => {
					console.log("error occured : " + err);
				})
			}
		}
	}
	return (
		<View style={styles.container}>
			<Button title="Take a photo" onPress={takeImage} />
			{/* <Button title="Click me" onPress={justHere} /> */}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})