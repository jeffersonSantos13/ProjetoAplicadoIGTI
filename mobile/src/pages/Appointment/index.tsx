import React from 'react';
import { View, Text, Button }  from 'react-native';

import { useAuth } from '../../hooks/auth';

import { 
  Container,
} from './styles';

const Appointment: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Calendário</Text>
      </View>
    </Container>
  );
};

export default Appointment;