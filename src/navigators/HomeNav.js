import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';
import Homescreen from '../screens/homescreen';
import RouteDetailsScreen from '../screens/routedetailsscreen';
import LocationDetailsScreen from '../screens/locationdetailsscreen';
import { styles } from '../../App';

const HomeNavigator = createStackNavigator({
	HomeScreen: {
		screen: Homescreen,
		navigationOptions: ({ navigation }) => ({
			headerStyle: styles.header,
			headerTitle: (
				<Image style={{ marginTop: 30, width: 300, height: 100 }} source={require('../assets/headerlogo.png')} />
			),
		})
	},
	RouteDetails: {
		screen: RouteDetailsScreen,
		navigationOptions: ({ navigation }) => ({
			headerStyle: styles.header,
			headerTitle: (
				<Image style={{ marginTop: 30, width: 300, height: 100 }} source={require('../assets/headerlogo.png')} />
			),
		})
	},
	LocationDetails: {
		screen: LocationDetailsScreen,
		navigationOptions: ({ navigation }) => ({
			headerStyle: styles.header,
			headerTitle: (
				<Image style={{ marginTop: 30, width: 300, height: 100 }} source={require('../assets/headerlogo.png')} />
			),
		})
	},
});

export default HomeNavigator;
