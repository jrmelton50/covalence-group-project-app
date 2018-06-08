import { createStackNavigator } from 'react-navigation';
import RouteDetailsScreen from '../screens/routedetailsscreen';
import ActiveRouteScreen from '../screens/activeroutescreen';
import LocationDetailsScreen from '../screens/locationdetailsscreen';

const RouteDetailsNavigator = createStackNavigator({
	RouteDetails: { screen: RouteDetailsScreen },
	ActiveRoute: { screen: ActiveRouteScreen },
	LocationDetails: { screen: LocationDetailsScreen },
}, {
		headerMode: 'float'
	});

export default RouteDetailsNavigator;
