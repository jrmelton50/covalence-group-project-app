import React, { Component } from 'react';
import { ScrollView, Button, Text } from 'react-native';
import { Content, Container } from 'native-base';
import RoutesCard from '../components/routescard';
import Icon from 'react-native-vector-icons/Entypo';

export default class Homescreen extends Component {
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
			routes: [],
		};
	}

	async componentWillMount() {
		try {
			let results = await fetch('https://bham-hops.herokuapp.com/api/routes');
			let routes = await results.json();
			this.setState({ routes });
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<Container>
				<Content style={{ backgroundColor: "#F9F5E0" }}>
					<ScrollView >
						<Content >
							<Text style={{ alignSelf: "center", color: "#A2978D", fontWeight: "bold", padding: 15, fontSize: 18, }}>AVAILABLE CRAWLS</Text>
							{this.state.routes.map((route, index) => {
								return (
									<RoutesCard key={route.routeid} route={route} id={route.routeid} />
								);
							})}
						</Content>
					</ScrollView>
				</Content>
			</Container>
		);
	}
}
