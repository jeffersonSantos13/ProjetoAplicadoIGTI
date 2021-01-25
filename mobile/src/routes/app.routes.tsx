import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MainTabScreen from '../pages/Navigation';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';
import Address from '../pages/Address';
import CalendarDetail from '../pages/CalendarDetail';

import EditUser from '../components/EditUser';
import EditPassword from '../components/EditPassword';

const Drawer = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#80F26D' }
      }}
    >
      <Drawer.Screen
        name="Home"
        component={MainTabScreen}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen 
        name="Settings"
        component={Settings}
        options={{
          headerShown: true,
          title: 'Configuração',
          headerStyle: {
            backgroundColor: '#80F26D',
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            textAlign: "center",
            marginRight: 200,
            fontSize: 18,
            fontWeight: "600",
            color: '#fff'
          }
        }}
      />

      <Drawer.Screen 
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          title: 'Minha Conta',
          headerStyle: {
            backgroundColor: '#80F26D',
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            textAlign: "center",
            marginRight: 200,
            fontSize: 18,
            fontWeight: "600",
            color: '#fff'
          }
        }}
      />

      <Drawer.Screen 
        name="Address"
        component={Address}
        options={{
          headerShown: true,
          title: 'Endereço',
          headerStyle: {
            backgroundColor: '#80F26D',
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            textAlign: "center",
            marginRight: 200,
            fontSize: 18,
            fontWeight: "600",
            color: '#fff'
          }
        }}
      />

      <Drawer.Screen 
        name="EditUser"
        component={EditUser}
        options={{
          headerShown: true,
          title: 'Editar',
          headerStyle: {
            backgroundColor: '#80F26D',
          },          
          headerTintColor: "#fff",
          headerTitleStyle: {
            textAlign: "center",
            marginRight: 180,
            fontSize: 18,
            fontWeight: "600",
            color: '#fff'
          }
        }}
      />

      <Drawer.Screen 
        name="EditPassword"
        component={EditPassword}
        options={{
          headerShown: true,
          title: 'Alterar Senha',
          headerStyle: {
            backgroundColor: '#80F26D',
          },          
          headerTintColor: "#fff",
          headerTitleStyle: {
            textAlign: "center",
            marginRight: 180,
            fontSize: 18,
            fontWeight: "600",
            color: '#fff'
          }
        }}
      />

      <Drawer.Screen 
        name="CalendarDetail"
        component={CalendarDetail}
        options={{
          headerShown: true,
          title: 'Calendário',
          headerStyle: {
            backgroundColor: '#80F26D',
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            textAlign: "center",
            marginRight: 200,
            fontSize: 18,
            fontWeight: "600",
            color: '#fff'
          }
        }}
      />

    </Drawer.Navigator>
  );
};

export default AppRoutes;