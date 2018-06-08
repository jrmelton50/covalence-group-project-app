import React, { Component } from 'react';
import { ScrollView, AsyncStorage, ImageBackground, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import * as baseService from '../services/base';
import { styles } from '../../App';
import Icon from 'react-native-vector-icons/Entypo';

export default class ProfilePageScreen extends Component {
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
			userID: null,
			userEmail: '',
			profilePictureURL: '',
			pictures: [],
			user: null,
			newPassword: '',
			confirmPassword: '',
			passwordErrorMessage: ''
		};
	}

	getUser() {
		fetch(`https://bham-hops.herokuapp.com/api/users/${this.state.userID}`)
			.then(res => {
				return res.json();
			})
			.then(user => {
				this.setState({
					userEmail: user.email,
					user: user,
				});
				this.getPictures();
			})
			.catch(err => {
				console.log(err);
			});
	}

	getPictures() {
		fetch(`https://bham-hops.herokuapp.com/api/users/${this.state.userID}/images`)
			.then(res => {
				return res.json();
			})
			.then(pictures => {
				this.setState({
					pictures: pictures,
					profilePictureURL: pictures[0].imageurl,
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	componentWillMount() {
		AsyncStorage.getItem('user')
			.then(userID => {
				this.setState({ userID });
				this.getUser();
			})
			.catch(err => {
				console.log(err);
			});
	}

	isPasswordValid() {
		// make password more secure if we decide to put on app store.
		return this.state.newPassword.length >= 5 || this.state.confirmPassword.length >= 5;
	}

	updatePassword() {
		if (this.isPasswordValid()) {
			if (this.state.newPassword === this.state.confirmPassword) {
				let updatedUser = {
					email: this.state.user.email,
					password: this.state.newPassword,
					role: this.state.user.role,
					level: this.state.user.level,
					numberofcheckins: this.state.user.numberofcheckins,
					activerouteid: this.state.user.activerouteid
				};
				fetch(`https://bham-hops.herokuapp.com/api/users/${this.state.userID}`, {
					method: 'PUT',
					body: JSON.stringify(updatedUser),
					headers: new Headers({
						'Content-Type': 'application/json',
					}),
				})
					.then(res => {
						this.setState({
							newPassword: '',
							confirmPassword: '',
							passwordErrorMessage: ''
						});
					})
					.catch(err => {
						console.log(err);
					});
				alert('Password was successfully changed!');
			} else {
				this.setState({
					passwordErrorMessage: 'Passwords do not match!'
				});
			}
		}
		else {
			alert("Please enter a valid password.");
		}
	}

	render() {
		return (
			<Container>
				<Content style={{ backgroundColor: "#F9F5E0" }}>
					<ScrollView>
						<Text style={{ alignSelf: "center", color: "#A2978D", fontWeight: "bold", padding: 15, fontSize: 18, }}>PROFILE PAGE</Text>
						<Text> Photos </Text>
						{this.state.pictures.map((pic, index) => {
							return <Text key={pic.id}> {pic.imageurl} </Text>;
						})}
						<Text style={{ alignSelf: "center", color: "#A2978D", fontWeight: "bold", padding: 15, fontSize: 18, }}>ACCOUNT INFORMATION</Text>
						<Text> User Email: {this.state.userEmail} </Text>
						<Form>
							<Item floatingLabel>
								<Label>Password</Label>
								<Input
									secureTextEntry={true}
									onChangeText={newPassword => this.setState({ newPassword })}
									value={this.state.newPassword}
								/>
							</Item>
							<Text> Password is case sensitve and must contain at least 5 characters. </Text>
							<Text style={styles.errorRed}> {this.state.passwordErrorMessage} </Text>
							<Item floatingLabel last>
								<Label>Confirm Password</Label>
								<Input
									secureTextEntry={true}
									onChangeText={confirmPassword => this.setState({ confirmPassword })}
									value={this.state.confirmPassword}
								/>
							</Item>
							<Text style={styles.errorRed}> {this.state.passwordErrorMessage} </Text>
							{/* <Button
								block
								onPress={() => {
									this.updatePassword();
								}}
							>
								<Text>Update Password</Text>
							</Button> */}

							<ImageBackground source={require('../assets/buttonbg.png')} style={styles.buttonBackground}>
								<TouchableOpacity
									block
									onPress={() => {
										this.updatePassword();
									}}
								>
									<Text style={{ color: "white", alignSelf: "center", height: 100 }}>UPDATE PASSWORD</Text>
								</TouchableOpacity>
							</ImageBackground>

						</Form>

					</ScrollView>
				</Content>
			</Container>
		);
	}
}
