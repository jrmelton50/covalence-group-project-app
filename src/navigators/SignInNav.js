import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import SignInScreen from '../screens/signinscreen';
import SignUpScreen from '../screens/signupscreen';
import { styles } from '../../App';
// import cclogo from '../assets/cclogo'

const SignInNavigator = createStackNavigator({
	SignIn: { screen: SignInScreen },
	SignUp: { screen: SignUpScreen },
});

export default SignInNavigator;
