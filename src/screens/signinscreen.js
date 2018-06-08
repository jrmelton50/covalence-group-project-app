import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, View, Card } from 'native-base';
import * as userService from '../services/user';
import { AsyncStorage, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../App';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignInScreen extends Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.state = {
			redirectToReferrer: false,
			email: '',
			password: '',
			feedbackMessage: '',
			checkingLogin: true,
		};
	}

	async componentDidMount() {

		let loggedIn = await userService.checkLogin();

		if (loggedIn) {
			this.setState({ redirectToReferrer: true, checkingLogin: false });
			this.props.navigation.navigate('DrawerStack');
		} else {
			this.setState({ checkingLogin: false });
		}
	}

	login() {
		userService
			.login(this.state.email, this.state.password)
			.then(() => {
				this.setState({ redirectToReferrer: true });
				this.props.navigation.navigate('DrawerStack');
			})
			.catch(err => {
				if (err.message) {
					this.setState({ feedbackMessage: err.message });
					alert(err.message);
				}
			});
	}

	forgotPw() {
		alert(
			"pressed!"
			// <Form>
			// 	<Label><Icon name="envelope" size={20} color="#58585B" />Email</Label>
			// 	<Button><Text>Send Email!</Text></Button>
			// </Form >
		)
	}

	render() {
		return (
			<Container>
				<ImageBackground source={require('../assets/backgroundimage_copy.png')} style={styles.backgroundImage}>
					<Content>
						<Image style={{ marginTop: 50, alignSelf: "center", width: 250, height: 250, resizeMode: 'contain' }} source={require('../assets/cclogo.png')} />
						<Form>
							<Item floatingLabel style={styles.emailInputTextBox}>
								<Label>   <Icon style={{ marginLeft: 5 }} name="envelope" size={20} color="#58585B" />   Email</Label>
								<Input onChangeText={email => this.setState({ email })} />
							</Item>
							<Item floatingLabel last style={styles.passwordInputTextBox}>
								<Label><Icon name="lock" size={23} color="#58585B" />    Password</Label>
								<Input secureTextEntry={true} onChangeText={password => this.setState({ password })} />
							</Item>
							<ImageBackground source={require('../assets/buttonbg.png')} style={styles.buttonBackground}>
								<TouchableOpacity
									block
									onPress={() => {
										this.login();
									}}
								>
									<Text style={{ color: "white", alignSelf: "center", height: 100 }}>SIGN IN</Text>
								</TouchableOpacity>
							</ImageBackground>
							{/* Forgot password button needs to go to new screen where user can enter the 
									email they use associated with their craft crawls account. Then, we need 
									to make sure that email exists in our DB. Then, we can use mailgun to send 
									them an email with a new (long crazy) password. We will also need to change 
									their password in the DB to the new (long crazy) password so when they try 
									to log in, it will let them. Once they've logged in with the new (long crazy) 
									password, they can go to the profile page screen and change their password.  */}
							{/* <Text style={{ alignSelf: "center" }} onPress={() => alert('Pressed!')}>Forgot Your Password?</Text> */}
							<Container style={styles.footer}>
								<Text> Don't have an account yet? </Text>
								<Text onPress={() => this.props.navigation.navigate('SignUp')} style={{ fontWeight: "bold" }}>Sign Up!</Text>
							</Container>
						</Form>
					</Content>
				</ImageBackground >
			</Container >
		);
	}
}
