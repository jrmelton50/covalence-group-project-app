'use strict';
import React, { Component } from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import * as cloudinary from 'cloudinary';

export default class OpenCamera extends Component {
	constructor(props) {
		super(props);
		this.userID = this.props.navigation.state.params.userID;
	}
	render() {
		return (
			<View style={styles.container}>
				<RNCamera
					ref={ref => {
						this.camera = ref;
					}}
					style={styles.preview}
					type={RNCamera.Constants.Type.back}
					flashMode={RNCamera.Constants.FlashMode.on}
					permissionDialogTitle={'Permission to use camera'}
					permissionDialogMessage={'We need your permission to use your camera phone'}
				/>
				<View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
					<TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
						<Text style={{ fontSize: 14 }}> SNAP </Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	postImageToDB(uri) {
		fetch(`https://bham-hops.herokuapp.com/api/image/`,
			{
				method: 'POST',
				body: JSON.stringify({
					url: uri,
					userid: this.userID
				}),
				headers: new Headers({
					'Content-Type': 'application/json',
				}),
			})
			.then(res => {
				cloudinary.v2.uploader.upload(uri, function (error, result) { console.log(result); });
				// navigate to another screen
			})
			.catch(err => {
				alert(err);
				console.log(err);
			});
	}

	takePicture = async function () {
		if (this.camera) {
			const options = { quality: 0.5, base64: true };
			const data = await this.camera.takePictureAsync(options);
			postImageToDB(data.uri);
			// console.log(data.uri);
		}
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'black',
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	capture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 5,
		padding: 15,
		paddingHorizontal: 20,
		alignSelf: 'center',
		margin: 20,
	},
});

AppRegistry.registerComponent('OpenCamera', () => OpenCamera);
