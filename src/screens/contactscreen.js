import React, { Component } from 'react';
import { ScrollView, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Button, Textarea, Content, Container } from 'native-base'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { sendContactEmail } from '../services/contact';
import { styles } from '../../App'
import Icon from 'react-native-vector-icons/Entypo';

export default class ContactScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: (
			<Text
				onPress={() => {
					navigation.toggleDrawer();
				}}
			>
				<Icon name="menu" size={30} color="#F9F5E0" />
			</Text>
		),
	});

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			message: '',
			isSubmitButtonDisabled: true
		};
	}

	handleSubmit() {
		// if (this.state.email === '') {
		if (!this.isEmailValid()) {
			alert('The Email provided is not a valid email address.');
		} else if (this.state.name === '') {
			alert('The Name Field cannot be empty');
		} else if (this.state.message === '') {
			alert('There is nothing in the message field');
		} else {
			sendContactEmail(this.state.name, this.state.email, this.state.message)
				.then(() => {
					this.setState({ name: '', email: '', message: '' })
					alert('Thank you, your feedback means a lot to us!');
				})
				.catch(err => {
					console.log(err);
				});
		}
	}

	checkIfButtonShouldBeEnabled() {
		if (this.state.email != "" && this.state.name != "" && this.state.message != "") {
			this.setState({ isSubmitButtonDisabled: false });
		}
		else {
			this.setState({ isSubmitButtonDisabled: true });
		}
	}

	handleEmailChange(email) {
		this.setState({ email }, () => { this.checkIfButtonShouldBeEnabled() });
	}

	handleNameChange(name) {
		this.setState({ name }, () => { this.checkIfButtonShouldBeEnabled() });
	}

	handleMessageChange(message) {
		this.setState({ message }, () => { this.checkIfButtonShouldBeEnabled() });
	}

	isEmailValid() {
		let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return emailFormat.test(String(this.state.email).toLowerCase());
	}

	render() {
		return (
			<Container>
				<ImageBackground source={require('../assets/contactbgpic.png')} style={styles.backgroundImage}>
					<Content>
						<ScrollView>
							<Text style={{ alignSelf: "center", color: "#404041", fontWeight: "bold", padding: 15, fontSize: 20, }}>CONTACT US</Text>
							<Text style={{ alignSelf: "center", color: "#404041", fontWeight: "bold", fontStyle: 'italic', padding: 15, fontSize: 14, }}>Please let us know of any issues/bugs that you may have encountered!</Text>
							<FormLabel>Email</FormLabel>
							<FormInput value={this.state.email} onChangeText={email => this.handleEmailChange(email)} />
							<FormValidationMessage>Required</FormValidationMessage>
							<FormLabel>Title</FormLabel>
							<FormInput value={this.state.name} onChangeText={name => this.handleNameChange(name)} />
							<FormValidationMessage>Required</FormValidationMessage>
							<FormLabel>Message</FormLabel>
							<Textarea value={this.state.message} rowSpan={5} bordered placeholder="Type your message here!" onChangeText={message => this.handleMessageChange(message)} />
							<FormValidationMessage>Required</FormValidationMessage>
							{/* <Button block disabled={this.state.isSubmitButtonDisabled} onPress={() => this.handleSubmit()} >
								<Text> Submit Feedback </Text>
							</Button> */}
							<ImageBackground source={require('../assets/buttonbg.png')} style={styles.buttonBackground}>
								<TouchableOpacity
									block
									disabled={this.state.isSubmitButtonDisabled}
									onPress={() => this.handleSubmit()}
								>
									<Text style={{ color: "white", alignSelf: "center", height: 100 }}>SUBMIT FEEDBACK</Text>
								</TouchableOpacity>
							</ImageBackground>
						</ScrollView>
					</Content>
				</ImageBackground>
			</Container>
		);
	}
}
