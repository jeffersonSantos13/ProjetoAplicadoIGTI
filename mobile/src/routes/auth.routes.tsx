import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import VerifyCodePassword from '../pages/VerifyCodePassword';
import NewPassword from '../pages/NewPassword';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#80F26D' }
    }}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="ForgotPassword" component={ForgotPassword} />
    <Auth.Screen name="VerifyCodePassword" component={VerifyCodePassword} />
    <Auth.Screen name="NewPassword" component={NewPassword} />
  </Auth.Navigator>
);

export default AuthRoutes;