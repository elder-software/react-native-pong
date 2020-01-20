import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import HomeScreen from './components/screens/HomeScreen';
import GameScreen from './components/screens/GameScreen';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Game: GameScreen
  },
  {
    initialRouteName: 'Home',
  }
);


export default createAppContainer(HomeStack);
