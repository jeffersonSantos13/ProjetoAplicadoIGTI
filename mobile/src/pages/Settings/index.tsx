import React, { useState } from 'react';
import { 
  Text, 
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

import { 
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';

import Modal from 'react-native-modal';

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
  ModalView,
  ModalText,
  ModalButtonView,
  ModalButtonContainer,
  ModalButtonText
} from '../../styles/global';

import noImage from '../../assets/no-image.png';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Settings: React.FC<Props> = ({ navigation }) => {
  const { signOut, user } = useAuth();
  const [dialogVisible, setDialogVisible] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
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
            Configurações de Usuário
          </ProfileConfigurationTitle>
          <ProfileItem 
            iconProfile="person-circle-outline"
            user = ''
            changeColor = ''
            onPress={() => navigation.navigate("Profile")}
          >
            Minha Conta
          </ProfileItem>
          <ProfileItem 
            iconProfile="location-sharp"
            user = ''
            changeColor = ''
            onPress={() => navigation.navigate("Address")}
          >
            Meu endereço
          </ProfileItem>
        </ProfileContainer>

        <ProfileContainer>
          <ProfileConfigurationTitle>OUTROS</ProfileConfigurationTitle>

          <ButtonLogOut
            onPress={toggleModal}
          >
            Sair
          </ButtonLogOut>
        </ProfileContainer>

        <Modal 
          isVisible={isModalVisible}
        >
          <ModalView>
            <ModalText>Deseja realmente Saír do FitLife?</ModalText>
            
            <ModalButtonView>

              <TouchableOpacity
                onPress={signOut}
              >
                <ModalButtonContainer>
                  <ModalButtonText>
                    Sair
                  </ModalButtonText>
                </ModalButtonContainer>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={toggleModal}
              >
                <ModalButtonContainer>
                  <ModalButtonText>
                    Cancelar
                  </ModalButtonText>
                </ModalButtonContainer>
              </TouchableOpacity>
            </ModalButtonView>
          </ModalView>
        </Modal>
      
      </Container>
    </ScrollView>
  );
};

export default Settings;