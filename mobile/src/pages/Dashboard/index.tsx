import React from 'react';
import { View, Text, ScrollView }  from 'react-native';

import { 
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

import { 
  Container,
} from './styles';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Dashboard: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <Container>
        <Icon 
          onPress={() => navigation.navigate('Settings') }
          name="settings-outline" color='#44C52F' size={26}
        />

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Início</Text>
        </View>
      </Container>
    </ScrollView>
  );
};

export default Dashboard;