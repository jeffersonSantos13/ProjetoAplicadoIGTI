import React from 'react';
import { View, Button }  from 'react-native';

import { useAuth } from '../../hooks/auth';

import { 
  Container,
} from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Sair" onPress={signOut} />
      </View>
    </Container>
  );
};

export default Dashboard;