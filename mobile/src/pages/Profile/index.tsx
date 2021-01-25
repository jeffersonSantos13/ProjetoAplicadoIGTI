import React, { useState } from 'react';
import { 
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import { 
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';

import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';

import Icon from 'react-native-vector-icons/Ionicons';
import { ActionSheet, Root } from 'native-base';

import { useAuth } from '../../hooks/auth';

import ProfileItem from '../../components/ProfileItem';

import { 
  Container,
  ImageProfile,
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

const Profile: React.FC<Props> = ({ navigation }) => {
  const { user, handleSendPhotoAvatar, handleDeleteUser } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const takePhotoFromCamera = async () => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      handleSendPhotoAvatar({ image: image.path });
    });
  };

  const choosePohotFromLibrary = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      handleSendPhotoAvatar({ image: image.path });
    });
  };

  const changeProfileAvatar = async () => {
    const BUTTON = ["Tirar Foto", "Escolher Foto na biblioteca", "Cancelar"];
    ActionSheet.show(
      {options: BUTTON, cancelButtonIndex: 2, title: "Selecione uma Foto"},
      async buttonIndex => {
        switch (buttonIndex) {
          case 0:
            await takePhotoFromCamera();
            break;
          case 1:
            await choosePohotFromLibrary();
            break;
          default:
            break;
        }
      }
    )
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flex: 1 }}
    >
      <Container>
        <ImageProfile
          
        >
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
            <Root>
              <Text>Alterar Imagem</Text>
              <Icon
                onPress={changeProfileAvatar}
                name="camera-outline"
                color="#44C52F"
                size={26}
              />
            </Root>
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
            Altura
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
            user={user.gender == 'male' ? "Masculino" : "Feminino"}
            onPress={() => {
              navigation.navigate("EditUser", { 
                profile: user.gender,
                title: "Editar Peso",
                placeholder: "Ex: Masculino",
                inputTitle: "Sexo",
                nameProfile: "gender",
                combo: true,
                option: 'gender',
              })
            }}
          >
            Sexo
          </ProfileItem>

          <ProfileItem 
            iconProfile=""
            user={user.age}
            onPress={() => {
              navigation.navigate("EditUser", { 
                profile: user.age,
                title: "Editar Idade",
                placeholder: "21",
                inputTitle: "Idade",
                nameProfile: "age",
              })
            }}
          >
            Idade
          </ProfileItem>

          <ProfileItem 
            iconProfile=""
            user={user.phone}
            onPress={() => {
              navigation.navigate("EditUser", { 
                profile: user.phone,
                title: "Editar Telefone",
                placeholder: "(11) 9 9999-9999",
                inputTitle: "Telefone",
                nameProfile: "phone",
              })
            }}
          >
            Telefone
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
            changeColor="#f00"
            onPress={toggleModal}
          >
            Excluír conta
          </ProfileItem>
        </ProfileContainer>

        <Modal 
          isVisible={isModalVisible}
        >
          <ModalView>
            <ModalText>Deseja realmente excluír sua conta?</ModalText>
            
            <ModalButtonView>

              <TouchableOpacity
                onPress={handleDeleteUser}
              >
                <ModalButtonContainer>
                  <ModalButtonText>
                    Excluir
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

export default Profile;