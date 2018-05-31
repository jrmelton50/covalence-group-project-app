import React, { Component } from 'react';
import { ScrollView, Text, Button, Linking } from 'react-native';

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
			.then(res => {
				return res.json();
			})
			.then(location => {
				this.setState({ location: location[0] });
			})
			.catch(err => {
				console.log(err);
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
			<ScrollView>
				<Text>{this.state.location.name}</Text>
				<Text>THIS IS FILLER FOR THE DESCRIPTION</Text>
				<Text>{this.state.location.url}</Text>
				<Button onPress={() => this.getLocationDetail()} title="More Details" />
			</ScrollView>
		);
	}
}
