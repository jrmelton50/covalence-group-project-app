import React from 'react';
import { Image } from 'react-native'
import { createStackNavigator } from 'react-navigation';
import ProfilePageScreen from '../screens/profilepagescreen';
import { styles } from '../../App'

const ProfilePageNavigator = createStackNavigator({
    ProfilePage: {
        screen: ProfilePageScreen,
        navigationOptions: ({ navigation }) => ({
            headerStyle: styles.header,
            headerTitle: (
                <Image style={{ marginTop: 30, width: 300, height: 100 }} source={require('../assets/headerlogo.png')} />
            ),
        })
    }
});


export default ProfilePageNavigator;

