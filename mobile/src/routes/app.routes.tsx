import React from 'react';
import { View, Button }  from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';

import { useAuth } from '../hooks/auth';

import Dashboard from '../pages/Dashboard';

const DashboardStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DashboardStackScreen = ({navigation}) => (
  <DashboardStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#80F26D',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <DashboardStack.Screen name="Home" component={Dashboard} options={{
      title: '',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={35}
          backgroundColor="#80F26D" onPress={() => navigation.openDrawer()}>
        </Icon.Button>
      )
    }} />
  </DashboardStack.Navigator>
);

const AppRoutes: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={DashboardStackScreen} options={{
        title: 'Home'
      }}/>
    </Drawer.Navigator>
  );
};

export default AppRoutes;