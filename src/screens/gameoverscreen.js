import React, { Component } from 'react';
import { View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Text, Container, Content } from 'native-base';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Entypo';
import { styles } from '../../App'

export default class GameOverScreen extends Component {
	static navigationOptions = {
		title: 'Game Over',
		headerLeft: (
			<Text
				onPress={() => {
					navigation.toggleDrawer();
				}}
			>
				<Icon name="menu" size={30} color="#F9F5E0" />
			</Text>
		),
	};

	constructor(props) {
		super(props);
	}

	switchScreens() {
		this.props.navigation.navigate({
			routeName: 'Home',
			params: {},
			action: NavigationActions.navigate({
				routeName: 'HomeScreen',
				params: {},
			}),
		});
	}

	render() {
		return (
			<Container>
				<Content style={{ backgroundColor: "#F9F5E0" }}>
					<Text style={{ alignSelf: "center", color: "#A2978D", fontWeight: "bold", padding: 15, fontSize: 18, }}>CRAWL COMPLETE</Text>
					<Text style={{ alignSelf: "center", color: "#A2978D", fontWeight: "bold", padding: 15, fontSize: 18, }}>Thanks for exploring Birmingham!</Text>
					{/* <Text style={{ alignSelf: "center", color: "#A2978D", fontWeight: "bold", fontStyle: 'italic', padding: 15, fontSize: 18, }}>See your latest crawl photos below:</Text> */}
					<ImageBackground source={require('../assets/buttonbg.png')} style={styles.buttonBackground}>
						<TouchableOpacity
							block
							onPress={() => this.switchScreens()}>
							<Text style={{ color: "white", alignSelf: "center", height: 100 }}>VIEW CRAWLS</Text>
						</TouchableOpacity>
					</ImageBackground>
				</Content>
			</Container>
		);
	}
}
