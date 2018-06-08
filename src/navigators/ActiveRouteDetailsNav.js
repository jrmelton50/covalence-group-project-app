import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';
import ActiveRouteScreen from '../screens/activeroutescreen';
import LocationDetailsScreen from '../screens/locationdetailsscreen';
import GameOverScreen from '../screens/gameoverscreen';
import OpenCamera from '../screens/camerascreen';
import { styles } from '../../App';

const ActiveRouteDetailsNavigator = createStackNavigator(
	{
		ActiveRouteDetail: {
			screen: ActiveRouteScreen,
			navigationOptions: ({ navigation }) => ({
				headerStyle: styles.header,
				headerTitle: (
					<Image style={{ marginTop: 30, width: 300, height: 100 }} source={require('../assets/headerlogo.png')} />
				),
			})
		},
		GameOver: {
			screen: GameOverScreen,
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
		Camera: { screen: OpenCamera },
	},
	{ headerTitle: "Active Crawl" }
);

export default ActiveRouteDetailsNavigator;
