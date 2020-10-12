import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from '../pages/Dashboard';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationMenu: React.FC = () => {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard} options={{
          title: 'Home'
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default NavigationMenu;