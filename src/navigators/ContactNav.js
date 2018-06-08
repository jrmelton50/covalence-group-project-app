import { createStackNavigator } from 'react-navigation';
import ContactScreen from '../screens/contactscreen';
import { styles } from '../../App'
import React from 'react';
import { Image } from 'react-native'

const ContactNavigator = createStackNavigator({
    Contact: {
        screen: ContactScreen,
        navigationOptions: ({ navigation }) => ({
            headerStyle: styles.header,
            headerTitle: (
                <Image style={{ marginTop: 30, width: 300, height: 100 }} source={require('../assets/headerlogo.png')} />
            ),
        })
    }
});

export default ContactNavigator;

