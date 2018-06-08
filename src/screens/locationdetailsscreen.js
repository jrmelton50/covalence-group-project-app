import React, { Component } from 'react';
import { ScrollView, Text, Button, Linking, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { Content } from 'native-base';
import { styles } from '../../App';
// import cloudinary from 'cloudinary-core';

export default class LocationDetails extends Component {

	constructor(props) {
		super(props);
		this.id = this.props.navigation.state.params.id;
		this.state = {
			location: [],
		};
	}

	componentWillMount() {

		fetch(`https://bham-hops.herokuapp.com/api/locations/${this.id}`)
			.then(async res => {
				return res.json();
			})
			.then(location => {
				this.setState({ location: location[0] });
			})
			.catch(err => {
				alert(err);
			});
	}

	getLocationDetail = () => {
		Linking.openURL(
			`https://www.google.com/maps/place/${this.state.location.name}/@${this.state.location.latitude},${
			this.state.location.longitude
			},19z`
		).catch(err => console.error('An error occurred', err));
	};

	render() {
		return (
			<Content style={styles.backgroundColor}>
				<ScrollView>
					<Image source={{ uri: this.state.location.url }} />
					{/* cloudinary.image({this.state.location.url}, {width: 100, height: 150, crop: "fill" }) */}
					{/* <Text>{this.state.location.url}</Text> */}
					<Text style={{ alignSelf: "center", color: "#A2978D", fontWeight: "bold", padding: 15, fontSize: 18, }}>{this.state.location.name}</Text>
					<Text style={{ alignSelf: "center", color: "#A2978D", fontWeight: "bold", padding: 15 }}>{this.state.location.description}</Text>
					{/* <Text onPress={() => { this.getLocationDetail() }} style={{ color: "#A2978D", fontStyle: "italic", alignSelf: "center", height: 100, fontSize: 18 }}>View on Google Maps</Text> */}
					<ImageBackground source={require('../assets/buttonbg.png')} style={styles.buttonBackground}>
						<TouchableOpacity
							block
							onPress={() => {
								this.getLocationDetail();
							}}
						>
							<Text style={{ color: "white", alignSelf: "center", height: 100 }}>MORE DETAILS</Text>
						</TouchableOpacity>
					</ImageBackground>
				</ScrollView>
			</Content >
		);
	}
}
