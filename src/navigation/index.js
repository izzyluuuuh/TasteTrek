import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name = "Home" component={HomeScreen} />
        <Stack.Screen name = "Welcome" component={WelcomeScreen} />
        <Stack.Screen name = "RecipeDetails" component={RecipeDetailsScreen} />
        <Stack.Screen name = "FavoritesScreen" component={FavoritesScreen} />
        <Stack.Screen name = "ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}