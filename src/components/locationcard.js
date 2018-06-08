import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Button, Card, CardItem, Text, Body, Container, Content } from 'native-base';
import { withNavigation, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

class LocationCard extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let backgroundColor = "#AAC1A9";
		if (this.props.id % 2 == 0) {
			backgroundColor = "#D7E2CC";
		}
		let imageURL = require("../assets/tanhop.png");
		if (this.props.addIcon) {
			imageURL = require("../assets/clearhop.png");
		}
		return (
			<View style={{ flexDirection: 'row' }}>
				<Card style={{ flex: 1 }}>
					<CardItem style={{ backgroundColor: backgroundColor, height: 50 }}>
						<Image style={{ height: 45, width: 45 }} source={imageURL}></Image>
					</CardItem>
				</Card>
				<Card style={{ flex: 5 }}>
					<CardItem style={{ backgroundColor: backgroundColor, height: 50 }} button onPress={() => this.props.onPress()}>
						<Body>
							<Text style={{ fontWeight: "bold", }}>{this.props.stop.stops}</Text>
						</Body>
					</CardItem>
				</Card>
			</View>
		);
	}
}

export default withNavigation(LocationCard);