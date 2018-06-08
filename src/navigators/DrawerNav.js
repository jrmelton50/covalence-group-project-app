import React from 'react';
import { createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import HomeNavigator from './HomeNav';
import { Image, Text } from 'react-native'
import ActiveRouteDetailsNavigator from './ActiveRouteDetailsNav';
import ProfilePageNavigator from './ProfilePageNav';
import ContactNavigator from './ContactNav';
import LogOutScreen from '../screens/logoutscreen';
import uploadimage from '../screens/uploadimage';
// import { styles } from '../../App';

const DrawerNavigation = createDrawerNavigator({
	Home: HomeNavigator,
	ActiveRoute: {
		screen: ActiveRouteDetailsNavigator,
		navigationOptions: ({ navigation }) => ({
			title: `Active Crawl`,
		}),
	},
	ProfilePage: {
		screen: ProfilePageNavigator,
		navigationOptions: ({ navigation }) => ({
			title: `Profile Page`,
		}),
	},
	Contact: {
		screen: ContactNavigator,
		navigationOptions: ({ navigation }) => ({
			title: `Contact Us`,
		}),
	},
	LogOut: {
		screen: LogOutScreen,
		navigationOptions: ({ navigation }) => ({
			title: `Log Out`,
		}),
	},
	uploadImage: {
		screen: uploadimage,
		navigationOptions: ({ navigation }) => ({
			title: `Upload Image`,
		}),
	},
},
	{
		contentComponent: (props) => (
			<SafeAreaView style={{ paddingTop: 20, flex: 1, backgroundColor: "#404041", justifyContent: 'space-between' }} >
				<DrawerItems {...props} />
				<Image style={{ width: 300, height: 300, resizeMode: 'contain' }} source={require('../assets/clearhop.png')} />
				<Text style={{ alignContent: 'center', fontSize: 10, color: "#F9F5E0" }}>App built by: Jessie Melton, George Nguyen, and Nick Bates</Text>
				<Text style={{ alignContent: 'center', fontSize: 10, color: "#F9F5E0" }}>Designs provided by: Salzburn-Designs</Text>
			</SafeAreaView>
		),
		contentOptions: {
			activeTintColor: "#F9F5E0",
			inactiveTintColor: "#F9F5E0",
			activeBackgroundColor: "#58585B",
			itemStyle: {
				borderBottomColor: '#58585B',
				borderBottomWidth: 1
			}
		}
	},
);

export default DrawerNavigation;
