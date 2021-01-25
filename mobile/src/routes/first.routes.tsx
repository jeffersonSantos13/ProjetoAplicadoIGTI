import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserGender from '../pages/FirstLogin/UserGender';
import DesiredWeight from '../pages/FirstLogin/DesiredWeight';
import UserMeasures from '../pages/FirstLogin/UserMeasures';

const First = createStackNavigator();

const FirstRoute: React.FC = () => (
  <First.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' }
    }}
  >
    <First.Screen name="UserGender" component={UserGender} />
    <First.Screen name="DesiredWeight" component={DesiredWeight} />
    <First.Screen name="UserMeasures" component={UserMeasures} />
  </First.Navigator>
);

export default FirstRoute;