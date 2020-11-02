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

const Profile: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();

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
            Informações da Conta 
          </ProfileConfigurationTitle>
          <ProfileItem 
            iconProfile=""
            user={user.name}
            onPress={() => {
              navigation.navigate("EditUser", { 
                profile: user.name,
                title: "Editar Usuário",
                placeholder: "Nome de usuário",
                inputTitle: "Nome de usuário",
                nameProfile: "name"
              })
            }}
          >
            Nome de usuário
          </ProfileItem>
          <ProfileItem 
            iconProfile=""
            user={user.email}
            onPress={() => {
              navigation.navigate("EditUser", { 
                profile: user.email,
                title: "Editar E-mail",
                placeholder: "E-mail",
                inputTitle: "E-mail",
                nameProfile: "email"
              })
            }}
          >
            E-mail
          </ProfileItem>

          <ProfileItem 
            iconProfile=""
            user={user.height}
            onPress={() => {
              navigation.navigate("EditUser", { 
                profile: user.height,
                title: "Editar Altura",
                placeholder: "Altura",
                inputTitle: "Altura",
                nameProfile: "height"
              })
            }}
          >
            Peso
          </ProfileItem>

          <ProfileItem 
            iconProfile=""
            user={user.weight}
            onPress={() => {
              navigation.navigate("EditUser", { 
                profile: user.weight,
                title: "Editar Peso",
                placeholder: "Peso",
                inputTitle: "Peso",
                nameProfile: "weight"
              })
            }}
          >
            Peso
          </ProfileItem>

          <ProfileItem 
            iconProfile=""
            user=""
            onPress={() => navigation.navigate("EditPassword")}
          >
            Mudar senha
          </ProfileItem>
        </ProfileContainer>

        <ProfileContainer>
          <ProfileConfigurationTitle>
            Gerenciamento da conta
          </ProfileConfigurationTitle>
          <ProfileItem 
            iconProfile=""
            user=""
            onPress={() => console.log("Desativar")}
          >
            Desativar conta
          </ProfileItem>

          <ProfileItem 
            iconProfile=""
            user=""
            onPress={() => console.log("Excluir")}
          >
            Excluír conta
          </ProfileItem>
        </ProfileContainer>

      </Container>
    </ScrollView>
  );
};

export default Profile;