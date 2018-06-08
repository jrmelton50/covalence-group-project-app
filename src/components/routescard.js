import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Button, Card, CardItem, Text, Body, Container, Content } from 'native-base';
import { withNavigation, NavigationActions } from 'react-navigation';

class RoutesCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			backgroundColor: ""
		}
	}

	componentWillMount() {
		if (this.props.id % 2 == 0) {
			this.setState({
				backgroundColor: "#D7E2CC"
			});
		}
		else {
			this.setState({
				backgroundColor: "#AAC1A9"
			});
		}
	}

	switchScreens(id, routename, routedescription) {
		this.props.navigation.navigate('RouteDetails', { id, routename, routedescription });
	}

	render() {
		return (
			<View style={{ flexDirection: 'row', height: 100 }}>
				<Card style={{ flex: 1 }}>
					<CardItem style={{ backgroundColor: this.state.backgroundColor, height: 98 }}>
						<Image style={{ height: 65, width: 65 }} source={require('../assets/tanhop.png')}></Image>
					</CardItem>
				</Card>
				<Card style={{ flex: 3 }}>
					<CardItem style={{ backgroundColor: this.state.backgroundColor }} button onPress={() => this.switchScreens(this.props.id, this.props.route.routename, this.props.route.routedescription)}>
						<Body>
							<Text style={{ fontWeight: "bold", }}>{this.props.route.routename}</Text>
							<Text style={{ fontStyle: "italic" }}>Number of stops: {this.props.route.numberofstops}</Text>
							<Text>{this.props.route.routedescription.substring(0, 50)}...</Text>
						</Body>
					</CardItem>
				</Card>
			</View>
		);
	}
}

export default withNavigation(RoutesCard);
