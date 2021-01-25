import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Dashboard from '../Dashboard';
import Schedule from '../Schedule';
import Nutritionits from '../Nutritionits';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    barStyle={{
      backgroundColor: '#80F26D',
      borderStyle: 'solid',
      borderColor: '#d0cfd0',
    }}
  >
    <Tab.Screen
      name="Home"
      component={Dashboard}
      options={{
        tabBarLabel: 'Início',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Nutricionistas"
      component={Nutritionits}
      options={{
        tabBarLabel: 'Nutricionistas',
        tabBarIcon: ({ color }) => (
          <Icon name="nutrition-outline" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Schedule"
      component={Schedule}
      options={{
        tabBarLabel: 'Calendário',
        tabBarIcon: ({ color }) => (
          <Icon name="calendar-outline" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;