/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';
import SignInNavigator from './src/navigators/SignInNav';
import DrawerNavigation from './src/navigators/DrawerNav';
import * as userService from './src/services/user';

// Header Bar: #69A0B1
// Header Text: #A2978D
// Menu Route: #AAC1A9
// Light Menu Route: #D7E2CC
// Lightest Color: #F9F5E0
// Dark Gray: #404041
// Light Gray: #58585B 

export const styles = StyleSheet.create({
	backgroundColor: {
		backgroundColor: "#F9F5E0",
	},
	header: {
		backgroundColor: "#69A0B1",
		height: 50
	},
	errorRed: {
		color: "red",
	},
	button: {
		backgroundColor: "#69A0B1",
		width: 200,
		marginTop: 15,
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 5,
		alignSelf: "center"
	},
	boxShadow: {
		alignSelf: "center",
		width: 360,
		height: 360,
		padding: 10,
		margin: 10,
		backgroundColor: "#FAF3DD",
		shadowOffset: { width: 12, height: 12, },
		shadowColor: '#A38560',
		shadowOpacity: 1.0,
	},
	backgroundImage: {
		flex: 1,
		width: undefined,
		height: undefined,
	},
	signInTopMargin: {
		marginTop: 75
	},
	emailInputTextBox: {
		width: 300,
		alignSelf: "center",
		borderColor: "#404041"
	},
	passwordInputTextBox: {
		width: 300,
		alignSelf: "center",
		borderColor: "#58585B",
		marginLeft: 12
	},
	absoluteView: {
		flex: 1,
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent'
	},
	buttonBackground: {
		width: 344,
		height: 70,
		padding: 20,
		marginTop: 15,
		marginLeft: 17,
		marginRight: 5,
		marginBottom: 5,
		alignSelf: "center"
	},
	footer: {
		position: "absolute",
		flex: 1,
		flexDirection: 'row',
		left: 50,
		bottom: -750,
	},
	activeRouteButton: {
		width: 344,
		height: 70,
		padding: 20,
		marginTop: 15,
		marginLeft: 17,
		marginRight: 5,
		alignSelf: "center"
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#FAFAFA',
		alignItems: 'center',
		justifyContent: 'center'
	},
	imageBtn: {
		height: 80,
		width: 80,
		borderRadius: 40,
		backgroundColor: '#333',
		marginBottom: 20
	},
	image: {
		height: 80,
		width: 80,
		borderRadius: 40
	}
});

export default class App extends Component {

	PrimaryNavigation = () => <View />;

	constructor(props) {
		super(props)
		this.state = { loggedIn: false };
	}

	async componentWillMount() {
		let r = await userService.isLoggedIn();
		this.PrimaryNavigation = createSwitchNavigator(
			{
				SignIn: SignInNavigator,
				DrawerStack: DrawerNavigation,
			},
			{
				initialRouteName: r ? 'DrawerStack' : 'SignIn',
				headerMode: "screen"
			}
		);
		this.setState({ loggedIn: r });
	}

	render() {
		return <this.PrimaryNavigation />;
	}
}