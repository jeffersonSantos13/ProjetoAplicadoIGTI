import React from 'react';
import { 
  Text, 
  Image,
  TouchableOpacity
} from 'react-native';

import { 
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationRoute
} from 'react-navigation';

import ProfileItem from '../../components/ProfileItem';

import { useAuth } from '../../hooks/auth';

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
  route: NavigationRoute;
}

const Address: React.FC<Props> = ({ navigation, route }) => {
  const { user, handleSendPhotoAvatar } = useAuth();

  return (
    <Container>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
      >
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
      </TouchableOpacity>

      <ProfileContainer>
        <ProfileConfigurationTitle>
          Informações do Endereço
        </ProfileConfigurationTitle>

        <ProfileItem 
          iconProfile=""
          user={user.cep}
          onPress={() => {
            navigation.navigate("EditUser", { 
              profile: user.cep,
              title: "Editar CEP",
              placeholder: "CEP",
              inputTitle: "Digite o CEP",
              nameProfile: "cep"
            })
          }}
        >
          CEP
        </ProfileItem>

        <ProfileItem 
          iconProfile=""
          user={user.logradouro}
          onPress={() => {
            navigation.navigate("EditUser", { 
              profile: user.logradouro,
              title: "Editar Logradouro",
              placeholder: "Rua. Dr.",
              inputTitle: "Digite o Logradouro",
              nameProfile: "logradouro"
            })
          }}
        >
          Logradouro
        </ProfileItem>

        <ProfileItem 
          iconProfile=""
          user={user.bairro}
          onPress={() => {
            navigation.navigate("EditUser", { 
              profile: user.bairro,
              title: "Editar o Bairro",
              placeholder: "Bairro Jordanopólis",
              inputTitle: "Digite o Bairro",
              nameProfile: "bairro"
            })
          }}
        >
          Bairro
        </ProfileItem>

        <ProfileItem 
          iconProfile=""
          user={user.localidade}
          onPress={() => {
            navigation.navigate("EditUser", { 
              profile: user.localidade,
              title: "Editar a Cidade",
              placeholder: "São Paulo",
              inputTitle: "Digite a Cidade",
              nameProfile: "localidade"
            })
          }}
        >
          Cidade
        </ProfileItem>

        <ProfileItem 
          iconProfile=""
          user={user.uf}
          onPress={() => {
            navigation.navigate("EditUser", { 
              profile: user.uf,
              title: "Editar o Estado",
              placeholder: "SP",
              inputTitle: "Digite o Estado",
              nameProfile: "uf",
              combo: true,
              option: "uf"
            })
          }}
        >
          UF
        </ProfileItem>
        
        <ProfileItem 
          iconProfile=""
          user={user.complemento}
          onPress={() => {
            navigation.navigate("EditUser", { 
              profile: user.complemento,
              title: "Editar Complemento",
              placeholder: "Ex. Casa",
              inputTitle: "Digite o Complemento",
              nameProfile: "complemento"
            })
          }}
        >
          Complemento
        </ProfileItem>

      </ProfileContainer>
    </Container>
  );
};

export default Address;