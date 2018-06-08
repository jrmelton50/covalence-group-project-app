import React, { Component } from 'react';
import { View } from 'react-native';
import * as userService from '../services/user';

export default class LogOut extends Component {
	componentWillMount() {
		userService.logout();
		this.props.navigation.navigate('SignIn');
	}

	render() {
		return <View />;
	}
}
