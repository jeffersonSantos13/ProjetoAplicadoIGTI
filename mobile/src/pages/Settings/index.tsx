import React from 'react';
import { 
  Text, 
  ScrollView,
  Image
} from 'react-native';

import { 
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';

import { useAuth } from '../../hooks/auth';

import ButtonLogOut from '../../components/ButtonLogOut';
import ProfileItem from '../../components/ProfileItem';

import { 
  Container,
  ImageProfile
} from './styles';

import {
  ProfileTitle,
  ProfileTitleText,
  ProfileContainer,
  ProfileConfigurationTitle,
} from '../../styles/global';

import noImage from '../../assets/no-image.png';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Settings: React.FC<Props> = ({ navigation }) => {
  const { signOut, user } = useAuth();

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <Container>
        <ImageProfile>
          <Image 
            style={{
              width: 100,
              height: 100,
              marginLeft: 10,
              borderRadius: 100,
              borderWidth: 1
            }}
            source={!!user.avatar_url ? { uri: user.avatar_url} : noImage}
          />
          
          <ProfileTitle>
            <ProfileTitleText>
              {user.name}
            </ProfileTitleText>
            <Text>
              Ver perfil
            </Text>
          </ProfileTitle>
        </ImageProfile>

        <ProfileContainer>
          <ProfileConfigurationTitle>
            Configurações de Usuário
          </ProfileConfigurationTitle>
          <ProfileItem 
            iconProfile="person-circle-outline"
            user=""
            onPress={() => navigation.navigate("Profile")}
          >
            Minha Conta
          </ProfileItem>
        </ProfileContainer>

        <ProfileContainer>
          <ProfileConfigurationTitle>OUTROS</ProfileConfigurationTitle>

          <ButtonLogOut
            onPress={signOut}
          >
            Sair
          </ButtonLogOut>
        </ProfileContainer>
      
      </Container>
    </ScrollView>
  );
};

export default Settings;