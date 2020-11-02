import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Dashboard from '../Dashboard';
import Appointment from '../Appointment';
import Search from '../Search';

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
      name="Search"
      component={Search}
      options={{
        tabBarLabel: 'Buscar',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-search-sharp" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Appointment"
      component={Appointment}
      options={{
        tabBarLabel: 'Calendário',
        tabBarIcon: ({ color }) => (
          <Icon name="calendar-sharp" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;