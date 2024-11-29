import React from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Importação correta
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import BottomRoutes from './bottom.routes';

const Stack = createStackNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false, cardStyle:{backgroundColor: "#FFF"}}}>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="BottomRoutes" component={BottomRoutes}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
