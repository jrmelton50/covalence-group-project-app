/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SwitchNavigator } from 'react-navigation';
import SignInNavigator from './src/navigators/SignInNav';
import DrawerNavigation from './src/navigators/DrawerNav';
import * as userService from './src/services/user';

const PrimaryNavigation = SwitchNavigator(
	{
		SignIn: { screen: SignInNavigator },
		DrawerStack: DrawerNavigation,
	},
	{ initialRouteName: userService.isLoggedIn() ? 'DrawerStack' : 'SignIn' }
);

export default class App extends Component {
	render() {
		return <PrimaryNavigation />;
	}
}
